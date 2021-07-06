const router = require('express').Router();
const Todo = require('./TodoModel');

router.route("/create").post((req, res) => {
    const id = req.body.id;
    const content = req.body.content;
    const date = req.body.date;

    const todo = new Todo({
        id,
        content,
        date,
    });

    todo.save()
        .then(() => {
            console.log(req.body);
            res.json("Data Added");
        })
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.route("/todo").get((req, res) => {
    Todo.find()
        .then(() => {
            console.log(req.body);
            res.json("Data Read");
        })
        .catch((err) => res.status(400).json('Error: ' + err));
})

module.exports = router;