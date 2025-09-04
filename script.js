const userTypeSelect = document.getElementById("userType");
const inquiryTypeSelect = document.getElementById("inquiryType");
const jobOption = inquiryTypeSelect.querySelector("option[value='job']");

const translations = {
  ar: {
    langToggle: "English",
    formTitle: "نموذج الاتصال",
    userTypeLabel: "نوع المستخدم",
    inquiryTypeLabel: "نوع الاستفسار",
    subjectLabel: "عنوان الرسالة",
    fullNameLabel: "الاسم الكامل",
    emailLabel: "البريد الإلكتروني",
    phoneLabel: "رقم التواصل",
    cvLabel: "تحميل السيرة الذاتية (PDF فقط - 5MB)",
    messageLabel: "نص الرسالة",
    submitBtn: "إرسال",
    userTypeOptions: {
      placeholder: "اختر",
      individual: "فرد",
      company: "شركة",
      government: "جهة حكومية"
    },
    inquiryTypeOptions: {
      placeholder: "اختر",
      job: "وظيفة",
      question: "استفسار",
      complaint: "شكوى"
    },
    alerts: {
      pdf: "⚠️ يجب أن يكون الملف بصيغة PDF",
      size: "⚠️ الحد الأقصى لحجم السيرة الذاتية هو 5 ميجابايت"
    }
  },
  en: {
    langToggle: "العربية",
    formTitle: "Contact Form",
    userTypeLabel: "User Type",
    inquiryTypeLabel: "Inquiry Type",
    subjectLabel: "Subject",
    fullNameLabel: "Full Name",
    emailLabel: "Email",
    phoneLabel: "Phone Number",
    cvLabel: "Upload CV (PDF only - 5MB)",
    messageLabel: "Message",
    submitBtn: "Send",
    userTypeOptions: {
      placeholder: "Select",
      individual: "Individual",
      company: "Company",
      government: "Government Entity"
    },
    inquiryTypeOptions: {
      placeholder: "Select",
      job: "Job",
      question: "Inquiry",
      complaint: "Complaint"
    },
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
  document.getElementById("formTitle").textContent = t.formTitle;
  document.getElementById("userTypeLabel").textContent = t.userTypeLabel;
  document.getElementById("inquiryTypeLabel").textContent = t.inquiryTypeLabel;
  document.getElementById("subjectLabel").textContent = t.subjectLabel;
  document.getElementById("fullNameLabel").textContent = t.fullNameLabel;
  document.getElementById("emailLabel").textContent = t.emailLabel;
  document.getElementById("phoneLabel").textContent = t.phoneLabel;
  document.getElementById("cvLabel").textContent = t.cvLabel;
  document.getElementById("messageLabel").textContent = t.messageLabel;
  document.getElementById("submitBtn").textContent = t.submitBtn;

  userTypeSelect.querySelector("option[value='']").textContent = t.userTypeOptions.placeholder;
  userTypeSelect.querySelector("option[value='individual']").textContent = t.userTypeOptions.individual;
  userTypeSelect.querySelector("option[value='company']").textContent = t.userTypeOptions.company;
  userTypeSelect.querySelector("option[value='government']").textContent = t.userTypeOptions.government;

  inquiryTypeSelect.querySelector("option[value='']").textContent = t.inquiryTypeOptions.placeholder;
  inquiryTypeSelect.querySelector("option[value='job']").textContent = t.inquiryTypeOptions.job;
  inquiryTypeSelect.querySelector("option[value='question']").textContent = t.inquiryTypeOptions.question;
  inquiryTypeSelect.querySelector("option[value='complaint']").textContent = t.inquiryTypeOptions.complaint;
}

document.getElementById("langToggle").addEventListener("click", () => {
  currentLang = currentLang === "ar" ? "en" : "ar";
  setLanguage(currentLang);
});

userTypeSelect.addEventListener("change", function () {
  const hideJob = this.value === "company" || this.value === "government";
  jobOption.hidden = hideJob;
  if (hideJob && inquiryTypeSelect.value === "job") {
    inquiryTypeSelect.value = "";
    inquiryTypeSelect.dispatchEvent(new Event("change"));
  }
});

inquiryTypeSelect.addEventListener("change", function () {
  const isJob = this.value === "job";
  const cvField = document.getElementById("cvField");
  const cvInput = document.getElementById("cvUpload");
  const messageField = document.getElementById("messageField");
  const messageInput = document.getElementById("message");

  cvField.style.display = isJob ? "block" : "none";
  cvInput.required = isJob;

  messageField.style.display = isJob ? "none" : "block";
  messageInput.required = !isJob;
});

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const cvInput = document.getElementById("cvUpload");
  const isJob = inquiryTypeSelect.value === "job";

  if (isJob && cvInput.files.length > 0) {
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

  const to = isJob ? "career@example.com" : "info@example.com";
  const inquiryText = inquiryTypeSelect.options[inquiryTypeSelect.selectedIndex].textContent;

  const params = new URLSearchParams({
    to,
    subject: `${inquiryText} - ${document.getElementById("subject").value}`,
    name: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    userType: userTypeSelect.value,
    inquiryType: inquiryTypeSelect.value,
    message: document.getElementById("message").value || "",
    filename: isJob && cvInput.files.length > 0 ? cvInput.files[0].name : ""
  });

  window.location.href = `inbox.html?${params.toString()}`;
});

setLanguage("ar");

inquiryTypeSelect.dispatchEvent(new Event("change"));

