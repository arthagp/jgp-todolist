const { ListTask } = require('../models');

class ListTaskController {
    static async findList(req, res, next) {
        try {
            const { id } = req.params;

            const data = await ListTask.findOne({
                where: { id }
            });

            if (data) {
                res.status(200).json({
                    data
                });
            } else {
                res.status(404).json({
                    message: 'List not found'
                });
            }
        } catch (error) {
            console.log(error);
            next()
        }
    }

    static async findAllList(req, res, next) {

        try {
            const { id } = req.userLogged;
            const data = await ListTask.findAll({
                where: { user_id: id }
            })
            if (!data) {
                return res.status(404).json({ message: 'List not found' });
            }
            res.status(200).json({
                data: data
            })
        } catch (error) {
            console.log(error)
            next()
        }
    }

    static async createList(req, res, next) {
        try {
            const { id } = req.userLogged
            const { title, description, user_id } = req.body;

            const data = await ListTask.create({
                title, description, user_id: id
            })
            res.status(201).json({
                message: 'sukses membuat todolist',
                data
            })
        } catch (error) {
            console.log(error)
            next()
        }
    }

    static async updateList(req, res, next) {
        try {
          const { id } = req.userLogged;
          const { listId } = req.params;
          const { title, description } = req.body;

          const listData = await ListTask.findOne({
            where: { id: listId, user_id: id }
          });
      
          if (!listData) {
            return res.status(400).json({ message: 'List Not Found' });
          }
    
          const updatedList = await ListTask.update(
            { title, description },
            { where: { id: listId, user_id: id } }
          );
          const updatedData = await ListTask.findByPk(listId);
      
          res.status(200).json({
            message: 'Berhasil update list todo',
            updatedList : updatedData
          });
     
        } catch (error) {
          console.log(error);
          next(error);
        }
      }
      
}

module.exports = ListTaskController;
