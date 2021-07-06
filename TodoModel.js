const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    id: String,
    content: String,
    date: Date,
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;