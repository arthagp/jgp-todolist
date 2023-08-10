const { Task, ListTask } = require('../models')

class TaskController {
    static async findOneTask(req, res, next) {
        try {

            const { id } = req.params;

            const data = await Task.findOne({
                where: { id }
            })

            if (!data) {
                return res.status(400).json({ message: 'Task Not Found' });
            } res.status(200).json({
                message: 'Task Found',
                data: data
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async findAllTask(req, res, next) {
        try {
            const { id } = req.params;

            const findOnelist = await ListTask.findOne({
                where: { id },
            });

            if (!findOnelist) {
                return res.status(400).json({
                    message: 'List Not Found',
                });
            }

            const data = await Task.findAll({
                order: [
                    // Kolom berdasarkan yang akan diurutkan (misalnya 'title', 'deadline', 'status', dll.)
                    ['title', 'ASC'] // Urutan menaik (ascending) berdasarkan kolom 'title'
                ],
                where: { listTask_id: id },
            });
            res.status(200).json({
                message: 'Tasks Found',
                data: data,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async createTask(req, res, next) {
        try {
            const { id } = req.params;
            const { title, description, deadline, status } = req.body;

            const findListTask = await ListTask.findOne({
                where: { id }
            })
            if (!findListTask) {
                res.status(400).json({
                    message: `ListTask Not Found, You Can't create Task`
                })
            }
            const data = await Task.create({
                title, description, deadline, status: 'On going', listTask_id: id
            })
            res.status(201).json({
                message: 'Berhasil Membuat Task',
                data: data
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async updateTask(req, res, next) {
        try {
            const { id } = req.params;
            const { title, description, deadline, status } = req.body;
            const findOneTask = await Task.findOne({
                where: { id }
            })

            if (!findOneTask) {
                res.status(400).json({
                    message: `Task Not Found, You Can't update Task`
                })
            }
            await Task.update({
                title, description, deadline, status
            }, { where: { id } })
            const data = await Task.findByPk(id);
            res.status(200).json({ message: 'Berhasil Update Task', data });

        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    

    static async destroyTask(req, res, next) {
        try {
            const { id } = req.params;

            const findOneTask = await Task.findOne({
                where: { id }
            })

            if (!findOneTask) {
                res.status(400).json({ message: 'Task Not Found' })
            }
            const data = await Task.destroy({
                where: { id }
            })
            res.status(200).json({ message: 'Berhasil Hapus Task' })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = TaskController;