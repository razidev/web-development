const bcrypt = require('bcryptjs');

const db = require('../data/database');

class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  async getUserByEmail() {
    const existingUser = await db
      .getDb()
      .collection('users')
      .findOne({ email: this.email });

    return existingUser;
  }

  async isExistingUser() {
    const existingUser = await this.getUserByEmail();
    if (existingUser) {
      return true;
    } else {
      return false;
    }
  }

  async insertUser() {
    const hashedPassword = await bcrypt.hash(this.password, 12);

    const result = await db.getDb().collection('users').insertOne({
      email: this.email,
      password: hashedPassword,
    });

    return result;
  }

  async comparePassword(comparePassword) {
    const passwordsAreEqual = await bcrypt.compare(
      this.password,
      comparePassword
    );

    return passwordsAreEqual;
  }
}

module.exports = User;
