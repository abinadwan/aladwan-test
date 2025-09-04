const params = new URLSearchParams(window.location.search);
const bodyContainer = document.getElementById("emailBody");

const translations = {
  ar: {
    langToggle: "English",
    title: "📥 رسالة جديدة",
    to: "📨 إلى:",
    subject: "🧾 الموضوع:",
    name: "👤 الاسم:",
    email: "📧 البريد:",
    phone: "📱 الهاتف:",
    userType: "🏷️ نوع المستخدم:",
    inquiryType: "💬 نوع الاستفسار:",
    message: "📝 الرسالة:",
    attachment: "📎 مرفق:",
    userTypeMap: {
      individual: "فرد",
      company: "شركة",
      government: "جهة حكومية"
    },
    inquiryTypeMap: {
      job: "وظيفة",
      question: "استفسار",
      complaint: "شكوى"
    }
  },
  en: {
    langToggle: "العربية",
    title: "📥 New Message",
    to: "📨 To:",
    subject: "🧾 Subject:",
    name: "👤 Name:",
    email: "📧 Email:",
    phone: "📱 Phone:",
    userType: "🏷️ User Type:",
    inquiryType: "💬 Inquiry Type:",
    message: "📝 Message:",
    attachment: "📎 Attachment:",
    userTypeMap: {
      individual: "Individual",
      company: "Company",
      government: "Government Entity"
    },
    inquiryTypeMap: {
      job: "Job",
      question: "Inquiry",
      complaint: "Complaint"
    }
  }
};

let currentLang = "ar";

function addField(label, value) {
  if (!value) return;
  const p = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = label;
  p.appendChild(strong);
  p.append(` ${value}`);
  bodyContainer.appendChild(p);
}

function render(lang) {
  const t = translations[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  document.getElementById("langToggle").textContent = t.langToggle;
  document.getElementById("inboxTitle").textContent = t.title;
  document.getElementById("toLabel").textContent = t.to;
  document.getElementById("subjectLabel").textContent = t.subject;

  document.getElementById("toEmail").textContent = params.get("to");
  document.getElementById("emailSubject").textContent = params.get("subject");

  bodyContainer.innerHTML = "";
  addField(t.name, params.get("name"));
  addField(t.email, params.get("email"));
  addField(t.phone, params.get("phone"));
  addField(t.userType, t.userTypeMap[params.get("userType")] || "");
  addField(t.inquiryType, t.inquiryTypeMap[params.get("inquiryType")] || "");

  const message = params.get("message");
  if (message) {
    const p = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = t.message;
    p.appendChild(strong);
    p.appendChild(document.createElement("br"));
    message.split("\n").forEach((line, idx) => {
      if (idx > 0) p.appendChild(document.createElement("br"));
      p.append(line);
    });
    bodyContainer.appendChild(p);
  }

  const filename = params.get("filename");
  const attachment = document.getElementById("attachment");
  attachment.innerHTML = "";
  if (filename) {
    const p = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = t.attachment;
    p.appendChild(strong);
    p.append(` ${filename}`);
    attachment.appendChild(p);
  }
}

document.getElementById("langToggle").addEventListener("click", () => {
  currentLang = currentLang === "ar" ? "en" : "ar";
  render(currentLang);
});

render("ar");

