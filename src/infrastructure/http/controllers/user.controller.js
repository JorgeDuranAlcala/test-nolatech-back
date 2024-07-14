
class UserController {

    constructor(userService) {
        this.userService = userService;
    }
     getUsers = async (req, res) => {
        try {
            if (!req.query.page || !req.query.count) {
                const users = await this.userService.getUsers();
                return res.status(200).json({ users });
            } else {
            const page = parseInt(req.query.page) || 1;
            const count = parseInt(req.query.count) || 10;
            const startIndex = (page - 1) * count;
            const endIndex = page * count;

            const users = await this.userService.getUsers();
            const paginatedUsers = users.slice(startIndex, endIndex);

            const totalPages = Math.ceil(users.length / count);

            const pagination = {
                currentPage: page,
                totalPages,
                totalUsers: users.length
            };

                res.status(200).json({ users: paginatedUsers, pagination });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

     getUser = async (req, res) => {
        try {
            const user = await this.userService.getUserById(req.params.id);
            res.status(200).json({user});
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    updateUser = async (req, res) => {
        try {
            const user = await this.userService.updateUser(req.params.id, req.body);
            res.status(200).json({user});
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    deleteUser = async (req, res) => {
        try {
            const deleted = await this.userService.deleteUser(req.params.id);
            res.status(200).json({deleted});
        } catch (error) {
            res.status(400).json({ message: error.message   });
        }
    }
}

module.exports = UserController;