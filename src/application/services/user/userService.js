
class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getUserById(id) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

    async createUser(user) {
        return await this.userRepository.create(user);
    }

    async updateUser(id, user) {
        const userFound = await this.userRepository.findById(id);
        if (!userFound) {
            throw new Error('User not found');
        }
        return await this.userRepository.update(id, user);
    }

    async deleteUser(id) {
        if (!(await this.userRepository.findById(id))) {
            throw new Error('User not found');
        }
        return await this.userRepository.delete(id);
    }

    async getUsers() {
        return await this.userRepository.findAll();
    }
}

module.exports = UserService;