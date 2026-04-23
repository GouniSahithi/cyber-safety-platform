document.addEventListener("DOMContentLoaded", function(){

/* =========================
LANGUAGE
========================= */

const lang = localStorage.getItem("language") || "en";

/* =========================
TRANSLATIONS
========================= */

const translations = {

en:{
title:"Final Assessment",
subtitle:"Answer all questions. Score 75% or above to pass.",
back:"⬅ Back",
prev:"Previous",
next:"Next",
submit:"Submit Quiz",
score:"Final Score",
passed:"🎉 Module Completed!",
fail:"You must score 75% to pass",
session:"Session expired. Please login again."
},

te:{
title:"చివరి పరీక్ష",
subtitle:"అన్ని ప్రశ్నలకు సమాధానం ఇవ్వండి. 75% లేదా అంతకంటే ఎక్కువ స్కోర్ చేయాలి.",
back:"⬅ వెనక్కి",
prev:"మునుపటి",
next:"తర్వాత",
submit:"క్విజ్ సమర్పించండి",
score:"చివరి స్కోర్",
passed:"🎉 మాడ్యూల్ పూర్తి అయింది!",
fail:"75% స్కోర్ అవసరం",
session:"సెషన్ ముగిసింది. మళ్లీ లాగిన్ అవ్వండి."
},

hi:{
title:"अंतिम परीक्षण",
subtitle:"सभी प्रश्नों के उत्तर दें। 75% या अधिक स्कोर करें।",
back:"⬅ वापस",
prev:"पिछला",
next:"अगला",
submit:"क्विज़ जमा करें",
score:"अंतिम स्कोर",
passed:"🎉 मॉड्यूल पूरा हुआ!",
fail:"75% स्कोर आवश्यक है",
session:"सेशन समाप्त। कृपया फिर से लॉगिन करें।"
}

};

const t = translations[lang] || translations.en;

/* =========================
SET UI TEXT
========================= */

document.getElementById("finalTitle").innerText = t.title;
document.getElementById("finalSubtitle").innerText = t.subtitle;
document.getElementById("backBtn").innerText = t.back;
document.getElementById("prevBtn").innerText = t.prev;
document.getElementById("nextBtn").innerText = t.next;
document.getElementById("submitBtn").innerText = t.submit;

/* =========================
USER DATA
========================= */

const moduleName = (localStorage.getItem("module") || "").toLowerCase();
let moduleKey = moduleName;

if(moduleName === "threats"){
  moduleKey = "identity";
}
const userId = localStorage.getItem("userId");

if(!userId){
alert(t.session);
window.location.href="login.html";
}

const quizContainer = document.getElementById("quizContainer");
const API = "http://localhost:8080/api";

const QUESTIONS_PER_PAGE = 10;

let currentPage = 0;
let answers = {};

/* =========================
FINAL QUIZ DATA
========================= */

const finalQuizData = {

phishing:{
en: [
{
question:"What is phishing?",
options:["A cyber attack to steal information","A computer game","A software update"],
answer:0
},
{
question:"Strong passwords help to:",
options:["Protect accounts","Slow the computer","Delete files"],
answer:0
},
{
question:"If someone asks your password online you should:",
options:["Share it","Ignore and report","Send it quickly"],
answer:1
},
{
question:"Phishing emails often contain:",
options:["Spelling mistakes and fake links","Beautiful wallpapers","Music files"],
answer:0
},
{
question:"Two-factor authentication adds:",
options:["Extra security","Extra games","Extra storage"],
answer:0
},
{
question:"If a message says 'Act fast or lose access', it is:",
options:["A phishing trick","A normal update","A friendly reminder"],
answer:0
},
{
question:"Safe websites usually start with:",
options:["http://","https://","ftp://"],
answer:1
},
{
question:"You should report suspicious emails to:",
options:["Parents/Teachers","Strangers online","Nobody"],
answer:0
},
{
question:"Phishers often pretend to be:",
options:["Trusted companies or friends","Cartoon characters","Weather apps"],
answer:0
},
{
question:"Clicking unknown links can lead to:",
options:["Information theft","Free gifts","Better internet speed"],
answer:0
},
{
question:"Sharing personal info on public sites is:",
options:["Risky","Safe","Recommended"],
answer:0
},
{
question:"Phishing can happen through:",
options:["Emails, SMS, social media","Only newspapers","Only phone calls"],
answer:0
},
{
question:"If a website looks odd you should:",
options:["Close it and report","Enter your password","Download files"],
answer:0
},
{
question:"Phishing can cause:",
options:["Identity theft and money loss","Better grades","Free internet"],
answer:0
},
{
question:"Never share your password with:",
options:["Friends or strangers","Yourself","Your computer"],
answer:0
},
{
question:"Phishing in games may look like:",
options:["Fake offers for free coins","New levels unlocked","Better graphics"],
answer:0
},
{
question:"If you get a 'Free phone' message you should:",
options:["Ignore and report","Send details","Celebrate"],
answer:0
},
{
question:"Phishing messages often create:",
options:["Urgency and fear","Fun and joy","Music and dance"],
answer:0
},
{
question:"Best way to confirm a message is real:",
options:["Check with official source","Trust the sender","Click the link"],
answer:0
},
{
question:"Strong passwords should include:",
options:["Letters, numbers, symbols","Only your name","Only 12345"],
answer:0
},
{
question:"If a stranger sends you a game link, you should:",
options:["Click it immediately","Ignore and tell an adult","Share it with friends"],
answer:1
},
{
question:"Smishing means phishing through:",
options:["SMS messages","Emails","Phone calls"],
answer:0
},
{
question:"Vishing means phishing through:",
options:["Voice calls","Video games","Virtual reality"],
answer:0
},
{
question:"If an email says 'You won a prize', it is usually:",
options:["A scam","A real gift","A school project"],
answer:0
},
{
question:"Why should you not overshare on social media?",
options:["Scammers may misuse your info","Friends will get bored","Teachers will be angry"],
answer:0
},
{
question:"If a bank email asks for your password:",
options:["Report it, banks never ask passwords","Send it quickly","Ignore and delete your account"],
answer:0
},
{
question:"Phishing can trick you into:",
options:["Giving personal details","Playing more games","Sleeping early"],
answer:0
},
{
question:"If a link looks suspicious you should:",
options:["Hover to check before clicking","Click fast","Share with everyone"],
answer:0
},
{
question:"Why is updating software important?",
options:["Protects against phishing and malware","Makes computer slower","Deletes your files"],
answer:0
},
{
question:"Which of the following is an examole of Phishing attack?",
options:["A software update notification from microsoft","An email from bank asking to click a link and reset password","A legitimate LinkedIn connection"],
answer:1
}
],

te : [
{
question:"ఫిషింగ్ అంటే ఏమిటి?",
options:["సమాచారం దొంగిలించడానికి సైబర్ దాడి","కంప్యూటర్ గేమ్","సాఫ్ట్‌వేర్ అప్‌డేట్"],
answer:0
},
{
question:"బలమైన పాస్‌వర్డ్‌లు సహాయపడతాయి:",
options:["అకౌంట్‌లను రక్షించడానికి","కంప్యూటర్‌ను నెమ్మదిగా చేయడానికి","ఫైల్‌లను డిలీట్ చేయడానికి"],
answer:0
},
{
question:"ఎవరైనా ఆన్‌లైన్‌లో మీ పాస్‌వర్డ్ అడిగితే మీరు:",
options:["పంచుకోవాలి","పట్టించుకోకుండా రిపోర్ట్ చేయాలి","త్వరగా పంపాలి"],
answer:1
},
{
question:"ఫిషింగ్ ఇమెయిల్‌లలో తరచుగా ఉంటాయి:",
options:["స్పెల్లింగ్ తప్పులు మరియు నకిలీ లింకులు","అందమైన వాల్‌పేపర్లు","మ్యూజిక్ ఫైల్‌లు"],
answer:0
},
{
question:"టూ-ఫాక్టర్ ఆథెంటికేషన్ ఇస్తుంది:",
options:["అదనపు భద్రత","అదనపు గేమ్‌లు","అదనపు స్టోరేజ్"],
answer:0
},
{
question:"'త్వరగా చేయకపోతే యాక్సెస్ కోల్పోతారు' అని సందేశం వస్తే అది:",
options:["ఫిషింగ్ ట్రిక్","సాధారణ అప్‌డేట్","స్నేహపూర్వక రిమైండర్"],
answer:0
},
{
question:"సురక్షిత వెబ్‌సైట్‌లు సాధారణంగా ఇలా ప్రారంభమవుతాయి:",
options:["http://","https://","ftp://"],
answer:1
},
{
question:"అనుమానాస్పద ఇమెయిల్‌లను మీరు ఎవరికీ రిపోర్ట్ చేయాలి?",
options:["తల్లిదండ్రులు/టీచర్","ఆన్‌లైన్ అపరిచితులు","ఎవరూ కాదు"],
answer:0
},
{
question:"ఫిషర్లు తరచుగా ఇలా నటిస్తారు:",
options:["నమ్మదగిన కంపెనీలు లేదా స్నేహితులు","కార్టూన్ పాత్రలు","వాతావరణ యాప్‌లు"],
answer:0
},
{
question:"తెలియని లింక్‌లను క్లిక్ చేస్తే:",
options:["సమాచారం దొంగిలించబడుతుంది","ఫ్రీ గిఫ్ట్‌లు వస్తాయి","ఇంటర్నెట్ వేగం పెరుగుతుంది"],
answer:0
},
{
question:"పబ్లిక్ సైట్‌లలో వ్యక్తిగత సమాచారం పంచుకోవడం:",
options:["ప్రమాదకరం","సురక్షితం","సిఫార్సు చేయబడింది"],
answer:0
},
{
question:"ఫిషింగ్ జరగవచ్చు:",
options:["ఇమెయిల్‌లు, SMS, సోషల్ మీడియా","కేవలం పత్రికలు","కేవలం ఫోన్ కాల్స్"],
answer:0
},
{
question:"వెబ్‌సైట్ వింతగా కనిపిస్తే మీరు:",
options:["మూసి రిపోర్ట్ చేయాలి","పాస్‌వర్డ్ ఇవ్వాలి","ఫైల్‌లు డౌన్‌లోడ్ చేయాలి"],
answer:0
},
{
question:"ఫిషింగ్ వల్ల:",
options:["ఐడెంటిటీ దొంగిలింపు మరియు డబ్బు నష్టం","మంచి గ్రేడ్‌లు","ఫ్రీ ఇంటర్నెట్"],
answer:0
},
{
question:"మీ పాస్‌వర్డ్ ఎప్పుడూ పంచకూడదు:",
options:["స్నేహితులు లేదా అపరిచితులు","మీరు మీరే","మీ కంప్యూటర్"],
answer:0
},
{
question:"గేమ్‌లలో ఫిషింగ్ ఇలా కనిపించవచ్చు:",
options:["ఫ్రీ కాయిన్స్ కోసం నకిలీ ఆఫర్‌లు","కొత్త లెవెల్‌లు అన్‌లాక్ అవుతాయి","గ్రాఫిక్స్ మెరుగవుతాయి"],
answer:0
},
{
question:"'ఫ్రీ ఫోన్' సందేశం వస్తే మీరు:",
options:["పట్టించుకోకుండా రిపోర్ట్ చేయాలి","వివరాలు పంపాలి","సెలబ్రేట్ చేయాలి"],
answer:0
},
{
question:"ఫిషింగ్ సందేశాలు తరచుగా సృష్టిస్తాయి:",
options:["అత్యవసరత మరియు భయం","ఆనందం","సంగీతం మరియు నృత్యం"],
answer:0
},
{
question:"సందేశం నిజమా కాదా తెలుసుకోవడానికి ఉత్తమ మార్గం:",
options:["అధికారిక వనరుతో ధృవీకరించాలి","సెండర్‌ను నమ్మాలి","లింక్ క్లిక్ చేయాలి"],
answer:0
},
{
question:"బలమైన పాస్‌వర్డ్‌లో ఉండాలి:",
options:["అక్షరాలు, సంఖ్యలు, చిహ్నాలు","మీ పేరు మాత్రమే","12345 మాత్రమే"],
answer:0
},
{
question:"అపరిచితుడు గేమ్ లింక్ పంపితే మీరు:",
options:["వెంటనే క్లిక్ చేయాలి","పట్టించుకోకుండా పెద్దలకు చెప్పాలి","స్నేహితులతో పంచుకోవాలి"],
answer:1
},
{
question:"స్మిషింగ్ అంటే ఫిషింగ్:",
options:["SMS సందేశాల ద్వారా","ఇమెయిల్‌ల ద్వారా","ఫోన్ కాల్స్ ద్వారా"],
answer:0
},
{
question:"విషింగ్ అంటే ఫిషింగ్:",
options:["వాయిస్ కాల్స్ ద్వారా","వీడియో గేమ్‌ల ద్వారా","వర్చువల్ రియాలిటీ ద్వారా"],
answer:0
},
{
question:"ఇమెయిల్‌లో 'మీరు బహుమతి గెలిచారు' అని వస్తే అది సాధారణంగా:",
options:["ఒక స్కామ్","నిజమైన గిఫ్ట్","స్కూల్ ప్రాజెక్ట్"],
answer:0
},
{
question:"సోషల్ మీడియాలో ఎక్కువగా సమాచారం పంచకూడదు ఎందుకంటే:",
options:["స్కామర్లు దుర్వినియోగం చేస్తారు","స్నేహితులు విసుగుపడతారు","టీచర్లు కోపపడతారు"],
answer:0
},
{
question:"బ్యాంక్ ఇమెయిల్ పాస్‌వర్డ్ అడిగితే:",
options:["రిపోర్ట్ చేయాలి, బ్యాంక్ ఎప్పుడూ పాస్‌వర్డ్ అడగదు","త్వరగా పంపాలి","అకౌంట్ డిలీట్ చేయాలి"],
answer:0
},
{
question:"ఫిషింగ్ మిమ్మల్ని మోసం చేసి చేయించేది:",
options:["వ్యక్తిగత వివరాలు ఇవ్వడం","మరిన్ని గేమ్‌లు ఆడడం","త్వరగా నిద్రపోవడం"],
answer:0
},
{
question:"లింక్ అనుమానాస్పదంగా కనిపిస్తే మీరు:",
options:["క్లిక్ చేయడానికి ముందు హోవర్ చేసి చూడాలి","త్వరగా క్లిక్ చేయాలి","అందరితో పంచుకోవాలి"],
answer:0
},
{
question:"సాఫ్ట్‌వేర్ అప్‌డేట్ ఎందుకు ముఖ్యం?",
options:["ఫిషింగ్ మరియు మాల్వేర్ నుండి రక్షిస్తుంది","కంప్యూటర్ నెమ్మదిగా చేస్తుంది","ఫైల్‌లు డిలీట్ చేస్తుంది"],
answer:0
},
{
question:"ఫిషింగ్ దాడి ఉదాహరణ ఏది?",
options:["మైక్రోసాఫ్ట్ నుండి సాఫ్ట్‌వేర్ అప్‌డేట్ నోటిఫికేషన్","బ్యాంక్ నుండి లింక్ క్లిక్ చేసి పాస్‌వర్డ్ రీసెట్ చేయమని ఇమెయిల్","లెజిటిమేట్ లింక్డ్‌ఇన్ కనెక్షన్"],
answer:1
}
],

hi :[
{
question:"फ़िशिंग क्या है?",
options:["जानकारी चुराने का साइबर हमला","एक कंप्यूटर गेम","एक सॉफ़्टवेयर अपडेट"],
answer:0
},
{
question:"मज़बूत पासवर्ड मदद करते हैं:",
options:["अकाउंट सुरक्षित रखने में","कंप्यूटर धीमा करने में","फ़ाइलें डिलीट करने में"],
answer:0
},
{
question:"अगर कोई ऑनलाइन पासवर्ड माँगे तो आपको:",
options:["साझा करना","नज़रअंदाज़ कर रिपोर्ट करना","जल्दी भेजना"],answer:1
},
{
question:"फ़िशिंग ईमेल में अक्सर होते हैं:",
options:["गलत वर्तनी और नकली लिंक","सुंदर वॉलपेपर","म्यूज़िक फ़ाइलें"],answer:0
},
{
question:"दो-स्तरीय प्रमाणीकरण (2FA) देता है:",
options:["अतिरिक्त सुरक्षा","अतिरिक्त गेम","अतिरिक्त स्टोरेज"],answer:0
},
{
question:"अगर संदेश कहे 'जल्दी करो वरना एक्सेस खो दोगे', तो यह:",
options:["फ़िशिंग चाल","सामान्य अपडेट","दोस्ताना याद दिलाना"],answer:0
},
{
question:"सुरक्षित वेबसाइटें आमतौर पर शुरू होती हैं:",
options:["http://","https://","ftp://"],answer:1
},
{
question:"संदिग्ध ईमेल किसे रिपोर्ट करना चाहिए?",
options:["माता-पिता/शिक्षक","ऑनलाइन अजनबी","किसी को नहीं"],answer:0
},
{
question:"फ़िशर अक्सर ऐसे बनते हैं:",
options:["भरोसेमंद कंपनियाँ या दोस्त","कार्टून पात्र","मौसम ऐप"],answer:0
},
{
question:"अज्ञात लिंक पर क्लिक करने से:",
options:["जानकारी चोरी हो सकती है","फ्री गिफ्ट मिलते हैं","इंटरनेट तेज़ होता है"],answer:0
},
{
question:"सार्वजनिक साइटों पर व्यक्तिगत जानकारी साझा करना:",
options:["जोखिम भरा","सुरक्षित","अनुशंसित"],answer:0
},
{
question:"फ़िशिंग हो सकती है:",
options:["ईमेल, SMS, सोशल मीडिया","केवल अख़बारों में","केवल फ़ोन कॉल में"],answer:0
},
{
question:"अगर वेबसाइट अजीब लगे तो:",
options:["बंद कर रिपोर्ट करें","पासवर्ड डालें","फ़ाइलें डाउनलोड करें"],answer:0
},
{
question:"फ़िशिंग से हो सकता है:",
options:["पहचान चोरी और पैसे का नुकसान","अच्छे ग्रेड","फ्री इंटरनेट"],answer:0
},
{
question:"पासवर्ड कभी साझा न करें:",
options:["दोस्तों या अजनबियों से","खुद से","कंप्यूटर से"],answer:0
},
{
question:"गेम में फ़िशिंग ऐसा दिख सकता है:",
options:["फ्री कॉइन के नकली ऑफ़र","नए लेवल अनलॉक","बेहतर ग्राफ़िक्स"],answer:0
},
{
question:"अगर 'फ्री फोन' संदेश मिले तो:",
options:["नज़रअंदाज़ कर रिपोर्ट करें","विवरण भेजें","जश्न मनाएँ"],answer:0
},
{
question:"फ़िशिंग संदेश अक्सर पैदा करते हैं:",
options:["जल्दबाज़ी और डर","मज़ा और खुशी","संगीत और नृत्य"],answer:0
},
{
question:"संदेश असली है या नहीं, पता करने का सबसे अच्छा तरीका:",
options:["आधिकारिक स्रोत से जाँच करें","भेजने वाले पर भरोसा करें","लिंक क्लिक करें"],answer:0
},
{
question:"मज़बूत पासवर्ड में होना चाहिए:",
options:["अक्षर, संख्या, प्रतीक","सिर्फ आपका नाम","सिर्फ 12345"],answer:0
},
{
question:"अगर अजनबी गेम लिंक भेजे तो:",
options:["तुरंत क्लिक करें","नज़रअंदाज़ कर बड़े को बताएं","दोस्तों से साझा करें"],answer:1
},
{
question:"स्मिशिंग का मतलब है फ़िशिंग:",
options:["SMS संदेशों से","ईमेल से","फ़ोन कॉल से"],answer:0
},
{
question:"विशिंग का मतलब है फ़िशिंग:",
options:["वॉइस कॉल से","वीडियो गेम से","वर्चुअल रियलिटी से"],answer:0
},
{
question:"अगर ईमेल कहे 'आपने इनाम जीता है', तो यह आमतौर पर:",
options:["एक धोखा","एक असली गिफ्ट","एक स्कूल प्रोजेक्ट"],answer:0
},
{
question:"सोशल मीडिया पर ज़्यादा जानकारी साझा क्यों नहीं करनी चाहिए?",
options:["धोखेबाज़ उसका दुरुपयोग कर सकते हैं","दोस्त ऊब जाएँगे","शिक्षक नाराज़ होंगे"],answer:0
},
{
question:"अगर बैंक ईमेल पासवर्ड माँगे तो:",
options:["रिपोर्ट करें, बैंक कभी पासवर्ड नहीं माँगते","जल्दी भेजें","अकाउंट डिलीट करें"],answer:0
},
{
question:"फ़िशिंग आपको धोखा देकर करवा सकता है:",
options:["व्यक्तिगत जानकारी देना","ज़्यादा गेम खेलना","जल्दी सोना"],answer:0
},
{
question:"अगर लिंक संदिग्ध लगे तो:",
options:["क्लिक करने से पहले होवर कर जाँचें","जल्दी क्लिक करें","सबसे साझा करें"],answer:0
},
{
question:"सॉफ़्टवेयर अपडेट क्यों ज़रूरी है?",
options:["फ़िशिंग और मालवेयर से बचाता है","कंप्यूटर धीमा करता है","फ़ाइलें डिलीट करता है"],answer:0
},
{
question:"फ़िशिंग हमले का उदाहरण कौन सा है?",
options:["माइक्रोसॉफ़्ट से सॉफ़्टवेयर अपडेट नोटिफ़िकेशन","बैंक से पासवर्ड रीसेट करने के लिए लिंक वाला ईमेल","एक असली लिंक्डइन  कनेक्शन"],
answer:1
}
]
},

cyberbullying:{
en:[
{question:"What is cyberbullying?",options:["Being mean online","Playing games","Updating apps"],answer:0},
{question:"Cyberbullying can happen on:",options:["Social media","Hospitals","Libraries"],answer:0},
{question:"True or False: Teasing online is harmless.",options:["True","False"],answer:1},
{question:"If someone makes a fake account of you, you should:",options:["Report it","Ignore","Share password"],answer:0},
{question:"Group bullying spreads:",options:["Faster","Slower","Not at all"],answer:0},
{question:"Peer pressure may lead to:",options:["Risky sharing","Safety","Homework"],answer:0},
{question:"Best first step against bullying?",options:["Block/report","Fight back","Stay silent"],answer:0},
{question:"Cyberbullying can cause:",options:["Fear","Confidence","Happiness"],answer:0},
{question:"Exclusion in groups is:",options:["Cyberbullying","Normal","Fun"],answer:0},
{question:"True or False: Blocking helps.",options:["True","False"],answer:0},
{question:"Revenge posts are:",options:["Serious","Safe","Funny"],answer:0},
{question:"Doxxing means:",options:["Sharing private info","Playing music","Sending gifts"],answer:0},
{question:"Blackmail online is:",options:["A crime","A joke","Safe"],answer:0},
{question:"Best action against doxxing?",options:["Collect evidence + Report","Ignore","Share info"],answer:0},
{question:"Cyberbullying harms:",options:["Reputation","Friendships","Both"],answer:2},
{question:"True or False: Never respond to blackmailers.",options:["True","False"],answer:0},
{question:"Who should you tell?",options:["Parents/Teachers","Strangers","Nobody"],answer:0},
{question:"Cyberbullying is:",options:["Serious","Not serious","Harmless"],answer:0},
{question:"Best defense?",options:["Evidence + Authorities","Fight back","Stay quiet"],answer:0},
{question:"Cybercrime cells help?",options:["Yes","No","Maybe"],answer:0},
{question:"Mean comments online are:",options:["Cyberbullying","Advice","Normal"],answer:0},
{question:"If bullied in games:",options:["Report","Ignore","Share password"],answer:0},
{question:"True or False: Sharing private photos is safe.",options:["True","False"],answer:1},
{question:"Signs of cyberbullying include:",options:["Teasing","Fake accounts","Blackmail"],answer:0},
{question:"Best golden rule?",options:["Stop–Think–Tell","Click fast","Stay silent"],answer:0},
{question:"Cyberbullying can lead to:",options:["Stress","Joy","Safety"],answer:0},
{question:"If unsure about a message:",options:["Ask adult","Click quickly","Ignore forever"],answer:0},
{question:"True or False: Cyberbullying is only in school.",options:["True","False"],answer:1},
{question:"Awareness helps:",options:["Stay safe","Lose accounts","Encourage bullies"],answer:0},
{question:"If you see bullying:",options:["Report","Join","Laugh"],answer:0}
],
te:[
{question:"సైబర్ బులీయింగ్ అంటే?",options:["ఆన్‌లైన్‌లో అవమానం","ఆటలు ఆడటం","యాప్ అప్‌డేట్"],answer:0},
{question:"సైబర్ బులీయింగ్ ఎక్కడ జరుగుతుంది?",options:["సోషల్ మీడియా","ఆసుపత్రి","లైబ్రరీ"],answer:0},
{question:"నిజమా/అబద్ధమా: ఆన్‌లైన్ టీజ్ హానికరం కాదు.",options:["నిజం","అబద్ధం"],answer:1},
{question:"నకిలీ అకౌంట్ వస్తే?",options:["రిపోర్ట్ చేయాలి","పట్టించుకోకూడదు","పాస్‌వర్డ్ ఇవ్వాలి"],answer:0},
{question:"గ్రూప్ బులీయింగ్ వ్యాప్తి?",options:["త్వరగా","నెమ్మదిగా","లేదు"],answer:0},
{question:"పియర్ ప్రెషర్ దారితీసేది?",options:["ప్రమాదకరమైన షేరింగ్","సురక్షితం","హోంవర్క్"],answer:0},
{question:"మొదటి చర్య?",options:["బ్లాక్/రిపోర్ట్","వాదించాలి","నిశ్శబ్దం"],answer:0},
{question:"సైబర్ బులీయింగ్ కలిగించేది?",options:["భయం","ఆత్మవిశ్వాసం","ఆనందం"],answer:0},
{question:"గ్రూప్‌లలో బయట పెట్టడం?",options:["సైబర్ బులీయింగ్","సాధారణం","ఆనందం"],answer:0},
{question:"నిజమా/అబద్ధమా: బ్లాక్ చేయడం ఉపయోగకరం.",options:["నిజం","అబద్ధం"],answer:0},
{question:"రివెంజ్ పోస్టులు?",options:["తీవ్రమైనవి","సురక్షితం","హాస్యం"],answer:0},
{question:"డాక్సింగ్ అంటే?",options:["వ్యక్తిగత సమాచారం పంచడం","సంగీతం వినడం","బహుమతులు పంపడం"],answer:0},
{question:"బ్లాక్‌మెయిల్?",options:["నేరం","జోక్","సురక్షితం"],answer:0},
{question:"డాక్సింగ్‌కి ఉత్తమ చర్య?",options:["సాక్ష్యాలు + రిపోర్ట్","పట్టించుకోకూడదు","సమాచారం పంచాలి"],answer:0},
{question:"సైబర్ బులీయింగ్ హాని?",options:["ప్రతిష్ట","స్నేహాలు","రెండూ"],answer:2},
{question:"నిజమా/అబద్ధమా: బ్లాక్‌మెయిల్‌కి స్పందించకూడదు.",options:["నిజం","అబద్ధం"],answer:0},
{question:"ఎవరికి చెప్పాలి?",options:["తల్లిదండ్రులు/టీచర్లు","అజ్ఞాతులు","ఎవరికి కాదు"],answer:0},
{question:"సైబర్ బులీయింగ్?",options:["తీవ్రమైనది","తీవ్రమైనది కాదు","హానికరం కాదు"],answer:0},
{question:"ఉత్తమ రక్షణ?",options:["సాక్ష్యాలు + అధికారులు","వాదించాలి","నిశ్శబ్దం"],answer:0},
{question:"సైబర్ క్రైమ్ సెల్ సహాయం చేస్తుందా?",options:["అవును","కాదు","బహుశా"],answer:0},
{question:"అవమానకరమైన కామెంట్లు?",options:["సైబర్ బులీయింగ్","సలహా","సాధారణం"],answer:0},
{question:"గేమ్‌లలో బులీయింగ్ అయితే?",options:["రిపోర్ట్ చేయాలి","పట్టించుకోకూడదు","పాస్‌వర్డ్ ఇవ్వాలి"],answer:0},
{question:"నిజమా/అబద్ధమా: వ్యక్తిగత ఫోటోలు పంచడం సురక్షితం.",options:["నిజం","అబద్ధం"],answer:1},
{question:"సైబర్ బులీయింగ్ లక్షణాలు?",options:["టీజ్","నకిలీ అకౌంట్‌లు","బ్లాక్‌మెయిల్"],answer:0},
{question:"గోల్డెన్ రూల్?",options:["ఆపు–ఆలోచించు–చెప్పు","త్వరగా క్లిక్ చేయు","నిశ్శబ్దం"],answer:0},
{question:"సైబర్ బులీయింగ్ ఫలితం?",options:["మానసిక ఒత్తిడి","ఆనందం","సురక్షితం"],answer:0},
{question:"మెసేజ్‌పై సందేహం ఉంటే?",options:["పెద్దవారిని అడగాలి","త్వరగా క్లిక్ చేయాలి","పట్టించుకోకూడదు"],answer:0},
{question:"నిజమా/అబద్ధమా: సైబర్ బులీయింగ్ స్కూల్‌లో మాత్రమే.",options:["నిజం","అబద్ధం"],answer:1},
{question:"అవగాహన సహాయం?",options:["సురక్షితం","అకౌంట్ పోవడం","బులీలకు ప్రోత్సాహం"],answer:0},
{question:"బులీయింగ్ కనిపిస్తే?",options:["రిపోర్ట్ చేయాలి","చేరాలి","నవ్వాలి"],answer:0}
],
hi:[
{question:"साइबर बुलिंग क्या है?",options:["ऑनलाइन अपमान","खेल खेलना","सॉफ़्टवेयर अपडेट"],answer:0},
{question:"साइबर बुलिंग कहाँ होती है?",options:["सोशल मीडिया","अस्पताल","पुस्तकालय"],answer:0},
{question:"सही या गलत: ऑनलाइन मज़ाक हानिरहित है।",options:["सही","गलत"],answer:1},
{question:"अगर कोई नकली अकाउंट बनाए तो?",options:["रिपोर्ट करें","नज़रअंदाज़ करें","पासवर्ड दें"],answer:0},
{question:"समूह बुलिंग फैलती है:",options:["तेज़","धीमी","नहीं"],answer:0},
{question:"साथियों का दबाव कर सकता है:",options:["जोखिमपूर्ण साझा","सुरक्षा","होमवर्क"],answer:0},
{question:"सबसे पहला कदम?",options:["ब्लॉक/रिपोर्ट","लड़ाई","चुप रहना"],answer:0},
{question:"साइबर बुलिंग से होता है:",options:["भय","आत्मविश्वास","खुशी"],answer:0},
{question:"ग्रुप से बाहर करना है:",options:["साइबर बुलिंग","सामान्य","मज़ेदार"],answer:0},
{question:"सही या गलत: ब्लॉक करना मदद करता है।",options:["सही","गलत"],answer:0},
{question:"रिवेंज पोस्ट हैं:",options:["गंभीर","सुरक्षित","मज़ाक"],answer:0},
{question:"डॉक्सिंग का मतलब?",options:["निजी जानकारी साझा करना","संगीत सुनना","उपहार भेजना"],answer:0},
{question:"ऑनलाइन ब्लैकमेल है:",options:["अपराध","मज़ाक","सुरक्षित"],answer:0},
{question:"डॉक्सिंग पर सबसे अच्छा कदम?",options:["सबूत + रिपोर्ट","नज़रअंदाज़","जानकारी साझा करें"],answer:0},
{question:"साइबर बुलिंग नुकसान पहुँचाती है:",options:["प्रतिष्ठा","दोस्ती","दोनों"],answer:2},
{question:"सही या गलत: ब्लैकमेलरों को जवाब न दें।",options:["सही","गलत"],answer:0},
{question:"किसे बताना चाहिए?",options:["माता-पिता/शिक्षक","अजनबी","किसी को नहीं"],answer:0},
{question:"साइबर बुलिंग है:",options:["गंभीर","गंभीर नहीं","हानिरहित"],answer:0},
{question:"सबसे अच्छा बचाव?",options:["सबूत + अधिकारी","लड़ाई","चुप रहना"],answer:0},
{question:"साइबर क्राइम सेल मदद करता है?",options:["हाँ","नहीं","शायद"],answer:0},
{question:"ऑनलाइन गाली-गलौज है:",options:["साइबर बुलिंग","सलाह","सामान्य"],answer:0},
{question:"गेम्स में बुलिंग हो तो?",options:["रिपोर्ट करें","नज़रअंदाज़ करें","पासवर्ड दें"],answer:0},
{question:"सही या गलत: निजी तस्वीरें साझा करना सुरक्षित है।",options:["सही","गलत"],answer:1},
{question:"साइबर बुलिंग के संकेत?",options:["मज़ाक","नकली अकाउंट","ब्लैकमेल"],answer:0},
{question:"सुनहरा नियम?",options:["रुकें–सोचें–बताएं","जल्दी क्लिक करें","चुप रहें"],answer:0},
{question:"साइबर बुलिंग से होता है:",options:["तनाव","खुशी","सुरक्षा"],answer:0},
{question:"संदिग्ध संदेश पर?",options:["बड़े से पूछें","जल्दी क्लिक करें","नज़रअंदाज़ करें"],answer:0},
{question:"सही या गलत: साइबर बुलिंग केवल स्कूल में होती है।",options:["सही","गलत"],answer:1},
{question:"जागरूकता मदद करती है:",options:["सुरक्षित रहना","अकाउंट खोना","बुलियों को बढ़ावा देना"],answer:0},
{question:"अगर बुलिंग देखें तो?",options:["रिपोर्ट करें","शामिल हों","हँसें"],answer:0}
]
},
scams:{
en:[
{question:"What are online scams?",options:["Fraudulent tricks","Safe shopping","Bank services"],answer:0},
{question:"True or False: Lottery emails are real.",options:["True","False"],answer:1},
{question:"Suspicious emails should be:",options:["Reported","Clicked","Forwarded"],answer:0},
{question:"Scams try to steal:",options:["Money & personal info","Games","Apps"],answer:0},
{question:"Golden rule online?",options:["Stop–Think–Check","Share quickly","Ignore always"],answer:0},
{question:"Repeated lottery messages mean:",options:["Scam","Safe","Fun"],answer:0},
{question:"Is sharing bank details safe?",options:["Yes","No"],answer:1},
{question:"Unsure about shopping site?",options:["Check reviews","Pay immediately","Ignore"],answer:0},
{question:"Scams cause:",options:["Financial loss","Happiness","Confidence"],answer:0},
{question:"Best defense?",options:["Awareness","Sharing info","Silence"],answer:0},
{question:"Medium-level scams include:",options:["Fake jobs","Hospitals","Libraries"],answer:0},
{question:"Loan scams ask for:",options:["Fees","Homework","Games"],answer:0},
{question:"Best action against phishing email?",options:["Verify with bank","Click link","Ignore"],answer:0},
{question:"Scams often use:",options:["Urgent tone & logos","Music","Games"],answer:0},
{question:"Repeated job offers online mean:",options:["Scam","Safe","Normal"],answer:0},
{question:"Are all bank emails safe?",options:["Yes","No"],answer:1},
{question:"Unsure about loan offer?",options:["Ask bank","Pay fee","Ignore"],answer:0},
{question:"Scams cause:",options:["Money loss","Safety","Fun"],answer:0},
{question:"Best defense?",options:["Check official sites","Share password","Ignore"],answer:0},
{question:"Hard-level scams include:",options:["Investment fraud","Cooking","Sports"],answer:0},
{question:"Tech support calls always real?",options:["Yes","No"],answer:1},
{question:"Identity theft means:",options:["Stealing personal info","Playing games","Sending gifts"],answer:0},
{question:"Best action against fraud?",options:["Report to authorities","Ignore","Pay money"],answer:0},
{question:"Investment scams promise:",options:["High returns","Homework","Safety"],answer:0},
{question:"Unknown callers can be trusted?",options:["Yes","No"],answer:1},
{question:"Best defense?",options:["Verify with official sources","Share info","Ignore"],answer:0},
{question:"Tech support scams ask for:",options:["Remote access","Games","Music"],answer:0},
{question:"Scams cause:",options:["Financial loss & stress","Fun","Confidence"],answer:0},
{question:"Golden rule online?",options:["Stop–Think–Check","Share quickly","Ignore always"],answer:0},
{question:"Cybercrime cells help?",options:["Yes","No","Maybe"],answer:0}
],
te:[
{question:"ఆన్‌లైన్ స్కామ్‌లు అంటే ఏమిటి?",options:["మోసపూరిత చర్యలు","సురక్షిత షాపింగ్","బ్యాంక్ సేవలు"],answer:0},
{question:"నిజమా/అబద్ధమా: లాటరీ ఇమెయిల్‌లు నిజమే.",options:["నిజం","అబద్ధం"],answer:1},
{question:"అనుమానాస్పద ఇమెయిల్‌లను:",options:["రిపోర్ట్ చేయాలి","క్లిక్ చేయాలి","ఫార్వర్డ్ చేయాలి"],answer:0},
{question:"స్కామ్‌లు దొంగిలించేది:",options:["డబ్బు & వ్యక్తిగత సమాచారం","గేమ్స్","యాప్‌లు"],answer:0},
{question:"గోల్డెన్ రూల్?",options:["ఆపు–ఆలోచించు–చెక్","త్వరగా పంచాలి","ఎప్పుడూ పట్టించుకోకూడదు"],answer:0},
{question:"పునరావృతమైన లాటరీ మెసేజ్‌లు అంటే:",options:["స్కామ్","సురక్షితం","ఫన్"],answer:0},
{question:"బ్యాంక్ వివరాలు పంచడం సురక్షితమా?",options:["అవును","కాదు"],answer:1},
{question:"షాపింగ్ సైట్‌పై సందేహం ఉంటే?",options:["రివ్యూలు చెక్ చేయాలి","తక్షణమే చెల్లించాలి","పట్టించుకోకూడదు"],answer:0},
{question:"స్కామ్ వల్ల:",options:["ఆర్థిక నష్టం","ఆనందం","ఆత్మవిశ్వాసం"],answer:0},
{question:"ఉత్తమ రక్షణ?",options:["అవగాహన","ఇన్ఫో పంచాలి","నిశ్శబ్దం"],answer:0},
{question:"మధ్యస్థాయి స్కామ్‌లు?",options:["నకిలీ ఉద్యోగాలు","ఆసుపత్రులు","లైబ్రరీలు"],answer:0},
{question:"లోన్ స్కామ్‌లు అడిగేది:",options:["ఫీజు","హోంవర్క్","గేమ్స్"],answer:0},
{question:"ఫిషింగ్ ఇమెయిల్ వస్తే?",options:["బ్యాంక్‌ని అడగాలి","లింక్ క్లిక్ చేయాలి","పట్టించుకోకూడదు"],answer:0},
{question:"స్కామ్‌లు ఉపయోగించేది:",options:["అత్యవసర టోన్ & లోగోలు","మ్యూజిక్","గేమ్స్"],answer:0},
{question:"పునరావృతమైన ఉద్యోగ ఆఫర్లు అంటే:",options:["స్కామ్","సురక్షితం","సాధారణం"],answer:0},
{question:"అన్ని బ్యాంక్ ఇమెయిల్‌లు సురక్షితమా?",options:["అవును","కాదు"],answer:1},
{question:"లోన్ ఆఫర్‌పై సందేహం ఉంటే?",options:["బ్యాంక్‌ని అడగాలి","ఫీజు చెల్లించాలి","పట్టించుకోకూడదు"],answer:0},
{question:"స్కామ్ వల్ల:",options:["డబ్బు పోతుంది","సురక్షితం","ఫన్"],answer:0},
{question:"ఉత్తమ రక్షణ?",options:["అధికారిక సైట్ చెక్ చేయాలి","పాస్‌వర్డ్ పంచాలి","పట్టించుకోకూడదు"],answer:0},
{question:"కఠిన స్థాయి స్కామ్‌లు?",options:["ఇన్వెస్ట్‌మెంట్ మోసం","కుకింగ్","క్రీడలు"],answer:0},
{question:"టెక్ సపోర్ట్ కాల్స్ ఎప్పుడూ నిజమా?",options:["అవును","కాదు"],answer:1},
{question:"ఐడెంటిటీ థెఫ్ట్ అంటే?",options:["వ్యక్తిగత సమాచారం దొంగిలించడం","గేమ్స్ ఆడడం","గిఫ్ట్‌లు పంపడం"],answer:0},
{question:"మోసం అనుమానం వస్తే?",options:["అధికారులకు రిపోర్ట్ చేయాలి","పట్టించుకోకూడదు","డబ్బు చెల్లించాలి"],answer:0},
{question:"ఇన్వెస్ట్‌మెంట్ స్కామ్‌లు వాగ్దానం?",options:["అధిక లాభాలు","హోంవర్క్","సురక్షితం"],answer:0},
{question:"తెలియని కాల్స్ నమ్మదగినవా?",options:["అవును","కాదు"],answer:1},
{question:"ఉత్తమ రక్షణ?",options:["అధికారిక వనరుల ద్వారా ధృవీకరించాలి","ఇన్ఫో పంచాలి","పట్టించుకోకూడదు"],answer:0},
{question:"టెక్ సపోర్ట్ స్కామ్‌లు అడిగేది?",options:["రిమోట్ యాక్సెస్","గేమ్స్","మ్యూజిక్"],answer:0},
{question:"స్కామ్ వల్ల?",options:["ఆర్థిక నష్టం & ఒత్తిడి","ఫన్","ఆత్మవిశ్వాసం"],answer:0},
{question:"గోల్డెన్ రూల్?",options:["ఆపు–ఆలోచించు–చెక్","త్వరగా పంచాలి","ఎప్పుడూ పట్టించుకోకూడదు"],answer:0},
{question:"సైబర్ క్రైమ్ సెల్స్ సహాయపడతాయా?",options:["అవును","కాదు","బహుశా"],answer:0}
],
hi:[
{question:"ऑनलाइन स्कैम क्या हैं?",options:["धोखाधड़ी","सुरक्षित शॉपिंग","बैंक सेवाएँ"],answer:0},
{question:"सही या गलत: लॉटरी ईमेल असली होते हैं।",options:["सही","गलत"],answer:1},
{question:"संदिग्ध ईमेल को क्या करना चाहिए?",options:["रिपोर्ट करें","क्लिक करें","फॉरवर्ड करें"],answer:0},
{question:"स्कैम क्या चुराते हैं?",options:["पैसे और निजी जानकारी","गेम","ऐप"],answer:0},
{question:"गोल्डन रूल ऑनलाइन?",options:["रुकें–सोचें–जाँचें","जल्दी साझा करें","हमेशा नज़रअंदाज़ करें"],answer:0},
{question:"बार-बार लॉटरी संदेश का मतलब?",options:["स्कैम","सुरक्षित","मज़ेदार"],answer:0},
{question:"क्या बैंक विवरण साझा करना सुरक्षित है?",options:["हाँ","नहीं"],answer:1},
{question:"शॉपिंग साइट पर शक हो तो?",options:["रिव्यू देखें","तुरंत भुगतान करें","नज़रअंदाज़ करें"],answer:0},
{question:"स्कैम से होता है?",options:["आर्थिक नुकसान","खुशी","आत्मविश्वास"],answer:0},
{question:"सबसे अच्छा बचाव?",options:["जागरूकता","जानकारी साझा करें","चुप रहें"],answer:0},
{question:"मध्यम स्तर के स्कैम?",options:["नकली नौकरी","अस्पताल","लाइब्रेरी"],answer:0},
{question:"लोन स्कैम क्या माँगते हैं?",options:["शुल्क","होमवर्क","गेम"],answer:0},
{question:"फ़िशिंग ईमेल मिलने पर?",options:["बैंक से पूछें","लिंक क्लिक करें","नज़रअंदाज़ करें"],answer:0},
{question:"स्कैम अक्सर उपयोग करते हैं?",options:["तात्कालिक संदेश और लोगो","संगीत","गेम"],answer:0},
{question:"बार-बार नौकरी ऑफ़र का मतलब?",options:["स्कैम","सुरक्षित","सामान्य"],answer:0},
{question:"क्या सभी बैंक ईमेल सुरक्षित हैं?",options:["हाँ","नहीं"],answer:1},
{question:"लोन ऑफ़र पर शक हो तो?",options:["बैंक से पूछें","शुल्क दें","नज़रअंदाज़ करें"],answer:0},
{question:"स्कैम से होता है?",options:["पैसे का नुकसान","सुरक्षा","मज़ा"],answer:0},
{question:"सबसे अच्छा बचाव?",options:["आधिकारिक साइट देखें","पासवर्ड साझा करें","नज़रअंदाज़ करें"],answer:0},
{question:"कठिन स्तर के स्कैम?",options:["निवेश धोखाधड़ी","खाना बनाना","खेल"],answer:0},
{question:"टेक सपोर्ट कॉल हमेशा असली होते हैं?",options:["हाँ","नहीं"],answer:1},
{question:"पहचान चोरी का मतलब?",options:["निजी जानकारी चुराना","गेम खेलना","उपहार भेजना"],answer:0},
{question:"धोखाधड़ी का संदेह हो तो?",options:["अधिकारियों को रिपोर्ट करें","नज़रअंदाज़ करें","पैसे दें"],answer:0},
{question:"निवेश स्कैम क्या वादा करते हैं?",options:["ऊँचे लाभ","होमवर्क","सुरक्षा"],answer:0},
{question:"क्या अजनबी कॉल भरोसेमंद होते हैं?",options:["हाँ","नहीं"],answer:1},
{question:"सबसे अच्छा बचाव?",options:["आधिकारिक स्रोत से पुष्टि करें","जानकारी साझा करें","नज़रअंदाज़ करें"],answer:0},
{question:"टेक सपोर्ट स्कैम क्या माँगते हैं?",options:["रिमोट एक्सेस","गेम","संगीत"],answer:0},
{question:"स्कैम से होता है?",options:["आर्थिक नुकसान और तनाव","मज़ा","आत्मविश्वास"],answer:0},
{question:"गोल्डन रूल ऑनलाइन?",options:["रुकें–सोचें–जाँचें","जल्दी साझा करें","हमेशा नज़रअंदाज़ करें"],answer:0},
{question:"क्या साइबर क्राइम सेल मदद करती है?",options:["हाँ","नहीं","शायद"],answer:0}
]
},

identity:{
en:[
{question:"What does 'identify threats' mean?",options:["Recognize dangers","Play games","Update apps"],answer:0},
{question:"True or False: Threats can only be offline.",options:["True","False"],answer:1},
{question:"Phishing emails are a type of?",options:["Threat","Music","Game"],answer:0},
{question:"Malware spreads through?",options:["Attachments","Sports","Cooking"],answer:0},
{question:"Best first step against threats?",options:["Awareness","Ignore","Share password"],answer:0},
{question:"Identity theft is a?",options:["Cyber threat","Safe practice","Fun"],answer:0},
{question:"True or False: Strong passwords reduce threats.",options:["True","False"],answer:0},
{question:"Fake job offers are?",options:["Threat","Safe","Normal"],answer:0},
{question:"Repeated urgent messages mean?",options:["Threat","Safe","Fun"],answer:0},
{question:"Best defense?",options:["Stop–Think–Check","Share info","Ignore"],answer:0},
{question:"Medium-level threats include?",options:["Phishing","Cooking","Sports"],answer:0},
{question:"True or False: Public Wi-Fi is always safe.",options:["True","False"],answer:1},
{question:"Suspicious links should be?",options:["Avoided","Clicked","Shared"],answer:0},
{question:"Threat actors use?",options:["Fake websites","Libraries","Hospitals"],answer:0},
{question:"Repeated requests for info mean?",options:["Threat","Safe","Normal"],answer:0},
{question:"Are all emails safe?",options:["Yes","No"],answer:1},
{question:"If unsure about a message?",options:["Verify source","Click link","Ignore"],answer:0},
{question:"Threats cause?",options:["Financial loss","Safety","Fun"],answer:0},
{question:"Best defense?",options:["Check official sources","Share password","Ignore"],answer:0},
{question:"Hard-level threats include?",options:["Financial fraud","Cooking","Sports"],answer:0},
{question:"True or False: Tech support scams are threats.",options:["True","False"],answer:0},
{question:"Malware means?",options:["Malicious software","Games","Music"],answer:0},
{question:"Best action against fraud?",options:["Report","Ignore","Pay money"],answer:0},
{question:"Investment scams are?",options:["Threat","Safe","Fun"],answer:0},
{question:"Unknown callers asking info are?",options:["Threat","Safe"],answer:0},
{question:"Best defense?",options:["Verify with official sources","Share info","Ignore"],answer:0},
{question:"Threats can cause?",options:["Financial loss & stress","Fun","Confidence"],answer:0},
{question:"Golden rule online?",options:["Stop–Think–Check","Share quickly","Ignore always"],answer:0},
{question:"Cybercrime cells help?",options:["Yes","No","Maybe"],answer:0},
{question:"True or False: Awareness reduces threats.",options:["True","False"],answer:0}
],


te:[
{question:"'ప్రమాదాలను గుర్తించడం' అంటే?",options:["ప్రమాదాలను గుర్తించడం","గేమ్స్ ఆడడం","యాప్‌లు అప్‌డేట్ చేయడం"],answer:0},
{question:"నిజమా/అబద్ధమా: ప్రమాదాలు ఆఫ్‌లైన్‌లో మాత్రమే ఉంటాయి.",options:["నిజం","అబద్ధం"],answer:1},
{question:"ఫిషింగ్ ఇమెయిల్‌లు ఏవి?",options:["ప్రమాదం","మ్యూజిక్","గేమ్"],answer:0},
{question:"మాల్వేర్ వ్యాప్తి?",options:["అటాచ్‌మెంట్‌లు","క్రీడలు","కుకింగ్"],answer:0},
{question:"ప్రమాదాలపై మొదటి చర్య?",options:["అవగాహన","పట్టించుకోకూడదు","పాస్‌వర్డ్ పంచాలి"],answer:0},
{question:"ఐడెంటిటీ థెఫ్ట్ అంటే?",options:["సైబర్ ప్రమాదం","సురక్షితం","ఫన్"],answer:0},
{question:"నిజమా/అబద్ధమా: బలమైన పాస్‌వర్డ్‌లు ప్రమాదాలను తగ్గిస్తాయి.",options:["నిజం","అబద్ధం"],answer:0},
{question:"నకిలీ ఉద్యోగ ఆఫర్లు?",options:["ప్రమాదం","సురక్షితం","సాధారణం"],answer:0},
{question:"పునరావృతమైన అత్యవసర మెసేజ్‌లు?",options:["ప్రమాదం","సురక్షితం","ఫన్"],answer:0},
{question:"ఉత్తమ రక్షణ?",options:["ఆపు–ఆలోచించు–చెక్","ఇన్ఫో పంచాలి","పట్టించుకోకూడదు"],answer:0},
{question:"మధ్యస్థాయి ప్రమాదాలు?",options:["ఫిషింగ్","కుకింగ్","క్రీడలు"],answer:0},
{question:"నిజమా/అబద్ధమా: పబ్లిక్ వై-ఫై ఎప్పుడూ సురక్షితం.",options:["నిజం","అబద్ధం"],answer:1},
{question:"సందేహాస్పద లింక్‌లు?",options:["తప్పించాలి","క్లిక్ చేయాలి","పంచాలి"],answer:0},
{question:"ప్రమాదకారులు ఉపయోగించేది?",options:["నకిలీ వెబ్‌సైట్‌లు","లైబ్రరీలు","ఆసుపత్రులు"],answer:0},
{question:"పునరావృతమైన ఇన్ఫో అభ్యర్థనలు?",options:["ప్రమాదం","సురక్షితం","సాధారణం"],answer:0},
{question:"అన్ని ఇమెయిల్‌లు సురక్షితమా?",options:["అవును","కాదు"],answer:1},
{question:"మెసేజ్‌పై సందేహం ఉంటే?",options:["సోర్స్‌తో ధృవీకరించాలి","లింక్ క్లిక్ చేయాలి","పట్టించుకోకూడదు"],answer:0},
{question:"ప్రమాదాల వల్ల?",options:["ఆర్థిక నష్టం","సురక్షితం","ఫన్"],answer:0},
{question:"ఉత్తమ రక్షణ?",options:["అధికారిక వనరులు చెక్ చేయాలి","పాస్‌వర్డ్ పంచాలి","పట్టించుకోకూడదు"],answer:0},
{question:"కఠిన స్థాయి ప్రమాదాలు?",options:["ఆర్థిక మోసం","కుకింగ్","క్రీడలు"],answer:0},
{question:"నిజమా/అబద్ధమా: టెక్ సపోర్ట్ స్కామ్‌లు ప్రమాదాలు.",options:["నిజం","అబద్ధం"],answer:0},
{question:"మాల్వేర్ అంటే?",options:["దుష్ట సాఫ్ట్‌వేర్","గేమ్స్","మ్యూజిక్"],answer:0},
{question:"మోసం అనుమానం వస్తే?",options:["అధికారులకు రిపోర్ట్ చేయాలి","పట్టించుకోకూడదు","డబ్బు చెల్లించాలి"],answer:0},
{question:"ఇన్వెస్ట్‌మెంట్ స్కామ్‌లు?",options:["ప్రమాదం","సురక్షితం","ఫన్"],answer:0},
{question:"తెలియని కాల్స్?",options:["ప్రమాదం","సురక్షితం"],answer:0},
{question:"ఉత్తమ రక్షణ?",options:["అధికారిక వనరుల ద్వారా ధృవీకరించాలి","ఇన్ఫో పంచాలి","పట్టించుకోకూడదు"],answer:0},
{question:"ప్రమాదాల ప్రభావం?",options:["ఆర్థిక నష్టం & ఒత్తిడి","ఫన్","ఆత్మవిశ్వాసం"],answer:0},
{question:"గోల్డెన్ రూల్?",options:["ఆపు–ఆలోచించు–చెక్","త్వరగా పంచాలి","ఎప్పుడూ పట్టించుకోకూడదు"],answer:0},
{question:"సైబర్ క్రైమ్ సెల్స్ సహాయపడతాయా?",options:["అవును","కాదు","బహుశా"],answer:0},
{question:"నిజమా/అబద్ధమా: అవగాహన ప్రమాదాలను తగ్గిస్తుంది.",options:["నిజం","అబద్ధం"],answer:0}
],

hi:[
{question:"'खतरों की पहचान' का मतलब?",options:["खतरे पहचानना","गेम खेलना","ऐप अपडेट करना"],answer:0},
{question:"सही या गलत: खतरे केवल ऑफलाइन होते हैं।",options:["सही","गलत"],answer:1},
{question:"फ़िशिंग ईमेल किसका प्रकार है?",options:["खतरा","संगीत","गेम"],answer:0},
{question:"मैलवेयर फैलता है?",options:["अटैचमेंट","खेल","खाना बनाना"],answer:0},
{question:"खतरों के खिलाफ पहला कदम?",options:["जागरूकता","नज़रअंदाज़ करें","पासवर्ड साझा करें"],answer:0},
{question:"पहचान चोरी है?",options:["साइबर खतरा","सुरक्षित","मज़ेदार"],answer:0},
{question:"सही या गलत: मज़बूत पासवर्ड खतरे कम करते हैं।",options:["सही","गलत"],answer:0},
{question:"नकली नौकरी ऑफ़र हैं?",options:["खतरा","सुरक्षित","सामान्य"],answer:0},
{question:"बार-बार तात्कालिक संदेश का मतलब?",options:["खतरा","सुरक्षित","मज़ेदार"],answer:0},
{question:"सबसे अच्छा बचाव?",options:["रुकें–सोचें–जाँचें","जानकारी साझा करें","नज़रअंदाज़ करें"],answer:0},
{question:"मध्यम स्तर के खतरे?",options:["फ़िशिंग","खाना बनाना","खेल"],answer:0},
{question:"सही या गलत: पब्लिक वाई-फाई हमेशा सुरक्षित है।",options:["सही","गलत"],answer:1},
{question:"संदिग्ध लिंक को?",options:["बचें","क्लिक करें","साझा करें"],answer:0},
{question:"हमलावर उपयोग करते हैं?",options:["नकली वेबसाइट","लाइब्रेरी","अस्पताल"],answer:0},
{question:"बार-बार जानकारी माँगना मतलब?",options:["खतरा","सुरक्षित","सामान्य"],answer:0},
{question:"क्या सभी ईमेल सुरक्षित हैं?",options:["हाँ","नहीं"],answer:1},
{question:"संदिग्ध संदेश पर?",options:["स्रोत से पुष्टि करें","लिंक क्लिक करें","नज़रअंदाज़ करें"],answer:0},
{question:"खतरों से होता है?",options:["आर्थिक नुकसान","सुरक्षा","मज़ा"],answer:0},
{question:"सबसे अच्छा बचाव?",options:["आधिकारिक स्रोत देखें","पासवर्ड साझा करें","नज़रअंदाज़ करें"],answer:0},
{question:"कठिन स्तर के खतरे?",options:["वित्तीय धोखाधड़ी","खाना बनाना","खेल"],answer:0},
{question:"सही या गलत: टेक सपोर्ट स्कैम खतरे हैं।",options:["सही","गलत"],answer:0},
{question:"मैलवेयर का मतलब?",options:["हानिकारक सॉफ़्टवेयर","गेम","संगीत"],answer:0},
{question:"धोखाधड़ी पर सबसे अच्छा कदम?",options:["रिपोर्ट करें","नज़रअंदाज़ करें","पैसे दें"],answer:0},
{question:"निवेश स्कैम हैं?",options:["खतरा","सुरक्षित","मज़ेदार"],answer:0},
{question:"अजनबी कॉल जानकारी माँगते हैं?",options:["खतरा","सुरक्षित"],answer:0},
{question:"सबसे अच्छा बचाव?",options:["आधिकारिक स्रोत से पुष्टि करें","जानकारी साझा करें","नज़रअंदाज़ करें"],answer:0},
{question:"खतरों से होता है?",options:["आर्थिक नुकसान और तनाव","मज़ा","आत्मविश्वास"],answer:0},
{question:"गोल्डन रूल ऑनलाइन?",options:["रुकें–सोचें–जाँचें","जल्दी साझा करें","हमेशा नज़रअंदाज़ करें"],answer:0},
{question:"क्या साइबर क्राइम सेल मदद करती है?",options:["हाँ","नहीं","शायद"],answer:0},
{question:"सही या गलत: जागरूकता खतरे कम करती है।",options:["सही","गलत"],answer:0}
]
}
};

/* =========================
LOAD FINAL QUIZ
========================= */

const finalQuiz =
finalQuizData?.[moduleKey]?.[lang] ||
finalQuizData?.[moduleKey]?.["en"];

if(!finalQuiz){
alert("Final quiz not available");
console.error("Missing:", moduleKey, lang);
return;
}
/* =========================
LOAD PAGE
========================= */

function loadPage(){

quizContainer.innerHTML="";

let start=currentPage*QUESTIONS_PER_PAGE;
let end=start+QUESTIONS_PER_PAGE;

let pageQuestions=(finalQuiz || []).slice(start,end);

pageQuestions.forEach((q,index)=>{

let qIndex=start+index;

let html=`<div class="quiz-question"><p>${qIndex+1}. ${q.question}</p>`;

q.options.forEach((opt,i)=>{

let checked=answers[qIndex]==i?"checked":"";

html+=`
<label>
<input type="radio" name="q${qIndex}" value="${i}" ${checked}
onclick="saveAnswer(${qIndex},${i})">
${opt}
</label><br>
`;

});

html+="</div>";

quizContainer.innerHTML+=html;

});

updateButtons();
}

/* =========================
BUTTON CONTROL (FIXED)
========================= */

function updateButtons(){

const prevBtn=document.getElementById("prevBtn");
const nextBtn=document.getElementById("nextBtn");
const submitBtn=document.getElementById("submitBtn");

const totalPages = Math.ceil(finalQuiz.length / QUESTIONS_PER_PAGE) - 1;

if(prevBtn) prevBtn.style.display = currentPage===0?"none":"inline-block";
if(nextBtn) nextBtn.style.display = currentPage===totalPages?"none":"inline-block";
if(submitBtn) submitBtn.style.display = currentPage===totalPages?"inline-block":"none";

}

/* =========================
SAVE ANSWER
========================= */

window.saveAnswer=function(qIndex,value){
answers[qIndex]=value;
}

window.nextPage=function(){
currentPage++;
loadPage();
}

window.prevPage=function(){
currentPage--;
loadPage();
}

/* =========================
SUBMIT FINAL QUIZ
========================= */

window.submitFinalQuiz = async function(){

let score = 0;

finalQuiz.forEach((q,index)=>{
if(answers[index] == q.answer) score++;
});

let percent = Math.round((score / finalQuiz.length) * 100);

alert(`${t.score}: ${percent}%`);

if(percent >= 75){

localStorage.setItem(userId+"_"+moduleKey+"_completed","true");

let completed=parseInt(localStorage.getItem("completedModules")||"0");
completed++;
localStorage.setItem("completedModules",completed);

try{

await fetch(
`${API}/profile/updateProgress/${userId}?module=${moduleKey}&score=${percent}&language=${lang}`,
{ method:"POST" }
);

}catch(error){
console.log("API ERROR:",error);
}

alert(t.passed);

/* NAME */

const storedName = localStorage.getItem("fullName");

if(!storedName){
try{
const res = await fetch(`${API}/profile/${userId}`);
const profile = await res.json();
localStorage.setItem("fullName",profile.fullName);
}catch{}
}

window.location.href="certificate.html";

}else{

alert(t.fail);

}

}

/* =========================
BACK BUTTON
========================= */

window.goBack=function(){
window.location.href="module.html";
}

/* INIT */

loadPage();

});