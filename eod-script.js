const openEodBtn = document.getElementById("openEodBtn");
const eodPage = document.getElementById("eodPage");
const closeEodBtn = document.getElementById("closeEodBtn");
const submitEodBtn = document.getElementById("submitEodBtn");
const eodCounselorName = document.getElementById("eodCounselorName");
const eodDialledNumber = document.getElementById("totalDialledNumber");
const eodConnectedCall = document.getElementById("totalConnectedCall");
const eodTalkTime = document.getElementById("totalTalkTime");
const eodAvgDuration = document.getElementById("avgCallDuration");
const eodTotalLeads = document.getElementById("totalLeads");
const eodFileUpload = document.getElementById("eodFileUpload");
const eodFileName = document.getElementById("eodFileName");
const eodSubmitLoader = document.getElementById("submitLoader");
const eodCustomAlert = document.getElementById("customAlert");
const eodAlertMessage = document.getElementById("alertMessage");
const eodCloseAlert = document.getElementById("closeAlert");
const eodAlertTitle = eodCustomAlert?.querySelector("h2");
const eodAlertIcon = eodCustomAlert?.querySelector(".alert-icon");
const eodHalfNotice = document.getElementById("eodHalfNotice");
let eodHalfAccepted = false;

const eodCounselorNames = [
  "Anuska Sarkar",
  "Kamalika Mukherjee",
  "Keya Das",
  "Madhuri Poddar",
  "Rajda Khatoon",
  "Ranjana Ghosh",
  "Sabana Khatun",
  "Sangeeta Dikshit",
  "Soma Aich",
  "Sumitra Saha",
  "Sunny Dey",
  "Manisha Guha",
  "Sujata Debnath",
  "Sudipa Bapari",
  "Bidisha Saha",
  "Triparna Nandy"
];

const EOD_SHEET_URL = "https://script.google.com/macros/s/AKfycbz0w3LRBniy_3uomF-lWcAmyORfj4Locu4vdoY7u_cbRYpdjPZCW0CQRiF9PczLUcv0/exec";
const EOD_DRIVE_FOLDER_ID = "1RT6BDmKamJDdBpdf_bdFEPeiCnLbnCl8";
const EOD_SHEET_COLUMN_ORDER = [
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
const EOD_POST_FIELD_ORDER = [
  "counselorName",
  "totalDialledNumber",
  "totalConnectedCall",
  "totalTalkTime",
  "avgCallDuration",
  "totalLeads",
  "halfShift",
  "fileName",
  "fileSize",
  "fileType",
  "fileContentBase64",
  "driveFolderId"
];

let isEodSubmitting = false;
let isSubmitLockedForToday = false;
const ALREADY_SUBMITTED_MESSAGE = "You already submitted your report today, bestie ✨";

function updateEodNote() {
  const noteEl = document.getElementById("eodNote");
  if (!noteEl || !submitEodBtn) return;

  if (isSubmitLockedForToday) {
    noteEl.textContent = ALREADY_SUBMITTED_MESSAGE;
    submitEodBtn.classList.add("disabled");
    submitEodBtn.setAttribute("title", ALREADY_SUBMITTED_MESSAGE);
    submitEodBtn.setAttribute("aria-disabled", "true");
  } else {
    noteEl.textContent = "One-and-done — drop your EOD once a day";
    submitEodBtn.classList.remove("disabled");
    submitEodBtn.removeAttribute("title");
    submitEodBtn.setAttribute("aria-disabled", "false");
  }
}

function getLocalDateKey() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      const base64 = result.includes(",") ? result.split(",")[1] : result;
      resolve(base64 || "");
    };
    reader.onerror = () => {
      reject(new Error("Failed to read file for upload."));
    };
    reader.readAsDataURL(file);
  });
}

async function checkSubmittedTodayFromSheet(counselorName) {
  if (!counselorName) return false;

  const dateKey = getLocalDateKey();
  const query = new URLSearchParams({
    action: "checkEodSubmission",
    sheetName: "EOD Report",
    counselorName,
    date: dateKey
  });

  try {
    const response = await fetch(`${EOD_SHEET_URL}?${query.toString()}`, {
      method: "GET",
      headers: { Accept: "application/json" }
    });

    if (!response.ok) {
      throw new Error(`Sheet check failed: ${response.status}`);
    }

    const result = await response.json();
    const alreadySubmitted =
      result?.alreadySubmitted === true ||
      result?.submitted === true ||
      result?.exists === true ||
      Number(result?.count || 0) > 0;

    return alreadySubmitted;
  } catch (error) {
    console.warn("Sheet duplicate check failed:", error);
    return false;
  }
}

