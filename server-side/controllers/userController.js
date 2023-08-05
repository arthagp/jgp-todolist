const { User} = require('../models');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt')
class UserController {

    static async findUsers(req, res, next) {
        try {
            const { username } = req.query;
            const where = {}

            const limit = +req.query.limit || 10;
            const page = +req.query.page || 1;
            const offset = (page - 1) * limit;
            if (username) {
                where.username = { [Op.iLike]: `%${username}%` };
            }
            const { count, rows } = await User.findAndCountAll({
                where,
                limit,
                offset,
            })
            res.status(200).json({
                totalItems: count,
                data: rows,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
            });
        } catch (error) {
            console.log(error)
            next()
        }
    }


    static async login(req, res, next) {
        try {
            const { username, password } = req.body;

            const findUser = await User.findOne({
                where: { username },
            });

            if (!findUser) {
                return res.status(404).json({
                    message: 'Username tidak ditemukan'
                });
            }

            if (findUser) {
                const comparePassword = await bcrypt.compare(password, findUser.password);
                if (comparePassword) {
                  const token = jwt.sign(
                    {
                      id: findUser.id,
                      username: findUser.username
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: '24h' }
                  );
                  res.status(200).json({
                    token,
                    id: findUser.id,
                  });
                } else {
                  throw { name: 'WrongPassword' };
                }
              } else {
                throw { name: 'ErrorNotFound' };
              }
        } catch (error) {
            console.log(error);
            next(error)
        }
    }


    static async resgister(req, res, next) {
        try {
            const { username, password } = req.body;

            const uniqueUsername = await User.findOne({
                where: { username }
            });

            if (!uniqueUsername) {
                const data = await User.create({
                    username, password
                })
                res.status(201).json({
                    message: `sukses membuat akun`,
                    data
                })
            }
            res.status(401).json({
                message: 'kemungkinan username sudah ada'
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = UserController