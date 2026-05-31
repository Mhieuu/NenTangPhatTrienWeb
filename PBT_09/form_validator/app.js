const form = document.querySelector("#registerForm");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmInput = document.querySelector("#confirmPassword");
const phoneInput = document.querySelector("#phone");
const submitBtn = document.querySelector("#submitBtn");
const passwordBar = document.querySelector("#passwordBar");
const passwordText = document.querySelector("#passwordText");
const nameFeedback = document.querySelector("#nameFeedback");
const emailFeedback = document.querySelector("#emailFeedback");
const confirmFeedback = document.querySelector("#confirmFeedback");
const phoneFeedback = document.querySelector("#phoneFeedback");
const modal = document.querySelector("#successModal");
const successContent = document.querySelector("#successContent");
const closeSuccess = document.querySelector("#closeSuccess");

function validateName() {
  const value = nameInput.value.trim();
  const valid = value.length >= 2 && value.length <= 50;
  nameInput.classList.toggle("valid", valid);
  nameInput.classList.toggle("invalid", !valid && value.length > 0);
  nameFeedback.textContent = valid ? "✅" : value ? "❌ Tên phải từ 2-50 ký tự" : "";
  return valid;
}

function validateEmail() {
  const value = emailInput.value.trim();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  emailInput.classList.toggle("valid", valid);
  emailInput.classList.toggle("invalid", !valid && value.length > 0);
  emailFeedback.textContent = valid ? "Email hợp lệ" : value ? "Email không đúng định dạng" : "";
  return valid;
}

function getPasswordStrength(value) {
  const hasLength = value.length >= 8;
  const hasLetters = /[a-zA-Z]/.test(value);
  const hasNumbers = /\d/.test(value);
  const hasSpecial = /[^a-zA-Z0-9]/.test(value);

  if (!hasLength) return { label: "Yếu", width: "33%", color: "var(--danger)", valid: false };
  if (hasLetters && hasNumbers && hasSpecial && /[a-z]/.test(value) && /[A-Z]/.test(value)) {
    return { label: "Mạnh", width: "100%", color: "var(--success)", valid: true };
  }
  if (hasLetters && hasNumbers) return { label: "Trung bình", width: "66%", color: "var(--warning)", valid: true };
  return { label: "Yếu", width: "33%", color: "var(--danger)", valid: false };
}

function validatePassword() {
  const value = passwordInput.value;
  const strength = getPasswordStrength(value);
  passwordBar.style.width = strength.width;
  passwordBar.style.background = strength.color;
  passwordText.textContent = value ? `Mật khẩu: ${strength.label}` : "";
  return strength.valid;
}

function validateConfirm() {
  const valid = confirmInput.value.length > 0 && confirmInput.value === passwordInput.value;
  confirmInput.classList.toggle("valid", valid);
  confirmInput.classList.toggle("invalid", !valid && confirmInput.value.length > 0);
  confirmFeedback.textContent = valid ? "Khớp mật khẩu" : confirmInput.value ? "Mật khẩu xác nhận không khớp" : "";
  return valid;
}

function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  const parts = [];
  if (digits.length > 4) parts.push(digits.slice(0, 4), digits.slice(4, 7), digits.slice(7));
  else if (digits.length > 7) parts.push(digits.slice(0, 4), digits.slice(4, 7), digits.slice(7));
  else if (digits.length > 4) parts.push(digits.slice(0, 4), digits.slice(4));
  else parts.push(digits);
  return parts.filter(Boolean).join("-");
}

function validatePhone() {
  const digits = phoneInput.value.replace(/\D/g, "");
  const valid = /^\d{10}$/.test(digits);
  phoneInput.classList.toggle("valid", valid);
  phoneInput.classList.toggle("invalid", !valid && digits.length > 0);
  phoneFeedback.textContent = valid ? "Số điện thoại hợp lệ" : digits.length > 0 ? "Cần đúng 10 chữ số" : "";
  return valid;
}

function updateSubmitState() {
  submitBtn.disabled = !(validateName() && validateEmail() && validatePassword() && validateConfirm() && validatePhone());
}

[nameInput, emailInput, passwordInput, confirmInput, phoneInput].forEach((field) => {
  field.addEventListener("input", () => {
    if (field === phoneInput) {
      field.value = formatPhone(field.value);
    }
    validateName();
    validateEmail();
    validatePassword();
    validateConfirm();
    validatePhone();
    updateSubmitState();
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  updateSubmitState();
  if (submitBtn.disabled) return;
  successContent.textContent = `Tên: ${nameInput.value}\nEmail: ${emailInput.value}\nPhone: ${phoneInput.value}`;
  modal.classList.remove("hidden");
});

closeSuccess.addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.classList.add("hidden");
});
