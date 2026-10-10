const generateBtn = document.getElementById("generateBtn");
const leadsContainer = document.getElementById("leadsContainer");
const submitBtn = document.getElementById("submitBtn");
const customAlert = document.getElementById("customAlert");
const alertMessage = document.getElementById("alertMessage");
const closeAlert = document.getElementById("closeAlert");
const submitLoader = document.getElementById("submitLoader");

const mainPage = document.getElementById("mainPage");
const summaryPage = document.getElementById("summaryPage");
const summaryCounselor = document.getElementById("summaryCounselor");
let isSubmitting = false;
const LEADS_SHEET_URL = "https://script.google.com/macros/s/AKfycbxFCvuJg-1s2OtnoNq-BgogG_1nt7CyRPF2RT81gHJw6ZSTHhTUV21mXDmhVZuolv87/exec";
const buttonTapSelector = [
  "#generateBtn",
  "#submitBtn",
  "#openEodBtn",
  "#backBtn",
  "#closeEodBtn",
  "#submitEodBtn",
  "#closeAlert",
  ".alert-box button",
  ".submit-btn",
  ".eod-btn",
  ".back-btn",
  ".btn",
  'input[type="button"]',
  'input[type="submit"]'
].join(",");
let activeTapButton = null;

function getAnimatedButton(event) {
  const target = event.target.closest?.(buttonTapSelector);
  if (!target || target.disabled || target.getAttribute("aria-disabled") === "true") {
    return null;
  }
  return target;
}

function pressAnimatedButton(button) {
  button.classList.remove("ios-tap-pop");
  button.classList.add("is-ios-pressing");
}

function releaseAnimatedButton(button) {
  if (!button) return;

  button.classList.remove("is-ios-pressing", "ios-tap-pop");
  void button.offsetWidth;
  button.classList.add("ios-tap-pop");
}

document.addEventListener("pointerdown", (event) => {
  const button = getAnimatedButton(event);
  if (!button) return;

  activeTapButton = button;
  pressAnimatedButton(button);
}, { passive: true });

document.addEventListener("pointerup", () => {
  releaseAnimatedButton(activeTapButton);
  activeTapButton = null;
}, { passive: true });

document.addEventListener("pointercancel", () => {
  if (activeTapButton) activeTapButton.classList.remove("is-ios-pressing");
  activeTapButton = null;
}, { passive: true });

document.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;

  const button = getAnimatedButton(event);
  if (!button || button.classList.contains("is-ios-pressing")) return;

  pressAnimatedButton(button);
});

document.addEventListener("keyup", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;

  releaseAnimatedButton(getAnimatedButton(event));
});

document.addEventListener("click", (event) => {
  if (event.detail !== 0) return;

  releaseAnimatedButton(getAnimatedButton(event));
});

document.addEventListener("animationend", (event) => {
  if (event.target.classList?.contains("ios-tap-pop")) {
    event.target.classList.remove("ios-tap-pop");
  }
});

