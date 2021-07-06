const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.ATLAS_URI;
const port = process.env.PORT;

app.use(cors());
app.options('*', cors());
app.use(express.json());

mongoose
    .connect(uri, {
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

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})