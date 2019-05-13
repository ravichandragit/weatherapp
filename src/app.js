const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoLocation = require('../utils/geocode');
const weatherForecast = require('../utils/forecast');
const port = process.env.PORT || 3000;

const app = express();
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath))

//console.log(path.join(__dirname));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        pagetitle: 'Weather | weather forecast for your location'
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About',
        pagetitle: 'About | weather forecast for your location.',
        abountname: 'Ravichandra',
        abouttext:'a software engineer with the experience in developing the websites.'
    })    
})

app.get('/help',(req,res) => {
    console.log(req.query);
    res.render('help',{
        title: 'Help',
        pagetitle: 'Help | Weather | weather forecast for your location',
        location: req.query.loc
    })    
})

app.get('/weather',(req,res) => {
    if(!req.query){
        return res.send({'Error' : 'search address is not provided!'})
    }
    //res.send(req.query);
    geoLocation(req.query.location, (err, response) => {
        if(err){
            return res.send({'Error': err});
        }else{        
            weatherForecast(response.latitude,response.longitude,(error, weatherResponse) => {
                if(error){
                    return res.send({'Error': error});
                }else{
                    //res.send(response.location);
                    //console.log(response.location);
                    res.send({'location':response.location, 'forecast': weatherResponse.summary+' Temperature is '+ weatherResponse.temperature+ ' degree Rain Probability is ' + weatherResponse.rainProbability + ' Percent'});
                }
            })
        }
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        name: 'Ravichandra',
        notFoundMessage: '404 : Page not found'
    });
})

app.listen(port, () => {
    console.log('express server is up');
})
