const moduleName = localStorage.getItem("module");
let moduleKey = moduleName;

if(moduleName === "threats"){
  moduleKey = "identity";
}
const userId = localStorage.getItem("userId");
const lang = localStorage.getItem("language") || "en";

/* ===========================
TRANSLATIONS
=========================== */

const translations = {

en:{
phishing:"Phishing Awareness",
cyberbullying:"Cyberbullying Awareness",
scams:"Online Scams",
identity:"Identify Threats",
easy:"Easy Level",
medium:"Medium Level",
hard:"Hard Level",
final:"Final Assessment",

easyDesc:"Learn the basic concepts",
mediumDesc:"Intermediate cyber safety",
hardDesc:"Advanced cyber threats",
finalDesc:"Complete course and earn certificate",

desc:"Complete levels step-by-step to unlock the final assessment",

easyAlert:"Complete Easy Level first",
mediumAlert:"Complete Medium Level first",
hardAlert:"Complete Hard Level first"
},

te:{
phishing:"ఫిషింగ్ అవగాహన",
cyberbullying:"సైబర్ బులీయింగ్ అవగాహన",
scams:"ఆన్‌లైన్ మోసాలు",   // TE
identity:"సైబర్ ప్రమాదాలు",
easy:"సులభ స్థాయి",
medium:"మధ్య స్థాయి",
hard:"కఠిన స్థాయి",
final:"చివరి పరీక్ష",

easyDesc:"మూల భావనలు నేర్చుకోండి",
mediumDesc:"మధ్యస్థ సైబర్ భద్రత",
hardDesc:"అధునాతన సైబర్ ప్రమాదాలు",
finalDesc:"కోర్సు పూర్తి చేసి సర్టిఫికేట్ పొందండి",

desc:"చివరి పరీక్షను అన్‌లాక్ చేయడానికి దశల వారీగా లెవెల్స్ పూర్తి చేయండి",

easyAlert:"ముందుగా సులభ స్థాయి పూర్తి చేయండి",
mediumAlert:"ముందుగా మధ్య స్థాయి పూర్తి చేయండి",
hardAlert:"ముందుగా కఠిన స్థాయి పూర్తి చేయండి"
},

hi:{
phishing:"फिशिंग जागरूकता",
cyberbullying:"साइबर बुलिंग जागरूकता",
scams:"ऑनलाइन धोखाधड़ी",   // HI
identity:"खतरों की पहचान",
easy:"आसान स्तर",
medium:"मध्यम स्तर",
hard:"कठिन स्तर",
final:"अंतिम परीक्षण",

easyDesc:"बुनियादी अवधारणाएँ सीखें",
mediumDesc:"मध्यम स्तर की साइबर सुरक्षा",
hardDesc:"उन्नत साइबर खतरे",
finalDesc:"कोर्स पूरा करें और प्रमाणपत्र प्राप्त करें",

desc:"अंतिम परीक्षण अनलॉक करने के लिए स्तरों को क्रम से पूरा करें",

easyAlert:"पहले आसान स्तर पूरा करें",
mediumAlert:"पहले मध्यम स्तर पूरा करें",
hardAlert:"पहले कठिन स्तर पूरा करें"
}

};

const t = translations[lang] || translations.en;

/* ===========================
MODULE TITLE
=========================== */

const titleElement = document.getElementById("moduleTitle");

if(titleElement){
titleElement.innerText = t[moduleKey] || t[moduleName] || moduleName;
}

/* ===========================
MODULE DESCRIPTION
=========================== */

const desc = document.getElementById("moduleDesc");
if(desc){
desc.innerText = t.desc;
}

/* ===========================
UPDATE LEVEL TITLES
=========================== */

const easyTitle = document.querySelector("#easyBtn h3");
const mediumTitle = document.querySelector("#mediumBtn h3");
const hardTitle = document.querySelector("#hardBtn h3");
const finalTitle = document.querySelector("#finalBtn h3");

if(easyTitle) easyTitle.innerText = t.easy;
if(mediumTitle) mediumTitle.innerText = t.medium;
if(hardTitle) hardTitle.innerText = t.hard;
if(finalTitle) finalTitle.innerText = t.final;

/* ===========================
UPDATE LEVEL DESCRIPTIONS
=========================== */

const easyDesc = document.querySelector("#easyBtn p");
const mediumDesc = document.querySelector("#mediumBtn p");
const hardDesc = document.querySelector("#hardBtn p");
const finalDesc = document.querySelector("#finalBtn p");

if(easyDesc) easyDesc.innerText = t.easyDesc;
if(mediumDesc) mediumDesc.innerText = t.mediumDesc;
if(hardDesc) hardDesc.innerText = t.hardDesc;
if(finalDesc) finalDesc.innerText = t.finalDesc;

/* ===========================
READ LEVEL PROGRESS
=========================== */

const easyPassed =
localStorage.getItem(userId + "_" + moduleName + "_easy_passed");

const mediumPassed =
localStorage.getItem(userId + "_" + moduleName + "_medium_passed");

const hardPassed =
localStorage.getItem(userId + "_" + moduleName + "_hard_passed");

/* ===========================
BUTTON REFERENCES
=========================== */

const easyBtn = document.getElementById("easyBtn");
const mediumBtn = document.getElementById("mediumBtn");
const hardBtn = document.getElementById("hardBtn");
const finalBtn = document.getElementById("finalBtn");

/* ===========================
UNLOCK LEVELS
=========================== */

if(easyPassed && mediumBtn){
mediumBtn.classList.remove("locked");
mediumBtn.setAttribute("onclick","startLevel('medium')");
}

if(mediumPassed && hardBtn){
hardBtn.classList.remove("locked");
hardBtn.setAttribute("onclick","startLevel('hard')");
}

if(hardPassed && finalBtn){
finalBtn.classList.remove("locked");
finalBtn.setAttribute("onclick","startLevel('final')");
}

/* ===========================
START LEVEL FUNCTION
=========================== */

function startLevel(level){

if(level === "medium" && !easyPassed){
alert(t.easyAlert);
return;
}

if(level === "hard" && !mediumPassed){
alert(t.mediumAlert);
return;
}

if(level === "final" && !hardPassed){
alert(t.hardAlert);
return;
}

localStorage.setItem("difficulty", level);

if(level === "final"){
window.location.href = "finalQuiz.html";
}
else{
window.location.href = "content.html";
}

}