// COMPREHENSIVE INSTITUTE DATA - ALL COLLEGES
const instituteData = {
  "VPCE UNDER JNMS": {
    streams: ["Pharmacy"],
    courses: {
      "Pharmacy": {
        ug: ["B.PHARM"],
        pg: [],
        diploma: ["D.PHARM"]
      }
    }
  },
  "VPI UNDER JNMS": { streams: ["BMLS"], courses: { "BMLS": { ug: ["BMLS"], pg: [] } } },
  "KNI UNDER JNMS": { streams: ["B.SC NURSING", "GNM NURSING"], courses: { "B.SC NURSING": { ug: ["B.SC NURSING"], pg: [] }, "GNM NURSING": { ug: ["GNM NURSING"], pg: [] } } },
  "M.R. Institute of Nursing": { streams: ["B.SC NURSING", "GNM NURSING"], courses: { "B.SC NURSING": { ug: ["B.SC NURSING"], pg: [] }, "GNM NURSING": { ug: ["GNM NURSING"], pg: [] } } },
  "Mother Teresa Institute of Nursing": { streams: ["B.Sc Nursing", "GNM NURSING"], courses: { "B.Sc Nursing": { ug: ["B.Sc Nursing"], pg: [] }, "GNM NURSING": { ug: ["GNM NURSING"], pg: [] } } },
  "Mother Mary Institute of Nursing": { streams: ["B.Sc Nursing", "GNM NURSING"], courses: { "B.Sc Nursing": { ug: ["B.Sc Nursing"], pg: [] }, "GNM NURSING": { ug: ["GNM NURSING"], pg: [] } } },
  "Mother Rijiya Institute of Nursing": { streams: ["B.Sc Nursing", "GNM NURSING"], courses: { "B.Sc Nursing": { ug: ["B.Sc Nursing"], pg: [] }, "GNM NURSING": { ug: ["GNM NURSING"], pg: [] } } },
"M.R. College of Pharmaceutical Sciences & Research": {
  streams: ["Pharmacy"],
  courses: {
    "Pharmacy": {
      ug: [
        "B.Pharm (Joint)",
        "B.Pharm (Not Joint)",
        "B.Pharm (L)"
      ],
      pg: [],
      diploma: [
        "D.Pharm"
      ]
    }
  }
},
  "Sahajpath College of Pharmacy": { streams: ["Pharmacy"], courses: { "Pharmacy": { ug: [], pg: [], diploma:["D.Pharm"] } } },
"Mother Teresa Institute of Pharmacy": {
  streams: ["Pharmacy"],
  courses: {
    "Pharmacy": {
      ug: [],
      pg: [],
      diploma: ["D.Pharm"]
    }
  }
},
  "Eminent College of Management and Technology": { streams: ["BHM", "BBA", "BCA", "BMLS", "B.Optometry"], courses: { "BHM": { ug: ["BHM"], pg: [] }, "BBA": { ug: ["BBA"], pg: [] }, "BCA": { ug: ["BCA"], pg: [] }, "BMLS": { ug: ["BMLS"], pg: [] }, "B.Optometry": { ug: ["B.Optometry"], pg: [] } } },
  "Eminent College of Pharmaceutical Technology": { streams: ["B.Pharm"], courses: { "B.Pharm": { ug: ["B.Pharm"], pg: [] } } },
  "SWAMI VIVEKANANDA UNIVERSITY": {
  streams: [
    "Health Science",
    "Engineering",
    "Management",
    "Bio Science",
    "Hospitality, Hotel and Culinary Art",
    "Legal Studies"
  ],

  courses: {

    "Health Science": {
      ug: [
        "B.Sc (H) Clinical Nutrition & Dietetics",
        "B.Sc (H) Psychology",
        "B.Optometry",
        "Bachelor of Physiotherapy",
        "BMRIT",
        "BMLS",
        "B.Sc Anesthesia"
      ],

      pg: [
        "Master of Physiotherapy",
        "M.Sc Applied Psychology",
        "M.Sc Food & Nutrition"
      ],

      diploma: []
    },

    "Engineering": {
      ug: [
        "BCA",
        "B.Tech in CSE",
        "B.Tech in CSE AIML",
        "B.Tech in CSE Data Science",
        "B.Tech in CSE Gaming",
        "B.Tech in EE",
        "B.Tech in ECE",
        "B.Tech in ME",
        "B.Tech in CE",
        "B.Tech in Cyber Security",
        "BCA in Cyber Security",

        "B.Tech in CSE (L)",
        "B.Tech in ECE (L)",
        "B.Tech in EE (L)",
        "B.Tech in ME (L)",
        "B.Tech in CE (L)"
      ],

      pg: [
        "MCA",
        "M.Tech in CSE",
        "M.Tech in EE",
        "M.Tech in ME",
        "M.Tech in CE"
      ],

      diploma: [
        "Diploma in EE",
        "Diploma in ME",
        "Diploma in Computer Science & Technology (L)",
        "Diploma in EE (L)",
        "Diploma in ME (L)"
      ]
    },

    "Bio Science": {
      ug: [
        "Agriculture",
        "Biotechnology",
        "Microbiology",
        "B.Sc"
      ],

      pg: [
        "M.Sc",
        "M.Sc Animation"
      ],

      diploma: []
    },

    "Management": {
      ug: [
        "BBA",
        "BBA Digital Marketing"
      ],

      pg: [
        "MBA",
        "MBA Hospital Management"
      ],

      diploma: []
    },

    "Hospitality, Hotel and Culinary Art": {
      ug: [
        "BHM (Hospital Management)",
        "BHM (Hotel Management)"
      ],

      pg: [],

      diploma: []
    },

    "Legal Studies": {
      ug: [
        "BA LLB (H)",
        "BBA LLB (H)",
        "LLB (H)",
        "BA.(H)"
      ],

      pg: [
        "MA"
      ],

      diploma: []
    }

  }
},
"ADAMAS UNIVERSITY": {
  streams: [

    "Bio Science",
    "Engineering",
    "Management",
    "Health Science",
    "Pharmacy",
    "Legal Studies",
    "General"
    
  ],

  courses: {

    "Bio Science": {
      ug: [
        "B.Sc Chemistry",
        "B.Sc Environmental Science",
        "B.Sc Forensic Science",
        "B.Sc Geography",
        "B.Sc Physics",
        "B.Sc Applied Statistics",
        "B.Sc Mathematics and Computing",
        "B.Sc Biotechnology",
        "B.Sc Microbiology",
        "B.Sc Psychology",
        "B.Sc Nutrition & Dietetics",
        "B. Sc (H)"
      ],

      pg: [
        "M.Sc Chemistry",
        "M.Sc Physics",
        "M.Sc Geography",
        "M.Sc Biotechnology",
        "M.Sc Microbiology",
        "M.Sc Psychology",
        "M.ScTech"
      ],

      diploma: []
    },

    "Engineering": {
      ug: [
        "B.Tech in Biomedical Engineering",
        "B.Tech in CE",
        "B.Tech in CSE",
        "B.Tech in CSE & Business Systems",
        "B.Tech in CSE AI & ML",
        "B.Tech in CSE Data Science",
        "B.Tech in CSE Cyber Security",
        "B.Tech in CSE Cloud Computing",
        "B.Tech in CSE IoT",
        "B.Tech in EE",
        "B.Tech in ECE",
        "B.Tech in ME",
        "BCA"
      ],

      pg: [
        "M.Tech",
        "M.Tech in Structural Engineering",
        "MCA"
      ],

      diploma: []
    },

    "Management": {
      ug: [
        "B.Com",
        "BBA"
      ],

      pg: [
        "MBA",
        "MBA Business Analytics",
        "MBA HR",
        "MBA Marketing"
      ],

      diploma: []
    },
    // "General":{
    //   ug:[]
    // },

    "Health Science": {
      ug: [
        "BMLS",
        "B.Optometry"
      ],

      pg: [
        "Post-Graduate Diploma in Nuclear Medicine Technology",
        "Post-M.Sc Diploma in Medical Physics"
      ],

      diploma: []
    },

    "Pharmacy": {
      ug: [
        "B.Pharm"
      ],

      pg: [
        "M.Pharm Pharmaceutics",
        "M.Pharm Pharmacology"
      ],

      diploma: [
        "D.Pharm"
      ]
    },

    "Legal Studies": {
      ug: [
        "BA. LLB (H)",
        "BBA. LLB (H)"
      ],

      pg: [
        "LLM"
      ],

      diploma: []
    },

    "General": {
      ug: [
        "BA",
        "BA Psychology",
        "BA (English Language and Literature)",
        "BA (History)",
        "BA (Political Science & International Relations)",
        "BA (Public Administration & Governance)",
        "BA (Sociology)"
      ],

      pg: [
        "MA",
        "MA Psychology",
        "MA (Bengali Language and Literature)",
        "MA (English Language and Literature)",
        "MA (History)",
        "MA (Political Science & International Relations)"
      ],

      diploma: []
    }

  }
},
"BRAINWARE UNIVERSITY": {
  streams: [
    "Diploma in CSE",
    "Diploma in EE",
    "Diploma in ME",
    "Diploma in Medical Laboratory Science (DMLS)",
    "Diploma in CSE (L)",
    "Diploma in EE (L)",
    "Diploma in ME (L)",

    "B.Tech in CSE",
    "B.Tech in Biotechnology",

    "B.Optometry",
    "Bachelor of Physician Associate",
    "Bachelor of Physiotherapy",
    "Bachelor in Anaesthesia & Operation Theatre Technology",

    "B.Sc (H)",
    "Animation & Multimedia",
    "MediaScience & Journalism",
    "B.Sc",
    "B.Sc (L)",

    "BCA (H)",
    "BBA (H)",
    "BHM (H)",

    "BBA & LLB",
    "BA & LLB",
    "LLB",

    "B.Com (H)",
    "BA",

    "B.Sc Nursing",
    "GNM",

    "M.Tech in CSE",
    "M.Tech",
    "MCA",
    "M.Sc",
    "MBA",
    "LLM",
    "MA",
    "MMLS",
    "M.Optometry",
    "M.Com"
  ],

  courses: {

    "Diploma in CSE": {
      diploma: ["Diploma in CSE"],
      ug: [],
      pg: []
    },

    "Diploma in EE": {
      diploma: ["Diploma in EE"],
      ug: [],
      pg: []
    },

    "Diploma in ME": {
      diploma: ["Diploma in ME"],
      ug: [],
      pg: []
    },

    "Diploma in Medical Laboratory Science (DMLS)": {
      diploma: ["Diploma in Medical Laboratory Science (DMLS)"],
      ug: [],
      pg: []
    },

    "Diploma in CSE (L)": {
      diploma: ["Diploma in CSE (L)"],
      ug: [],
      pg: []
    },

    "Diploma in EE (L)": {
      diploma: ["Diploma in EE (L)"],
      ug: [],
      pg: []
    },

    "Diploma in ME (L)": {
      diploma: ["Diploma in ME (L)"],
      ug: [],
      pg: []
    },

    "B.Tech in CSE": {
      diploma: [],
      ug: [
        "B.Tech in CSE",
        "B.Tech in CSE AI & ML",
        "B.Tech in CSE Data Science",
        "B.Tech in CSE AI & Robotics",
        "B.Tech in CSE Cyber Security",

        "B.Tech in CSE AI & ML (L)",
        "B.Tech in CSE Data Science (L)",
        "B.Tech in CSE AI & Robotics (L)",
        "B.Tech in CSE (L)",
        "B.Tech in CSE (L) Cyber Security"
      ],
      pg: [
        "M.Tech in CSE",
        "M.Tech in CSE AI & ML",
        "M.Tech in CSE Data Science"
      ]
    },

    "B.Tech in Cyber Security": {
      diploma: [],
      ug: [
        "B.Tech in Cyber Security"
      ],
      pg: []
    },

    "BCA in Cyber Security": {
      diploma: [],
      ug: [
        "BCA in Cyber Security"
      ],
      pg: []
    },

    "B.Tech in Biotechnology": {
      diploma: [],
      ug: [
        "B.Tech in Biotechnology",
        "B.Tech in Biotechnology (L)"
      ],
      pg: []
    },

    "B.Optometry": {
      diploma: [],
      ug: [
        "B.Optometry",
        "B.Optometry - LE"
      ],
      pg: [
        "M.Optometry"
      ]
    },

    "Bachelor of Physician Associate": {
      diploma: [],
      ug: [
        "Bachelor of Physician Associate"
      ],
      pg: []
    },

    "Bachelor of Physiotherapy": {
      diploma: [],
      ug: [
        "Bachelor of Physiotherapy",
        "Bachelor of Physiotherapy (L)"
      ],
      pg: []
    },

    "Bachelor in Anaesthesia & Operation Theatre Technology": {
      diploma: [],
      ug: [
        "Bachelor in Anaesthesia & Operation Theatre Technology"
      ],
      pg: []
    },

    "B.Sc (H)": {
      diploma: [],
      ug: [
        "B.Sc (H) Agriculture",
        "B.Sc (H) Biotechnology",
        "B.Sc (H) Food Nutrition & Dietetics",
        "B.Sc (H) Advanced Networking & Cyber Security",
        "B.Sc (H) Media Science & Journalism",
        "B.Sc (H) Animation & Multimedia",
        "B.Sc (H) Animation VFX & Gaming"
      ],
      pg: [
        "M.Sc Biotechnology",
        "M.Sc Bioinformatics",
        "M.Sc Advanced Networking & Cyber Security",
        "M.Sc Media Science & Journalism",
        "M.Sc Animation & Multimedia",
        "M.Sc Mathematics",
        "M.Sc Nutrition & Dietetics",
        "M.Sc Agriculture - Agronomy",
        "M.Sc Agriculture - Horticulture",
        "M.Sc Applied Psychology"
      ]
    },

    "Animation & Multimedia": {
      diploma: [],
      ug: [
        "B.Sc Animation & Multimedia",
        "B.Sc Animation VFX & Gaming"
      ],
      pg: [
        "M.Sc Animation & Multimedia"
      ]
    },

    "MediaScience & Journalism": {
      diploma: [],
      ug: [
        "B.Sc Media Science & Journalism",
        "B.Sc Journalism"
      ],
      pg: [
        "M.Sc Media Science & Journalism",
        "MA Journalism"
      ]
    },

    "B.Sc": {
      diploma: [],
      ug: [
        "B.Sc Critical Care Technology",
        "B.Sc Psychology"
      ],
      pg: []
    },

    "B.Sc (L)": {
      diploma: [],
      ug: [
        "B.Sc (L) Operation Theatre Technology",
        "B.Sc (L) Critical Care Technology"
      ],
      pg: []
    },

    "Pharmacy": {
      diploma: [
        "D.Pharm"
      ],
      ug: [
        "B.Pharm"
      ],
      pg: []
    },

    "BCA (H)": {
      diploma: [],
      ug: [
        "BCA (H)",
        "BCA (H) Mobile Application and Web Technologies"
      ],
      pg: [
        "MCA"
      ]
    },

    "BBA (H)": {
      diploma: [],
      ug: [
        "BBA (H)",
        "BBA (H) Business Analytics",
        "BBA (H) Digital Marketing"
      ],
      pg: [
        "MBA",
        "MBA Healthcare & Hospital Management"
      ]
    },

    "BHM (H)": {
      diploma: [],
      ug: [
        "BHM (H)"
      ],
      pg: []
    },

    "BBA & LLB": {
      diploma: [],
      ug: [
        "BBA & LLB"
      ],
      pg: []
    },

    "BA & LLB": {
      diploma: [],
      ug: [
        "BA & LLB"
      ],
      pg: []
    },

    "LLB": {
      diploma: [],
      ug: [
        "LLB"
      ],
      pg: [
        "LLM"
      ]
    },

    "B.Com (H)": {
      diploma: [],
      ug: [
        "B.Com (H) Accounts Finance & Banking"
      ],
      pg: [
        "M.Com Banking & Financial Accounting"
      ]
    },

    "BA": {
      diploma: [],
      ug: [
        "BA English"
      ],
      pg: [
        "MA English"
      ]
    },

    "B.Sc Nursing": {
      diploma: [],
      ug: [
        "B.Sc Nursing"
      ],
      pg: []
    },

    "GNM": {
      diploma: [
        "GNM"
      ],
      ug: [],
      pg: []
    },

    "M.Tech in CSE": {
      diploma: [],
      ug: [],
      pg: [
        "M.Tech in CSE",
        "M.Tech in CSE AI & ML",
        "M.Tech in CSE Data Science"
      ]
    },

    "M.Tech": {
      diploma: [],
      ug: [],
      pg: [
        "M.Tech Robotics & Automation"
      ]
    },

    "MCA": {
      diploma: [],
      ug: [],
      pg: [
        "MCA"
      ]
    },

    "M.Sc": {
      diploma: [],
      ug: [],
      pg: [
        "M.Sc Biotechnology",
        "M.Sc Bioinformatics",
        "M.Sc Advanced Networking & Cyber Security",
        "M.Sc Media Science & Journalism",
        "M.Sc Animation & Multimedia",
        "M.Sc Mathematics",
        "M.Sc Nutrition & Dietetics",
        "M.Sc Agriculture - Agronomy",
        "M.Sc Agriculture - Horticulture",
        "M.Sc Applied Psychology"
      ]
    },

    "MBA": {
      diploma: [],
      ug: [],
      pg: [
        "MBA",
        "MBA Healthcare & Hospital Management"
      ]
    },

    "LLM": {
      diploma: [],
      ug: [],
      pg: [
        "LLM"
      ]
    },

    "MA": {
      diploma: [],
      ug: [],
      pg: [
        "MA English"
      ]
    },

    "MMLS": {
      diploma: [],
      ug: [],
      pg: [
        "MMLS"
      ]
    },

    "M.Optometry": {
      diploma: [],
      ug: [],
      pg: [
        "M.Optometry"
      ]
    },

    "M.Com": {
      diploma: [],
      ug: [],
      pg: [
        "M.Com Banking & Financial Accounting"
      ]
    }
  }
},
"JIS COLLEGE OF ENGINEERING": {
  streams: [
    "B.TECH",
    "B.TECH (L)",
    "BCA",
    "BBA",
    "BHM",
    "DIPLOMA",
    "DIPLOMA (L)",
    "MCA",
    "M.Tech",
    "MBA"
  ],

  courses: {

    "B.TECH": {
      ug: [
        "B.TECH AGRICULTURAL ENGINEERING",
        "B.TECH BIO MEDICAL ENGINEERING",
        "B.TECH IN CE",
        "B.TECH IN CSE",
        "B.TECH IN CSE - AI & ML",
        "B.TECH IN COMPUTER SCIENCE & TECHNOLOGY",
        "B.TECH IN EE",
        "B.TECH IN ECE",
        "B.TECH IN IT",
        "B.TECH IN ME"
      ],
      pg: []
    },

    "B.TECH (L)": {
      ug: [
        "B.TECH IN AGRICULTURAL ENGINEERING (L)",
        "B.TECH IN BIO MEDICAL ENGINEERING (L)",
        "B.TECH IN CE (L)",
        "B.TECH IN CSE (L)",
        "B.TECH IN CSE (L) - AI & ML",
        "B.TECH IN COMPUTER SCIENCE & TECHNOLOGY (L)",
        "B.TECH IN EE (L)",
        "B.TECH IN ECE (L)",
        "B.TECH IN IT (L)",
        "B.TECH IN ME (L)"
      ],
      pg: []
    },

    "BCA": {
      ug: [
        "BCA"
      ],
      pg: [
        "MCA"
      ]
    },

    "BBA": {
      ug: [
        "BBA (BACHELOR OF BUSINESS ADMINISTRATION)",
        "BBA - Digital Marketing"
      ],
      pg: []
    },

    "BHM": {
      ug: [
        "BHM"
      ],
      pg: []
    },

    "DIPLOMA": {
      diploma: [
        "DIPLOMA in EE",
        "DIPLOMA in ME"
      ],
      ug: [],
      pg: []
    },

    "DIPLOMA (L)": {
      diploma: [
        "DIPLOMA in EE (L)",
        "DIPLOMA in ME (L)"
      ],
      ug: [],
      pg: []
    },

    "MCA": {
      ug: [],
      pg: [
        "MCA"
      ]
    },

    "M.Tech": {
      ug: [],
      pg: [
        "M.Tech in CSE",
        "M.Tech in EDPS",
        "M.Tech in MCNT",
        "M.Tech in ME"
      ]
    },

    "MBA": {
      ug: [],
      pg: [
        "MBA (MASTERS IN BUSINESS ADMINISTRATION)"
      ]
    }

  }
},
"JIS UNIVERSITY": {
  streams: [
    "B.Tech in CSE",
    "B.Tech in CSE (L)",
    "BCA",
    "BBA",
    "L.L.B.",
    "B.BA.-L.L.B.",
    "LLM",
    "MBA",
    "B.Sc",
    "B.Sc Agriculture",
    "BMLS",
    "M.Sc",
    "B.Pharm",
    "B.Pharm (L)",
    "D.Pharm",
    "M.Pharm",
    "M.Tech in CSE",
    "PhD"
  ],

  courses: {

    "B.Tech in CSE": {
      ug: [
        "B.Tech in CSE",
        "B.Tech in CSE (AI & ML)",
        "B.Tech in CSE (Cyber Security)",
        "B.Tech in CSE (Data Science)",
        "B.Tech in CSE (IoT)"
      ],
      pg: [
        "M.Tech in CSE"
      ]
    },

    "B.Tech in CSE (L)": {
      ug: [
        "B.Tech in CSE (L)"
      ],
      pg: []
    },

    "BCA": {
      ug: [
        "BCA (4 Years)"
      ],
      pg: []
    },

    "BBA": {
      ug: [
        "BBA (4 Years)"
      ],
      pg: []
    },

    "L.L.B.": {
      ug: [
        "L.L.B. (3 Years)"
      ],
      pg: [
        "LLM"
      ]
    },

    "B.BA.-L.L.B.": {
      ug: [
        "B.BA.-L.L.B. (5 Years)"
      ],
      pg: []
    },

    "MBA": {
      ug: [],
      pg: [
        "MBA (2 Years)",
        "MBA (Digital Marketing)"
      ]
    },

    "B.Sc": {
      ug: [
        "B.Sc in Bio-Technology & Microbiology (4 Years)",
        "B.Sc in Data Science"
      ],
      pg: [
        "M.Sc BioTechnology",
        "M.Sc Microbiology",
        "M.Sc Physics",
        "M.Sc Chemistry",
        "M.Sc Environmental Science & SD",
        "M.Sc In Remote Sensing & GIS"
      ]
    },

    "B.Sc Agriculture": {
      ug: [
        "B.Sc Agricultural Science"
      ],
      pg: []
    },

    "BMLS": {
      ug: [
        "BMLS"
      ],
      pg: []
    },

    "B.Pharm": {
      ug: [
        "B.Pharm (4 Years)"
      ],
      pg: [
        "M.Pharm"
      ]
    },

    "B.Pharm (L)": {
      ug: [
        "B.Pharm (L)"
      ],
      pg: []
    },

    "D.Pharm": {
      diploma: [
        "D.Pharm"
      ],
      ug: [],
      pg: []
    },

    "M.Tech in CSE": {
      ug: [],
      pg: [
        "M.Tech in CSE"
      ]
    },

    "PhD": {
      ug: [],
      pg: [
        "All PhD",
        "PhD in Oral & Dental Science"
      ]
    }

  }
},
"SISTER NIVEDITA UNIVERSITY (TECHNO GROUP)": {

  streams: [
    "B.Des",
    "B.Sc",
    "B.Tech",
    "BA",
    "BFA",
    "B.Com",
    "BBA",
    "BCA",
    "Law",
    "MBA",
    "M.Tech",
    "M.Sc",
    "MA",
    "MFA",
    "MCA",
    "Pharmacy",
    "Nursing",
    "Allied Health Science",
    "Certificate",
    "Foreign Language"
  ],

  courses: {

    "B.Des": {
      ug: [
        "B.Des (Honours / Honours with Research)",
        "B.Des (Interior Design) (Honours / Honours with Research)"
      ],
      pg: []
    },

    "B.Tech": {
      ug: [
        "B.Tech in CSE (Honours / Honours with Research)",
        "B.Tech in CSE - AI & ML",
        "B.Tech in CSE - Cyber Security",
        "B.Tech in CSE - Data Science",
        "B.Tech in CSE - Internet of Things",
        "B.Tech in CSE (H) (L)",
        "B.Tech in ECE (H)",
        "B.Tech in Biotechnology",
        "B.Tech in Agricultural Engineering",
        "B.Tech in Industrial Systems Engineering",
        "B.Tech in VLSI Design & Technology",
        "B.Tech (Fashion Technology)"
      ],

      pg: [
        "M.Tech in CSE",
        "M.Tech in ECE"
      ]
    },

    "B.Sc": {
      ug: [
        "B.Sc (Animation & Graphics)",
        "B.Sc (Generative AI and Design Learning)",
        "B.Sc (Visual Effects and Animation)",
        "B.Sc Biotechnology",
        "B.Sc Microbiology",
        "B.Sc Psychology",
        "B.Sc Agriculture",
        "B.Sc Food Science and Technology",
        "B.Sc Applied Nutrition & Dietetics",
        "B.Sc Applied Physics & Electronics",
        "B.Sc Chemical Science and Technology",
        "B.Sc Computational Mathematics and AI",
        "B.Sc Economics",
        "B.Sc Geo-Informatics",
        "B.Sc Critical Care Technology"
      ],

      pg: [
        "M.Sc Biotechnology",
        "M.Sc Microbiology",
        "M.Sc Applied Nutrition & Dietetics",
        "M.Sc Bioinformatics",
        "M.Sc Food Science and Technology",
        "M.Sc Medicinal Chemistry",
        "M.Sc Agriculture (Agronomy)",
        "M.Sc Applied Psychology",
        "M.Sc Economics",
        "M.Sc Animation & Graphics"
      ]
    },

    "Law": {
      ug: [
        "BA LLB (Hons)",
        "BBA LLB (Hons)",
        "B.Com LLB (Hons)",
        "LLB"
      ],

      pg: [
        "LLM (Criminal Law)",
        "LLM (Corporate Law)"
      ]
    },

    "MBA": {
      ug: [],
      pg: [
        "MBA Finance",
        "MBA Marketing",
        "MBA HR",
        "MBA Healthcare Management",
        "MBA Sports Management",
        "MBA Business Analytics",
        "Executive MBA"
      ]
    },

    "Pharmacy": {
      ug: [
        "B.Pharm",
        "B.Pharm (L)"
      ],

      diploma: [
        "D.Pharm"
      ],

      pg: []
    },

    "Nursing": {
      ug: [
        "B.Sc Nursing",
        "Post Basic B.Sc Nursing"
      ],

      pg: [
        "M.Sc Nursing"
      ],

      diploma: [
        "GNM"
      ]
    },

    "Allied Health Science": {
      ug: [
        "Bachelor in Anaesthesia & Operation Theatre Technology",
        "B.MLS",
        "BMRIT"
      ],
      pg: []
    },

    "BCA": {
      ug: [
        "BCA (Honours / Honours with Research)"
      ],

      pg: [
        "MCA"
      ]
    },

    "Foreign Language": {
      certificate: [
        "Certificate in Chinese",
        "Certificate in French",
        "Certificate in German",
        "Certificate in Japanese",
        "Certificate in Spanish"
      ],

      diploma: [
        "Diploma in Chinese",
        "Diploma in French",
        "Diploma in German",
        "Diploma in Japanese",
        "Diploma in Spanish"
      ]
    }

  }
},
  "TECHNO INDIA UNIVERSITY": { streams: ["B.Tech in CSE", "BSc", "BCA", "BBA", "BMRIT", "Bachelor of Physiotherapy", "MMLS", "MBA"], courses: { "B.Tech in CSE": { ug: ["B.Tech in CSE (H)", "B.Tech in CSE (H) AI & ML", "B.Tech in CSE (H) Data Science"], pg: [] }, "BSc": { ug: ["BSc Data Analytics and Generative AI"], pg: [] }, "BCA": { ug: ["BCA (H)"], pg: [] }, "BBA": { ug: ["BBA (H)"], pg: [] }, "MBA": { ug: [], pg: ["MBA"] } } },
  "Institute of Engineering and Management (Under UEM)": { streams: ["B.TECH", "B.TECH in CSE", "B.TECH in ECE", "B.TECH in ME", "BBA", "BCA", "BHM", "BBA LLB", "MBA", "M.TECH"], courses: { "B.TECH": { ug: ["B.TECH", "B.TECH in CSE", "B.TECH in ECE", "B.TECH in ME", "B.TECH in IT"], pg: [] }, "BBA": { ug: ["BBA"], pg: [] }, "BCA": { ug: ["BCA"], pg: [] }, "MBA": { ug: [], pg: ["MBA", "MBA GENERAL MANAGEMENT"] }, "M.TECH": { ug: [], pg: ["M.TECH in CSE", "M.TECH in CSE AI & ML", "M.TECH in ECE"] } } },
"Future Institute of Engineering & Management (FIEM)": {

  streams: [
    "B.Tech",
    "B.Tech (EWS)",
    "B.Tech (L)",
    "B.Tech (TFW)",
    "BCA",
    "BBA",
    "BMS",
    "BHM",
    "B.Sc",
    "MBA",
    "MCA",
    "MHA",
    "MMS"
  ],

  courses: {

    "B.Tech": {
      ug: [
        "B.Tech in CSE",
        "B.Tech in CSDS",
        "B.Tech in IT",
        "B.Tech in ECE",
        "B.Tech in EE",
        "B.Tech in ME"
      ],
      pg: []
    },

    "B.Tech (EWS)": {
      ug: [
        "B.Tech in CSE (EWS)",
        "B.Tech in CSDS (EWS)",
        "B.Tech in IT (EWS)",
        "B.Tech in ECE (EWS)",
        "B.Tech in EE (EWS)",
        "B.Tech in ME (EWS)"
      ],
      pg: []
    },

    "B.Tech (TFW)": {
      ug: [
        "B.Tech (TFW)"
      ],
      pg: []
    },

    "B.Tech (L)": {
      ug: [
        "B.Tech in CSE (L)",
        "B.Tech in CSDS (L)",
        "B.Tech in IT (L)",
        "B.Tech in ECE (L)",
        "B.Tech in EE (L)",
        "B.Tech in ME (L)"
      ],
      pg: []
    },

    "BCA": {
      ug: [
        "BCA"
      ],
      pg: [
        "MCA"
      ]
    },

    "BBA": {
      ug: [
        "BBA"
      ],
      pg: [
        "MBA"
      ]
    },

    "BMS": {
      ug: [
        "BMS"
      ],
      pg: [
        "MMS"
      ]
    },

    "BHM": {
      ug: [
        "BHM"
      ],
      pg: [
        "MHA"
      ]
    },

    "B.Sc": {
      ug: [
        "B.Sc Hotel & Hospitality Administration"
      ],
      pg: []
    },

    "MBA": {
      ug: [],
      pg: [
        "MBA"
      ]
    },

    "MCA": {
      ug: [],
      pg: [
        "MCA"
      ]
    },

    "MHA": {
      ug: [],
      pg: [
        "MHA"
      ]
    },

    "MMS": {
      ug: [],
      pg: [
        "MMS"
      ]
    }

  }
},
"NSHM Business School": {

  streams: [
    "BBA",
    "BHM",
    "MBA",
    "MHM",
    "Executive MBA"
  ],

  courses: {

    "BBA": {
      ug: [
        "BBA",
        "BBA Business Analytics",
        "BBA International Business",
        "BBA Entrepreneurship",
        "BBA Banking and Finance",
        "BBA Sports Management"
      ],
      pg: []
    },

    "BHM": {
      ug: [
        "BHM"
      ],
      pg: []
    },

    "MBA": {
      ug: [],
      pg: [
        "MBA Finance",
        "MBA Marketing",
        "MBA HR",
        "MBA Healthcare",
        "MBA Business Analytics",
        "MBA Securities Market"
      ]
    },

    "MHM": {
      ug: [],
      pg: [
        "MHM"
      ]
    },

    "Executive MBA": {
      ug: [],
      pg: [
        "Executive MBA"
      ]
    }

  }
},

"NSHM Institute of Health Science": {

  streams: [
    "B.PHARM",
    "B.Optometry",
    "B.Sc",
    "M.Pharm",
    "M.Optometry",
    "MPT",
    "MPH",
    "M.Sc"
  ],

  courses: {

    "B.PHARM": {
      ug: [
        "B.PHARM",
        "B.PHARM (L)"
      ],
      pg: []
    },

    "B.Optometry": {
      ug: [
        "B.Optometry"
      ],
      pg: [
        "M.Optometry"
      ]
    },

    "B.Sc": {
      ug: [
        "B.Sc Psychology",
        "B.Sc Dietetics & Nutrition"
      ],
      pg: []
    },

    "M.Pharm": {
      ug: [],
      pg: [
        "M.Pharm Pharmacology",
        "M.Pharm Pharmaceutics"
      ]
    },

    "MPT": {
      ug: [],
      pg: [
        "Master of Physiotherapy"
      ]
    },

    "MPH": {
      ug: [],
      pg: [
        "Master of Public Health"
      ]
    },

    "M.Sc": {
      ug: [],
      pg: [
        "M.Sc Clinical Psychology",
        "M.Sc Dietetics & Nutrition"
      ]
    }

  }
},

"NSHM Media School": {

  streams: ["Media Science"],

  courses: {
    "Media Science": {
      ug: ["B.Sc Media Science"],
      pg: ["M.Sc Media Science"]
    }
  }
},

"NSHM Institute of Hotel & Tourism Management": {
  streams: ["B.Sc", "BBA", "M.Sc"],

  courses: {

    "B.Sc": {
      ug: [
        "B.Sc Hospitality & Hotel Administration",
        "B.Sc Culinary Science"
      ],
      pg: []
    },

    "BBA": {
      ug: [
        "BBA Travel & Tourism Management",
        "BBA Aviation Management"
      ],
      pg: []
    },

    "M.Sc": {
      ug: [],
      pg: [
        "M.Sc Hospitality Management",
        "Master of Travel & Tourism Management"
      ]
    }

  }
},
"NSHM Institute of Computing & Analytics": {
  streams: ["B.Sc", "M.Sc"],

  courses: {

    "B.Sc": {
      ug: [
        "B.Sc Fashion Design & Management",
        "B.Sc Interior Designing",
        "B.Sc Multimedia Animation & Graphics"
      ],
      pg: []
    },

    "M.Sc": {
      ug: [],
      pg: [
        "M.Sc Animation & Graphic Design"
      ]
    }

  }
},

  "NSHM Design School": { streams: ["B.Sc", "M.Sc"], courses: { "B.Sc": { ug: ["B.Sc Fashion Design & Management", "B.Sc Interior Designing", "B.Sc Multimedia Animation & Graphics"], pg: [] }, "M.Sc": { ug: [], pg: ["M.Sc Animation & Graphic Design"] } } },

"Techno Bengal Institute Of Technology (BIT)": {

  streams: ["B.TECH", "BCA", "BBA"],

  courses: {

    "B.TECH": {
      ug: [
        "B.TECH in CSE",
        "B.TECH in ECE",
        "B.TECH in CSE AI &ML",
        "B.TECH in IT",
        "B.TECH in EE",
        "B.TECH in CSE Cyber Security",
        "B.TECH Biotechnology"
      ],
      pg: []
    },

    "BCA": {
      ug: ["BCA"],
      pg: []
    },

    "BBA": {
      ug: ["BBA"],
      pg: []
    }

  }
},
"SKF (School of Engineering & Technology)": {

  streams: [
    "B.Tech",
    "M.Tech",
    "Diploma"
  ],

  courses: {

    "B.Tech": {
      ug: [
        "B.Tech in CSE",
        "B.Tech in CSE AI & ML",
        "B.Tech in Data Science",
        "B.Tech in EE",
        "B.Tech in ME",
        "B.Tech in ECE",
        "B.Tech in CE"
      ],
      pg: []
    },

    "M.Tech": {
      ug: [],
      pg: [
        "M.Tech in CSE"
      ]
    },

    "Diploma": {
      ug: [
        "Diploma in CE",
        "Diploma in ME",
        "Diploma in EE"
      ],
      pg: []
    }

  }
},
  "SKF (School of Information Technology)": { streams: ["BCA", "MCA", "B.Sc"], courses: { "BCA": { ug: ["BCA"], pg: [] }, "MCA": { ug: [], pg: ["MCA"] }, "B.Sc": { ug: ["B.Sc Cyber Security"], pg: [] } } },

  "SKF (School of Health Science)": { streams: ["B.Optometry", "M.Optometry", "BMLS", "B.Sc"], courses: { "B.Optometry": { ug: ["B.Optometry"], pg: ["M.Optometry"] }, "BMLS": { ug: ["BMLS"], pg: [] }, "B.Sc": { ug: ["B.Sc Critical Care Technology (BCCT)"], pg: [] } } },

"SKF (School of Animation & Multimedia)": {

  streams: ["B.Sc", "M.Sc"],

  courses: {

    "B.Sc": {
      ug: [
        "B.Sc Multimedia Animation & Graphics"
      ],
      pg: []
    },

    "M.Sc": {
      ug: [],
      pg: [
        "M.Sc Animation & Graphic Design"
      ]
    }

  }
},
  "SKF (School of Hospitality)": { streams: ["B.Sc"], courses: { "B.Sc": { ug: ["B.Sc Hospitality & Hotel Administration"], pg: [] } } },
  "SKF (School of Management)": { streams: ["BBA", "BHM", "MBA"], courses: { "BBA": { ug: ["BBA"], pg: [] }, "BHM": { ug: ["BHM"], pg: [] }, "MBA": { ug: [], pg: ["MBA"] } } },

"The Seacom Group of Colleges": {

  streams: [
    "BBA",
    "BCA",
    "B.Pharm",
    "D.Pharm",
    "B.Sc",
    "M.Sc",
    "B.TECH",
    "MBA",
    "MCA"
  ],

  courses: {

    "BBA": {
      ug: [
        "BBA",
        "BBA Travel & Tourism Management",
        "BBA Aviation Hospitality Services & Management"
      ],
      pg: []
    },

    "BCA": {
      ug: [
        "BCA"
      ],
      pg: []
    },

    "B.Pharm": {
      ug: [
        "B.Pharm",
        "B.Pharm (L)"
      ],
      pg: []
    },

    "D.Pharm": {
      ug: [
        "D.Pharm"
      ],
      pg: []
    },

    "B.Sc": {
      ug: [
        "B.Sc Hospitality & Hotel Administration",
        "B.Sc Culinary Science"
      ],
      pg: []
    },

    "M.Sc": {
      ug: [],
      pg: [
        "MSc. Hospitality Management",
        "Master of Travel & Tourism Management"
      ]
    },

    "B.TECH": {
      ug: [
        "B.TECH in CSE",
        "B.TECH in CSE AI &ML",
        "B.TECH in CSE IOT",
        "B.TECH in CSE CYBER SECURITY including BLOCKCHAIN TECHNOLOGY",
        "B.TECH in CSE Data Science",
        "B.TECH in CSBS",
        "B.TECH in ME",
        "B.TECH in CE",
        "B.TECH in ECE",
        "B.TECH in EE",
        "B.TECH in IT",

        "B.Tech in CE (L)",
        "B.Tech in ME (L)",
        "B.Tech in CSE (L)",
        "B.Tech in EE (L)",
        "B.Tech in ECE (L)",
        "B.Tech in IT (L)",
        "B.Tech in CSE (L) AI & ML",
        "B.Tech in CSE (L) IOT",
        "B.Tech in CSE (L) CYBER SECURITY including BLOCKCHAIN TECHNOLOGY"
      ],
      pg: []
    },

    "MBA": {
      ug: [],
      pg: [
        "MBA"
      ]
    },

    "MCA": {
      ug: [],
      pg: [
        "MCA"
      ]
    }

  }
},

"MEGHNAD SAHA INSTITUTE of TECHNOLOGY": {

  streams: [
    "B.TECH",
    "BCA",
    "BBA",
    "BHM",
    "B.Sc",
    "DIPLOMA",
    "M.TECH",
    "MCA",
    "MBA"
  ],

  courses: {

    "B.TECH": {
      ug: [

        "B.TECH in CSE",
        "B.Tech in IT",

        "B.Tech in CSE AI &ML",
        "B.Tech in CSBS",
        "B.Tech in CSE Data Science",
        "B.Tech in CSE Cyber Security",
        "B.Tech in CSE IOT",

        "B.Tech in ECE",
        "B.Tech in AEIE",
        "B.Tech in BME",
        "B.Tech in CE",
        "B.Tech in ME",
        "B.Tech in EE",

        "B.TECH (TFW)",

        "B.Tech in CSE (L)",
        "B.Tech in IT (L)",
        "B.Tech in CSE (L) AI & ML",
        "B.TECH in CSBS (L)",
        "B.TECH in CSE (L) Data Science",
        "B.Tech in CSE (L) Cyber Security",
        "B.Tech in CSE (L) IOT",

        "B.Tech in ECE (L)",
        "B.Tech in AEIE (L)",
        "B.Tech in BME (L)",
        "B.Tech in CE (L)",
        "B.Tech in ME (L)",
        "B.Tech in EE (L)"

      ],
      pg: []
    },

    "M.TECH": {
      ug: [],
      pg: [

        "M.TECH in CSE",
        "M.Tech in ECE",
        "M.Tech in C&I",
        "M.Tech in PS",
        "M.Tech in EE",
        "M.Tech in Geo Tech"

      ]
    },

    "MCA": {
      ug: [],
      pg: [
        "MCA"
      ]
    },

    "BCA": {
      ug: [
        "BCA"
      ],
      pg: []
    },

    "BBA": {
      ug: [
        "BBA",
        "BBA Digital Marketing"
      ],
      pg: []
    },

    "BHM": {
      ug: [
        "BHM"
      ],
      pg: []
    },

    "B.Sc": {
      ug: [
        "B.Sc Cyber Security",
        "B.Sc Psychology",
        "B.Sc 3D Animation"
      ],
      pg: []
    },

    "MBA": {
      ug: [],
      pg: [
        "MBA"
      ]
    },

    "DIPLOMA": {
      ug: [

        "DIPLOMA DIRECT (EE ME CE CSE ECE EV)",
        "DIPLOMA (EE ME CE CSE ECE EV)",
        "DIPLOMA (L) (EE ME CE CSE ECE EV)",
        "DIPLOMA (TFW) (EE ME CE CSE ECE EV)"

      ],
      pg: []
    }

  }
},

"The Neotia University": {

  streams: [
    "B.Tech",
    "BCA",
    "B.Sc",
    "M.Sc",
    "M.Tech",
    "MCA",
    "Diploma",
    "Marine",
    "Agriculture",
    "Fisheries",
    "B.Pharm",
    "D.Pharm",
    "M.Pharm",
    "Allied Health Science",
    "B.Sc Nursing",
    "GNM",
    "Hotel Management",
    "Law",
    "BBA",
    "B.Com",
    "BA",
    "MBA",
    "Design",
    "Vocational"
  ],

  courses: {

    "B.Tech": {
      ug: [

        "B.Tech in CSE AI & Robotics",
        "B.Tech in CSE AI & Cyber Security",
        "B.Tech in CSE AI & Data Science",
        "B.Tech in CSE AI & ML",

        "B.Tech in CSE (L) AI & Robotics",
        "B.Tech in CSE (L) AI & Cyber Security",
        "B.Tech in CSE (L) AI & Data Science",
        "B.Tech in CSE (L) AI & ML",

        "B.Tech Marine Engineering",
        "B.Tech Marine Engineering (L)"

      ],
      pg: []
    },

    "BCA": {
      ug: [
        "BCA"
      ],
      pg: []
    },

    "M.Tech": {
      ug: [],
      pg: [
        "M.Tech AI &ML"
      ]
    },

    "MCA": {
      ug: [],
      pg: [
        "MCA"
      ]
    },

    "Diploma": {
      ug: [

        "Diploma in AI & ML",
        "Diploma in Agriculture",
        "Diploma in Nautical Science",
        "Diploma in ME",
        "Diploma in EE",

        "Diploma of Vocational in Automobile Servicing Technology",
        "Adv. Diploma of Vocational in Automobile Servicing Technology",

        "Diploma of Vocational in Healthcare",
        "Adv. Diploma of Vocational in Healthcare",

        "Diploma in Vocational of Hospitality Management",
        "Adv. Diploma in Vocational of Hospitality Management",

        "Diploma of Vocational in Electronics",
        "Adv. Diploma of Vocational in Electronics"

      ],
      pg: []
    },

    "B.Sc": {
      ug: [

        "B.Sc (Honours) / (Hons. with Research) in Biotechnology",
        "B.Sc (Honours) / (Hons. with Research) in Microbiology",

        "B.Sc Nautical Science",

        "B.Sc (Honours) Agriculture",
        "B.Sc(Honours) in Agribusiness Management",

        "B.Sc in Critical Care Technology",
        "B.Sc in Critical Care Technology (L)",

        "B.Sc in Rehabilitation Education in Neurodevelopmental Disorder",

        "B.Sc in Hospitality & Hotel Administration",
        "B.Sc in Hotel Administration & Culinary Art",

        "B.Sc In Multimedia Journalism and Media Technologies (with AI)"

      ],
      pg: [

        "M.Sc in Biotechnology",
        "M.Sc in Microbiology",

        "M.Sc Agriculture in Agronomy",
        "M.Sc Agriculture in Soil Science",
        "M.Sc Agriculture in Horticulture",
        "M.Sc Agriculture in Genetics and Plant Breeding",

        "M.Sc in Applied Psychology"

      ]
    },

    "Fisheries": {
      ug: [
        "Bachelor of Fisheries Science"
      ],
      pg: [
        "Master of Fisheries Science"
      ]
    },

    "B.Pharm": {
      ug: [
        "B.PHARM",
        "B.PHARM (L)"
      ],
      pg: []
    },

    "D.Pharm": {
      ug: [
        "D.PHARM"
      ],
      pg: []
    },

    "M.Pharm": {
      ug: [],
      pg: [

        "M.Pharm Pharmacology",
        "M.Pharm Pharmaceutics",
        "M.Pharm Pharmacognosy (Subject to Approval of PCI)",
        "M.Pharm Industrial Pharmacy (Subject to Approval of PCI)",
        "M.Pharm Pharmaceutical Analysis (Subject to Approval of PCI)"

      ]
    },

    "Allied Health Science": {
      ug: [

        "Bachelor of Physiotherapy",
        "Bachelor of Physiotherapy (L)",

        "B.Optometry",
        "B.Optometry - Lateral Entry",

        "BMLS",
        "BMLS (L)",

        "BMRIT",
        "BMRIT (L)",

        "Bachelor in Anaesthesia & Operation Theatre Technology",
        "Bachelor in Anaesthesia & Operation Theatre Technology (L)",

        "Bachelor of Psychology",
        "Bachelor of Nutrition and Dietetics (Honours)",
        "Bachelor of Nutrition and Dietetics (Honours)- Lateral Entry"

      ],
      pg: [
        "Master of Physiotherapy",
        "MHM"
      ]
    },

    "B.Sc Nursing": {
      ug: [
        "B.Sc Nursing"
      ],
      pg: []
    },

    "GNM": {
      ug: [
        "GNM"
      ],
      pg: []
    },

    "Law": {
      ug: [
        "BBA LLB (Honours)",
        "BA LLB (Honours)"
      ],
      pg: [
        "Master of Laws (LLM)"
      ]
    },

    "BBA": {
      ug: [

        "BBA (Honours)",
        "BBA (Honours) Digital Marketing",
        "BBA (Honours) Logistics & Supply Chain Management",
        "BBA (Honours) Marketing Management",
        "BBA (Honours) Fintech"

      ],
      pg: []
    },

    "B.Com": {
      ug: [
        "B.Com (Honours) Banking and Capital Market"
      ],
      pg: []
    },

    "BA": {
      ug: [
        "Bachelor of Arts (BA) and Preparation for Govt. Jobs"
      ],
      pg: []
    },

    "MBA": {
      ug: [],
      pg: [
        "MBA in Marketing / HR / Fintech",
        "MBA in Hospitality Management"
      ]
    },

    "Design": {
      ug: [
        "Bachelor of Design (B.Des.) with Spln. In Graphic Design Animation and VFX with AI | Fashion Design"
      ],
      pg: []
    },

    "Vocational": {
      ug: [

        "Bachelor of Vocational in Automobile Servicing Technology",
        "Bachelor of Vocational in Healthcare",
        "Bachelor in Vocational of Hospitality Management",
        "Bachelor of Vocational in Electronics"

      ],
      pg: []
    }

  }
},

"Institute of Leadership Entrepreneurship and Development (iLEAD)": {
  streams: [
    "BBA",
    "B.Sc",
    "BCA"
  ],

  courses: {

    "BBA": {
      ug: [
        "BBA",
        "BBA Entrepreneurship",
        "BBA Digital Marketing",
        "BBA Sports Management",
        "BBA Hospital Management",
        "BBA Travel & Tourism"
      ],
      pg: []
    },

    "B.Sc": {
      ug: [
        "B.Sc Media Science",
        "B.Sc Film & Television",
        "B.Sc Animation & Graphics",
        "B.Sc Interior Design",
        "B.Sc Fashion Design",
        "B.Sc Data Science",
        "B.Sc Cyber Security"
      ],
      pg: []
    },

    "BCA": {
      ug: [
        "BCA"
      ],
      pg: []
    }

  }
},

"BCDA College of Pharmacy & Technology Campus - 2 (BCDA Cam-2)": {
  streams: [
    "B.PHARM",
    "D.PHARM",
    "BMLS"
  ],

  courses: {

    "B.PHARM": {
      ug: [
        "B.PHARM (REGULAR)",
        "B.PHARM (TFW)",
        "B.PHARM (L)"
      ],
      pg: []
    },

    "D.PHARM": {
      ug: [
        
      ],
      pg: [],
      diploma: ["D.PHARM"]
    },

    "BMLS": {
      ug: [
        "BMLS"
      ],
      pg: []
    }

  }
},

  "IQ City UWSB Kolkata (United World)": { streams: ["BBA", "BHM", "BCA", "MBA"], courses: { "BBA": { ug: ["BBA Marketing", "BBA HR", "BBA Finance", "BBA AI"], pg: [] }, "BHM": { ug: ["BHM (Hospital Management)", "BHM (Hospitality Management)"], pg: [] }, "BCA": { ug: ["BCA"], pg: [] }, "MBA": { ug: [], pg: ["MBA Marketing", "MBA HR", "MBA Finance", "MBA Digital Marketing", "MBA Business Analytics & Data Science"] } } },
  "Eastern Institute for Integrated Learning in Management (EIILM)": { streams: ["MBA", "BBA(H)", "BCA(H)"], courses: { "MBA": { ug: [], pg: ["MBA"] }, "BBA(H)": { ug: ["BBA(H)", "BBA(H) Hospital Management", "BBA(H) Media Management", "BBA(H) Sports Management"], pg: [] }, "BCA(H)": { ug: ["BCA(H)", "BCA(H) Artificial Intelligence", "BCA(H) Machine Learing"], pg: [] } } },
  "The Institute of Education and Management (TIEM)": { streams: ["Degree", "Diploma", "Certificate"], courses: { "Degree": { ug: ["Degree in Hospitality & Tourism Management"], pg: [] }, "Diploma": { ug: ["Diploma in Hospitality Management", "Advance Diploma in Hospitality Management"], pg: [] }, "Certificate": { ug: ["Certificate Course in Hotel Operations"], pg: [] } } },
  "HALDIA INSTITUTE OF TECHNOLOGY (HIT)": { streams: ["B.TECH", "MBA", "MCA", "M.Tech"], courses: { "B.TECH": { ug: ["B.TECH", "B.TECH (L)"], pg: [] }, "MBA": { ug: [], pg: ["MBA"] }, "MCA": { ug: [], pg: ["MCA"] }, "M.Tech": { ug: [], pg: ["M.Tech in CSE", "M.Tech in ECE", "M.Tech in BT", "M.Tech in Power System", "M.Tech in Structural Engineering", "M.Tech in ME"] } } },
  "Bengal School of Technology & Management": { streams: ["B.SC", "BCA", "BBA"], courses: { "B.SC": { ug: ["B.SC Hospitality & Hotel Administration"], pg: [] }, "BCA": { ug: ["BCA"], pg: [] }, "BBA": { ug: ["BBA"], pg: [] } } },
  "Kathmandu Medical College Public Limited": { streams: ["MBBS"], courses: { "MBBS": { ug: ["MBBS"], pg: [] } } },
  "Nobel Medical College Teaching Hospital P.Ltd": { streams: ["MBBS"], courses: { "MBBS": { ug: ["MBBS"], pg: [] } } },
  "Camellia School of Engineering & Technology (Barasat)": { streams: ["B.Tech in CSE", "B.Tech in ECE", "B.Tech in ME", "B.Tech in CE", "B.Tech in EE", "B.Tech in IT"], courses: { "B.Tech in CSE": { ug: ["B.Tech in CSE", "B.Tech in CSE AI & ML", "B.Tech in CSE Data Science"], pg: [] }, "B.Tech in ME": { ug: ["B.Tech in ME"], pg: [] }, "B.Tech in CE": { ug: ["B.Tech in CE"], pg: [] }, "B.Tech in EE": { ug: ["B.Tech in EE"], pg: [] }, "B.Tech in ECE": { ug: ["B.Tech in ECE"], pg: [] }, "B.Tech in IT": { ug: ["B.Tech in IT"], pg: [] } } },
  "Camellia Institute of Engineering and Technology (Bud Bud)": { streams: ["B.Tech in CSE", "B.Tech in ECE", "B.Tech in ME", "B.Tech in CE", "B.Tech in EE", "B.Tech in IT"], courses: { "B.Tech in CSE": { ug: ["B.Tech in CSE", "B.Tech in CSE AI & ML", "B.Tech in CSE Data Science"], pg: [] }, "B.Tech in ME": { ug: ["B.Tech in ME"], pg: [] }, "B.Tech in CE": { ug: ["B.Tech in CE"], pg: [] }, "B.Tech in EE": { ug: ["B.Tech in EE"], pg: [] }, "B.Tech in ECE": { ug: ["B.Tech in ECE"], pg: [] }, "B.Tech in IT": { ug: ["B.Tech in IT"], pg: [] } } },
  "Bengal Institute of Technology & Management": { streams: ["B.Tech in CSE", "B.Tech in ECE", "B.Tech in ME", "B.Tech in CE", "B.Tech in EE", "B.Tech in IT"], courses: { "B.Tech in CSE": { ug: ["B.Tech in CSE", "B.Tech in CSE AI & ML", "B.Tech in CSE Data Science"], pg: [] }, "B.Tech in ME": { ug: ["B.Tech in ME"], pg: [] }, "B.Tech in CE": { ug: ["B.Tech in CE"], pg: [] }, "B.Tech in EE": { ug: ["B.Tech in EE"], pg: [] }, "B.Tech in ECE": { ug: ["B.Tech in ECE"], pg: [] }, "B.Tech in IT": { ug: ["B.Tech in IT"], pg: [] } } },
  // "Diploma Programs": { streams: ["Diploma in Artificial Intelligence and Machine Learning", "Diploma in Maritime Studies", "Diploma in Nautical Science", "Diploma in Agriculture", "Diploma in Mechanical Engineering", "Diploma in Electrical Engineering", "Diploma in Pharmacy"], courses: { "Diploma in Artificial Intelligence and Machine Learning": { ug: ["Diploma in Artificial Intelligence and Machine Learning"], pg: [] }, "Diploma in Maritime Studies": { ug: ["Diploma in Maritime Studies"], pg: [] }, "Diploma in Nautical Science": { ug: ["Diploma in Nautical Science"], pg: [] }, "Diploma in Agriculture": { ug: ["Diploma in Agriculture"], pg: [] }, "Diploma in Mechanical Engineering": { ug: ["Diploma in Mechanical Engineering"], pg: [] }, "Diploma in Electrical Engineering": { ug: ["Diploma in Electrical Engineering"], pg: [] }, "Diploma in Pharmacy": { ug: ["Diploma in Pharmacy"], pg: [] } } }
};

