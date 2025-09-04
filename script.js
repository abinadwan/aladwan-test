const userTypeSelect = document.getElementById("userType");
const inquiryTypeSelect = document.getElementById("inquiryType");
const captchaCodeEl = document.getElementById("captchaCode");
const captchaInput = document.getElementById("captchaInput");

const translations = {
  ar: {
    langToggle: "English",
    formTitle: "نموذج الاتصال",
    userTypeLabel: "نوع المستخدم",
    inquiryTypeLabel: "نوع الاستفسار",
    subjectLabel: "عنوان الرسالة (35 حرفًا كحد أقصى)",
    fullNameLabel: "الاسم الكامل",
    emailLabel: "البريد الإلكتروني",
    phoneLabel: "رقم التواصل",
    messageLabel: "نص الرسالة",
    captchaLabel: "رمز التحقق",
    captchaError: "رمز التحقق غير صحيح",
    submitBtn: "إرسال",
    homeBtn: "الرئيسية",
    userTypeOptions: {
      placeholder: "اختر",
      individual: "فرد",
      company: "شركة",
      government: "جهة حكومية"
    },
    inquiryTypeOptions: {
      placeholder: "اختر",
      inquiry: "استفسار",
      investment: "استثمار",
      development: "تطوير عقاري",
      opportunity: "فرصة عقارية",
      other: "اخرى"
    }
  },
  en: {
    langToggle: "العربية",
    formTitle: "Contact Form",
    userTypeLabel: "User Type",
    inquiryTypeLabel: "Inquiry Type",
    subjectLabel: "Subject (max 35 characters)",
    fullNameLabel: "Full Name",
    emailLabel: "Email",
    phoneLabel: "Phone Number",
    messageLabel: "Message",
    captchaLabel: "Captcha",
    captchaError: "Incorrect captcha",
    submitBtn: "Send",
    homeBtn: "Home",
    userTypeOptions: {
      placeholder: "Select",
      individual: "Individual",
      company: "Company",
      government: "Government Entity"
    },
    inquiryTypeOptions: {
      placeholder: "Select",
      inquiry: "Inquiry",
      investment: "Investment",
      development: "Real Estate Development",
      opportunity: "Real Estate Opportunity",
      other: "Other"
    }
  }
};

let currentLang = "ar";

function setLanguage(lang) {
  const t = translations[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  document.getElementById("langToggle").textContent = t.langToggle;
  document.getElementById("formTitle").textContent = t.formTitle;
  document.getElementById("userTypeLabel").textContent = t.userTypeLabel;
  document.getElementById("inquiryTypeLabel").textContent = t.inquiryTypeLabel;
  document.getElementById("subjectLabel").textContent = t.subjectLabel;
  document.getElementById("fullNameLabel").textContent = t.fullNameLabel;
  document.getElementById("emailLabel").textContent = t.emailLabel;
  document.getElementById("phoneLabel").textContent = t.phoneLabel;
  document.getElementById("messageLabel").textContent = t.messageLabel;
  document.getElementById("captchaLabel").textContent = t.captchaLabel;
  document.getElementById("submitBtn").textContent = t.submitBtn;
  document.getElementById("homeBtn").textContent = t.homeBtn;

  userTypeSelect.querySelector("option[value='']").textContent = t.userTypeOptions.placeholder;
  userTypeSelect.querySelector("option[value='individual']").textContent = t.userTypeOptions.individual;
  userTypeSelect.querySelector("option[value='company']").textContent = t.userTypeOptions.company;
  userTypeSelect.querySelector("option[value='government']").textContent = t.userTypeOptions.government;

  inquiryTypeSelect.querySelector("option[value='']").textContent = t.inquiryTypeOptions.placeholder;
  inquiryTypeSelect.querySelector("option[value='inquiry']").textContent = t.inquiryTypeOptions.inquiry;
  inquiryTypeSelect.querySelector("option[value='investment']").textContent = t.inquiryTypeOptions.investment;
  inquiryTypeSelect.querySelector("option[value='development']").textContent = t.inquiryTypeOptions.development;
  inquiryTypeSelect.querySelector("option[value='opportunity']").textContent = t.inquiryTypeOptions.opportunity;
  inquiryTypeSelect.querySelector("option[value='other']").textContent = t.inquiryTypeOptions.other;
}

document.getElementById("langToggle").addEventListener("click", () => {
  currentLang = currentLang === "ar" ? "en" : "ar";
  setLanguage(currentLang);
});

function generateCaptcha() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

function refreshCaptcha() {
  captchaValue = generateCaptcha();
  captchaCodeEl.textContent = captchaValue;
}

let captchaValue;
refreshCaptcha();

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  if (!this.checkValidity()) {
    this.classList.add('was-validated');
    return;
  }

  if (captchaInput.value !== captchaValue) {
    alert(translations[currentLang].captchaError);
    refreshCaptcha();
    captchaInput.value = "";
    return;
  }

  const inquiryText = inquiryTypeSelect.options[inquiryTypeSelect.selectedIndex].textContent;

  const params = new URLSearchParams({
    to: "info@example.com",
    subject: `${inquiryText} - ${document.getElementById("subject").value}`,
    name: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    userType: userTypeSelect.value,
    inquiryType: inquiryTypeSelect.value,
    message: document.getElementById("message").value || "",
    filename: ""
  });

  window.location.href = `inbox.html?${params.toString()}`;
});

setLanguage("ar");