async function refreshSubmitLock(counselorName, { showPopup = false } = {}) {
  if (!counselorName) {
    isSubmitLockedForToday = false;
    updateEodNote();
    return false;
  }

  isSubmitLockedForToday = await checkSubmittedTodayFromSheet(counselorName);
  updateEodNote();

  if (isSubmitLockedForToday && showPopup) {
    showAlreadySubmittedPopup();
  }

  return isSubmitLockedForToday;
}

// --- availability time check (EOD opens at 17:30 local time) ---
function isEodAllowedNow() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  // allowed if hour > 17 or hour === 17 and minutes >= 30 (17:30 = 5:30 PM)
  return hours > 17 || (hours === 17 && minutes >= 30);
}

function showEodNotYetPopup() {
  // show initial notice with a "Need help" button to request half-shift access
  const msg = "Hold on — EOD opens at 5:30 PM. Slide back then";
  setEodAlertAppearance("error");
  eodAlertTitle.textContent = "Heads up";
  eodAlertMessage.textContent = msg;

  // ensure alert is visible
  eodCustomAlert.style.display = "flex";

  // create a "Need help" button if not present
  const alertBox = eodCustomAlert.querySelector(".alert-box");
  if (!alertBox) return;

  // remove any previously injected helper buttons
  const existing = alertBox.querySelector("#eodNeedHelpBtn");
  if (!existing) {
    const needHelpBtn = document.createElement("button");
    needHelpBtn.id = "eodNeedHelpBtn";
    needHelpBtn.textContent = "Need help";
    needHelpBtn.className = "need-help-btn";
    needHelpBtn.style.marginRight = "8px";
    needHelpBtn.addEventListener("click", () => {
      showHalfShiftQuestion();
    });
    alertBox.appendChild(needHelpBtn);
  }

  // wire close button to just hide
  eodCloseAlert.onclick = () => {
    // remove helper button when closing
    const btn = alertBox.querySelector("#eodNeedHelpBtn");
    if (btn) btn.remove();
    hideEodAlert();
  };
}

function showHalfShiftQuestion() {
  // ask if user is on half shift; Gen Z phrasing
  const q = "On a half shift? Say 'Yeah' to submit early — we'll mark it.";
  setEodAlertAppearance("error");
  eodAlertTitle.textContent = "Quick Question";
  eodAlertMessage.textContent = q;

  const alertBox = eodCustomAlert.querySelector(".alert-box");
  if (!alertBox) return;

  // remove Need help button if present
  const needBtn = alertBox.querySelector("#eodNeedHelpBtn");
  if (needBtn) needBtn.remove();

  // create Yes and No buttons
  // remove any existing helper buttons first
  const existingYes = alertBox.querySelector("#eodHalfYes");
  if (existingYes) existingYes.remove();
  const existingNo = alertBox.querySelector("#eodHalfNo");
  if (existingNo) existingNo.remove();

  const yesBtn = document.createElement("button");
  yesBtn.id = "eodHalfYes";
  yesBtn.textContent = "Yeah";
  yesBtn.className = "yes-btn";
  yesBtn.style.marginRight = "8px";
  yesBtn.addEventListener("click", () => {
    // allow early access
    eodHalfAccepted = true;
    // cleanup and open modal
    hideEodAlert();
    showEodModal(true);
  });

  const noBtn = document.createElement("button");
  noBtn.id = "eodHalfNo";
  noBtn.textContent = "Nope";
  noBtn.className = "no-btn";
  noBtn.addEventListener("click", () => {
    // just close the prompt
    hideEodAlert();
  });

  alertBox.appendChild(yesBtn);
  alertBox.appendChild(noBtn);
}

function showAlreadySubmittedPopup() {
  const msg = ALREADY_SUBMITTED_MESSAGE;
  showEodAlert(msg, "error");
  setTimeout(() => {
    hideEodAlert();
  }, 2200);
}