// Master streams list (from provided attachment) - used to populate the Stream dropdown
const masterStreams = [
  "Engineering",
  "Bio Science",
  "Maritime Studies",
  "Agriculture",
  "Fisheries Science",
  "Pharmacy",
  "Health Science",
  "Nursing",
  "Hospitality, Hotel and Culinary Art",
  "Legal Studies",
  "Management"
];

const courseTypeLabels = {
  ug: "UG",
  pg: "PG",
  diploma: "Diploma"
};
const NOT_DECIDED_INSTITUTE = "Not Decided Yet";

// function normalizeCourseType(sourceType, courseName) {
//   const value = (courseName || "").toLowerCase();
//   if (value.includes("diploma") || value.includes("b.voc") || value.includes("vocational") || value.includes("certificate")) {
//     return "diploma";
//   }
//   return sourceType === "pg" ? "pg" : "ug";
// }
function normalizeCourseType(sourceType, courseName) {
  if (sourceType === "diploma") {
    return "diploma";
  }

  const value = (courseName || "").toLowerCase();

  if (
    value.includes("diploma") ||
    value.includes("b.voc") ||
    value.includes("vocational") ||
    value.includes("certificate")
  ) {
    return "diploma";
  }

  return sourceType === "pg" ? "pg" : "ug";
}

