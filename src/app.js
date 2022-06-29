const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forcast = require('./utils/forcast')
const geoCode = require('./utils/geoCoding')


//define path for express config
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//setup handlebars engine and views loction
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)


//Setup static directory to derve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res)=>{
    res.render('index',{   //template to render in the brackets
        title: 'Weather',
        name: 'Khushali Dhami'
    })
})
//render is used to render the one of the handlebars for dynamic view


app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Khushali Dhami'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        helpmsg: 'This is your help page',
        title: 'Help',
        name: 'Khushali Dhami'
    })
})



//The app.get() function routes the HTTP GET Requests to the path which is being specified with the specified callback functions
app.get('/weather', (req, res)=>{
    
    if(!req.query.address){
        return res.send({
            error: 'Please provide the address'
        })
    }
    geoCode(req.query.address,(error, {latitude, longitude, location}={})=>{
        if(error){
           return res.send({error:error})
        }
        forcast(latitude,longitude,(error, forcastdata)=>{
            if(error){
                return res.send({error:error})
             }
            res.send({
                forecast: forcastdata,
                location,//shorthand for same name for property and value as above in error
                address: req.query.address
            })
        })
    })
    
    
})

//* match for specific pattern
app.get('/help/*',(req, res)=>{
   res.render('error',{
    title: '404',
    name: 'Khushali Dhami',
    errmsg: "Help article not found"
   })
})

//* wildcard character that matches everything else than the above mentioned routes
app.get('*',(req, res)=>{
    res.render('error',{
        title: '404',
        name: 'Khushali Dhami',
        errmsg: "Page not found"
       })
})


app.listen(3000, ()=>{
    console.log("Server is up on the port 3000.")
})
 