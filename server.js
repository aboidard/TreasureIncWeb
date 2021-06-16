
let express = require('express')
let session = require('express-session')
let app = express()
let port = process.env.SERVER_PORT

console.log("running NODE_ENV : " + process.env.NODE_ENV)


// Moteur de template
app.set('view engine', 'ejs')

console.log("initializing middleware...")
// Middleware
app.use('/assets', express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(session({
    secret: 'opsdjfyhcnbsklvgslvbvhggcvdffcddcxfdsn',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(require('./middlewares/flash'))
console.log("Middleware OK")

// Route
console.log("Initializing route...")
console.log("Route GET / ")
app.get('/', (request, response) => {
    let Message = require('./models/message')
    Message.all(function(messages){
        response.render('pages/index', {messages : messages})
    })
})

console.log("Route GET /message/:id ")
app.get('/message/:id', (request, response) => {
    let Message = require('./models/message')
    Message.get(request.params.id, function(message){
        response.render('pages/show', {message : message})
    })
})

console.log("Route POST /")
app.post('/', (request, response) => {
    if(request.body.message === undefined || request.body.message === ''){
        request.flash('error',"vous n'avez pas posté de message")
        response.redirect('/')
    } else {
        let Message = require('./models/message')
        Message.create(request.body.message, function(){
            request.flash('success',"Merci !")
            response.redirect('/')
        })
    }
})

console.log("Starting server...")
app.listen(port)

console.log("Running on port " + port)