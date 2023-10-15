const User = require('./../config/models/User.js')
const { base64decode , base64encode } = require('nodejs-base64')

const bcrypt = require('bcrypt')
const authentication = () => {
    return {

        async postsignup(req, res) {
            try{
                var { username, password, email } = req.body
                console.log(req.body)
                if (!username || !password && !email) {
                    res.send('All fields are required')
                } else {

                    const salt = await bcrypt.genSalt(10);
                    let encrypt_password = await bcrypt.hash(password, salt);

                    const user_in = new User({
                        username : username.trim(),
                        email : email,
                        password: encrypt_password,
                        postList: []
                    })

                    const data = await user_in.save()

                    res.write(`<script> localStorage.setItem("token" , "${base64encode(JSON.stringify(data))}"); </script>`)
                    res.write("<script> window.location.href='/' </script>")
                    res.end()

                }
            }catch (err) {
                console.log(err)
                res.json({
                    status : false,
                    msg : err
                })
            }

        },

        async post_check(req, res) {

            User.exists({ username: req.body.username }, (err, results) => {
                if (results) {
                    res.json({
                        message : "Username already exists !",
                        input : "clear"
                    })
                } else if (req.body.username.length < 3) {
                    res.json({
                        message : "Atleast 3 Characters Required !",
                        input : "clear"
                    })
                } else {
                    res.json({
                        message : "Username Available !",
                        input : null
                    })

                }

            })

        },

        async post_login(req, res) {
            try{
                var { username, password ,email} = req.body
                if(username.search("@") > 0){
                    email = username
                }
                if ((!username || !email) && !password) {
                    res.json({
                        status : false,
                        msg : "Invalid username or password"
                    })
                }
                if(email){
                    var result = await User.findOne({ email: email })
                }else{
                    var result = await User.findOne({ username: username })
                }
                try {
                    const match = await bcrypt.compare(password, result.password)
                    if(match){
                        let data = {
                            result
                        }
                        res.write(`<script> localStorage.setItem("token" , "${base64encode(JSON.stringify(data))}"); </script>`)
                        res.write("<script> window.location.href='/' </script>")
                        res.end()
                    }else{
                        res.write("<script>alert('wrong credentials')</script>")
                        res.write("<script>window.location.href='/login'</script>")
                        res.end()
                    }
                    
                } catch (err) {
                    console.log(err)
                    res.json({
                        status : false,
                        msg : "User not found"
                    })
                }

            }catch(err){
                res.json({
                    status : false,
                    msg : err
                })
            }
            

        },
        async password_recovery_gateway(req, res) {
            try{
                const username = base64decode(req.params.username)
                data = {username}
                User.findOne({ username} , (err , result)=>{
                    if(result.email.search("@") > 0){
                        data = {
                            username,
                            type : "email" , 
                            field : result.email
                        }
                    }else{
                        data = {
                            username,
                            type : "question_query",
                            field : result.question_query
                        }
                    }
                    res.render('password_recovery_gateway.ejs' , data)
                })
            }catch(err){
                res.send("invalid username !")
            }
            
            
        },
    }

}

module.exports = authentication