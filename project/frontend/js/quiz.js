/* ===============================
LANGUAGE
=============================== */

const lang = localStorage.getItem("language") || "en";

/* ===============================
TRANSLATIONS
=============================== */

const translations = {

en:{
title:"Module Quiz",
subtitle:"Answer the questions and score 75% or above to pass this level.",
back:"⬅ Back",
submit:"Submit Quiz",
quizNotFound:"Quiz not found",
score:"Score",
passed:"🎉 Level Passed",
fail:"Score below 75%. Try again.",
mediumUnlocked:"Medium Level Unlocked",
hardUnlocked:"Hard Level Unlocked",
finalUnlocked:"Final Assessment Unlocked"
},

te:{
title:"మాడ్యూల్ క్విజ్",
subtitle:"ఈ స్థాయిని ఉత్తీర్ణం కావడానికి 75% లేదా అంతకంటే ఎక్కువ స్కోర్ చేయండి.",
back:"⬅ వెనక్కి",
submit:"క్విజ్ సమర్పించండి",
quizNotFound:"క్విజ్ దొరకలేదు",
score:"స్కోర్",
passed:"🎉 లెవెల్ పూర్తి అయింది",
fail:"75% కంటే తక్కువ స్కోర్. మళ్లీ ప్రయత్నించండి.",
mediumUnlocked:"మధ్య స్థాయి అన్‌లాక్ అయింది",
hardUnlocked:"కఠిన స్థాయి అన్‌లాక్ అయింది",
finalUnlocked:"ఫైనల్ అసెస్‌మెంట్ అన్‌లాక్ అయింది"
},

hi:{
title:"मॉड्यूल क्विज़",
subtitle:"इस स्तर को पास करने के लिए 75% या उससे अधिक स्कोर करें।",
back:"⬅ वापस",
submit:"क्विज़ जमा करें",
quizNotFound:"क्विज़ नहीं मिला",
score:"स्कोर",
passed:"🎉 स्तर पास हुआ",
fail:"75% से कम स्कोर। फिर से प्रयास करें।",
mediumUnlocked:"मध्यम स्तर अनलॉक हुआ",
hardUnlocked:"कठिन स्तर अनलॉक हुआ",
finalUnlocked:"अंतिम परीक्षण अनलॉक हुआ"
}

};

const t = translations[lang] || translations.en;


/* ===============================
SET UI TEXT
=============================== */

document.getElementById("quizTitle").innerText = t.title;
document.getElementById("quizSubtitle").innerText = t.subtitle;
document.getElementById("backBtn").innerText = t.back;
document.getElementById("submitBtn").innerText = t.submit;


/* ===============================
LOAD QUIZ FROM LOCAL STORAGE
=============================== */

const quizData =
JSON.parse(localStorage.getItem("currentQuiz"));

const moduleName =
localStorage.getItem("module");

const difficulty =
localStorage.getItem("difficulty");

const userId =
localStorage.getItem("userId");

const quizContainer =
document.getElementById("quizContainer");


/* ===============================
CHECK QUIZ EXISTS
=============================== */

if(!quizData){

alert(t.quizNotFound);
window.location.href="module.html";

}


/* ===============================
LOAD QUESTIONS
=============================== */

quizData.forEach((q,index)=>{

let html = `
<div class="quiz-question">
<p class="question-title">${index+1}. ${q.question}</p>
`;

q.options.forEach((opt,i)=>{

html += `
<label class="quiz-option">
<input type="radio" name="q${index}" value="${i}">
<span>${opt}</span>
</label>
`;

});

html += "</div>";

quizContainer.innerHTML += html;

});


/* ===============================
SUBMIT QUIZ
=============================== */

async function submitQuiz(){

let score = 0;

quizData.forEach((q,index)=>{

const selected =
document.querySelector(`input[name="q${index}"]:checked`);

if(selected && selected.value == q.answer){
score++;
}

});

const percent =
(score / quizData.length) * 100;

alert(`${t.score}: ${percent}%`);


if(percent >= 75){

alert(t.passed);


/* UNLOCK NEXT LEVEL */

if(difficulty === "easy"){

localStorage.setItem(
userId+"_"+moduleName+"_easy_passed",
true
);

alert(t.mediumUnlocked);

}

else if(difficulty === "medium"){

localStorage.setItem(
userId+"_"+moduleName+"_medium_passed",
true
);

alert(t.hardUnlocked);

}

else if(difficulty === "hard"){

localStorage.setItem(
userId+"_"+moduleName+"_hard_passed",
true
);

alert(t.finalUnlocked);

}


/* REDIRECT */

window.location.href="module.html";

}

else{

alert(t.fail);

}

}


/* ===============================
BACK BUTTON
=============================== */

function goBack(){

window.location.href="module.html";

}