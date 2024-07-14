

class AuthController {

    constructor(authService) {
        this.authService = authService
    }

  login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await this.authService.login({ email, password });
      res.status(200).json({ message: 'User logged in successfully', user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  register = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await this.authService.register({ email, password });
      res.status(200).json({ message: 'User registered successfully', user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = AuthController;