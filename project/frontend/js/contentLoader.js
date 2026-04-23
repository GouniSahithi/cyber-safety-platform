/* =====================================
LANGUAGE
===================================== */

const lang = localStorage.getItem("language") || "en";

/* =====================================
TRANSLATIONS
===================================== */

const translations = {

en:{
flashcards:"Flashcards",
openFlashcards:"Open Interactive Flashcards",
keyPoints:"Key Safety Points",
video:"Video Explanation",
explanation:"Explanation",
caseStudy:"Case Study",
realScenario:"Real Scenario",
startQuiz:"Start Quiz",
contentNotFound:"Content not found"
},

te:{
flashcards:"ఫ్లాష్‌కార్డ్స్",
openFlashcards:"ఇంటరాక్టివ్ ఫ్లాష్‌కార్డ్స్ ఓపెన్ చేయండి",
keyPoints:"ముఖ్య భద్రత సూచనలు",
video:"వీడియో వివరణ",
explanation:"వివరణ",
caseStudy:"కేస్ స్టడీ",
realScenario:"నిజ జీవిత ఉదాహరణలు",
startQuiz:"క్విజ్ ప్రారంభించండి",
contentNotFound:"కంటెంట్ దొరకలేదు"
},

hi:{
flashcards:"फ्लैशकार्ड्स",
openFlashcards:"इंटरैक्टिव फ्लैशकार्ड खोलें",
keyPoints:"मुख्य सुरक्षा बिंदु",
video:"वीडियो व्याख्या",
explanation:"व्याख्या",
caseStudy:"केस स्टडी",
realScenario:"वास्तविक उदाहरण",
startQuiz:"क्विज़ शुरू करें",
contentNotFound:"सामग्री नहीं मिली"
}

};

const t = translations[lang] || translations.en;


/* =====================================
GET VALUES
===================================== */

const age = localStorage.getItem("ageGroup");
const moduleName = localStorage.getItem("module") || "phishing";
let moduleKey = moduleName;

if(moduleName === "threats"){
  moduleKey = "identity";
}
const difficulty = localStorage.getItem("difficulty") || "easy";

/* MAP AGE */

let ageKey = "";

if(age === "5-15") ageKey = "kids";
else if(age === "16-30") ageKey = "youth";
else ageKey = "adults";


/* =====================================
SELECT CONTENT
===================================== */

let selectedContent = null;

if(ageKey === "kids"){
selectedContent =
kidsContent?.[moduleKey]?.[difficulty]?.[lang] ||
kidsContent?.[moduleKey]?.[difficulty]?.["en"];
}
else if(ageKey === "youth"){
selectedContent =
youthContent?.[moduleKey]?.[difficulty]?.[lang] ||
youthContent?.[moduleKey]?.[difficulty]?.["en"];
}
else{
selectedContent =
adultContent?.[moduleKey]?.[difficulty]?.[lang] ||
adultContent?.[moduleKey]?.[difficulty]?.["en"];
}


/* =====================================
LOAD PAGE
===================================== */

window.onload = function(){

if(!selectedContent){
alert(t.contentNotFound);
return;
}

/* ===== UI TEXT ===== */

document.getElementById("flashcardTitle").innerText = t.flashcards;
document.getElementById("flashcardBtn").innerText = t.openFlashcards;
document.getElementById("keyPointsTitle").innerText = t.keyPoints;
document.getElementById("videoTitle").innerText = t.video;
document.getElementById("explanationTitle").innerText = t.explanation;
document.getElementById("caseStudyTitle").innerText = t.caseStudy;
document.getElementById("realScenarioTitle").innerText = t.realScenario;
document.getElementById("quizBtn").innerText = t.startQuiz;

/* ===== TITLE ===== */

document.getElementById("contentTitle").innerText =
selectedContent.title;

/* ===== VIDEO ===== */

document.getElementById("contentVideo").src =
selectedContent.video;

/* ===== KEY POINTS ===== */

const list = document.getElementById("keyPoints");
list.innerHTML="";

selectedContent.keyPoints.forEach(point=>{
const li=document.createElement("li");
li.innerText=point;
list.appendChild(li);
});

/* ===== ELEMENTS ===== */

const flashBtn = document.getElementById("flashcardBtn");
const flashTitle = document.getElementById("flashcardTitle");

const caseTitle = document.getElementById("caseStudyTitle");
const caseContent = document.getElementById("contentCaseStudy");

const realTitle = document.getElementById("realScenarioTitle");
const realContent = document.getElementById("contentRealScenario");

const explanationBox = document.getElementById("contentExplanation");

/* ================= KIDS ================= */

if(ageKey === "kids"){

flashBtn.style.display = "inline-block";
flashTitle.style.display = "block";

explanationBox.innerHTML = selectedContent.explanation;

caseTitle.style.display = "none";
caseContent.innerHTML = "";

realTitle.style.display = "none";
realContent.innerHTML = "";

}

/* ================= YOUTH ================= */

else if(ageKey === "youth"){

flashBtn.style.display = "none";
flashTitle.style.display = "none";

explanationBox.innerHTML = selectedContent.explanation;

if(selectedContent.caseStudy){
caseTitle.style.display = "block";
caseContent.innerHTML = selectedContent.caseStudy;
}else{
caseTitle.style.display = "none";
caseContent.innerHTML = "";
}

realTitle.style.display = "none";
realContent.innerHTML = "";

}

/* ================= ADULT ================= */

else{

flashBtn.style.display = "none";
flashTitle.style.display = "none";

explanationBox.innerHTML = selectedContent.explanation;

caseTitle.style.display = "none";
caseContent.innerHTML = "";

realTitle.style.display = "block";
realContent.innerHTML =
selectedContent.realScenario || "Real-world cyber scenarios.";

}

/* ===== STORE QUIZ ===== */

localStorage.setItem(
"currentQuiz",
JSON.stringify(selectedContent.quiz)
);

};


/* =====================================
FLASHCARD
===================================== */

function openFlashcard(){
const page =
`flashcards_${ageKey}_${moduleKey}_${difficulty}_${lang}.html`;
window.location.href = page;
}

/* =====================================
QUIZ
===================================== */

function startQuiz(){
window.location.href="quiz.html";
}