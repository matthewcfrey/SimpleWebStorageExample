const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
require('dotenv').config()

const app = express()

const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}));

app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_STRING,
    resave: false,
    saveUninitialized: false,
}))

app.get('/', (req, resp) => {
    resp.send("hello world")
})

app.get('/set-cookie', (req, resp) => {
    //resp.send('<script>console.log("hello")</script>')
    resp.cookie('foo', 'bar')
    resp.cookie('fizz', 'buzz', {
        //maxAge: 5000,
        //expires: new Date(2025, 0, 1)
        //httpOnly: true
        //secure: true
        domain: 'localhost'
    })
    resp.send('Set the cookie')
})

app.get('/get-cookie', (req, resp) => {
    console.log(req.cookies)
    resp.send(req.cookies)
})

app.get('/delete-cookie', (req, resp) => {
    resp.clearCookie('foo')
    resp.send("cookie deleted")
})

app.get('/my-session', (req, resp) => {
    if(!req.session.visited) {
        req.session.visited = 0
    }
    req.session.visited +=1;
    resp.send(
        "<h1>" + "hello " + (req.session.username ? req.session.username : "friend") + "</h1>" +
        "<h2>You have visted " + req.session.visited + " times<h2>" 
        )
})

app.post('/set-username', (req, resp) => {
    req.session.username = req.body.username
    resp.send("username stored")
})

const port = process.env.PORT || 8080
app.listen(port, () =>{
    console.log('listening on port=' + port)
})