function inferMasterStream(courseName, sourceStream) {
  const value = `${sourceStream} ${courseName}`.toLowerCase();

  if (/(nursing|gnm)/.test(value)) return "Nursing";
  if (/(pharm|pharmacy)/.test(value)) return "Pharmacy";
  if (/(fisheries)/.test(value)) return "Fisheries Science";
  if (/(maritime|marine|nautical)/.test(value)) return "Maritime Studies";
  if (/(agri|horticulture|agronomy|soil science|plant breeding)/.test(value)) return "Agriculture";
  if (/(llb|llm|law|legal)/.test(value)) return "Legal Studies";
  if (/(hospitality|hotel|culinary|tourism|travel|mhm|bhm)/.test(value)) return "Hospitality, Hotel and Culinary Art";
  if (/(bba|mba|management|business|b\.com|commerce|finance|marketing|hr|entrepreneur)/.test(value)) return "Management";
  if (/(physio|optometry|bmls|bmlt|bmr|anesthesia|medical|radiology|critical care|nutrition|diet|rehabilitation|mbbs|health)/.test(value)) return "Health Science";
  if (/(biotech|microbiology|biology|forensic|chemistry|physics|statistics|geography)/.test(value)) return "Bio Science";
  if (/(b\.tech|m\.tech|engineering|cse|ece|ee|me|ce|it|computer|bca|mca|ai|ml|robotics|cyber|iot|electrical|mechanical|civil)/.test(value)) return "Engineering";
  if (/(diploma)/.test(value)) return "Engineering";

  if (masterStreams.includes(sourceStream)) return sourceStream;
  return null;
}

