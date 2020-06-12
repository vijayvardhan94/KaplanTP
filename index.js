const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');
//58fe5eed94b80607bf8860fdc2aca928

app.use(bodyParser.urlencoded({extended: false}))
const PORT = process.env.PORT || 5000;
function callApi(finishedAPI, ticker){
    request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_51c0745db50c45ecb550deed2b8fb62d', {json: true}, (err,res,body) =>{
        if (err) {return console.log(err)};
        if(res.statusCode === 200)
        finishedAPI(body);
    
    });
}

//the second api implementation

function callApi2(finishedAPI2, ticker2){
    //https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=YOUR_API_KEY
    request('https://api.openweathermap.org/data/2.5/weather?q=' + ticker2 + '&appid=58fe5eed94b80607bf8860fdc2aca928', {json: true}, (err,res,body) =>{
        if (err) {return console.log(err)};
        if(res.statusCode === 200)
        finishedAPI2(body);
    
    });
}
//third api implementation 

function callApi3(finishedAPI3){
   
  
    request('https://sv443.net/jokeapi/v2/joke/any', {json: true}, (err,res,body) =>{
        if (err) {return console.log(err)};
        if(res.statusCode === 200)
        finishedAPI3(body);
    
    });
}

app.get('/weather', function (req, res){
    callApi2(function(doneAPI){
        res.render('weather',{
            weather: doneAPI
        });
    });
   
});



app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
//this line below is important to get handlebars up and running
app.set('views', path.join(__dirname, '/public/views'));
//setting handlebars routes
app.get('/', function (req, res){
    callApi(function(doneAPI){
        res.render('home',{
            stock: doneAPI
        });
    });
   
});



app.post('/', function (req, res){
    callApi(function(doneAPI){
        //postedStuff = req.body.stock_ticker;
        res.render('home',{
            stock: doneAPI,
            
        });
    }, req.body.stock_ticker);
   
});

app.post('/weather', function (req, res){
    callApi2(function(doneAPI){
        //postedStuff = req.body.stock_ticker;
        res.render('weather',{
            weather: doneAPI,
            
        });
    }, req.body.weather_ticker);
   
});

app.post('/jokes', function (req, res){
    callApi3(function(doneAPI){
        //postedStuff = req.body.stock_ticker;
        res.render('jokes',{
            jokes: doneAPI,
            
        });
    }, req.body);
   
});




app.get('/about.html', function(req, res){
    res.render('about')
})
//setting the static folder
app.use(express.static(path.join(__dirname, 'public')))

//pk_51c0745db50c45ecb550deed2b8fb62d


app.listen(process.env.PORT, () =>{
    console.log(`server up and running at ${PORT}`);
})