const translations = {
  ar: { pageTitle: "اتصل بنا", ... /* اختصرنا المحتوى */ },
  en: { pageTitle: "Contact Us", ... /* اختصرنا المحتوى */ }
};

let currentLang = 'ar';

// تبديل اللغة
document.getElementById('langToggle').addEventListener('click', function () {
  currentLang = currentLang === 'ar' ? 'en' : 'ar';
  this.textContent = currentLang === 'ar' ? 'English' : 'العربية';
  document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = currentLang;
  Object.keys(translations.ar).forEach(key => {
    const element = document.getElementById(key);
    if (element) element.textContent = translations[currentLang][key];
  });
  document.querySelectorAll('option[data-en]').forEach(opt => {
    opt.textContent = currentLang === 'ar' ? opt.value : opt.getAttribute('data-en');
  });
});

// عداد الأحرف
document.getElementById("subject").addEventListener("input", function () {
  document.getElementById("charCount").textContent = this.value.length;
});

// تبديل الحقول بناءً على نوع الاستفسار
document.getElementById("inquiryType").addEventListener("change", function () {
  const jobFields = document.getElementById("jobFields");
  const messageField = document.getElementById("messageField");
  const selected = this.options[this.selectedIndex].getAttribute('data-en') || this.value;
  if (selected === 'Job Inquiry' || this.value === 'وظيفة') {
    jobFields.style.display = "block";
    messageField.style.display = "none";
  } else {
    jobFields.style.display = "none";
    messageField.style.display = "block";
  }
});

// الإرسال
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  if (!this.checkValidity()) {
    alert(currentLang === 'ar' ? 'يرجى تعبئة جميع الحقول المطلوبة.' : 'Please fill in all required fields.');
    return;
  }
  const inquiryType = document.getElementById("inquiryType").value;
  const isJob = inquiryType === "وظيفة" || document.querySelector("#inquiryType option:checked").getAttribute('data-en') === 'Job Inquiry';
  const recipient = isJob ? "career@aladwan.sa" : "info@aladwan.sa";

  document.getElementById("formContainer").style.display = "none";
  document.getElementById("emailPreview").style.display = "block";
  document.getElementById("recipientEmail").textContent = recipient;
  document.getElementById("displaySubject").textContent = document.getElementById("subject").value || "(بلا عنوان)";

  const userType = document.getElementById("userType").value;
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  let body = "";
  if (isJob) {
    const jobTitle = document.getElementById("jobTitle").value;
    body = `
      <strong>نوع المستخدم:</strong> ${userType}<br>
      <strong>الاسم الكامل:</strong> ${fullName}<br>
      <strong>البريد الإلكتروني:</strong> ${email}<br>
      <strong>رقم التواصل:</strong> ${phone}<br>
      <strong>نوع الاستفسار:</strong> وظيفة<br>
      <strong>المسمى الوظيفي:</strong> ${jobTitle || "غير محدد"}<br>
      <strong>ملاحظات:</strong> تم رفع السيرة الذاتية.
    `;
  } else {
    const message = document.getElementById("message").value;
    body = `
      <strong>نوع المستخدم:</strong> ${userType}<br>
      <strong>الاسم الكامل:</strong> ${fullName}<br>
      <strong>البريد الإلكتروني:</strong> ${email}<br>
      <strong>رقم التواصل:</strong> ${phone}<br>
      <strong>نوع الاستفسار:</strong> ${inquiryType}<br>
      <strong>نص الرسالة:</strong><br>
      ${message.replace(/\n/g, '<br>')}
    `;
  }

  document.getElementById("emailBody").innerHTML = body;
});

// العودة للنموذج
document.getElementById("backBtn").addEventListener("click", function () {
  const form = document.getElementById("contactForm");
  form.reset();
  document.getElementById("charCount").textContent = "0";
  document.getElementById("jobFields").style.display = "none";
  document.getElementById("messageField").style.display = "block";
  document.getElementById("emailPreview").style.display = "none";
  document.getElementById("formContainer").style.display = "block";
  const cvInput = document.getElementById("cvUpload");
  if (cvInput) cvInput.value = "";
});
