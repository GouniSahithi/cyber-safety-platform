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
      next: "Next →",
      tutorial: "TUTORIAL",
      news: "NEWS",
      scenario: "SCENARIO"
    },
    te: {
      next: "తర్వాత →",
      tutorial: "ట్యుటోరియల్",
      news: "వార్తలు",
      scenario: "సన్నివేశం"
    },
    hi: {
      next: "आगे →",
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

  /* NEXT BUTTON */
  document.querySelector(".next-btn").innerText = t.next;

  /* LOAD VIDEOS */
  const container = document.getElementById("videoList");
  container.innerHTML = "";

  data.videos.forEach(v => {
    const div = document.createElement("div");
    div.className = "video-card";

    if (v.link.includes("youtube")) {
      div.innerHTML = `
        <h4>${v.title}</h4>
        <iframe src="${v.link}" allowfullscreen></iframe>
      `;
    } else {
      div.innerHTML = `
        <h4>${v.title}</h4>
        <video controls>
          <source src="${v.link}">
        </video>
      `;
    }

    container.appendChild(div);
  });

};

/* NEXT BUTTON */
function goNext() {
  window.location.href = "quickDetails.html";
}