const bcrypt = require('bcryptjs');

const plainPassword = '@maindivision'; // Replace with your actual password
const saltRounds = 10;

bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error generating hash:', err);
    return;
  }
  console.log('Hashed password:', hash);
});
