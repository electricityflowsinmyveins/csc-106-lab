// contact.js — form validation

function validateContactForm() {

  var name = document.getElementById('c-name').value.trim();
  var email = document.getElementById('c-email').value.trim();
  var phone = document.getElementById('c-phone').value.trim();
  var message = document.getElementById('c-msg').value.trim();

  var hasErrors = false;

  // reset all errors first
  var errorFields = document.querySelectorAll('.error-msg');
  errorFields.forEach(function(el) {
    el.classList.remove('show');
  });

  // validate name
  if (!name) {
    document.getElementById('err-name').classList.add('show');
    hasErrors = true;
  }

  // validate email — simple pattern check
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    document.getElementById('err-email').classList.add('show');
    hasErrors = true;
  }

  // validate phone — digits only
  var phonePattern = /^\d+$/;
  if (!phone || !phonePattern.test(phone)) {
    document.getElementById('err-phone').classList.add('show');
    hasErrors = true;
  }

  // validate message
  if (!message) {
    document.getElementById('err-msg').classList.add('show');
    hasErrors = true;
  }

  if (hasErrors) return;

  // if all good, show success
  var successBox = document.getElementById('success-msg');
  successBox.style.display = 'block';

  // clear form
  document.getElementById('c-name').value = '';
  document.getElementById('c-email').value = '';
  document.getElementById('c-phone').value = '';
  document.getElementById('c-msg').value = '';

  // hide success after a few seconds
  setTimeout(function() {
    successBox.style.display = 'none';
  }, 5000);
}