function createCourseBuckets() {
  return {
    ug: new Map(),
    pg: new Map(),
    diploma: new Map()
  };
}

function addCoursesToBuckets(buckets, instituteName, institute) {
  Object.entries(institute.courses || {}).forEach(([sourceStream, streamData]) => {
    ["ug", "pg", "diploma"].forEach((sourceType) => {
      (streamData[sourceType] || []).forEach((courseName) => {
        const normalizedType = normalizeCourseType(sourceType, courseName);
        const streamName =
          (instituteName === "ADAMAS UNIVERSITY" && (sourceStream === "General" || sourceStream === "Bio Science")) ||
          (instituteName === "BRAINWARE UNIVERSITY" && (sourceStream === "Animation & Multimedia" || sourceStream === "MediaScience & Journalism"))
            ? sourceStream
            : inferMasterStream(courseName, sourceStream);
        if (!streamName) return;

        if (!buckets[normalizedType].has(streamName)) {
          buckets[normalizedType].set(streamName, new Set());
        }
        buckets[normalizedType].get(streamName).add(courseName);
      });
    });
  });
}

function buildCourseTypesFromBuckets(buckets) {
  return Object.entries(buckets)
    .map(([type, streamMap]) => {
      const streams = Array.from(streamMap.entries())
        .map(([stream, courses]) => ({
          stream,
          courses: Array.from(courses).sort((a, b) => a.localeCompare(b))
        }))
        .sort((a, b) => masterStreams.indexOf(a.stream) - masterStreams.indexOf(b.stream));

      return {
        type: courseTypeLabels[type],
        value: type,
        streams
      };
    })
    .filter((item) => item.streams.length > 0);
}

