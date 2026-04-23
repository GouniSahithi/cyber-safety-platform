window.onload = function () {

  const type = localStorage.getItem("quickType");
  let module = localStorage.getItem("module");

  if(module === "threats"){
    module = "identity";
  }

  const lang = localStorage.getItem("language") || "en";

  const data = quickData?.[module]?.[type]?.[lang];

  if(!data){
    alert("Quick data not found");
    window.location.href = "dashboard.html";
    return;
  }

  /* 🌍 TEXT TRANSLATIONS */
  const textMap = {
    en: {
      back: "Back to Dashboard",
      tutorial: "TUTORIAL",
      news: "NEWS",
      scenario: "SCENARIO"
    },
    te: {
      back: "డాష్‌బోర్డ్‌కు తిరిగి వెళ్ళు",
      tutorial: "ట్యుటోరియల్",
      news: "వార్తలు",
      scenario: "సన్నివేశం"
    },
    hi: {
      back: "डैशबोर्ड पर वापस जाएं",
      tutorial: "ट्यूटोरियल",
      news: "समाचार",
      scenario: "परिदृश्य"
    }
  };

  /* 🌍 MODULE TRANSLATIONS */
  const moduleMap = {
    en: {
      phishing: "PHISHING",
      scams: "SCAMS",
      identity: "THREATS",
      cyberbullying: "CYBERBULLYING"
    },
    te: {
      phishing: "ఫిషింగ్",
      scams: "మోసాలు",
      identity: "ప్రమాదాలు",
      cyberbullying: "సైబర్ బులీయింగ్"
    },
    hi: {
      phishing: "फिशिंग",
      scams: "घोटाले",
      identity: "खतरे",
      cyberbullying: "साइबर बुलिंग"
    }
  };

  const t = textMap[lang];
  const moduleName = moduleMap[lang]?.[module] || module;

  /* TITLE */
  document.getElementById("title").innerText =
    `${moduleName} - ${t[type]}`;

  /* ✨ FORMAT FUNCTION (MAIN FIX) */
  function formatContent(text) {
    let lines = text.split("\n");

    let html = "";
    let inList = false;

    lines.forEach(line => {
      line = line.trim();
      if (line === "") return;

      // 🎯 Heading detection
      if (line.includes("Safety Tips")) {
        if (inList) {
          html += "</ul>";
          inList = false;
        }
        html += `<h3 style="color:#1e3c72; margin-top:15px;">${line}</h3>`;
      }

      // 🎯 Bullet points
      else if (line.startsWith("•")) {
        if (!inList) {
          html += "<ul>";
          inList = true;
        }
        html += `<li>${line.replace("•", "").trim()}</li>`;
      }

      // 🎯 Normal text
      else {
        if (inList) {
          html += "</ul>";
          inList = false;
        }
        html += `<p>${line}</p>`;
      }
    });

    if (inList) html += "</ul>";

    return html;
  }

  /* CONTENT (UPDATED) */
  document.getElementById("content").innerHTML =
    formatContent(data.explanation);

  /* BACK BUTTON */
  document.querySelector(".back-btn").innerText = t.back;

};

/* BACK BUTTON */
function goDashboard() {
  window.location.href = "dashboard.html";
}