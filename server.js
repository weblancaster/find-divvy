var express = require('express')
    , http = require('http')
    , exphbs  = require('express3-handlebars')
    , pub = __dirname + '/public'
    , request = require('request')
    , port = process.env.PORT || 3000;

app = express();

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(pub));
  app.use(express.errorHandler());
});

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
  })
);
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {

  request('http://divvybikes.com/stations/json', function (error, response, body) {
    var data,
        dataJSON = [];

    if (!error && response.statusCode == 200) {
      dataJSON.push(body);
    }

    try {
      data = JSON.parse(dataJSON.join(''));
    } catch(e){
      console.error(e);
    }

    var dataFormated = data.stationBeanList;

    res.render('home', {
      title: 'Chicago Divvy bikes location',
      result: dataFormated
    });

  });

});

app.listen(port);
console.log('server running!');