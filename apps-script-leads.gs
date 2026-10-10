const LEADS_SPREADSHEET_ID = "10mSlJmdwiK_hQzWGpCyvs-varaPSTTFJDWys7YAF9ME";
const LEADS_SHEET_NAME = "MAIN SHEET";
const LEADS_LOG_SHEET_NAME = "Lead Submit Logs";

const LEADS_HEADERS = [
  "Timestamp",
  "Counselor Name",
  "Student Name",
  "Number",
  "Institute",
  "Stream",
  "Course Level",
  "Course Name",
  "Tag",
  "Senior Support",
  "Senior Name",
  "Follow Up Date",
  "Follow Up Time",
  "Follow Up",
  "Counselor Remarks",
  "Senior Remarks",
  "Next FollowUP Date"
];

function doPost(e) {
  try {
    logLeadEvent_("doPost received", {
      postType: e && e.postData && e.postData.type,
      postLength: e && e.postData && e.postData.contents ? e.postData.contents.length : 0,
      parameterKeys: e && e.parameter ? Object.keys(e.parameter).join(", ") : ""
    });

    const sheet = getLeadsSheet_();
    setupLeadHeaders_(sheet);

    const leads = parseLeadRequest_(e);
    logLeadEvent_("parsed leads", {
      isArray: Array.isArray(leads),
      count: Array.isArray(leads) ? leads.length : 0,
      firstSubmissionId: Array.isArray(leads) && leads[0] ? leads[0].submissionId || "" : ""
    });

    if (!Array.isArray(leads) || leads.length === 0) {
      return json_({
        status: "error",
        message: "No lead data received."
      });
    }

    const now = new Date();
    const rows = leads.map(function (lead) {
      return LEADS_HEADERS.map(function (header) {
        switch (header) {
          case "Timestamp":
            return now;
          case "Counselor Name":
            return value_(lead.counselorName);
          case "Student Name":
            return value_(lead.studentName);
          case "Number":
            return value_(lead.number);
          case "Institute":
            return value_(lead.institute);
          case "Stream":
            return value_(lead.stream);
          case "Course Level":
            return value_(lead.courseLevel || lead.courseType);
          case "Course Name":
            return value_(lead.courseName || lead.course);
          case "Tag":
            return value_(lead.tag);
          case "Senior Support":
            return value_(lead.seniorSupport);
          case "Senior Name":
            return value_(lead.seniorName);
          case "Follow Up Date":
            return value_(lead.followUpDate);
          case "Follow Up Time":
            return value_(lead.followUpTime);
          case "Follow Up":
            return value_(lead.followUp);
          case "Counselor Remarks":
            return value_(lead.counselorRemarks || lead.remarks);
          case "Senior Remarks":
            return "";
          case "Next FollowUP Date":
            return value_(lead.nextFollowUpDate);
          default:
            return "";
        }
      });
    });

    sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, LEADS_HEADERS.length).setValues(rows);
    logLeadEvent_("rows appended", {
      rowsAdded: rows.length,
      lastRow: sheet.getLastRow()
    });

    return json_({
      status: "success",
      message: "Leads saved successfully.",
      rowsAdded: rows.length
    });
  } catch (error) {
    logLeadEvent_("doPost error", {
      message: error.toString(),
      stack: error.stack || ""
    });

    return json_({
      status: "error",
      message: error.toString()
    });
  }
}

function doGet(e) {
  const params = (e && e.parameter) || {};

  if (params.action === "debugAppend") {
    const sheet = getLeadsSheet_();
    setupLeadHeaders_(sheet);

    sheet.appendRow([
      new Date(),
      "DEBUG COUNSELOR",
      "DEBUG STUDENT",
      "9999999999",
      "DEBUG INSTITUTE",
      "DEBUG STREAM",
      "DEBUG LEVEL",
      "DEBUG COURSE",
      "DEBUG TAG",
      "No",
      "",
      "",
      "",
      "",
      "Debug append from doGet",
      "",
      ""
    ]);

    logLeadEvent_("debug append", {
      lastRow: sheet.getLastRow()
    });

    return json_({
      status: "success",
      message: "Debug row appended.",
      sheetName: LEADS_SHEET_NAME,
      lastRow: sheet.getLastRow()
    }, params.callback);
  }

  if (params.action === "checkLeadSubmission") {
    return json_({
      status: "success",
      submitted: hasSubmission_(params.submissionId),
      submissionId: params.submissionId || ""
    }, params.callback);
  }

  return json_({
    status: "success",
    message: "Counselor leads API running."
  }, params.callback);
}

