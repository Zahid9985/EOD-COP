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

// INSTITUTE DATA: Institute -> Stream -> CourseType -> Courses
const instituteData = {
  "VPCE UNDER JNMS": {
    streams: ["B.PHARM", "D.PHARM"],
    courses: {
      "B.PHARM": { ug: ["B.PHARM"], pg: [] },
      "D.PHARM": { ug: ["D.PHARM"], pg: [] }
    }
  },
  "VPI UNDER JNMS": {
    streams: ["BMLS"],
    courses: {
      "BMLS": { ug: ["BMLS"], pg: [] }
    }
  },
  "KNI UNDER JNMS": {
    streams: ["B.SC NURSING", "GNM NURSING"],
    courses: {
      "B.SC NURSING": { ug: ["B.SC NURSING"], pg: [] },
      "GNM NURSING": { ug: ["GNM NURSING"], pg: [] }
    }
  },
  "M.R. Institute of Nursing": {
    streams: ["B.SC NURSING", "GNM NURSING"],
    courses: {
      "B.SC NURSING": { ug: ["B.SC NURSING"], pg: [] },
      "GNM NURSING": { ug: ["GNM NURSING"], pg: [] }
    }
  },
  "Mother Teresa Institute of Nursing": {
    streams: ["B.Sc Nursing", "GNM NURSING"],
    courses: {
      "B.Sc Nursing": { ug: ["B.Sc Nursing"], pg: [] },
      "GNM NURSING": { ug: ["GNM NURSING"], pg: [] }
    }
  },
  "Mother Mary Institute of Nursing": {
    streams: ["B.Sc Nursing", "GNM NURSING"],
    courses: {
      "B.Sc Nursing": { ug: ["B.Sc Nursing"], pg: [] },
      "GNM NURSING": { ug: ["GNM NURSING"], pg: [] }
    }
  },
  "Mother Rijiya Institute of Nursing": {
    streams: ["B.Sc Nursing", "GNM NURSING"],
    courses: {
      "B.Sc Nursing": { ug: ["B.Sc Nursing"], pg: [] },
      "GNM NURSING": { ug: ["GNM NURSING"], pg: [] }
    }
  },
  "M.R. College of Pharmaceutical Sciences & Research": {
    streams: ["B.Pharm", "D.Pharm"],
    courses: {
      "B.Pharm": { ug: ["B.Pharm (Joint)", "B.Pharm (Not Joint)", "B.Pharm (L)"], pg: [] },
      "D.Pharm": { ug: ["D.Pharm"], pg: [] }
    }
  },
  "Sahajpath College of Pharmacy": {
    streams: ["D.Pharm"],
    courses: {
      "D.Pharm": { ug: ["D.Pharm"], pg: [] }
    }
  },
  "Mother Teresa Institute of Pharmacy": {
    streams: ["D.Pharm"],
    courses: {
      "D.Pharm": { ug: ["D.Pharm"], pg: [] }
    }
  },
  "Eminent College of Management and Technology": {
    streams: ["BHM", "BBA", "BCA", "BMLS", "B.Optometry"],
    courses: {
      "BHM": { ug: ["BHM"], pg: [] },
      "BBA": { ug: ["BBA"], pg: [] },
      "BCA": { ug: ["BCA"], pg: [] },
      "BMLS": { ug: ["BMLS"], pg: [] },
      "B.Optometry": { ug: ["B.Optometry"], pg: [] }
    }
  },
  "Eminent College of Pharmaceutical Technology": {
    streams: ["B.Pharm"],
    courses: {
      "B.Pharm": { ug: ["B.Pharm"], pg: [] }
    }
  },
  "SWAMI VIVEKANANDA UNIVERSITY": {
    streams: ["B.Sc", "B.Optometry", "Bachelor of Physiotherapy", "BMRIT", "BMLS", "Anesthesia & OT Technology", "Master of Physiotherapy", "Psychology", "Master of Psychology", "Food & Nutrition", "BCA", "Advanced Networking & Cyber Security", "Animation & Multimedia", "MCA", "M.Sc Animation", "Diploma in EE", "Diploma in ME", "B.Tech in CSE", "B.Tech in EE", "B.Tech in ECE", "B.Tech in ME", "B.Tech in CE", "M.Tech in CSE", "M.Tech in EE", "M.Tech in ME", "M.Tech in CE", "Agriculture", "Biotechnology", "Microbiology", "BBA", "BBA Digital Marketing", "BHM", "MBA", "MBA Hospital Management", "BA Journalism & Mass Communication", "MA Journalism & Mass Communication", "BA LLB", "BBA LLB", "LLB"],
    courses: {
      "B.Sc": { ug: ["B.Sc (H) Clinical Nutrition & Dietetics", "B.Sc (H) Psychology", "B.Sc Anesthesia & OT Technology"], pg: [] },
      "B.Optometry": { ug: ["B.Optometry"], pg: [] },
      "Bachelor of Physiotherapy": { ug: ["Bachelor of Physiotherapy"], pg: ["Master of Physiotherapy"] },
      "BMRIT": { ug: ["BMRIT"], pg: [] },
      "BMLS": { ug: ["BMLS"], pg: [] },
      "BCA": { ug: ["BCA"], pg: ["MCA"] },
      "Advanced Networking & Cyber Security": { ug: ["B.Sc Advanced Networking & Cyber Security"], pg: [] },
      "Animation & Multimedia": { ug: ["B.Sc Animation & Multimedia"], pg: ["M.Sc Animation"] },
      "B.Tech in CSE": { ug: ["B.Tech in CSE", "B.Tech in CSE AIML", "B.Tech in CSE Data Science", "B.Tech in CSE Gaming"], pg: ["M.Tech in CSE"] },
      "B.Tech in EE": { ug: ["B.Tech in EE"], pg: ["M.Tech in EE"] },
      "B.Tech in ECE": { ug: ["B.Tech in ECE"], pg: [] },
      "B.Tech in ME": { ug: ["B.Tech in ME"], pg: ["M.Tech in ME"] },
      "B.Tech in CE": { ug: ["B.Tech in CE"], pg: ["M.Tech in CE"] },
      "Diploma in EE": { ug: ["Diploma in EE"], pg: [] },
      "Diploma in ME": { ug: ["Diploma in ME"], pg: [] },
      "Agriculture": { ug: ["B.Sc (H) Agriculture"], pg: ["M.Sc Agriculture"] },
      "Biotechnology": { ug: ["B.Sc (H) Biotechnology"], pg: ["M.Sc Biotechnology"] },
      "Microbiology": { ug: [], pg: ["M.Sc Microbiology"] },
      "BBA": { ug: ["BBA"], pg: [] },
      "BBA Digital Marketing": { ug: ["BBA Digital Marketing"], pg: [] },
      "BHM": { ug: ["BHM (Hospital Management)", "BHM (Hotel Management)"], pg: [] },
      "MBA": { ug: [], pg: ["MBA", "MBA Hospital Management"] },
      "BA Journalism & Mass Communication": { ug: ["BA.(H) Journalism & Mass Communication"], pg: ["MA Journalism & Mass Communication"] },
      "BA LLB": { ug: ["BA LLB (H)"], pg: [] },
      "BBA LLB": { ug: ["BBA LLB (H)"], pg: [] },
      "LLB": { ug: ["LLB (H)"], pg: [] }
    }
  },
  "ADAMAS UNIVERSITY": {
    streams: ["B.Sc", "M.Sc", "B.Com", "BBA", "MBA", "BA Education", "B.Ed", "MA Education", "B.Tech in Biomedical Engineering", "B.Tech in CE", "M.Tech in Structural Engineering", "B.Tech in CSE", "BCA", "MCA", "B.Tech in EE", "B.Tech in ECE", "B.Tech in ME", "B.Sc Food Nutrition and Dietetics", "BMLS", "B.Optometry", "BA Psychology", "MA Psychology", "B.Sc Psychology", "M.Sc Psychology", "B.Pharm", "D.Pharm", "M.Pharm", "BA. LLB", "BBA. LLB", "LLM", "B.Sc Economics", "M.Sc Economics", "BA Bengali Language and Literature", "BA English Language and Literature", "MA Bengali Language and Literature", "MA English Language and Literature", "BA History", "BA Political Science", "BA Public Administration", "BA Sociology", "MA History", "MA Political Science", "MA Public Administration", "MA Sociology", "B.Sc Biochemistry", "B.Sc Biotechnology", "B.Sc Microbiology", "M.Sc Biochemistry", "M.Sc Microbiology", "B.Tech Biotechnology", "B.Sc Graphics Animation & Media Technology", "M.Sc Graphics & Animation", "BA Journalism & Mass Communication", "MA Journalism & Mass Communication", "B. Sc Agriculture"],
    courses: {
      "B.Sc": { ug: ["B.Sc Chemistry", "B.Sc Environmental Science and Sustainability", "B.Sc Forensic Science", "B.Sc Geography", "B.Sc Applied Statistics and Data Science", "B.Sc Mathematics and Computing", "B.Sc Physics"], pg: [] },
      "M.Sc": { ug: [], pg: ["M.Sc Chemistry", "M.Sc Environmental Science and Sustainability", "M.Sc Forensic Science", "M.Sc Geography", "M.ScTech Statistics and Data Science", "M.Sc Physics", "M.Sc Geoinformatics"] },
      "B.Com": { ug: ["B.Com"], pg: [] },
      "BBA": { ug: ["BBA"], pg: [] },
      "MBA": { ug: [], pg: ["MBA", "MBA Business Analytics", "MBA Logistics and Supply Chain Management"] },
      "BA Education": { ug: ["BA Education"], pg: [] },
      "B.Ed": { ug: ["B.Ed"], pg: [] },
      "MA Education": { ug: [], pg: ["MA Education"] },
      "B.Tech in Biomedical Engineering": { ug: ["B.Tech in Biomedical Engineering"], pg: [] },
      "B.Tech in CE": { ug: ["B.Tech in CE"], pg: ["M.Tech in Structural Engineering"] },
      "B.Tech in CSE": { ug: ["B.Tech in CSE & Business Systems", "B.Tech in CSE"], pg: [] },
      "BCA": { ug: ["BCA"], pg: ["MCA"] },
      "B.Tech in EE": { ug: ["B.Tech in EE"], pg: [] },
      "B.Tech in ECE": { ug: ["B.Tech in ECE"], pg: [] },
      "B.Tech in ME": { ug: ["B.Tech in ME"], pg: [] },
      "B.Sc Food Nutrition and Dietetics": { ug: ["B.Sc Food Nutrition and Dietetics"], pg: [] },
      "BMLS": { ug: ["BMLS"], pg: [] },
      "B.Optometry": { ug: ["B.Optometry"], pg: [] },
      "BA Psychology": { ug: ["BA Psychology"], pg: ["MA Psychology"] },
      "B.Sc Psychology": { ug: ["B.Sc Psychology"], pg: ["M.Sc Psychology"] },
      "B.Pharm": { ug: ["B.Pharm"], pg: [] },
      "D.Pharm": { ug: ["D.Pharm"], pg: [] },
      "M.Pharm": { ug: [], pg: ["M.Pharm Pharmaceutics", "M.Pharm Pharmacology"] },
      "BA. LLB": { ug: ["BA. LLB (H)"], pg: [] },
      "BBA. LLB": { ug: ["BBA. LLB (H)"], pg: [] },
      "LLM": { ug: [], pg: ["LLM"] },
      "B.Sc Economics": { ug: ["B.Sc Economics"], pg: [] },
      "M.Sc Economics": { ug: [], pg: ["M.Sc Economics"] },
      "BA Bengali Language and Literature": { ug: ["BA Bengali Language and Literature"], pg: [] },
      "BA English Language and Literature": { ug: ["BA (English Language and Literature)"], pg: [] },
      "BA History": { ug: ["BA (History)"], pg: [] },
      "BA Political Science": { ug: ["BA (Political Science & International Relations)"], pg: [] },
      "BA Public Administration": { ug: ["BA (Public Administration & Governance)"], pg: [] },
      "BA Sociology": { ug: ["BA (Sociology)"], pg: [] },
      "B.Tech Biotechnology": { ug: ["B.Tech Biotechnology"], pg: ["M.Sc Biotechnology"] },
      "B.Sc Graphics Animation & Media Technology": { ug: ["B.Sc Graphics Animation & Media Technology"], pg: [] },
      "B. Sc Agriculture": { ug: ["B. Sc (H) Agriculture"], pg: [] }
    }
  },
  "BRAINWARE UNIVERSITY": {
    streams: ["Diploma in CSE", "Diploma in EE", "Diploma in ME", "Diploma in Medical Laboratory Science", "B.Tech in CSE", "B.Optometry", "Bachelor of Physician Associate", "Bachelor of Physiotherapy", "B.Sc Agriculture", "B.Sc Biotechnology", "B.Tech Biotechnology", "B.Sc Food Nutrition & Dietetics", "B.Sc Advanced Networking & Cyber Security", "Bachelor in Anaesthesia & Operation Theatre Technology", "B.Sc Critical Care Technology", "B.Sc Media Science & Journalism", "B.Sc Animation & Multimedia", "BCA", "BBA", "BHM", "B.Com", "B.Sc Psychology", "BA English", "B.Sc Nursing", "GNM", "M.Tech in CSE", "M.Sc Biotechnology", "M.Sc Bioinformatics", "M.Sc Advanced Networking & Cyber Security", "M.Sc Media Science & Journalism", "M.Sc Animation & Multimedia", "M.Sc Mathematics", "M.Sc Nutrition & Dietetics", "M.Sc Agriculture", "M.Sc Applied Psychology", "MCA", "MBA", "LLM", "MA English", "MMLS", "M.Optometry", "M.Com"],
    courses: {
      "Diploma in CSE": { ug: ["Diploma in CSE"], pg: [] },
      "Diploma in EE": { ug: ["Diploma in EE"], pg: [] },
      "Diploma in ME": { ug: ["Diploma in ME"], pg: [] },
      "Diploma in Medical Laboratory Science": { ug: ["Diploma in Medical Laboratory Science (DMLS)"], pg: [] },
      "B.Tech in CSE": { ug: ["B.Tech in CSE", "B.Tech in CSE AI & ML", "B.Tech in CSE Data Science", "B.Tech in CSE AI & Robotics"], pg: ["M.Tech in CSE"] },
      "B.Optometry": { ug: ["B.Optometry"], pg: ["M.Optometry"] },
      "Bachelor of Physician Associate": { ug: ["Bachelor of Physician Associate"], pg: [] },
      "Bachelor of Physiotherapy": { ug: ["Bachelor of Physiotherapy"], pg: [] },
      "B.Sc Agriculture": { ug: ["B.Sc (H) Agriculture"], pg: [] },
      "B.Sc Biotechnology": { ug: ["B.Sc (H) Biotechnology"], pg: [] },
      "B.Tech Biotechnology": { ug: ["B.Tech Biotechnology"], pg: [] },
      "B.Sc Food Nutrition & Dietetics": { ug: ["B.Sc (H) Food Nutrition & Dietetics"], pg: [] },
      "B.Sc Advanced Networking & Cyber Security": { ug: ["B.Sc (H) Advanced Networking & Cyber Security"], pg: [] },
      "B.Tech in CSE Cyber Security": { ug: ["B.Tech in CSE Cyber Security"], pg: [] },
      "Bachelor in Anaesthesia & Operation Theatre Technology": { ug: ["Bachelor in Anaesthesia & Operation Theatre Technology"], pg: [] },
      "B.Sc Critical Care Technology": { ug: ["B.Sc Critical Care Technology"], pg: [] },
      "B.Sc Media Science & Journalism": { ug: ["B.Sc (H) Media Science & Journalism"], pg: [] },
      "B.Sc Animation & Multimedia": { ug: ["B.Sc (H) Animation & Multimedia", "B.Sc (H) Animation VFX & Gaming"], pg: [] },
      "BCA": { ug: ["BCA (H)", "BCA (H) Mobile Application and Web Technologies"], pg: ["MCA"] },
      "BBA": { ug: ["BBA (H)", "BBA (H) Business Analytics", "BBA (H) Digital Marketing"], pg: [] },
      "BHM": { ug: ["BHM (H)"], pg: [] },
      "B.Com": { ug: ["B.Com (H) Accounts Finance & Banking"], pg: [] },
      "B.Sc Psychology": { ug: ["B.Sc Psychology"], pg: [] },
      "BA English": { ug: ["BA English"], pg: [] },
      "B.Sc Nursing": { ug: ["B.Sc Nursing"], pg: [] },
      "GNM": { ug: ["GNM"], pg: [] },
      "M.Tech in CSE": { ug: [], pg: ["M.Tech in CSE", "M.Tech in CSE AI &ML", "M.Tech in CSE Data Science", "M.Tech in Robotics & Automation"] },
      "M.Sc Biotechnology": { ug: [], pg: ["M.Sc Biotechnology"] },
      "M.Sc Bioinformatics": { ug: [], pg: ["M.Sc Bioinformatics"] },
      "M.Sc Advanced Networking & Cyber Security": { ug: [], pg: ["M.Sc Advanced Networking & Cyber Security"] },
      "M.Sc Media Science & Journalism": { ug: [], pg: ["M.Sc Media Science & Journalism"] },
      "M.Sc Animation & Multimedia": { ug: [], pg: ["M.Sc Animation & Multimedia"] },
      "M.Sc Mathematics": { ug: [], pg: ["M.Sc Mathematics"] },
      "M.Sc Nutrition & Dietetics": { ug: [], pg: ["M.Sc Nutrition & Dietetics"] },
      "M.Sc Agriculture": { ug: [], pg: ["M.Sc Agriculture - Agronomy", "M.Sc Agriculture - Horticulture"] },
      "M.Sc Applied Psychology": { ug: [], pg: ["M.Sc Applied Psychology"] },
      "MCA": { ug: [], pg: ["MCA"] },
      "MBA": { ug: [], pg: ["MBA", "MBA Healthcare & Hospital Management"] },
      "LLM": { ug: [], pg: ["LLM"] },
      "MA English": { ug: [], pg: ["MA English"] },
      "MMLS": { ug: [], pg: ["MMLS"] },
      "M.Com": { ug: [], pg: ["M.Com Banking & Financial Accounting"] }
    }
  },
  "JIS COLLEGE OF ENGINEERING": {
    streams: ["B.TECH", "BCA", "BBA", "BHM", "DIPLOMA", "MCA", "M.Tech", "MBA"],
    courses: {
      "B.TECH": { ug: ["B.TECH AGRICULTURAL ENGINEERING", "B.TECH BIO MEDICAL ENGINEERING", "B.TECH IN CE", "B.TECH IN CSE", "B.TECH IN CSE AI & ML", "B.TECH IN COMPUTER SCIENCE & TECHNOLOGY", "B.TECH IN EE", "B.TECH IN ECE", "B.TECH IN IT", "B.TECH IN ME", "B.TECH IN AGRICULTURAL ENGINEERING (L)", "B.TECH IN BIO MEDICAL ENGINEERING (L)", "B.TECH IN CE (L)", "B.TECH IN CSE (L)", "B.TECH IN CSE (L) AI & ML", "B.TECH IN COMPUTER SCIENCE & TECHNOLOGY (L)", "B.TECH in EE (L)", "B.TECH IN ECE (L)", "B.TECH IN IT (L)", "B.TECH IN ME (L)"], pg: [] },
      "BCA": { ug: ["BCA"], pg: ["MCA"] },
      "BBA": { ug: ["BBA (BACHELOR OF BUSINESS ADMINISTRATION)", "BBA Digital Marketing", "BHM"], pg: [] },
      "BHM": { ug: ["BHM"], pg: [] },
      "DIPLOMA": { ug: ["DIPLOMA in EE/ ME", "DIPLOMA in EE/ ME (L)"], pg: [] },
      "MCA": { ug: [], pg: ["MCA"] },
      "M.Tech": { ug: [], pg: ["M.Tech in CSE", "M.Tech in EDPS", "M.Tech in MCNT", "M.Tech in ME"] },
      "MBA": { ug: [], pg: ["MBA (MASTERS IN BUSINESS ADMINISTRATION)"] }
    }
  },
  "JIS UNIVERSITY": {
    streams: ["B.Tech in CSE", "BCA", "BBA", "L.L.B.", "B.BA.-L.L.B.", "LLM", "MBA", "B.Sc", "BMLS", "M.Sc", "B.Pharm", "D.Pharm", "M.Pharm", "PHD", "M.Tech"],
    courses: {
      "B.Tech in CSE": { ug: ["B.Tech in CSE", "B.Tech in CSE (AI & ML)", "B.Tech in CSE (Cyber Security)", "B.Tech in CSE (Data Science)", "B.Tech in CSE (IoT)", "B.Tech in CSE (L)", "B.Tech in CSE (L) AI & ML", "B.Tech in CSE (L) Data Science", "B.Tech in CSE (L) AI & Robotics", "B.Tech in CSE (L) Cyber Security"], pg: ["M.Tech in CSE"] },
      "BCA": { ug: ["BCA (4 Years)"], pg: [] },
      "BBA": { ug: ["BBA (4 Years)"], pg: [] },
      "L.L.B.": { ug: ["L.L.B. (3 Years)"], pg: [] },
      "B.BA.-L.L.B.": { ug: ["B.BA.-L.L.B. (5 Years)"], pg: [] },
      "LLM": { ug: [], pg: ["LLM"] },
      "MBA": { ug: [], pg: ["MBA (2 Years)", "MBA (Digital Marketing)"] },
      "B.Sc": { ug: ["B.Sc in Bio-Technology & Micro-biology (4 Years) & Data Science", "B.ScAgricultural Science"], pg: [] },
      "BMLS": { ug: ["BMLS"], pg: [] },
      "M.Sc": { ug: [], pg: ["M.Sc (2 Years) BioTechnology Microbiology Physics Chemistry & Environmental Sc. & SD", "M.Sc In Remote Sensing & GIS"] },
      "B.Pharm": { ug: ["B.Pharm (4 Years)", "B.Phram (L)"], pg: [] },
      "D.Pharm": { ug: ["D.Pharm"], pg: [] },
      "M.Pharm": { ug: [], pg: ["M.Pharm"] },
      "PHD": { ug: [], pg: ["All PHD", "PHD in Oral & Dental Science"] }
    }
  },
  "SISTER NIVEDITA UNIVERSITY (TECHNO GROUP)": {
    streams: ["B.Des", "B.Sc Animation", "B.Sc Generative AI", "B.Sc Visual Effects", "B.Tech Fashion", "BA Journalism", "BA Performing Arts", "BFA", "M.Sc Animation", "MA Journalism", "MA PR", "MFA", "Certificate", "B.Com", "B.Sc Economics", "BA LLB", "BBA", "BBA specializations", "LLB", "MBA", "B.Sc Applied Nutrition", "B.Sc Biotechnology", "B.Sc Microbiology", "B.Sc Agriculture", "B.Sc Food Science", "B.Tech Biotechnology", "B.Sc Applied Physics", "B.Sc Chemical Science", "B.Sc Computational Mathematics", "B.Tech Agricultural Engineering", "BArch", "B.Des Interior", "M.Sc Biotechnology", "M.Sc Microbiology", "M.Sc Applied Nutrition", "M.Sc Bioinformatics", "M.Sc Food Science", "M.Sc Medicinal Chemistry", "M.Sc Agriculture", "B.Pharm", "Bachelor in Anaesthesia", "B.Sc Critical Care", "B.MLS", "BMRIT", "B.Sc Nursing", "M.Sc Nursing", "Post Basic B.Sc Nursing", "D.Pharm", "GNM", "B.Sc Psychology", "B.Tech in CSE", "B.Tech in CSE specializations", "B.Tech in ECE", "B.Tech in Industrial Systems", "B.Tech in VLSI Design", "BCA", "M.Sc Applied Psychology", "M.Tech in CSE", "M.Tech in ECE", "MCA", "BA History", "BA. Liberal Arts", "BA International Relations", "BA English", "MA English", "MA History", "B.Sc Geo-Informatics", "BA Sociology", "BA Political Science", "MA Political Science", "MA International Relations", "MA Sociology", "Certificate in Foreign Language"],
    courses: {
      "B.Des": { ug: ["B.Des (Honours / Honours with Research)", "B.Des (Interior Design) (Honours / Honours with Research)"], pg: [] },
      "B.Sc Animation": { ug: ["B.Sc (Animation & Graphics) (Honours / Honours with Research)", "B.Sc (Visual Effects and Animation) (Honours / Honours with Research)"], pg: [] },
      "B.Sc Generative AI": { ug: ["B.Sc (Generative AI and Design Learning) (Honours / Honours with Research)"], pg: [] },
      "B.Tech Fashion": { ug: ["B.Tech (Fashion Technology) (Honours / Honours with Research)"], pg: [] },
      "BA Journalism": { ug: ["BA (Journalism & Mass Communication) (Honours / Honours with Research)"], pg: [] },
      "BA Performing Arts": { ug: ["BA (Performing Arts) (Dance) (Honours / Honours with Research)", "BA (Performing Arts) (Drama) (Honours / Honours with Research)", "BA (Performing Arts) (Music) (Honours / Honours with Research)"], pg: [] },
      "BFA": { ug: ["BFA (Honours / Honours with Research)"], pg: [] },
      "M.Sc Animation": { ug: [], pg: ["M.Sc (Animation & Graphics)", "M.Sc Animation"] },
      "MA Journalism": { ug: [], pg: ["MA (Journalism & Mass Communication)", "MA (PR & Advertising)"] },
      "MFA": { ug: [], pg: ["MFA (Applied Art)", "MFA (Painting)", "MFA (Sculpture)", "MFA (Printmaking)"] },
      "Certificate": { ug: ["Certificate in acting techniques", "Certificate in Art Therapy", "Certificate in Contemporary dance", "Certificate in Contemporary music", "Certificate in Costume design", "Certificate in Light design", "Certificate in Salsa", "Certificate in Studio sound design", "Certificate in Zumba"], pg: [] },
      "B.Com": { ug: ["B.Com (Banking & Finance) (Honours / Honours with Research)", "B.Com (Honours / Honours with Research)", "B.Com (Hons.with Research) (Morning Session)"], pg: [] },
      "B.Com LLB": { ug: ["B.Com LLB (Hons)"], pg: [] },
      "B.Sc Economics": { ug: ["B.Sc (Economics)(Honours / Honours with Research)"], pg: [] },
      "BA LLB": { ug: ["BA LLB (Hons)"], pg: [] },
      "BBA": { ug: ["BBA (Business Analytics) (Hons. with Research)", "BBA (Digital Entrepreneurship & Startup Management) (Honours / Honours with Research)", "BBA (Digital Marketing) (Honours / Honours with Research)", "BBA (Finance & Marketing)(Honours / Honours with Research)", "BBA (FinTech and Digital Economy) (Hons. with Research)", "BBA (Honours / Honours with Research)", "BBA (Hospital Management) (Honours / Honours with Research)", "BBA (Sports Management) (Honours / Honours with Research)"], pg: [] },
      "BBA Hospitality": { ug: ["BBA (Honours / Honours with Research) Hospitality & Tourism Administration(Industry Integrated Program )"], pg: [] },
      "BBA LLB": { ug: ["BBA LLB (Hons)"], pg: [] },
      "LLB": { ug: ["LLB"], pg: [] },
      "MBA": { ug: [], pg: ["MBA Finance", "MBA Marketing", "MBA HR", "MBA Healthcare Management", "MBA Sports Management", "MBA Business Analytics"] },
      "Executive MBA": { ug: [], pg: ["Executive MBA( Finance Marketing HR and Business Analytics)"] },
      "LLM": { ug: [], pg: ["LLM (Criminal Law/ Corporate Law)"] },
      "M.Com": { ug: [], pg: ["M.Com"] },
      "B.Sc Applied Nutrition": { ug: ["B.Sc Applied Nutrition & Dietetics (Honours / Honours with Research)"], pg: [] },
      "B.Sc Biotechnology": { ug: ["B.Sc Biotechnology (Honours / Honours with Research)"], pg: [] },
      "B.Sc Microbiology": { ug: ["B.Sc Microbiology (Honours / Honours with Research)"], pg: [] },
      "B.Sc Agriculture": { ug: ["B.Sc Agriculture (Honours)"], pg: [] },
      "B.Sc Food Science": { ug: ["B.Sc Food Science and Technology (Honours / Honours with Research)"], pg: [] },
      "B.Tech Biotechnology": { ug: ["B.Tech in Biotechnology (Honours / Honours with Research)"], pg: [] },
      "B.Sc Applied Physics": { ug: ["B.Sc Applied Physics & Electronics (Honours / Honours with Research)"], pg: [] },
      "B.Sc Chemical Science": { ug: ["B.Sc Chemical Science and Technology (Honours / Honours with Research)"], pg: [] },
      "B.Sc Computational Mathematics": { ug: ["B.Sc Computational Mathematics and AI (Honours / Honours with Research)"], pg: [] },
      "B.Tech Agricultural Engineering": { ug: ["B.Tech. in Agricultural Engineering (Honours / Honours with Research)"], pg: [] },
      "BArch": { ug: ["BArch"], pg: [] },
      "M.Sc Biotechnology": { ug: [], pg: ["M.Sc (Biotechnology)"] },
      "M.Sc Microbiology": { ug: [], pg: ["M.Sc Microbiology"] },
      "M.Sc Applied Nutrition": { ug: [], pg: ["M.Sc Applied Nutrition & Dietetics"] },
      "M.Sc Bioinformatics": { ug: [], pg: ["M.Sc Bioinformatics"] },
      "M.Sc Food Science": { ug: [], pg: ["M.Sc Food Science and Technology"] },
      "M.Sc Medicinal Chemistry": { ug: [], pg: ["M.Sc Medicinal Chemistry"] },
      "M.Sc Agriculture": { ug: [], pg: ["M.Sc Agriculture (Agronomy)"] },
      "B.Pharm": { ug: ["B.Pharm", "B.Pharm (L)"], pg: [] },
      "Bachelor in Anaesthesia": { ug: ["Bachelor in Anaesthesia & Operation Theatre Technology"], pg: [] },
      "B.Sc Critical Care": { ug: ["B.Sc (Critical Care Technology)"], pg: [] },
      "B.MLS": { ug: ["B.MLS"], pg: [] },
      "BMRIT": { ug: ["BMRIT"], pg: [] },
      "B.Sc Nursing": { ug: ["B.Sc Nursing"], pg: [] },
      "M.Sc Nursing": { ug: [], pg: ["M.Sc (Nursing)"] },
      "Post Basic B.Sc Nursing": { ug: [], pg: ["Post Basic B.Sc (Nursing)"] },
      "D.Pharm": { ug: ["D.Pharm"], pg: [] },
      "GNM": { ug: ["GNM"], pg: [] },
      "B.Sc Psychology": { ug: ["B.Sc (Psychology) (Honours / Honours with Research)"], pg: [] },
      "B.Tech in CSE": { ug: ["B.Tech in CSE (Honours / Honours with Research)", "B.Tech in CSE AI & ML (Honours/Honours with Recharch)", "B.Tech in CSE Cyber Security (Honours/Honours with Recharch)", "B.Tech in CSE Data Science (Honours/Honours with Recharch)", "B.Tech in CSE Internet of Things (Honours/Honours with Recharch)", "B.Tech in CSE (H) (L) (Honours/Honours with Recharch)"], pg: [] },
      "B.Tech in ECE": { ug: ["B.Tech in ECE (H) (Honours/Honours with Recharch)"], pg: [] },
      "B.Tech in Industrial Systems": { ug: ["B.Tech in Industrial Systems Engineering (H) (Honours/Honours with Recharch)"], pg: [] },
      "B.Tech in VLSI Design": { ug: ["B.Tech in VLSI Design & Technology (Semiconductor)"], pg: [] },
      "BCA": { ug: ["BCA (Honours / Honours with Research)"], pg: [] },
      "M.Sc Applied Psychology": { ug: [], pg: ["M.Sc (Applied Psychology)"] },
      "M.Tech in CSE": { ug: [], pg: ["M.Tech in CSE"] },
      "M.Tech in ECE": { ug: [], pg: ["M.Tech in ECE"] },
      "MCA": { ug: [], pg: ["MCA"] },
      "BA History": { ug: ["BA (History & Public Policy) (Honours / Honours with Research)"], pg: [] },
      "BA. Liberal Arts": { ug: ["BA. (Liberal Arts & Humanities) (Honours / Honours with Research)"], pg: [] },
      "BA International Relations": { ug: ["BA in International Relations & Global Security (with Cyber Diplomacy) (Honours / Honours with Research)"], pg: [] },
      "BA English": { ug: ["BA (English) (Honours / Honours with Research)"], pg: [] },
      "MA English": { ug: [], pg: ["MA (English)"] },
      "MA History": { ug: [], pg: ["MA (History) in Ancient History and Archeology/Conservation and Medieval Studies/Applied History and Public Policy"] },
      "B.Sc Geo-Informatics": { ug: ["B.Sc (Geo-Informatics)(Honours / Honours with Research)"], pg: [] },
      "BA Sociology": { ug: ["BA (Sociology with Social Anthropology)(Honours / Honours with Research)"], pg: [] },
      "BA Political Science": { ug: ["BA (Political Science with Governance and Public Administration)(Honours / Honours with Research)"], pg: [] },
      "MA Political Science": { ug: [], pg: ["MA (Political Science)"] },
      "MA International Relations": { ug: [], pg: ["MA in International Relations & Public Policy"] },
      "MA Sociology": { ug: [], pg: ["MA (Sociology)"] },
      "Certificate in Foreign Language": { ug: ["Certificate in Foreign Language (Advanced) - Chinese", "Certificate in Foreign Language (Beginners) - Chinese", "Certificate in Foreign Language (Higher certificate) - Chinese", "Diploma in Chinese", "Certificate in Foreign Language (Advanced) - French", "Certificate in Foreign Language (Beginners) - French", "Certificate in Foreign Language (Higher certificate) - French", "Diploma in French", "Certificate in Foreign Language (Advanced) - German", "Certificate in Foreign Language (Beginners) - German", "Certificate in Foreign Language (Higher certificate) - German", "Diploma in German", "Certificate in Foreign Language (Advanced) - Japanese", "Certificate in Foreign Language (Beginners) - Japanese", "Certificate in Foreign Language (Higher certificate) - Japanese", "Diploma in Japanese", "Certificate in Foreign Language (Advanced) - Spanish", "Certificate in Foreign Language (Beginners) - Spanish", "Certificate in Foreign Language (Higher certificate) - Spanish", "Diploma in Spanish"], pg: [] }
    }
  }
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

submitBtn.style.display = "none";

function showAlert(message) {
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
  if (!element) {
    return;
  }

  const errorTarget = element.closest(".phone-input") || element.closest(".radio-group") || element;
  errorTarget.classList.add("field-error");
}

function scrollToField(element) {
  if (!element) {
    return;
  }

  element.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

  if (typeof element.focus === "function") {
    element.focus({ preventScroll: true });
  }
}

function getFieldValue(box, selector) {
  const field = box.querySelector(selector);

  if (!field) {
    return "";
  }

  return field.value.trim();
}

function getRadioGroup(box, prefix) {
  const groups = Array.from(box.querySelectorAll(".radio-group"));
  return groups.find((group) => group.querySelector(`input[name^="${prefix}"]`));
}

closeAlert.addEventListener("click", () => {
  customAlert.style.display = "none";
});

// GET ALL INSTITUTE NAMES
function getAllInstitutes() {
  return Object.keys(instituteData).sort();
}

// GENERATE LEADS FORM
generateBtn.addEventListener("click", () => {
  const leadCount = parseInt(document.getElementById("leadCount").value);

  leadsContainer.innerHTML = "";
  submitBtn.style.display = "none";

  if (!leadCount || leadCount <= 0) {
    showAlert("Please enter valid lead count");
    return;
  }

  const institutes = getAllInstitutes();
  const instituteOptionMarkup = institutes
    .map((inst) => `<option value="${escapeHtml(inst)}">${escapeHtml(inst)}</option>`)
    .join("");

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
          <select id="institute${i}" class="institute" required>
            <option value="">Select Institute</option>
            ${instituteOptionMarkup}
          </select>
        </div>

        <div class="input-group">
          <label for="stream${i}">Stream<span class="required-star">*</span></label>
          <select id="stream${i}" class="stream" required disabled>
            <option value="">Select Stream</option>
          </select>
        </div>

        <div class="input-group">
          <label for="courseLevel${i}">Course Type<span class="required-star">*</span></label>
          <select id="courseLevel${i}" class="courseLevel" required disabled>
            <option value="">Select Course Type</option>
            <option value="ug">UG</option>
            <option value="pg">PG</option>
          </select>
        </div>

        <div class="input-group">
          <label for="courseName${i}">Course Name<span class="required-star">*</span></label>
          <select id="courseName${i}" class="courseName" required disabled>
            <option value="">Select Course Name</option>
          </select>
        </div>

        <!-- TAG RADIO BUTTON -->
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

        <!-- SENIOR SUPPORT -->
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

        <!-- CONDITIONAL SENIOR DETAILS -->
        <div class="senior-details full-width" style="display:none;">
          <div class="input-group">
            <label>Pick a Senior<span class="required-star">*</span></label>
            <select id="pickSenior${i}" class="pickSenior">
              <option value="">Select Senior</option>
              <option>Kamalika Mukherjee</option>
              <option>Sunny Dey</option>
              <option>Sangeeta Dikshit</option>
              <option>Sayani Dutta</option>
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

        <div class="input-group full-width">
          <label>Remarks</label>
          <textarea rows="4" placeholder="Write remarks" class="remarks"></textarea>
        </div>

      </div>
    `;

    leadsContainer.appendChild(leadBox);

    // Setup cascading dropdowns
    setupCascadingSelects(leadBox, i);

    // Setup senior radio toggles
    setupSeniorToggle(leadBox, i);
  }

  submitBtn.style.display = "block";
});

function setupCascadingSelects(leadBox, leadNum) {
  const instituteSelect = leadBox.querySelector(`.institute`);
  const streamSelect = leadBox.querySelector(`.stream`);
  const levelSelect = leadBox.querySelector(`.courseLevel`);
  const courseSelect = leadBox.querySelector(`.courseName`);

  // When institute changes
  instituteSelect.addEventListener("change", () => {
    const selectedInstitute = instituteSelect.value;
    streamSelect.value = "";
    levelSelect.value = "";
    courseSelect.value = "";
    streamSelect.disabled = true;
    levelSelect.disabled = true;
    courseSelect.disabled = true;

    if (!selectedInstitute) {
      streamSelect.innerHTML = `<option value="">Select Stream</option>`;
      return;
    }

    const institute = instituteData[selectedInstitute];
    if (!institute) return;

    const streams = institute.streams || [];
    const streamOptions = streams
      .map((stream) => `<option value="${escapeHtml(stream)}">${escapeHtml(stream)}</option>`)
      .join("");

    streamSelect.innerHTML = `<option value="">Select Stream</option>${streamOptions}`;
    streamSelect.disabled = false;
  });

  // When stream changes
  streamSelect.addEventListener("change", () => {
    const selectedInstitute = instituteSelect.value;
    const selectedStream = streamSelect.value;
    levelSelect.value = "";
    courseSelect.value = "";
    levelSelect.disabled = true;
    courseSelect.disabled = true;

    if (!selectedInstitute || !selectedStream) {
      levelSelect.innerHTML = `<option value="">Select Course Type</option>`;
      return;
    }

    const institute = instituteData[selectedInstitute];
    const streamData = institute.courses?.[selectedStream];
    if (!streamData) return;

    const types = Object.keys(streamData).filter((type) => streamData[type].length > 0);
    const levelOptions = types
      .map((type) => `<option value="${type}">${type === "ug" ? "UG" : "PG"}</option>`)
      .join("");

    levelSelect.innerHTML = `<option value="">Select Course Type</option>${levelOptions}`;
    levelSelect.disabled = false;
  });

  // When course type changes
  levelSelect.addEventListener("change", () => {
    const selectedInstitute = instituteSelect.value;
    const selectedStream = streamSelect.value;
    const selectedLevel = levelSelect.value;
    courseSelect.value = "";
    courseSelect.disabled = true;

    if (!selectedInstitute || !selectedStream || !selectedLevel) {
      courseSelect.innerHTML = `<option value="">Select Course Name</option>`;
      return;
    }

    const institute = instituteData[selectedInstitute];
    const streamData = institute.courses?.[selectedStream];
    const courses = streamData?.[selectedLevel] || [];

    if (courses.length === 0) {
      courseSelect.innerHTML = `<option value="">No courses available</option>`;
      return;
    }

    const courseOptions = courses
      .map((course) => `<option value="${escapeHtml(course)}">${escapeHtml(course)}</option>`)
      .join("");

    courseSelect.innerHTML = `<option value="">Select Course Name</option>${courseOptions}`;
    courseSelect.disabled = false;
  });
}

function setupSeniorToggle(leadBox, i) {
  const seniorRadios = leadBox.querySelectorAll(`input[name="senior${i}"]`);
  const seniorDetails = leadBox.querySelector('.senior-details');
  const pickSenior = leadBox.querySelector('.pickSenior');
  const followUp = leadBox.querySelector('.followUp');
  const followUpTime = leadBox.querySelector('.followUpTime');

  function toggleSenior(value) {
    if (!seniorDetails) return;
    if (value === 'Yes') {
      seniorDetails.style.display = 'flex';
      if (pickSenior) pickSenior.required = true;
      if (followUp) followUp.required = true;
      seniorDetails.classList.add('active');
    } else {
      seniorDetails.style.display = 'none';
      if (pickSenior) pickSenior.required = false;
      if (followUp) followUp.required = false;
      if (pickSenior) pickSenior.value = '';
      if (followUp) followUp.value = '';
      if (followUpTime) followUpTime.value = '';
      seniorDetails.classList.remove('active');
    }
  }

  seniorRadios.forEach((r) => r.addEventListener('change', (e) => toggleSenior(e.target.value)));
}

// SUBMIT BUTTON
submitBtn.addEventListener("click", async () => {
  console.log("BUTTON WORKING");
  submitBtn.classList.remove("btn-clicked");
  void submitBtn.offsetWidth;
  submitBtn.classList.add("btn-clicked");

  setTimeout(() => {
    submitBtn.classList.remove("btn-clicked");
  }, 300);

  clearErrorHighlights();

  let firstErrorField = null;

  const captureFirstError = (element) => {
    if (!firstErrorField && element) {
      firstErrorField = element.closest(".phone-input") || element.closest(".radio-group") || element;
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
  let formData = [];

  for (let box of leadBoxes) {
    const studentName = getFieldValue(box, ".studentName");
    const number = getFieldValue(box, ".studentNumber");
    const institute = getFieldValue(box, ".institute");
    const stream = getFieldValue(box, ".stream");
    const courseLevel = getFieldValue(box, ".courseLevel");
    const courseName = getFieldValue(box, ".courseName");
    const remarks = getFieldValue(box, ".remarks");
    const tag = box.querySelector('input[type="radio"][name^="tag"]:checked')?.value;
    const seniorSupport = box.querySelector('input[type="radio"][name^="senior"]:checked')?.value;
    const pickSeniorVal = getFieldValue(box, ".pickSenior");
    const followUpDate = box.querySelector('.followUp')?.value || "";
    const followUpTime = box.querySelector('.followUpTime')?.value || "";

    if (
      !studentName ||
      !number ||
      !institute ||
      !stream ||
      !courseLevel ||
      !courseName ||
      !remarks ||
      !tag ||
      !seniorSupport ||
      (seniorSupport === 'Yes' && (!pickSeniorVal || !followUpDate))
    ) {
      if (!studentName) {
        const studentField = box.querySelector(".studentName");
        markFieldError(studentField);
        captureFirstError(studentField);
      }
      if (!number) {
        markFieldError(box.querySelector(".phone-input"));
        captureFirstError(box.querySelector(".studentNumber"));
      }
      if (!institute) {
        const instituteField = box.querySelector(".institute");
        markFieldError(instituteField);
        captureFirstError(instituteField);
      }
      if (!stream) {
        const streamField = box.querySelector(".stream");
        markFieldError(streamField);
        captureFirstError(streamField);
      }
      if (!courseLevel) {
        const levelField = box.querySelector(".courseLevel");
        markFieldError(levelField);
        captureFirstError(levelField);
      }
      if (!courseName) {
        const courseField = box.querySelector(".courseName");
        markFieldError(courseField);
        captureFirstError(courseField);
      }
      if (!remarks) {
        const remarksField = box.querySelector(".remarks");
        markFieldError(remarksField);
        captureFirstError(remarksField);
      }
      if (!tag) {
        const tagGroup = getRadioGroup(box, "tag");
        markFieldError(tagGroup);
        captureFirstError(tagGroup);
      }
      if (!seniorSupport) {
        const seniorGroup = getRadioGroup(box, "senior");
        markFieldError(seniorGroup);
        captureFirstError(seniorGroup);
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
      stream,
      courseLevel,
      courseName,
      tag,
      seniorSupport,
      seniorName: pickSeniorVal || "",
      followUpDate: followUpDate || "",
      followUpTime: followUpTime || "",
      remarks
    });
  }

  try {
    console.log("Submitting data:", formData);

    showLoader();

    const minimumLoaderTime = new Promise((resolve) => setTimeout(resolve, 700));
    const request = fetch(
      "https://script.google.com/macros/s/AKfycbxFCvuJg-1s2OtnoNq-BgogG_1nt7CyRPF2RT81gHJw6ZSTHhTUV21mXDmhVZuolv87/exec",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain"
        },
        body: JSON.stringify(formData)
      }
    );

    await Promise.all([request, minimumLoaderTime]);

    console.log("Data submitted successfully");

    mainPage.style.display = "none";
    summaryPage.style.display = "flex";

  } catch (error) {
    console.log("Error:", error);
    showAlert("Failed to save data. Check console for details.");
  } finally {
    hideLoader();
  }
});

// BACK BUTTON
document.getElementById("backBtn").addEventListener("click", () => {
  summaryPage.style.display = "none";
  mainPage.style.display = "block";
});