function buildCourseTypesForInstitutes(entries) {
  const buckets = createCourseBuckets();

  entries.forEach(([instituteName, institute]) => {
    addCoursesToBuckets(buckets, instituteName, institute);
  });

  return buildCourseTypesFromBuckets(buckets);
}

function buildAdmissionData() {
  const allInstitutes = [];

  Object.entries(instituteData).forEach(([instituteName, institute]) => {
    const courseTypes = buildCourseTypesForInstitutes([[instituteName, institute]]);

    if (courseTypes.length > 0) {
      allInstitutes.push({
        institute: instituteName,
        courseTypes
      });
    }
  });

  const notDecidedCourseTypes = buildCourseTypesForInstitutes(Object.entries(instituteData));
  if (notDecidedCourseTypes.length > 0) {
    allInstitutes.push({
      institute: NOT_DECIDED_INSTITUTE,
      courseTypes: notDecidedCourseTypes
    });
  }

  return allInstitutes;
}

const admissionData = buildAdmissionData();
const admissionDataByInstitute = new Map(admissionData.map((entry) => [entry.institute, entry]));

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getCustomInput(box, selector) {
  return box.querySelector(`${selector}-custom`);
}

function getActiveFieldElement(box, selector) {
  const customInput = getCustomInput(box, selector);
  if (customInput && customInput.style.display !== "none") {
    return customInput;
  }

  return box.querySelector(selector);
}

function setCustomInputVisibility(box, selector, isVisible, clearWhenHidden = true) {
  const customInput = getCustomInput(box, selector);
  if (!customInput) return;

  customInput.style.display = isVisible ? "block" : "none";
  customInput.required = isVisible;

  if (!isVisible && clearWhenHidden) {
    customInput.value = "";
  }
}

function appendOtherOption(selectEl) {
  if (!selectEl) return;

  const hasOther = Array.from(selectEl.options).some((option) => option.value === "others");
  if (!hasOther) {
    selectEl.insertAdjacentHTML("beforeend", '<option value="others">Others</option>');
  }
}

submitBtn.style.display = "none";

function showAlert(message) {
  const alertIcon = customAlert.querySelector(".alert-icon");
  const alertTitle = customAlert.querySelector("h2");
  if (alertIcon) {
    alertIcon.textContent = "!";
    alertIcon.style.background = "#fee2e2";
    alertIcon.style.color = "#dc2626";
  }
  if (alertTitle) {
    alertTitle.textContent = "Error";
  }
  alertMessage.innerText = message;
  customAlert.style.display = "flex";
}

function showLoader() {
  submitLoader.style.display = "flex";
  submitBtn.disabled = true;
}

function hideLoader() {
  submitLoader.style.display = "none";
  submitBtn.disabled = false;
}

function clearErrorHighlights() {
  document.querySelectorAll(".field-error").forEach((field) => {
    field.classList.remove("field-error");
  });
}

function markFieldError(element) {
  if (!element) return;
  const errorTarget = element.closest(".phone-input") || element.closest(".radio-group") || element.closest(".searchable-select") || element;
  errorTarget.classList.add("field-error");
}

function scrollToField(element) {
  if (!element) return;
  element.scrollIntoView({ behavior: "smooth", block: "center" });
  if (typeof element.focus === "function") {
    element.focus({ preventScroll: true });
  }
}

function getFieldValue(box, selector) {
  const customField = getCustomInput(box, selector);
  if (customField && customField.style.display !== "none") {
    return customField.value.trim();
  }

  const field = box.querySelector(selector);
  if (!field) return "";
  if (selector === ".institute") {
    const instituteValueField = box.querySelector(".institute-value");
    if (instituteValueField) {
      return instituteValueField.value.trim();
    }
  }
  return field.value.trim();
}

function getRadioGroup(box, prefix) {
  const groups = Array.from(box.querySelectorAll(".radio-group"));
  return groups.find((group) => group.querySelector(`input[name^="${prefix}"]`));
}

async function submitLeadsToSheet(formData) {
  const requestBody = new URLSearchParams({
    payload: JSON.stringify(formData)
  });

  await fetch(LEADS_SHEET_URL, {
    method: "POST",
    mode: "no-cors",
    body: requestBody
  });

  return { status: "sent" };
}

closeAlert.addEventListener("click", () => {
  customAlert.style.display = "none";
});

function getAllInstitutes() {
  return admissionData
    .map((entry) => entry.institute)
    .sort((a, b) => {
      if (a === NOT_DECIDED_INSTITUTE) return -1;
      if (b === NOT_DECIDED_INSTITUTE) return 1;
      return a.localeCompare(b);
    });
}

submitBtn.style.display = "none";

function showAlert(message) {
  const alertIcon = customAlert.querySelector(".alert-icon");
  const alertTitle = customAlert.querySelector("h2");
  if (alertIcon) {
    alertIcon.textContent = "!";
    alertIcon.style.background = "#fee2e2";
    alertIcon.style.color = "#dc2626";
  }
  if (alertTitle) {
    alertTitle.textContent = "Error";
  }
  alertMessage.innerText = message;
  customAlert.style.display = "flex";
}

function showLoader() {
  submitLoader.style.display = "flex";
  submitBtn.disabled = true;
}

function hideLoader() {
  submitLoader.style.display = "none";
  submitBtn.disabled = false;
}

function clearErrorHighlights() {
  document.querySelectorAll(".field-error").forEach((field) => {
    field.classList.remove("field-error");
  });
}

function markFieldError(element) {
  if (!element) return;
  const errorTarget = element.closest(".phone-input") || element.closest(".radio-group") || element;
  errorTarget.classList.add("field-error");
}

function scrollToField(element) {
  if (!element) return;
  element.scrollIntoView({ behavior: "smooth", block: "center" });
  if (typeof element.focus === "function") {
    element.focus({ preventScroll: true });
  }
}

function getFieldValue(box, selector) {
  const customField = getCustomInput(box, selector);
  if (customField && customField.style.display !== "none") {
    return customField.value.trim();
  }

  const field = box.querySelector(selector);
  if (!field) return "";
  if (selector === ".institute") {
    const instituteValueField = box.querySelector(".institute-value");
    if (instituteValueField) {
      return instituteValueField.value.trim();
    }
  }
  return field.value.trim();
}

function getRadioGroup(box, prefix) {
  const groups = Array.from(box.querySelectorAll(".radio-group"));
  return groups.find((group) => group.querySelector(`input[name^="${prefix}"]`));
}

