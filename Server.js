const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const router = express.Router();

app.use(cors());
app.options('*', cors());
app.use(express.json());

mongoose
    .connect('mongodb+srv://youn9jo:JyJ14102362!@test0.rwjrk.mongodb.net/todoDB?retryWrites=true&w=majority', {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true, 
        useFindAndModify: false 
    })
    .then(() => {
        console.log('mongoDB Connected')
    })
    .catch(err => {
        console.log(err)
    }) 

let db = mongoose.connection;
db.once("open", () => console.log("Connected to database"));

app.use('/', require('./TodoRouter'));
app.use("/api", router);

app.listen(3001, () => {
    console.log("port 3001")
})