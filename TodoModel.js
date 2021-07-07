const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    id: String,
    content: String,
    date: Date,
    coord: {
        latitude: String,
        longitude: String
    },
    weather: {
        aqi: String,
        temp: String,
        weather: String
    }
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;