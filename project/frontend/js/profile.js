let selectedAvatar = "";

window.onload = function () {

const lang = getLang();

const translations = {

en:{
title:"Create Profile",
fullname:"Full Name",
age:"Age",
gender:"Select Gender",
male:"Male",
female:"Female",
other:"Other",
avatar:"Select Avatar",
save:"Save Profile"
},

te:{
title:"ప్రొఫైల్ సృష్టించండి",
fullname:"పూర్తి పేరు",
age:"వయస్సు",
gender:"లింగాన్ని ఎంచుకోండి",
male:"పురుషుడు",
female:"మహిళ",
other:"ఇతరులు",
avatar:"అవతార్ ఎంచుకోండి",
save:"సేవ్ చేయండి"
},

hi:{
title:"प्रोफाइल बनाएं",
fullname:"पूरा नाम",
age:"आयु",
gender:"लिंग चुनें",
male:"पुरुष",
female:"महिला",
other:"अन्य",
avatar:"अवतार चुनें",
save:"सेव प्रोफाइल"
}

};

const t = translations[lang];

document.getElementById("profileTitle").innerText = t.title;
document.getElementById("fullName").placeholder = t.fullname;
document.getElementById("age").placeholder = t.age;

document.getElementById("genderDefault").innerText = t.gender;
document.getElementById("maleOption").innerText = t.male;
document.getElementById("femaleOption").innerText = t.female;
document.getElementById("otherOption").innerText = t.other;

document.getElementById("avatarText").innerText = t.avatar;
document.getElementById("saveBtn").innerText = t.save;

};


/* =========================
AVATAR SELECT
========================= */

function selectAvatar(avatar){

selectedAvatar = avatar;

document.querySelectorAll(".avatar").forEach(img=>{
img.classList.remove("selected");
});

event.target.classList.add("selected");

}


/* =========================
SAVE PROFILE
========================= */

async function saveProfile(){

const userId = localStorage.getItem("userId");

if(!userId){
alert("User not found. Please login again.");
window.location.href="login.html";
return;
}

/* GET AGE VALUE */

const ageValue = parseInt(
document.getElementById("age").value
);

/* VALIDATE AGE */

if(!ageValue || ageValue <= 0){
alert("Please enter valid age");
return;
}


/* DETERMINE AGE GROUP */

let ageGroup = "";

if(ageValue >= 5 && ageValue <= 15){

ageGroup = "5-15";

}
else if(ageValue >= 16 && ageValue <= 30){

ageGroup = "16-30";

}
else{

ageGroup = "30+";

}

/* SAVE AGE GROUP */

localStorage.setItem("ageGroup",ageGroup);


/* PROFILE DATA */

const profileData = {

fullName:document.getElementById("fullName").value,
age:ageValue,
gender:document.getElementById("gender").value,
avatar:selectedAvatar

};


try{

const res = await fetch(`${API}/profile/save/${userId}`,{

method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(profileData)

});

if(res.ok){

window.location.href="age.html";

}
else{

alert("Profile save failed");

}

}
catch(error){

console.error(error);
alert("Server error");

}

}