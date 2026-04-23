/* ---------------- LANGUAGE FUNCTION ---------------- */

function getLang() {
    return localStorage.getItem("language") || "en";
}

/* ---------------- LOAD DASHBOARD ---------------- */

window.onload = function () {

const lang = getLang();

/* ---------------- TRANSLATIONS ---------------- */

const translations = {

en:{
title:"CyberSafety Education",
heading:"Start Your Cyber Safety Learning",

m1:"🛡 Phishing Awareness",
m2:"💳 Online Scams",
m3:"⚠ Identify Threats",
m4:"👥 Cyberbullying",

m1desc:"Learn how attackers steal passwords.",
m2desc:"Understand common online frauds.",
m3desc:"Learn how your identity can be misused online.",
m4desc:"Learn safe behaviour online.",

name:"Name",
age:"Age",
progress:"Progress",
certificate:"Download Certificate",

moduleCompleted:"This module has already been completed.",
certificateAlert:"Complete at least one module to access certificates.",

logout:"Logout"  , // ✅ ADDED

quickTitle:"⚡ Quick Learning",
tutorial:"🎥 Tutorial Guides",
news:"📰 Cyber Alerts & News Block",
scenario:"⚠ Real Life Scenarios",

phishing:"Phishing",
scams:"Scams",
threats:"Threats",
cyberbullying:"Cyberbullying"
},

te:{
title:"సైబర్ భద్రత విద్య",
heading:"మీ సైబర్ భద్రత నేర్చుకోవడం ప్రారంభించండి",

m1:"🛡 ఫిషింగ్ అవగాహన",
m2:"💳 ఆన్‌లైన్ మోసాలు",
m3:"⚠ సైబర్ ప్రమాదాలు",
m4:"👥 సైబర్ బులీయింగ్",

m1desc:"హ్యాకర్లు పాస్‌వర్డ్‌లు ఎలా దొంగిలిస్తారో తెలుసుకోండి.",
m2desc:"సాధారణ ఆన్‌లైన్ మోసాలను అర్థం చేసుకోండి.",
m3desc:"మీ గుర్తింపు ఎలా దుర్వినియోగం అవుతుందో తెలుసుకోండి.",
m4desc:"ఆన్‌లైన్‌లో సురక్షితంగా ఉండడం నేర్చుకోండి.",

name:"పేరు",
age:"వయస్సు",
progress:"ప్రగతి",
certificate:"సర్టిఫికేట్ డౌన్‌లోడ్",

moduleCompleted:"ఈ మాడ్యూల్ ఇప్పటికే పూర్తయింది.",
certificateAlert:"కనీసం ఒక మాడ్యూల్ పూర్తి చేయండి.",

logout:"లాగ్ అవుట్",   // ✅ ADDED

quickTitle:"⚡ త్వరిత అభ్యాసం",
tutorial:"🎥 ట్యుటోరియల్ గైడ్స్",
news:"📰 సైబర్ అలర్ట్స్ & వార్తలు",
scenario:"⚠ నిజ జీవితం పరిస్థితులు",

phishing:"ఫిషింగ్",
scams:"మోసాలు",
threats:"ప్రమాదాలు",
cyberbullying:"సైబర్ బులీయింగ్"
},

hi:{
title:"साइबर सुरक्षा शिक्षा",
heading:"अपनी साइबर सुरक्षा सीखना शुरू करें",

m1:"🛡 फिशिंग जागरूकता",
m2:"💳 ऑनलाइन धोखाधड़ी",
m3:"⚠ खतरों की पहचान",
m4:"👥 साइबर बुलिंग",

m1desc:"जानें हमलावर पासवर्ड कैसे चुराते हैं।",
m2desc:"ऑनलाइन धोखाधड़ी को समझें।",
m3desc:"जानें आपकी पहचान कैसे गलत तरीके से उपयोग हो सकती है।",
m4desc:"ऑनलाइन सुरक्षित व्यवहार सीखें।",

name:"नाम",
age:"आयु",
progress:"प्रगति",
certificate:"प्रमाणपत्र डाउनलोड",

moduleCompleted:"यह मॉड्यूल पहले ही पूरा हो चुका है।",
certificateAlert:"कम से कम एक मॉड्यूल पूरा करें।",

logout:"लॉगआउट" ,  // ✅ ADDED

quickTitle:"⚡ त्वरित सीख",
tutorial:"🎥 ट्यूटोरियल गाइड्स",
news:"📰 साइबर अलर्ट्स और समाचार",
scenario:"⚠ वास्तविक जीवन परिदृश्य",

phishing:"फिशिंग",
scams:"घोटाले",
threats:"खतरे",
cyberbullying:"साइबर बुलिंग"
}

};

const t = translations[lang] || translations.en;

/* ---------------- TITLE ---------------- */

const title = document.getElementById("dashboardTitle");
if(title) title.innerText = t.title;

/* ---------------- HEADING ---------------- */

const heading = document.getElementById("learningHeading");
if(heading) heading.innerText = t.heading;

/* ---------------- MODULE TEXT ---------------- */

const m1 = document.getElementById("m1");
const m2 = document.getElementById("m2");
const m3 = document.getElementById("m3");
const m4 = document.getElementById("m4");

if(m1) m1.innerHTML = `<h3>${t.m1}</h3><p>${t.m1desc}</p>`;
if(m2) m2.innerHTML = `<h3>${t.m2}</h3><p>${t.m2desc}</p>`;
if(m3) m3.innerHTML = `<h3>${t.m3}</h3><p>${t.m3desc}</p>`;
if(m4) m4.innerHTML = `<h3>${t.m4}</h3><p>${t.m4desc}</p>`;

/* ---------------- CERTIFICATE BUTTON ---------------- */

const certBtn = document.getElementById("certificateBtn");
if(certBtn) certBtn.innerText = t.certificate;

/* ---------------- LOGOUT BUTTON ---------------- */

const logoutBtn = document.getElementById("logoutBtn");
if(logoutBtn) logoutBtn.innerText = t.logout;

/* ---------------- LOAD PROFILE ---------------- */

loadProfile(t);

// ✅ QUICK SECTION HEADINGS FIX
const tHead1 = document.getElementById("tutorialHeading");
const tHead2 = document.getElementById("newsHeading");
const tHead3 = document.getElementById("scenarioHeading");

if(tHead1) tHead1.innerText = "🎥 Tutorial Guides";
if(tHead2) tHead2.innerText = "📰 Cyber Alerts & News Block";
if(tHead3) tHead3.innerText = "⚠ Real Life Scenarios";

/* QUICK LEARNING HEADINGS */

document.getElementById("quickTitle").innerText = t.quickTitle;
document.getElementById("tutorialTitle").innerText = t.tutorial;
document.getElementById("newsTitle").innerText = t.news;
document.getElementById("scenarioTitle").innerText = t.scenario;

/* BUTTON TEXT UPDATE */

// tutorial
document.getElementById("btn_t_phishing").innerText = t.phishing;
document.getElementById("btn_t_scams").innerText = t.scams;
document.getElementById("btn_t_threats").innerText = t.threats;
document.getElementById("btn_t_cyber").innerText = t.cyberbullying;

// news
document.getElementById("btn_n_phishing").innerText = t.phishing;
document.getElementById("btn_n_scams").innerText = t.scams;
document.getElementById("btn_n_threats").innerText = t.threats;
document.getElementById("btn_n_cyber").innerText = t.cyberbullying;

// scenario
document.getElementById("btn_s_phishing").innerText = t.phishing;
document.getElementById("btn_s_scams").innerText = t.scams;
document.getElementById("btn_s_threats").innerText = t.threats;
document.getElementById("btn_s_cyber").innerText = t.cyberbullying;

};


