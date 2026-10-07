const SPREADSHEET_ID = "1qrF1QEsWH1c4vSN1-pt7uix4IDnG6Z-ibZPBL-zb3Cw";
const SHEET_NAME = "EOD Reports";
const DEFAULT_DRIVE_FOLDER_ID = "1RT6BDmKamJDdBpdf_bdFEPeiCnLbnCl8";

const EOD_HEADERS = [
  "Timestamp",
  "Counselor Name",
  "Total Dialled",
  "Total Connected",
  "Total Talk Time",
  "Avg Call Duration",
  "Total Leads",
  "Half Shift",
  "File Name",
  "File Size",
  "File URL"
];

function doGet(e) {
  try {
    e = e || { parameter: {} };
    const action = (e.parameter.action || "").trim();

    if (action === "checkEodSubmission") {
      const counselorName = normalizeName_(
        e.parameter.counselorName ||
        e.parameter.employeeName ||
        e.parameter.nameOfEmployee ||
        e.parameter.name ||
        ""
      );

      const dateKey = (e.parameter.date || todayKey_()).trim();
      const alreadySubmitted = counselorName
        ? isSubmittedToday_(counselorName, dateKey)
        : false;

      return json_({
        status: "success",
        alreadySubmitted: alreadySubmitted,
        submitted: alreadySubmitted,
        exists: alreadySubmitted,
        count: alreadySubmitted ? 1 : 0
      });
    }

    return json_({
      status: "success",
      message: "EOD API running"
    });

  } catch (error) {
    return json_({
      status: "error",
      message: error.toString()
    });
  }
}

function doPost(e) {
  try {
    const sheet = getEodSheet_();
    setupHeaders_(sheet);

    const data = parseRequestData_(e);

    const counselorName = normalizeName_(
      data.counselorName ||
      data.employeeName ||
      data.nameOfEmployee ||
      data.name ||
      ""
    );

    if (!counselorName) {
      return json_({
        status: "error",
        message: "counselorName is required"
      });
    }

    const dateKey = (data.date || todayKey_()).trim();

    if (isSubmittedToday_(counselorName, dateKey)) {
      return json_({
        status: "error",
        duplicate: true,
        alreadySubmitted: true,
        message: "You already submitted your report today."
      });
    }

    let fileName = data.fileName || "";
    let fileURL = data.fileURL || "";
    let fileSize = data.fileSize || "";
    const folderId = data.driveFolderId || DEFAULT_DRIVE_FOLDER_ID;

    if (data.fileContentBase64 && folderId) {
      const folder = DriveApp.getFolderById(folderId);
      const bytes = Utilities.base64Decode(data.fileContentBase64);
      const blob = Utilities.newBlob(
        bytes,
        data.fileType || "application/octet-stream",
        fileName || ("EOD_" + Date.now())
      );

      const createdFile = folder.createFile(blob);
      try {
        createdFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      } catch (shareError) {}

      fileName = createdFile.getName();
      fileURL = "https://drive.google.com/uc?export=view&id=" + createdFile.getId();
      fileSize = createdFile.getSize();
    }

    appendRowByHeaders_(sheet, {
      "Timestamp": new Date(),
      "Counselor Name": counselorName,
      "Total Dialled": pickFirst_(data, [
        "totalDialled",
        "totalDialledNumber",
        "totalDialed",
        "totalDialedNumber"
      ]),
      "Total Connected": pickFirst_(data, [
        "totalConnected",
        "totalConnectedCall",
        "totalConnectedCalls"
      ]),
      "Total Talk Time": pickFirst_(data, [
        "totalTalkTime",
        "talkTime"
      ]),
      "Avg Call Duration": pickFirst_(data, [
        "avgCallDuration",
        "averageCallDuration"
      ]),
      "Total Leads": pickFirst_(data, [
        "totalLeads",
        "totalNumberOfLeads",
        "totalNoOfLeads",
        "numberOfLeads",
        "leads"
      ]),
      "Half Shift": formatHalfShift_(data.halfShift || data.isHalfShift),
      "File Name": fileName,
      "File Size": fileSize,
      "File URL": fileURL
    });

    return json_({
      status: "success",
      message: "EOD submitted",
      totalLeadsReceived: data.totalLeads || data.totalNumberOfLeads || "",
      fileURL: fileURL
    });

  } catch (error) {
    return json_({
      status: "error",
      message: error.toString()
    });
  }
}

