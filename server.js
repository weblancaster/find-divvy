var express = require('express')
    , http = require('http')
    , exphbs  = require('express3-handlebars')
    , pub = __dirname + '/public';

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

  http.get('http://divvybikes.com/stations/json', function(response) {

    var body, locations, alphabeticalBody,
        dataJSON = [];
    
    response.on('data', function(chunk) {
      dataJSON.push(chunk);
    });

    response.on('end', function() {

      try {
        body = JSON.parse(dataJSON.join(''));
      } catch(e){
        console.error(e);
      }

      locations = body.stationBeanList;

      alphabeticalBody = locations.sort(function(location1, location2) {
        var newLocation1 = location1.stationName.toLowerCase();
        var newLocation2 = location2.stationName.toLowerCase();

        if ( newLocation1 < newLocation2 ) {
            return -1;
        } else if ( newLocation2 > newLocation2 ) {
            return 1;
        }
        return 0;
      });

      res.render('home', {
        title: 'Chicago Divvy bikes location',
        result: alphabeticalBody
      });

    });

  }).on('error', function() {
    console.log('Error')
  });

});

app.listen(3000);
console.log('server running!');