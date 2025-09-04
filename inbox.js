function getParams() {
  return new URLSearchParams(window.location.search);
}

const params = getParams();

document.getElementById("toEmail").textContent = params.get("to");
document.getElementById("emailSubject").textContent = params.get("subject");

const bodyHTML = `
  <p><strong>👤 الاسم:</strong> ${params.get("name")}</p>
  <p><strong>📧 البريد:</strong> ${params.get("email")}</p>
  <p><strong>📱 الهاتف:</strong> ${params.get("phone")}</p>
  <p><strong>🏷️ نوع المستخدم:</strong> ${params.get("userType")}</p>
  <p><strong>💬 نوع الاستفسار:</strong> ${params.get("inquiryType")}</p>
  ${params.get("message") ? `<p><strong>📝 الرسالة:</strong><br>${params.get("message").replace(/\n/g, "<br>")}</p>` : ""}
`;

document.getElementById("emailBody").innerHTML = bodyHTML;

// مرفق
const filename = params.get("filename");
if (filename) {
  document.getElementById("attachment").innerHTML = `
    <p><strong>📎 مرفق:</strong> ${filename}</p>
  `;
}
