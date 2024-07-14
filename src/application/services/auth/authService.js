
class AuthService {

    constructor(UserRepository) {
        this.User = UserRepository;
    }
    async register(createUserDto) {
        const { email, password } = createUserDto;
    
        if (!email || !password) {
          throw Error('Incomplete data');
        }


        if(password.length < 10){
            throw Error('Password must be at least 10 characters long');
        }
    
        const existingUser = await this.User.findByEmail(email);
        if (existingUser) {
          throw Error('User already exists');
        }
    
        const user = await this.User.create({ email, password });
        await user.setPassword(password);
        return user
      }
    
      async login(loginDto) {
        const { email, password } = loginDto;
    
        if (!password && !email) {
            throw Error('Incomplete data');
        }
    
        let user = await this.User.findByEmail(email);
    
        if (!user) {
          throw Error('User not found');
        }
    
        const isValid = await user.validatePassword(password);
        if (!isValid) {
          throw Error('Invalid password');
        }
    
        return user
      }
}

module.exports = AuthService;