generateBtn.addEventListener("click", () => {
  const leadCount = parseInt(document.getElementById("leadCount").value);
  leadsContainer.innerHTML = "";
  submitBtn.style.display = "none";

  if (!leadCount || leadCount <= 0) {
    showAlert("Please enter valid lead count");
    return;
  }

  const institutes = getAllInstitutes();

  for (let i = 1; i <= leadCount; i++) {
    const leadBox = document.createElement("div");
    leadBox.classList.add("lead-box");

    leadBox.innerHTML = `
      <h2>Lead ${i}</h2>

      <div class="lead-grid">

        <div class="input-group">
          <label>Name<span class="required-star">*</span></label>
          <input
            type="text"
            id="studentName"
            class="studentName"
            placeholder="Enter Student name"
            required
          />
        </div>

        <div class="input-group">
          <label>Number<span class="required-star">*</span></label>
          <div class="phone-input">
            <span>+91</span>
            <input
              type="tel"
              id="studentNumber"
              class="studentNumber"
              placeholder="Enter mobile number"
              maxlength="10"
              pattern="[0-9]{10}"
              required
            >
          </div>
        </div>

        <div class="input-group">
          <label for="institute${i}">Institute<span class="required-star">*</span></label>
          <div class="searchable-select" data-searchable-select>
            <input
              type="text"
              id="institute${i}"
              class="institute institute-search"
              placeholder="Select Institute"
              autocomplete="off"
              spellcheck="false"
              aria-autocomplete="list"
              aria-expanded="false"
            />
            <input type="hidden" class="institute-value" value="" />
            <button type="button" class="searchable-select-toggle" tabindex="-1" aria-label="Show institute options">▾</button>
            <div class="searchable-select-panel" id="instituteList${i}" role="listbox"></div>
          </div>
        </div>

        <div class="input-group">
          <label for="courseLevel${i}">Course Type<span class="required-star">*</span></label>
          <select id="courseLevel${i}" class="courseLevel" required disabled>
            <option value="">Select Course Type</option>
            <option value="ug">UG</option>
            <option value="pg">PG</option>
            <option value="diploma">Diploma</option>
          </select>
          <input type="text" id="courseLevelCustom${i}" class="courseLevel-custom" placeholder="Write course type" autocomplete="off" style="display:none;" />
          <span class="dropdown-lock-hint">Yo👀 pick the institute first</span>
        </div>

        <div class="input-group">
          <label for="stream${i}">Stream<span class="required-star">*</span></label>
          <select id="stream${i}" class="stream" required disabled>
            <option value="">Select Stream</option>
          </select>
          <input type="text" id="streamCustom${i}" class="stream-custom" placeholder="Write stream" autocomplete="off" style="display:none;" />
          <span class="dropdown-lock-hint">Bruh😭 select the course type</span>
        </div>

        <div class="input-group">
          <label for="courseName${i}">Course Name<span class="required-star">*</span></label>
          <select id="courseName${i}" class="courseName" required disabled>
            <option value="">Select Course Name</option>
          </select>
          <input type="text" id="courseNameCustom${i}" class="courseName-custom" placeholder="Write course name" autocomplete="off" style="display:none;" />
          <span class="dropdown-lock-hint">Are🚫 stream ta toh select koro</span>
        </div>

        <div class="input-group full-width">
          <label>Tag</label>
          <div class="radio-group">
            <label class="radio-card hot">
              <input type="radio" name="tag${i}" value="Hot">
              <span>Hot</span>
            </label>
            <label class="radio-card warm">
              <input type="radio" name="tag${i}" value="Warm">
              <span>Warm</span>
            </label>
            <label class="radio-card cold">
              <input type="radio" name="tag${i}" value="Cold">
              <span>Cold</span>
            </label>
          </div>
        </div>

        <div class="input-group full-width">
          <label>Have you cooked on this lead or do you need a senior to step in?<span class="required-star">*</span></label>
          <div class="radio-group">
            <label class="radio-card yes">
              <input type="radio" name="senior${i}" value="Yes" required>
              <span>Yes</span>
            </label>
            <label class="radio-card no">
              <input type="radio" name="senior${i}" value="No">
              <span>No</span>
            </label>
          </div>
        </div>

        <div class="senior-details full-width" style="display:none;">
          <div class="input-group">
            <label>Pick a Senior Counselor<span class="required-star">*</span></label>
            <select id="pickSenior${i}" class="pickSenior">
              <option value="">Select Senior</option>
              <option>Kamalika Mukherjee</option>
              <option>Sunny Dey</option>
              <option>Sangeeta Dikshit</option>
              <option>Sumitra Saha</option>
              <option>University Counselor</option>
            </select>
          </div>

          <div class="input-group">
            <label>Follow-up Date<span class="required-star">*</span></label>
            <input type="date" id="followUp${i}" class="followUp" />
          </div>

          <div class="input-group">
            <label>Follow-up Time</label>
            <input type="time" id="followUpTime${i}" class="followUpTime" />
          </div>
        </div>

        <div class="no-followup-details full-width" style="display:none;">
          <div class="input-group">
            <label>Follow-up Date<span class="required-star">*</span></label>
            <input type="date" id="followUpNoDate${i}" class="followUpNoDate" />
          </div>

          <div class="input-group">
            <label>Follow-Up<span class="required-star">*</span></label>
            <input type="text" id="followUpNo${i}" class="followUpNo" placeholder="Enter follow-up" />
          </div>
        </div>

        <div class="input-group full-width">
          <label>Remarks<span class="required-star">*</span></label>
          <textarea rows="4" placeholder="Write remarks" class="remarks"></textarea>
        </div>

      </div>
    `;

    leadsContainer.appendChild(leadBox);
    setupSearchableInstituteSelect(leadBox, institutes);
    setupCascadingSelects(leadBox);
    setupSeniorToggle(leadBox, i);
  }

  submitBtn.style.display = "block";
});

function setupCascadingSelects(leadBox) {
  const instituteSelect = leadBox.querySelector(".institute-value");
  const levelSelect = leadBox.querySelector(".courseLevel");
  const streamSelect = leadBox.querySelector(".stream");
  const courseSelect = leadBox.querySelector(".courseName");
  const levelCustomInput = leadBox.querySelector(".courseLevel-custom");
  const streamCustomInput = leadBox.querySelector(".stream-custom");
  const courseCustomInput = leadBox.querySelector(".courseName-custom");

  const resetCourseType = () => {
    levelSelect.value = "";
    levelSelect.disabled = true;
    levelSelect.innerHTML = `<option value="">Select Course Type</option>`;
    setCustomInputVisibility(leadBox, ".courseLevel", false);
  };

  const resetStream = () => {
    streamSelect.value = "";
    streamSelect.disabled = true;
    streamSelect.innerHTML = `<option value="">Select Stream</option>`;
    setCustomInputVisibility(leadBox, ".stream", false);
  };

  const resetCourse = () => {
    courseSelect.value = "";
    courseSelect.disabled = true;
    courseSelect.innerHTML = `<option value="">Select Course Name</option>`;
    setCustomInputVisibility(leadBox, ".courseName", false);
  };

  appendOtherOption(levelSelect);
  appendOtherOption(streamSelect);
  appendOtherOption(courseSelect);

  const selectedInstituteData = () => admissionDataByInstitute.get(instituteSelect.value);

  instituteSelect.addEventListener("change", () => {
    resetCourseType();
    resetStream();
    resetCourse();

    const institute = selectedInstituteData();
    if (!institute) {
      return;
    }

    levelSelect.innerHTML = `<option value="">Select Course Type</option>${institute.courseTypes
      .map((courseType) => `<option value="${escapeHtml(courseType.value)}">${escapeHtml(courseType.type)}</option>`)
      .join("")}`;
    appendOtherOption(levelSelect);
    levelSelect.disabled = false;
  });

  levelSelect.addEventListener("change", () => {
    resetStream();
    resetCourse();

    const institute = selectedInstituteData();
    const selectedLevel = levelSelect.value;
    if (!institute || !selectedLevel) {
      return;
    }

    setCustomInputVisibility(leadBox, ".courseLevel", selectedLevel === "others");

    const selectedType = institute.courseTypes.find((courseType) => courseType.value === selectedLevel);
    const streams = selectedLevel === "others" ? [] : (selectedType?.streams || []);

    streamSelect.innerHTML = `<option value="">Select Stream</option>${streams
      .map((streamObj) => `<option value="${escapeHtml(streamObj.stream)}">${escapeHtml(streamObj.stream)}</option>`)
      .join("")}`;
    appendOtherOption(streamSelect);
    streamSelect.disabled = false;

    if (selectedLevel === "others") {
      setCustomInputVisibility(leadBox, ".stream", false);
      setCustomInputVisibility(leadBox, ".courseName", false);
    } else {
      setCustomInputVisibility(leadBox, ".stream", false);
      setCustomInputVisibility(leadBox, ".courseName", false);
    }
  });

  streamSelect.addEventListener("change", () => {
    resetCourse();

    const institute = selectedInstituteData();
    const selectedStream = streamSelect.value;
    const selectedLevel = levelSelect.value;
    if (!institute || !selectedLevel || !selectedStream) {
      return;
    }

    setCustomInputVisibility(leadBox, ".stream", selectedStream === "others");

    const selectedType = institute.courseTypes.find((courseType) => courseType.value === selectedLevel);
    const selectedStreamEntry = selectedType?.streams.find((streamObj) => streamObj.stream === selectedStream);
    const courses = selectedStream === "others" ? [] : (selectedStreamEntry?.courses || []);

    courseSelect.innerHTML = `<option value="">Select Course Name</option>${courses
      .map((course) => `<option value="${escapeHtml(course)}">${escapeHtml(course)}</option>`)
      .join("")}`;
    appendOtherOption(courseSelect);
    courseSelect.disabled = false;

    if (selectedStream !== "others") {
      setCustomInputVisibility(leadBox, ".courseName", false);
    }
  });

  courseSelect.addEventListener("change", () => {
    setCustomInputVisibility(leadBox, ".courseName", courseSelect.value === "others");
  });
}

function setupSearchableInstituteSelect(leadBox, institutes) {
  const selectWrap = leadBox.querySelector(".searchable-select");
  const searchInput = leadBox.querySelector(".institute-search");
  const hiddenInput = leadBox.querySelector(".institute-value");
  const panel = leadBox.querySelector(".searchable-select-panel");
  const courseLevelSelect = leadBox.querySelector(".courseLevel");
  const streamSelect = leadBox.querySelector(".stream");
  const courseSelect = leadBox.querySelector(".courseName");

  if (!selectWrap || !searchInput || !hiddenInput || !panel) {
    return;
  }

  const resetDownstreamSelects = () => {
    if (courseLevelSelect) {
      courseLevelSelect.value = "";
      courseLevelSelect.disabled = true;
      courseLevelSelect.innerHTML = `<option value="">Select Course Type</option>`;
    }
    const courseLevelCustom = leadBox.querySelector(".courseLevel-custom");
    if (courseLevelCustom) {
      courseLevelCustom.value = "";
      courseLevelCustom.style.display = "none";
      courseLevelCustom.required = false;
    }
    if (streamSelect) {
      streamSelect.value = "";
      streamSelect.disabled = true;
      streamSelect.innerHTML = `<option value="">Select Stream</option>`;
    }
    const streamCustom = leadBox.querySelector(".stream-custom");
    if (streamCustom) {
      streamCustom.value = "";
      streamCustom.style.display = "none";
      streamCustom.required = false;
    }
    if (courseSelect) {
      courseSelect.value = "";
      courseSelect.disabled = true;
      courseSelect.innerHTML = `<option value="">Select Course Name</option>`;
    }
    const courseCustom = leadBox.querySelector(".courseName-custom");
    if (courseCustom) {
      courseCustom.value = "";
      courseCustom.style.display = "none";
      courseCustom.required = false;
    }
  };

  const closePanel = () => {
    selectWrap.classList.remove("open");
    searchInput.setAttribute("aria-expanded", "false");
  };

  const openPanel = () => {
    selectWrap.classList.add("open");
    searchInput.setAttribute("aria-expanded", "true");
  };

  const renderOptions = (filterText = "") => {
    const normalizedFilter = filterText.trim().toLowerCase();
    const matches = institutes.filter((inst) => inst.toLowerCase().includes(normalizedFilter));

    if (!matches.length) {
      panel.innerHTML = `<div class="searchable-select-empty">No institute found</div>`;
      return;
    }

    panel.innerHTML = matches
      .map(
        (inst) => `
          <button type="button" class="searchable-select-option" role="option" data-value="${escapeHtml(inst)}">
            ${escapeHtml(inst)}
          </button>
        `
      )
      .join("");

    panel.querySelectorAll(".searchable-select-option").forEach((optionButton) => {
      optionButton.addEventListener("mousedown", (event) => event.preventDefault());
      optionButton.addEventListener("click", () => {
        const selectedValue = optionButton.dataset.value || "";
        searchInput.value = selectedValue;
        hiddenInput.value = selectedValue;
        closePanel();
        hiddenInput.dispatchEvent(new Event("change", { bubbles: true }));
      });
    });
  };

  const syncTypingState = () => {
    const typedValue = searchInput.value.trim();
    if (hiddenInput.value !== typedValue) {
      hiddenInput.value = "";
      hiddenInput.dispatchEvent(new Event("change", { bubbles: true }));
    }
    renderOptions(typedValue);
    openPanel();
  };

  searchInput.addEventListener("focus", () => {
    renderOptions(searchInput.value);
    openPanel();
  });

  searchInput.addEventListener("click", () => {
    renderOptions(searchInput.value);
    openPanel();
  });

  searchInput.addEventListener("input", syncTypingState);
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closePanel();
    }
  });

  selectWrap.querySelector(".searchable-select-toggle")?.addEventListener("click", () => {
    renderOptions(searchInput.value);
    openPanel();
    searchInput.focus();
  });

  document.addEventListener("click", (event) => {
    if (!selectWrap.contains(event.target)) {
      closePanel();
    }
  });

  hiddenInput.addEventListener("change", () => {
    if (hiddenInput.value) {
      searchInput.value = hiddenInput.value;
    }
    resetDownstreamSelects();
    renderOptions(searchInput.value);
  });

  renderOptions();
}

