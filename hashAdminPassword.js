// hashAdminPassword.js
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const user = require('./models/user.model'); 

async function hashAndSaveAdminPassword() {
  const adminPassword = 'admin1'; 

  
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await user.updateOne({ username: 'admin1' }, { password: hashedPassword });

  console.log('Admin password updated with hashed version');
  mongoose.connection.close();
}

mongoose.connect('mongodb+srv://fathimamazeenamycloudcubicle:SZYJLZSnWKEDGwUy@cluster0.peyi7i6.mongodb.net/divine-dining-restaurant?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => hashAndSaveAdminPassword())
  .catch(err => console.error('Database connection error:', err));
