const translations = {
  ar: {
    langToggle: "English",
    homeBtn: "الرئيسية",
    formTitle: "نموذج التوظيف",
    subjectLabel: "عنوان الرسالة",
    fullNameLabel: "الاسم الكامل",
    emailLabel: "البريد الإلكتروني",
    phoneLabel: "رقم التواصل",
    messageLabel: "الموضوع",
    cvLabel: "تحميل السيرة الذاتية (PDF فقط - 5MB)",
    submitBtn: "إرسال",
    alerts: {
      pdf: "⚠️ يجب أن يكون الملف بصيغة PDF",
      size: "⚠️ الحد الأقصى لحجم السيرة الذاتية هو 5 ميجابايت"
    }
  },
  en: {
    langToggle: "العربية",
    homeBtn: "Home",
    formTitle: "Job Application",
    subjectLabel: "Subject",
    fullNameLabel: "Full Name",
    emailLabel: "Email",
    phoneLabel: "Phone Number",
    messageLabel: "Message",
    cvLabel: "Upload CV (PDF only - 5MB)",
    submitBtn: "Send",
    alerts: {
      pdf: "⚠️ File must be PDF",
      size: "⚠️ CV size limit is 5MB"
    }
  }
};

let currentLang = "ar";

function setLanguage(lang) {
  const t = translations[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  document.getElementById("langToggle").textContent = t.langToggle;
  document.getElementById("homeBtn").textContent = t.homeBtn;
  document.getElementById("formTitle").textContent = t.formTitle;
  document.getElementById("subjectLabel").textContent = t.subjectLabel;
  document.getElementById("fullNameLabel").textContent = t.fullNameLabel;
  document.getElementById("emailLabel").textContent = t.emailLabel;
  document.getElementById("phoneLabel").textContent = t.phoneLabel;
  document.getElementById("messageLabel").textContent = t.messageLabel;
  document.getElementById("cvLabel").textContent = t.cvLabel;
  document.getElementById("submitBtn").textContent = t.submitBtn;
}

document.getElementById("langToggle").addEventListener("click", () => {
  currentLang = currentLang === "ar" ? "en" : "ar";
  setLanguage(currentLang);
});

document.getElementById("jobForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const cvInput = document.getElementById("cvUpload");
  if (cvInput.files.length > 0) {
    const file = cvInput.files[0];
    const ext = file.name.split(".").pop().toLowerCase();
    if (ext !== "pdf") {
      alert(translations[currentLang].alerts.pdf);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert(translations[currentLang].alerts.size);
      return;
    }
  }

  const params = new URLSearchParams({
    to: "career@example.com",
    subject: document.getElementById("subject").value,
    name: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    message: document.getElementById("message").value,
    inquiryType: "job",
    filename: cvInput.files.length > 0 ? cvInput.files[0].name : ""
  });

  window.location.href = `inbox.html?${params.toString()}`;
});

setLanguage("ar");