function showEodModal(half = false) {
  if (!eodPage) return;

  eodHalfAccepted = !!half;
  if (eodHalfAccepted && eodHalfNotice) {
    eodHalfNotice.style.display = "block";
  } else if (eodHalfNotice) {
    eodHalfNotice.style.display = "none";
  }

  const counselorSelect = document.getElementById("counselorName");
  if (eodCounselorName) {
    eodCounselorName.value = counselorSelect?.value || "";
  }
  if (eodFileUpload) {
    eodFileUpload.value = "";
  }
  if (eodFileName) {
    eodFileName.textContent = "No file selected";
  }

  eodPage.style.display = "flex";
  eodPage.setAttribute("aria-hidden", "false");
  void refreshSubmitLock(eodCounselorName?.value?.trim() || "");
}


function setEodAlertAppearance(type) {
  if (!eodCustomAlert || !eodAlertTitle || !eodAlertIcon) return;

  const isSuccess = type === "success";
  eodCustomAlert.classList.toggle("eod-success", isSuccess);
  eodAlertTitle.textContent = isSuccess ? "Success" : "Error";
  eodAlertIcon.textContent = isSuccess ? "✓" : "!";
  eodAlertIcon.style.background = isSuccess ? "#dcfce7" : "#fee2e2";
  eodAlertIcon.style.color = isSuccess ? "#15803d" : "#dc2626";
}

function showEodAlert(message, type = "error") {
  if (!eodCustomAlert || !eodAlertMessage) return;
  setEodAlertAppearance(type);
  eodAlertMessage.textContent = message;
  eodCustomAlert.style.display = "flex";
}

function showEodLoader() {
  if (eodSubmitLoader) {
    eodSubmitLoader.style.display = "flex";
  }
}

function hideEodLoader() {
  if (eodSubmitLoader) {
    eodSubmitLoader.style.display = "none";
  }
}

function openEodReport() {
  if (!eodPage) return;

  // block opening before allowed time
  if (!isEodAllowedNow()) {
    showEodNotYetPopup();
    return;
  }
  showEodModal(false);
}

function closeEodReport() {
  if (!eodPage) return;

  eodPage.style.display = "none";
  eodPage.setAttribute("aria-hidden", "true");
  // reset half-shift state when closing
  eodHalfAccepted = false;
  if (eodHalfNotice) eodHalfNotice.style.display = "none";
}

function hideEodAlert() {
  if (!eodCustomAlert) return;
  // cleanup helper buttons if any
  const alertBox = eodCustomAlert.querySelector(".alert-box");
  if (alertBox) {
    const helperIds = ["eodNeedHelpBtn", "eodHalfYes", "eodHalfNo"];
    helperIds.forEach((id) => {
      const b = alertBox.querySelector(`#${id}`);
      if (b) b.remove();
    });
  }
  eodCustomAlert.style.display = "none";
  setEodAlertAppearance("error");
}

function populateEodCounselors() {
  if (!eodCounselorName) return;

  eodCounselorName.innerHTML = `
    <option value="">Select Counselor</option>
    ${eodCounselorNames.map((name) => `<option>${name}</option>`).join("")}
  `;
}

function syncEodFileName() {
  if (!eodFileName || !eodFileUpload) return;

  const selectedFile = eodFileUpload.files?.[0];
  eodFileName.textContent = selectedFile ? selectedFile.name : "No file selected";
}