/* ==============================
LOAD USER PROFILE
============================== */

async function loadProfile(t){

const userId = localStorage.getItem("userId");

if(!userId){
console.log("No userId found");
return;
}

try{

const res = await fetch(`${API}/profile/${userId}`);

if(!res.ok){
console.log("API failed");
return;
}

const profile = await res.json();

/* SAVE MODULE PROGRESS */

localStorage.setItem("completedModules", profile.completedModules);

/* AVATAR */

const avatar = document.getElementById("avatarCircle");

if(avatar){
avatar.src = profile.avatar ? "images/" + profile.avatar : "images/default.png";
}

/* SAVE NAME */

localStorage.setItem("fullName",profile.fullName);

/* NAME */

const nameEl = document.getElementById("userName");
if(nameEl){
nameEl.innerText = "👤 " + t.name + " : " + profile.fullName;
}

/* AGE */

const ageEl = document.getElementById("userAge");
if(ageEl){
ageEl.innerText = "🎂 " + t.age + " : " + profile.age;
}

/* PROGRESS */

const progressText = document.getElementById("progressText");

if(progressText){
let completed = profile.completedModules;
progressText.innerText =
"📊 " + t.progress + " : " + completed + "/4";
}

/* PROGRESS BAR */

const progressFill = document.getElementById("progressFill");

if(progressFill){
const percent = (profile.completedModules / 4) * 100;
progressFill.style.width = percent + "%";
}

/* SAVE CERTIFICATE STATUS */

if(profile.certificateGenerated){
localStorage.setItem("certificateGenerated","true");
}

}catch(error){
console.log("Profile loading error:", error);
}

}


/* ==============================
PROFILE MENU
============================== */

function toggleMenu(){

const menu = document.getElementById("profileMenu");

if(!menu) return;

menu.style.display =
menu.style.display === "block" ? "none" : "block";

}


/* ==============================
OPEN MODULE
============================== */

function openModule(module){

const lang = getLang();

const t = {
    en:"This module has already been completed.",
    te:"ఈ మాడ్యూల్ ఇప్పటికే పూర్తయింది.",
    hi:"यह मॉड्यूल पहले ही पूरा हो चुका है।"
};

const userId = localStorage.getItem("userId");

/* 🔥 ADD THIS MAPPING */
let moduleKey = module;

if(module === "threats"){
  moduleKey = "identity";
}

/* 🔥 FIXED LINE */
const completed = localStorage.getItem(userId + "_" + moduleKey + "_completed");

if(completed === "true"){
alert(t[lang]);
return;
}
/*chnaged*/
localStorage.setItem("module",module);
window.location.href="module.html";

}


/* ==============================
DOWNLOAD CERTIFICATE
============================== */

function downloadCertificate(){

const lang = getLang();

const msg = {
    en:"Complete at least one module to access certificates.",
    te:"కనీసం ఒక మాడ్యూల్ పూర్తి చేయండి.",
    hi:"कम से कम एक मॉड्यूल पूरा करें।"
};

const completed = localStorage.getItem("completedModules") || 0;

if(parseInt(completed) === 0){
alert(msg[lang]);
return;
}

window.location.href="certificate.html";

}


/* ==============================
LOGOUT
============================== */

function logout(){
localStorage.clear();
window.location.href="index.html";
}

function openQuick(type, module){

    // fix mapping
    if(module === "threats"){
        module = "identity";
    }

    localStorage.setItem("quickType", type);
    localStorage.setItem("module", module);

    if(type === "scenario"){
        window.location.href = "quickDetails.html";
    } else {
        window.location.href = "quickVideos.html";
    }
}