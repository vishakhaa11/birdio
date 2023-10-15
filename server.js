const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

require('./config/database')()

// Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Adding url encoders
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors())
    // public access
app.use(express.static(path.join(__dirname, 'public')))

const home = require("./routes/home")
const auth = require("./routes/auth")

app.use("/" , home);
app.use("/" , auth);
// app.use('/api/v1/', managerPDF);
// app.use('/api/v1/', auth);
// app.use('/api/v1/', create_invoice);

app.get("/" , (req, res)=>{
    res.render("index.ejs" , {
        filename : "home/home.ejs",
        rightfile : "home/advertisement.ejs"
    })
})


const port = process.env.PORT || 4560;

app.listen(port, () => {
    console.log("http://127.0.0.1:" + port);
});