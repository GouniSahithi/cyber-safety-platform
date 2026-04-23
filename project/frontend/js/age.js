window.onload = function(){

const lang = getLang();

const translations = {

en:{
title:"Select Your Age Group",
warning:"Please open your correct age group: "
},

te:{
title:"మీ వయస్సు గ్రూప్ ఎంచుకోండి",
warning:"దయచేసి మీ సరైన వయస్సు గ్రూప్ తెరవండి: "
},

hi:{
title:"अपना आयु समूह चुनें",
warning:"कृपया अपना सही आयु समूह खोलें: "
}

};

const t = translations[lang] || translations.en;

document.getElementById("ageTitle").innerText = t.title;

};


/* ===============================
SELECT AGE
=============================== */

function selectAge(age){

const userAgeGroup = localStorage.getItem("ageGroup");
const lang = getLang();

const warnings = {

en:"Please open your correct age group: ",
te:"దయచేసి మీ సరైన వయస్సు గ్రూప్ తెరవండి: ",
hi:"कृपया अपना सही आयु समूह खोलें: "

};

const message = warnings[lang] || warnings.en;


/* BLOCK WRONG AGE */

if(userAgeGroup && userAgeGroup !== age){

alert(message + userAgeGroup);

return;

}

/* SAVE AGE */

localStorage.setItem("ageGroup",age);

window.location.href="dashboard.html";

}