async function submitEodReport() {
  if (isEodSubmitting) {
    return;
  }

  if (!eodCounselorName || !eodDialledNumber || !eodConnectedCall || !eodTalkTime || !eodAvgDuration || !eodTotalLeads || !eodFileUpload) {
    return;
  }

  const counselorName = eodCounselorName.value.trim();
  const totalDialledNumber = eodDialledNumber.value.trim();
  const totalConnectedCall = eodConnectedCall.value.trim();
  const totalTalkTime = eodTalkTime.value.trim();
  const avgCallDuration = eodAvgDuration.value.trim();
  const totalLeads = eodTotalLeads.value.trim();
  const file = eodFileUpload.files?.[0] || null;

  const isLocked = await refreshSubmitLock(counselorName, { showPopup: false });
  if (isLocked) {
    return;
  }

  if (!counselorName || !totalDialledNumber || !totalConnectedCall || !totalTalkTime || !avgCallDuration || !totalLeads || !file) {
    showEodAlert("Please fill all EOD report fields and upload a file.");
    return;
  }

  // Keep payload safe for Apps Script limits.
  if (file.size > 8 * 1024 * 1024) {
    showEodAlert("File is too large. Please upload a file under 8 MB.");
    return;
  }

  isEodSubmitting = true;
  submitEodBtn?.setAttribute("disabled", "true");
  submitEodBtn?.classList.add("btn-clicked");

  try {
    showEodLoader();

    const minimumLoaderTime = new Promise((resolve) => setTimeout(resolve, 650));

    const fileContentBase64 = await readFileAsBase64(file);

    const formPayload = {
      counselorName,
      totalDialledNumber,
      totalConnectedCall,
      totalTalkTime,
      avgCallDuration,
      totalLeads,
      halfShift: eodHalfAccepted ? "true" : "false",
      fileName: file.name,
      fileSize: String(file.size),
      fileType: file.type || "",
      fileContentBase64,
      driveFolderId: EOD_DRIVE_FOLDER_ID
    };

    const debugPayload = EOD_POST_FIELD_ORDER.reduce((debugData, fieldName) => {
      debugData[fieldName] = formPayload[fieldName];
      return debugData;
    }, {});
    debugPayload.fileContentBase64 = `[base64 omitted, ${fileContentBase64.length} chars]`;
    console.log("EOD final payload before submit:", {
      sheetColumnOrder: EOD_SHEET_COLUMN_ORDER,
      postFieldOrder: EOD_POST_FIELD_ORDER,
      payload: debugPayload
    });

    const requestBody = new URLSearchParams();
    EOD_POST_FIELD_ORDER.forEach((fieldName) => {
      requestBody.append(fieldName, formPayload[fieldName] ?? "");
    });

    const response = await fetch(EOD_SHEET_URL, {
      method: "POST",
      body: requestBody
    });

    const responseText = await response.text();
    let result = {};
    try {
      result = responseText ? JSON.parse(responseText) : {};
    } catch (parseError) {
      throw new Error(`Unexpected EOD response: ${responseText || response.status}`);
    }

    console.log("EOD Apps Script response:", result);

    if (!response.ok || result.status === "error") {
      throw new Error(result.message || `EOD submit failed with status ${response.status}`);
    }

    await minimumLoaderTime;

    // lock current UI after successful submit
    isSubmitLockedForToday = true;
    updateEodNote();

    closeEodReport();
    showEodAlert("EOD report submitted successfully.", "success");
    setTimeout(() => {
      hideEodAlert();
    }, 1800);

    if (eodCounselorName) eodCounselorName.value = "";
    if (eodDialledNumber) eodDialledNumber.value = "";
    if (eodConnectedCall) eodConnectedCall.value = "";
    if (eodTalkTime) eodTalkTime.value = "";
    if (eodAvgDuration) eodAvgDuration.value = "";
    if (eodTotalLeads) eodTotalLeads.value = "";
    if (eodFileUpload) eodFileUpload.value = "";
    if (eodFileName) eodFileName.textContent = "No file selected";
  } catch (error) {
    console.error("EOD submit error:", error);
    showEodAlert("Failed to submit the EOD report.");
  } finally {
    hideEodLoader();
    isEodSubmitting = false;
    submitEodBtn?.removeAttribute("disabled");
    submitEodBtn?.classList.remove("btn-clicked");
  }
}

populateEodCounselors();

openEodBtn?.addEventListener("click", openEodReport);
closeEodBtn?.addEventListener("click", closeEodReport);
eodPage?.addEventListener("click", (event) => {
  if (event.target === eodPage) {
    closeEodReport();
  }
});

eodFileUpload?.addEventListener("change", syncEodFileName);
submitEodBtn?.addEventListener("click", submitEodReport);
submitEodBtn?.addEventListener("mouseenter", () => {
  if (isSubmitLockedForToday) {
    submitEodBtn.setAttribute("title", ALREADY_SUBMITTED_MESSAGE);
  }
});

eodCloseAlert?.addEventListener("click", () => {
  hideEodAlert();
});
eodCounselorName?.addEventListener("change", () => {
  void refreshSubmitLock(eodCounselorName?.value?.trim() || "");
});

// initial note state
updateEodNote();

