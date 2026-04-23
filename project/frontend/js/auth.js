/* ---------------- API ---------------- */

const API = "http://localhost:8080/api";

/* ---------------- LANGUAGE FUNCTION ---------------- */

function getLang() {
    return localStorage.getItem("language") || "en";
}

/* ---------------- TRANSLATIONS ---------------- */

const translations = {

    en: {
        login: "Login",
        register: "Register",
        username: "Username",
        password: "Password",
        newUser: "New user?",
        registerHere: "Register here",
        already: "Already have an account?",
        saveProfile: "Save Profile"
    },

    te: {
        login: "లాగిన్",
        register: "నమోదు",
        username: "వినియోగదారు పేరు",
        password: "పాస్వర్డ్",
        newUser: "కొత్త వినియోగదారా?",
        registerHere: "ఇక్కడ నమోదు చేయండి",
        already: "ఇప్పటికే ఖాతా ఉందా?",
        saveProfile: "ప్రొఫైల్ సేవ్ చేయండి"
    },

    hi: {
        login: "लॉगिन",
        register: "पंजीकरण",
        username: "उपयोगकर्ता नाम",
        password: "पासवर्ड",
        newUser: "नया उपयोगकर्ता?",
        registerHere: "यहाँ पंजीकरण करें",
        already: "पहले से खाता है?",
        saveProfile: "प्रोफाइल सेव करें"
    }

};

/* ---------------- APPLY LOGIN LANGUAGE ---------------- */

function applyLoginLanguage() {

    const lang = getLang();
    const t = translations[lang] || translations.en;

    document.querySelector("h2").innerText = t.login;

    document.getElementById("username").placeholder = t.username;
    document.getElementById("password").placeholder = t.password;

    document.getElementById("loginBtn").innerText = t.login;

    document.getElementById("registerText").innerHTML =
        `${t.newUser} <a href="register.html">${t.registerHere}</a>`;
}

/* ---------------- APPLY REGISTER LANGUAGE ---------------- */

function applyRegisterLanguage() {

    const lang = getLang();
    const t = translations[lang] || translations.en;

    document.querySelector("h2").innerText = t.register;

    document.getElementById("username").placeholder = t.username;
    document.getElementById("password").placeholder = t.password;

    document.getElementById("registerBtn").innerText = t.register;

    document.getElementById("loginText").innerHTML =
        `${t.already} <a href="login.html">${t.login}</a>`;
}

/* ---------------- REGISTER USER ---------------- */

async function registerUser() {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Fill all fields");
        return;
    }

    try {

        const res = await fetch(`${API}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        if (!res.ok) {
            alert("Registration failed");
            return;
        }

        const user = await res.json();

        localStorage.setItem("userId", user.id);

        window.location.href = "profile.html";

    } catch (error) {
        console.error(error);
        alert("Server error");
    }
}

/* ---------------- LOGIN USER ---------------- */

async function loginUser() {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Fill all fields");
        return;
    }

    try {

        const res = await fetch(`${API}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        if (!res.ok) {
            alert("Invalid login");
            return;
        }

        const user = await res.json();

        localStorage.setItem("userId", user.id);

        window.location.href = "dashboard.html";

    } catch (error) {
        console.error(error);
        alert("Server error");
    }
}