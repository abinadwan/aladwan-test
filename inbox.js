function getParams() {
  return new URLSearchParams(window.location.search);
}

const params = getParams();

document.getElementById("toEmail").textContent = params.get("to");
document.getElementById("emailSubject").textContent = params.get("subject");

const bodyContainer = document.getElementById("emailBody");
function addField(label, value) {
  const p = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = label;
  p.appendChild(strong);
  p.append(` ${value}`);
  bodyContainer.appendChild(p);
}

addField("👤 الاسم:", params.get("name"));
addField("📧 البريد:", params.get("email"));
addField("📱 الهاتف:", params.get("phone"));
addField("🏷️ نوع المستخدم:", params.get("userType"));
addField("💬 نوع الاستفسار:", params.get("inquiryType"));

const message = params.get("message");
if (message) {
  const p = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = "📝 الرسالة:";
  p.appendChild(strong);
  p.appendChild(document.createElement("br"));
  message.split("\n").forEach((line, idx) => {
    if (idx > 0) p.appendChild(document.createElement("br"));
    p.append(line);
  });
  bodyContainer.appendChild(p);
}

const filename = params.get("filename");
if (filename) {
  const attachment = document.getElementById("attachment");
  const p = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = "📎 مرفق:";
  p.appendChild(strong);
  p.append(` ${filename}`);
  attachment.appendChild(p);
}

