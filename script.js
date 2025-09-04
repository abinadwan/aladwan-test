document.getElementById("inquiryType").addEventListener("change", function () {
  const isJob = this.value === "وظيفة";
  document.getElementById("cvField").style.display = isJob ? "block" : "none";
  document.getElementById("messageField").style.display = isJob ? "none" : "block";
});

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const cvInput = document.getElementById("cvUpload");
  const isJob = document.getElementById("inquiryType").value === "وظيفة";

  if (isJob && cvInput.files.length > 0) {
    const file = cvInput.files[0];
    const ext = file.name.split(".").pop().toLowerCase();
    if (ext !== "pdf") {
      alert("⚠️ يجب أن يكون الملف بصيغة PDF");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("⚠️ الحد الأقصى لحجم السيرة الذاتية هو 5 ميجابايت");
      return;
    }
  }

  const to = isJob ? "career@example.com" : "info@example.com";
  const params = new URLSearchParams({
    to,
    subject: document.getElementById("subject").value,
    name: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    userType: document.getElementById("userType").value,
    inquiryType: document.getElementById("inquiryType").value,
    message: document.getElementById("message").value || "",
    filename: isJob && cvInput.files.length > 0 ? cvInput.files[0].name : ""
  });

  window.location.href = `inbox.html?${params.toString()}`;
});