function getLeadsSheet_() {
  const spreadsheet = getSpreadsheet_();
  return spreadsheet.getSheetByName(LEADS_SHEET_NAME) || spreadsheet.insertSheet(LEADS_SHEET_NAME);
}

function getSpreadsheet_() {
  const configuredId = LEADS_SPREADSHEET_ID === "PASTE_YOUR_SPREADSHEET_ID_HERE" ? "" : LEADS_SPREADSHEET_ID;
  const spreadsheet = configuredId
    ? SpreadsheetApp.openById(configuredId)
    : SpreadsheetApp.getActiveSpreadsheet();

  if (!spreadsheet) {
    throw new Error("Spreadsheet not found. Paste your Google Sheet ID into LEADS_SPREADSHEET_ID or bind this Apps Script project directly to the sheet.");
  }

  return spreadsheet;
}

function getLogSheet_() {
  const spreadsheet = getSpreadsheet_();
  const sheet = spreadsheet.getSheetByName(LEADS_LOG_SHEET_NAME) || spreadsheet.insertSheet(LEADS_LOG_SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp", "Event", "Details"]);
  }

  return sheet;
}

function logLeadEvent_(eventName, details) {
  try {
    getLogSheet_().appendRow([
      new Date(),
      eventName,
      JSON.stringify(details || {})
    ]);
  } catch (logError) {}
}

function setupLeadHeaders_(sheet) {
  sheet.getRange(1, 1, 1, LEADS_HEADERS.length).setValues([LEADS_HEADERS]);
}

function parseLeadRequest_(e) {
  const raw = (e && e.postData && e.postData.contents) || "";
  const params = (e && e.parameter) || {};

  if (params.payload) {
    const parsed = JSON.parse(params.payload);
    return Array.isArray(parsed) ? parsed : (parsed.leads || parsed.data || []);
  }

  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : (parsed.leads || parsed.data || []);
    } catch (jsonError) {
      const data = {};
      raw.split("&").forEach(function (part) {
        const pair = part.split("=");
        if (pair[0]) {
          data[decodeURIComponent(pair[0])] = decodeURIComponent((pair[1] || "").replace(/\+/g, " "));
        }
      });

      if (data.payload) {
        const parsed = JSON.parse(data.payload);
        return Array.isArray(parsed) ? parsed : (parsed.leads || parsed.data || []);
      }
    }
  }

  return [];
}

function value_(value) {
  return value === undefined || value === null ? "" : String(value).trim();
}

function hasSubmission_(submissionId) {
  submissionId = value_(submissionId);
  if (!submissionId) return false;

  const sheet = getLeadsSheet_();
  setupLeadHeaders_(sheet);

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const submissionIdColumn = headers.indexOf("Submission ID") + 1 || headers.indexOf("SubmissionID") + 1;

  if (!submissionIdColumn || sheet.getLastRow() < 2) {
    return false;
  }

  const values = sheet.getRange(2, submissionIdColumn, sheet.getLastRow() - 1, 1).getValues();
  return values.some(function (row) {
    return value_(row[0]) === submissionId;
  });
}

function json_(obj, callback) {
  const output = callback
    ? String(callback).replace(/[^\w.$]/g, "") + "(" + JSON.stringify(obj) + ");"
    : JSON.stringify(obj);

  return ContentService
    .createTextOutput(output)
    .setMimeType(callback ? ContentService.MimeType.JAVASCRIPT : ContentService.MimeType.JSON);
}
