const app = require('express').Router();

app.get("/login" , (req, res)=>{
    res.render("index.ejs" , {
        filename : "login/login.ejs",
        rightfile : "login/right_login_options.ejs"
    })
})

app.get("/register" , (req, res)=>{
    res.render("index.ejs" , {
        filename : "register/register.ejs",
        rightfile : "login/right_login_options.ejs"
    })
})

app.get("/read-post" , (req, res)=>{
    
    res.render("index.ejs" , {
        filename : "reading_forum/left_forum.ejs",
        rightfile : "reading_forum/right_forum.ejs"
    })

})


module.exports = app;