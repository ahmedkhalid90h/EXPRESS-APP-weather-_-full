
//  http://localhost:4000/weather?address=france

const express = require('express')

const app = express()

const port = process.env.PORT || 4000

const path = require('path')

const publicPath = path.join(__dirname,'../public')

const viewPath = path.join(__dirname,'../templates/views')

const partialsPath = path.join(__dirname,'../templates/partials')

const hbs = require('hbs')

hbs.registerPartials(partialsPath)


app.use(express.static(publicPath))

app.set('view engine', 'hbs')
app.set('views',viewPath)



app.get('/index',(req,res)=>{
    res.render('index')
})


const forecast = require('./tools/forecast')
const geocode = require('./tools/geocode')


app.get('/weather',(req,res)=>{
    if (!req.query.address) {
        return res.send({
            error: 'pleace enter your cantry'
        })
    }
    geocode(req.query.address,(geocodeError,data)=>{
        if (geocodeError) {
            return res.send({
                error: geocodeError
            })
            ///       res
        }
        forecast(data.latitude,data.longtitude,(forecastError,forecastData)=>{
            if (forecastError) {
                return res.send({
                    error: forecastError
                })
            }
            res.send({
                forecast:forecastData,
                country:req.query.address
            })
        })
    })
})




app.listen(port,()=>{
    console.log(`Example app listening on port${port}`)

})