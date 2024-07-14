const User = require("../../../domain/entities/user/User")
const { v4: uuidv4 } = require('uuid');

const users = []

class UserRepository {
  async create(userProps) {
    const user = new User(userProps)
    user.id = uuidv4()
    users.push(user)
    return user
  }

  async findByEmail(email) {
    return users.find(user => user.email === email)
  }

  async findOne(filter) {
    return users.find(user => user.email === filter.email && user.password === filter.password)
}
    async findById(id) {
        return users.find(user => user.id === id)
    }

    async update(id, userProps) {
        const user = users.find(user => user.id === id)
        Object.assign(user, userProps)
        return user
    }

    async delete(id) {
        const userIndex = users.findIndex(user => user.id === id)
        if (userIndex === -1) return false;
        users.splice(userIndex, 1)
        return true
    }

    async findAll() {
        return users
    }
}

module.exports = UserRepository;