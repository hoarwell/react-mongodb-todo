const router = require('express').Router();
const Todo = require('./TodoModel');

router.route('/create').post((req, res) => {
    const id = req.body.id;
    const content = req.body.content;
    const date = req.body.date;

    const todo = new Todo({
        id,
        content,
        date,
    });

    todo.save()
        .then(() => res.json('Data Added'))
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/todos').get((req, res) => {
    Todo.find()
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json('Error: ' + err));
})

router.route('/update/:id').post((req, res) => {
    const id = req.body.id;
    const content = req.body.content;
    const date = req.body.date;
    const editTodo = {
        id,
        content,
        date,
    };
    Todo.findOneAndUpdate({ id : req.params.id }, editTodo)
        .then(() => res.json('Data Updated'))
        .catch((err) => res.status(400).json('Error: ' + err));
})

router.route('/delete/:id').delete((req, res) => {
    Todo.findOneAndRemove({ id : req.params.id })
        .then(() => res.json('Data Deleted'))
        .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;