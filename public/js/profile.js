const form = document.getElementById('profile-form');
const alertBox = document.getElementById('alert');
const saveBtn = document.getElementById('save-btn');
const resetBtn = document.getElementById('reset-btn');
const avatarPreview = document.getElementById('avatar-preview');
const bioField = document.getElementById('bio');
const bioCount = document.getElementById('bio-count');

let originalProfile = null;

function showAlert(message, type = 'success') {
  alertBox.textContent = message;
  alertBox.className = `alert ${type}`;
  alertBox.classList.remove('hidden');
}

function hideAlert() {
  alertBox.classList.add('hidden');
}

function setFieldError(name, message) {
  const input = form.elements[name];
  const errorEl = document.querySelector(`[data-error-for="${name}"]`);

  if (message) {
    input.classList.add('invalid');
    if (errorEl) errorEl.textContent = message;
  } else {
    input.classList.remove('invalid');
    if (errorEl) errorEl.textContent = '';
  }
}

function clearErrors() {
  ['firstName', 'username', 'email'].forEach((name) => setFieldError(name, ''));
}

function updateAvatar(firstName, lastName) {
  const initials = `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase() || '?';
  avatarPreview.textContent = initials;
}

function updateBioCount() {
  bioCount.textContent = `${bioField.value.length} / 280`;
}

function fillForm(profile) {
  form.firstName.value = profile.firstName || '';
  form.lastName.value = profile.lastName || '';
  form.username.value = profile.username || '';
  form.email.value = profile.email || '';
  form.phone.value = profile.phone || '';
  form.bio.value = profile.bio || '';
  form.location.value = profile.location || '';
  form.timezone.value = profile.timezone || 'UTC';
  form.language.value = profile.language || 'en';
  form.emailNotifications.checked = Boolean(profile.emailNotifications);
  form.pushNotifications.checked = Boolean(profile.pushNotifications);

  updateAvatar(profile.firstName, profile.lastName);
  updateBioCount();
}

function getFormData() {
  return {
    firstName: form.firstName.value.trim(),
    lastName: form.lastName.value.trim(),
    username: form.username.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    bio: form.bio.value.trim(),
    location: form.location.value.trim(),
    timezone: form.timezone.value,
    language: form.language.value,
    emailNotifications: form.emailNotifications.checked,
    pushNotifications: form.pushNotifications.checked,
  };
}

function validateClient(data) {
  clearErrors();
  let valid = true;

  if (!data.firstName) {
    setFieldError('firstName', 'First name is required.');
    valid = false;
  }

  if (!data.username) {
    setFieldError('username', 'Username is required.');
    valid = false;
  }

  if (!data.email) {
    setFieldError('email', 'Email is required.');
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    setFieldError('email', 'Enter a valid email address.');
    valid = false;
  }

  return valid;
}

async function loadProfile() {
  try {
    const response = await fetch('/api/profile');
    if (!response.ok) throw new Error('Failed to load profile');

    originalProfile = await response.json();
    fillForm(originalProfile);
  } catch {
    showAlert('Could not load your profile. Please refresh the page.', 'error');
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  hideAlert();

  const data = getFormData();
  if (!validateClient(data)) return;

  saveBtn.disabled = true;
  saveBtn.textContent = 'Saving...';

  try {
    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      showAlert(result.error || 'Something went wrong.', 'error');
      return;
    }

    originalProfile = result.profile;
    fillForm(originalProfile);
    showAlert(result.message, 'success');
  } catch {
    showAlert('Network error. Please try again.', 'error');
  } finally {
    saveBtn.disabled = false;
    saveBtn.textContent = 'Save changes';
  }
});

resetBtn.addEventListener('click', () => {
  hideAlert();
  clearErrors();
  if (originalProfile) fillForm(originalProfile);
});

form.firstName.addEventListener('input', () => {
  updateAvatar(form.firstName.value, form.lastName.value);
});

form.lastName.addEventListener('input', () => {
  updateAvatar(form.firstName.value, form.lastName.value);
});

bioField.addEventListener('input', updateBioCount);

loadProfile();