function testLeadColumn() {
  const sheet = getEodSheet_();
  setupHeaders_(sheet);

  appendRowByHeaders_(sheet, {
    "Timestamp": new Date(),
    "Counselor Name": "TEST COUNSELOR",
    "Total Dialled": 100,
    "Total Connected": 50,
    "Total Talk Time": 60,
    "Avg Call Duration": 45,
    "Total Leads": 999,
    "Half Shift": "NO",
    "File Name": "test-file",
    "File Size": 123,
    "File URL": "test-url"
  });
}

function getEodSheet_() {
  const sheet = SpreadsheetApp
    .openById(SPREADSHEET_ID)
    .getSheetByName(SHEET_NAME);

  if (!sheet) {
    throw new Error("Sheet not found: " + SHEET_NAME);
  }

  return sheet;
}

function setupHeaders_(sheet) {
  sheet.getRange(1, 1, 1, EOD_HEADERS.length).setValues([EOD_HEADERS]);
}

function appendRowByHeaders_(sheet, rowData) {
  const row = EOD_HEADERS.map(function (header) {
    return Object.prototype.hasOwnProperty.call(rowData, header) ? rowData[header] : "";
  });

  const nextRow = sheet.getLastRow() + 1;
  sheet.getRange(nextRow, 1, 1, EOD_HEADERS.length).setValues([row]);
}

function parseRequestData_(e) {
  const raw = (e && e.postData && e.postData.contents) || "";
  const mime = (e && e.postData && e.postData.type) || "";

  if (mime.indexOf("application/json") !== -1 && raw) {
    return JSON.parse(raw);
  }

  if (e && e.parameter && Object.keys(e.parameter).length > 0) {
    const data = {};
    Object.keys(e.parameter).forEach(function (key) {
      data[key] = e.parameter[key];
    });
    return data;
  }

  if (raw) {
    try {
      return JSON.parse(raw);
    } catch (jsonError) {
      const data = {};
      raw.split("&").forEach(function (part) {
        const pair = part.split("=");
        if (pair[0]) {
          data[decodeURIComponent(pair[0])] = decodeURIComponent((pair[1] || "").replace(/\+/g, " "));
        }
      });
      return data;
    }
  }

  return {};
}

function pickFirst_(data, keys) {
  for (var i = 0; i < keys.length; i++) {
    const value = data[keys[i]];
    if (value !== undefined && value !== null && String(value).trim() !== "") {
      return value;
    }
  }
  return "";
}

function formatHalfShift_(value) {
  return value === true || value === "true" || value === "YES" || value === "Yes" || value === "yes"
    ? "YES"
    : "NO";
}

function isSubmittedToday_(counselorName, dateKey) {
  const sheet = getEodSheet_();
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) return false;

  const values = sheet.getRange(2, 1, lastRow - 1, 2).getValues();

  for (var i = 0; i < values.length; i++) {
    const rowDate = dateFromCell_(values[i][0]);
    const rowName = normalizeName_(values[i][1]);

    if (rowName === counselorName && rowDate === dateKey) {
      return true;
    }
  }

  return false;
}

function dateFromCell_(v) {
  if (Object.prototype.toString.call(v) === "[object Date]" && !isNaN(v.getTime())) {
    return Utilities.formatDate(v, Session.getScriptTimeZone(), "yyyy-MM-dd");
  }

  const d = new Date(v);

  if (!isNaN(d.getTime())) {
    return Utilities.formatDate(d, Session.getScriptTimeZone(), "yyyy-MM-dd");
  }

  return String(v || "").trim();
}

function todayKey_() {
  return Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");
}

function normalizeName_(name) {
  return String(name || "").trim().replace(/\s+/g, " ");
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
