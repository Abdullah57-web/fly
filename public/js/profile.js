(function () {
  "use strict";

  // ── DOM references ──
  var form = document.getElementById("profile-form");
  var resetBtn = document.getElementById("reset-btn");
  var successMessage = document.getElementById("form-success");

  var fields = {
    studentId: {
      input: document.getElementById("student-id"),
      error: document.getElementById("student-id-error"),
    },
    fullName: {
      input: document.getElementById("full-name"),
      error: document.getElementById("full-name-error"),
    },
    institutionalEmail: {
      input: document.getElementById("institutional-email"),
      error: document.getElementById("institutional-email-error"),
    },
    accountPassword: {
      input: document.getElementById("account-password"),
      error: document.getElementById("account-password-error"),
    },
  };

  // ── Validation patterns ──
  // Letters followed by digits (e.g., STU12345)
  var STUDENT_ID_PATTERN = /^[A-Za-z]+\d+$/;

  // Must end with a valid university domain suffix (.edu)
  var INSTITUTIONAL_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.edu$/i;

  // At least 8 chars, one digit, one special character
  var PASSWORD_PATTERN = /^(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

  /**
   * Clears error state for a single field.
   */
  function clearFieldError(field) {
    field.error.textContent = "";
    field.input.classList.remove("form-field__input--invalid");
    field.input.removeAttribute("aria-invalid");
  }

  /**
   * Sets error state for a single field.
   */
  function setFieldError(field, message) {
    field.error.textContent = message;
    field.input.classList.add("form-field__input--invalid");
    field.input.setAttribute("aria-invalid", "true");
  }

  /**
   * Clears all field errors and the success banner.
   */
  function clearAllErrors() {
    Object.keys(fields).forEach(function (key) {
      clearFieldError(fields[key]);
    });
    successMessage.textContent = "";
  }

  // ═══════════════════════════════════════════════════════════════
  // VALIDATION CHECK: Student ID — alphanumeric format (e.g. STU12345)
  // Test with: "STU12345" (valid), "12345" (invalid), "STU" (invalid)
  // ═══════════════════════════════════════════════════════════════
  function validateStudentId(value) {
    if (!value.trim()) {
      return "Student ID is required.";
    }
    if (!STUDENT_ID_PATTERN.test(value.trim())) {
      return "Student ID must use letters followed by numbers (e.g., STU12345).";
    }
    return "";
  }

  // ═══════════════════════════════════════════════════════════════
  // VALIDATION CHECK: Full Name — required, minimum length
  // Test with: "Jane Doe" (valid), "" (invalid), "A" (invalid)
  // ═══════════════════════════════════════════════════════════════
  function validateFullName(value) {
    if (!value.trim()) {
      return "Full name is required.";
    }
    if (value.trim().length < 2) {
      return "Full name must be at least 2 characters.";
    }
    return "";
  }

  // ═══════════════════════════════════════════════════════════════
  // VALIDATION CHECK: Institutional Email — must end with .edu domain
  // Test with: "student@university.edu" (valid), "student@gmail.com" (invalid)
  // ═══════════════════════════════════════════════════════════════
  function validateInstitutionalEmail(value) {
    if (!value.trim()) {
      return "Institutional email is required.";
    }
    if (!INSTITUTIONAL_EMAIL_PATTERN.test(value.trim())) {
      return "Email must be a valid institutional address ending in .edu.";
    }
    return "";
  }

  // ═══════════════════════════════════════════════════════════════
  // VALIDATION CHECK: Account Password — min 8 chars, number + special char
  // Test with: "Secure1!" (valid), "password" (invalid), "Pass1" (invalid)
  // ═══════════════════════════════════════════════════════════════
  function validateAccountPassword(value) {
    if (!value) {
      return "Account password is required.";
    }
    if (value.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (!/\d/.test(value)) {
      return "Password must contain at least one number.";
    }
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)) {
      return "Password must contain at least one special character.";
    }
    if (!PASSWORD_PATTERN.test(value)) {
      return "Password must be at least 8 characters with one number and one special character.";
    }
    return "";
  }

  /**
   * Runs all validation checks and returns true only if every field passes.
   * Errors are displayed immediately beneath invalid inputs on submit.
   */
  function validateForm() {
    var validators = [
      { field: fields.studentId, validate: validateStudentId },
      { field: fields.fullName, validate: validateFullName },
      { field: fields.institutionalEmail, validate: validateInstitutionalEmail },
      { field: fields.accountPassword, validate: validateAccountPassword },
    ];

    var isValid = true;
    var firstInvalidInput = null;

    validators.forEach(function (item) {
      clearFieldError(item.field);
      var message = item.validate(item.field.input.value);

      if (message) {
        setFieldError(item.field, message);
        isValid = false;
        if (!firstInvalidInput) {
          firstInvalidInput = item.field.input;
        }
      }
    });

    if (firstInvalidInput) {
      firstInvalidInput.focus();
    }

    return isValid;
  }

  // ── Submit handler: trigger validation on save attempt ──
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    successMessage.textContent = "";

    if (validateForm()) {
      successMessage.textContent =
        "Profile settings saved successfully. Your information has been verified.";
    }
  });

  // ── Reset handler ──
  resetBtn.addEventListener("click", function () {
    form.reset();
    clearAllErrors();
  });
})();
