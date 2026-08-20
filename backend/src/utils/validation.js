const MIN_USER_PASSWORD_LENGTH = 10;

function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase();
}

function isValidEmail(value) {
  const email = normalizeEmail(value);
  return email.length <= 320 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function passwordError(password) {
  if (typeof password !== 'string' || password.length < MIN_USER_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_USER_PASSWORD_LENGTH} characters`;
  }
  if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    return 'Password must contain at least one letter and one number';
  }
  return null;
}

function cleanText(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

module.exports = { MIN_USER_PASSWORD_LENGTH, normalizeEmail, isValidEmail, passwordError, cleanText };
