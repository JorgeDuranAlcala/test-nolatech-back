const bcrypt = require('bcrypt')


class User {
  constructor({ id, password, email }) {
    this.id = id;
    this.email = email;
    this.password = password;
  }

    async setPassword(password) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(password, salt);
    }

    async validatePassword(password) {
        return await bcrypt.compare(password, this.password);
    }
}

module.exports = User;