function setupSeniorToggle(leadBox, i) {
  const seniorRadios = leadBox.querySelectorAll(`input[name="senior${i}"]`);
  const seniorDetails = leadBox.querySelector(".senior-details");
  const noFollowupDetails = leadBox.querySelector(".no-followup-details");
  const pickSenior = leadBox.querySelector(".pickSenior");
  const followUp = leadBox.querySelector(".followUp");
  const followUpNoDate = leadBox.querySelector(".followUpNoDate");
  const followUpNo = leadBox.querySelector(".followUpNo");

  function toggleSenior(value) {
    if (!seniorDetails) return;
    if (value === "Yes") {
      seniorDetails.style.display = "flex";
      if (noFollowupDetails) noFollowupDetails.style.display = "none";
      if (pickSenior) pickSenior.required = true;
      if (followUp) followUp.required = true;
      if (followUpNoDate) followUpNoDate.required = false;
      if (followUpNo) followUpNo.required = false;
      if (followUpNoDate) followUpNoDate.value = "";
      if (followUpNo) followUpNo.value = "";
      seniorDetails.classList.add("active");
      if (noFollowupDetails) noFollowupDetails.classList.remove("active");
    } else if (value === "No") {
      seniorDetails.style.display = "none";
      if (noFollowupDetails) noFollowupDetails.style.display = "flex";
      if (pickSenior) pickSenior.required = false;
      if (followUp) followUp.required = false;
      if (pickSenior) pickSenior.value = "";
      if (followUp) followUp.value = "";
      if (followUpNoDate) followUpNoDate.required = true;
      if (followUpNo) followUpNo.required = true;
      if (followUpNoDate) followUpNoDate.value = "";
      if (followUpNo) followUpNo.value = "";
      seniorDetails.classList.remove("active");
      if (noFollowupDetails) noFollowupDetails.classList.add("active");
    } else {
      seniorDetails.style.display = "none";
      if (pickSenior) pickSenior.required = false;
      if (followUp) followUp.required = false;
      if (pickSenior) pickSenior.value = "";
      if (followUp) followUp.value = "";
      if (noFollowupDetails) noFollowupDetails.style.display = "none";
      if (followUpNoDate) followUpNoDate.required = false;
      if (followUpNo) followUpNo.required = false;
      if (followUpNoDate) followUpNoDate.value = "";
      if (followUpNo) followUpNo.value = "";
      seniorDetails.classList.remove("active");
      if (noFollowupDetails) noFollowupDetails.classList.remove("active");
    }
  }

  seniorRadios.forEach((radio) => radio.addEventListener("change", (event) => toggleSenior(event.target.value)));
}

submitBtn.addEventListener("click", async () => {
  if (isSubmitting) {
    return;
  }

  isSubmitting = true;
  submitBtn.classList.remove("btn-clicked");
  void submitBtn.offsetWidth;
  submitBtn.classList.add("btn-clicked");

  setTimeout(() => {
    submitBtn.classList.remove("btn-clicked");
  }, 300);

  try {
    clearErrorHighlights();

    let firstErrorField = null;

    const captureFirstError = (element) => {
      if (!firstErrorField && element) {
        firstErrorField = element.closest(".phone-input") || element.closest(".radio-group") || element.closest(".searchable-select") || element;
      }
    };

    const counselorName = document.getElementById("counselorName").value;

    if (counselorName === "") {
      const counselorField = document.getElementById("counselorName");
      markFieldError(counselorField);
      captureFirstError(counselorField);
      showAlert("Please enter counselor name");
      scrollToField(firstErrorField);
      return;
    }

    const leadBoxes = document.querySelectorAll(".lead-box");
    const formData = [];

    for (const box of leadBoxes) {
      const studentName = getFieldValue(box, ".studentName");
      const number = getFieldValue(box, ".studentNumber");
      const institute = getFieldValue(box, ".institute");
      const courseLevel = getFieldValue(box, ".courseLevel");
      const stream = getFieldValue(box, ".stream");
      const courseName = getFieldValue(box, ".courseName");
      const remarks = getFieldValue(box, ".remarks");
      const tag = box.querySelector('input[type="radio"][name^="tag"]:checked')?.value;
      const seniorSupport = box.querySelector('input[type="radio"][name^="senior"]:checked')?.value;
      const pickSeniorVal = getFieldValue(box, ".pickSenior");
      const followUpDate = box.querySelector(".followUp")?.value || "";
      const followUpTime = box.querySelector(".followUpTime")?.value || "";
      const followUpNoDate = box.querySelector(".followUpNoDate")?.value || "";
      const followUpNo = getFieldValue(box, ".followUpNo");

      if (
        !studentName ||
        !number ||
        !institute ||
        !courseLevel ||
        !stream ||
        !courseName ||
        !remarks ||
        !tag ||
        !seniorSupport ||
        (seniorSupport === "Yes" && (!pickSeniorVal || !followUpDate)) ||
        (seniorSupport === "No" && (!followUpNoDate || !followUpNo))
      ) {
        if (!studentName) {
          const field = box.querySelector(".studentName");
          markFieldError(field);
          captureFirstError(field);
        }
        if (!number) {
          markFieldError(box.querySelector(".phone-input"));
          captureFirstError(box.querySelector(".studentNumber"));
        }
        if (!institute) {
          const field = box.querySelector(".institute");
          markFieldError(field);
          captureFirstError(field);
        }
        if (!courseLevel) {
          const field = getActiveFieldElement(box, ".courseLevel");
          markFieldError(field);
          captureFirstError(field);
        }
        if (!stream) {
          const field = getActiveFieldElement(box, ".stream");
          markFieldError(field);
          captureFirstError(field);
        }
        if (!courseName) {
          const field = getActiveFieldElement(box, ".courseName");
          markFieldError(field);
          captureFirstError(field);
        }
        if (!remarks) {
          const field = box.querySelector(".remarks");
          markFieldError(field);
          captureFirstError(field);
        }
        if (!tag) {
          const group = getRadioGroup(box, "tag");
          markFieldError(group);
          captureFirstError(group);
        }
        if (!seniorSupport) {
          const group = getRadioGroup(box, "senior");
          markFieldError(group);
          captureFirstError(group);
        }
        if (seniorSupport === "Yes" && (!pickSeniorVal || !followUpDate)) {
          if (!pickSeniorVal) {
            const field = box.querySelector(".pickSenior");
            markFieldError(field);
            captureFirstError(field);
          }
          if (!followUpDate) {
            const field = box.querySelector(".followUp");
            markFieldError(field);
            captureFirstError(field);
          }
        }
        if (seniorSupport === "No" && (!followUpNoDate || !followUpNo)) {
          if (!followUpNoDate) {
            const field = box.querySelector(".followUpNoDate");
            markFieldError(field);
            captureFirstError(field);
          }
          if (!followUpNo) {
            const field = box.querySelector(".followUpNo");
            markFieldError(field);
            captureFirstError(field);
          }
        }

        showAlert("Please fill all lead details");
        scrollToField(firstErrorField);
        return;
      }

      formData.push({
        counselorName,
        studentName,
        number,
        institute,
        courseLevel,
        stream,
        courseName,
        course: courseName,
        courseType: courseLevel,
        tag,
        seniorSupport,
        seniorName: seniorSupport === "Yes" ? pickSeniorVal || "" : "",
        followUpDate: seniorSupport === "No" ? followUpNoDate || "" : followUpDate || "",
        followUpTime: followUpTime || "",
        followUp: seniorSupport === "No" ? followUpNo || "" : "",
        counselorRemarks: remarks,
        remarks
      });
    }

    showLoader();

    const minimumLoaderTime = new Promise((resolve) => setTimeout(resolve, 700));
    const request = submitLeadsToSheet(formData);

    await Promise.all([request, minimumLoaderTime]);

    mainPage.style.display = "none";
    summaryPage.style.display = "flex";
  } catch (error) {
    console.log("Error:", error);
    showAlert(error.message || "Failed to save data. Check console for details.");
  } finally {
    hideLoader();
    isSubmitting = false;
  }
});

document.getElementById("backBtn").addEventListener("click", () => {
  summaryPage.style.display = "none";
  mainPage.style.display = "block";
});

function setupSeniorToggle(leadBox, i) {
  const seniorRadios = leadBox.querySelectorAll(`input[name="senior${i}"]`);
  const seniorDetails = leadBox.querySelector('.senior-details');
  const noFollowupDetails = leadBox.querySelector('.no-followup-details');
  const pickSenior = leadBox.querySelector('.pickSenior');
  const followUp = leadBox.querySelector('.followUp');
  const followUpTime = leadBox.querySelector('.followUpTime');
  const followUpNoDate = leadBox.querySelector('.followUpNoDate');
  const followUpNo = leadBox.querySelector('.followUpNo');

  function toggleSenior(value) {
    if (!seniorDetails) return;
    if (value === 'Yes') {
      seniorDetails.style.display = 'flex';
      if (noFollowupDetails) noFollowupDetails.style.display = 'none';
      if (pickSenior) pickSenior.required = true;
      if (followUp) followUp.required = true;
      if (followUpNoDate) followUpNoDate.required = false;
      if (followUpNo) followUpNo.required = false;
      if (followUpNoDate) followUpNoDate.value = '';
      if (followUpNo) followUpNo.value = '';
      seniorDetails.classList.add('active');
      if (noFollowupDetails) noFollowupDetails.classList.remove('active');
    } else if (value === 'No') {
      seniorDetails.style.display = 'none';
      if (noFollowupDetails) noFollowupDetails.style.display = 'flex';
      if (pickSenior) pickSenior.required = false;
      if (followUp) followUp.required = false;
      if (pickSenior) pickSenior.value = '';
      if (followUp) followUp.value = '';
      if (followUpTime) followUpTime.value = '';
      if (followUpNoDate) followUpNoDate.required = true;
      if (followUpNo) followUpNo.required = true;
      if (followUpNoDate) followUpNoDate.value = '';
      if (followUpNo) followUpNo.value = '';
      seniorDetails.classList.remove('active');
      if (noFollowupDetails) noFollowupDetails.classList.add('active');
    } else {
      seniorDetails.style.display = 'none';
      if (pickSenior) pickSenior.required = false;
      if (followUp) followUp.required = false;
      if (pickSenior) pickSenior.value = '';
      if (followUp) followUp.value = '';
      if (followUpTime) followUpTime.value = '';
      if (noFollowupDetails) noFollowupDetails.style.display = 'none';
      if (followUpNoDate) followUpNoDate.required = false;
      if (followUpNo) followUpNo.required = false;
      if (followUpNoDate) followUpNoDate.value = '';
      if (followUpNo) followUpNo.value = '';
      seniorDetails.classList.remove('active');
      if (noFollowupDetails) noFollowupDetails.classList.remove('active');
    }
  }

  seniorRadios.forEach((r) => r.addEventListener('change', (e) => toggleSenior(e.target.value)));
}
