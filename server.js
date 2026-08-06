const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const defaultProfile = {
  firstName: 'Abdullah',
  lastName: '',
  username: 'abdullah',
  email: 'abdullah@example.com',
  phone: '',
  bio: '',
  location: '',
  timezone: 'Asia/Karachi',
  language: 'en',
  emailNotifications: true,
  pushNotifications: false,
};

let profile = { ...defaultProfile };

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/profile', (_req, res) => {
  res.json(profile);
});

app.put('/api/profile', (req, res) => {
  const { firstName, lastName, username, email, phone, bio, location, timezone, language, emailNotifications, pushNotifications } = req.body;

  if (!firstName?.trim() || !email?.trim() || !username?.trim()) {
    return res.status(400).json({ error: 'First name, username, and email are required.' });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  profile = {
    ...profile,
    firstName: firstName.trim(),
    lastName: (lastName || '').trim(),
    username: username.trim(),
    email: email.trim(),
    phone: (phone || '').trim(),
    bio: (bio || '').trim(),
    location: (location || '').trim(),
    timezone: timezone || 'UTC',
    language: language || 'en',
    emailNotifications: Boolean(emailNotifications),
    pushNotifications: Boolean(pushNotifications),
  };

  res.json({ message: 'Profile updated successfully.', profile });
});

app.listen(PORT, () => {
  console.log(`Profile settings running at http://localhost:${PORT}`);
});
