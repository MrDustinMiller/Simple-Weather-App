//USED AS A CALLBACK FOR THE AJAX REQUEST
function requestData() {
    var responseStatusOk = this.status === 200;   //STATUS 200 means OK
    var responseComplete = this.readyState === 4; //readyState 4 means response is ready

    if (responseStatusOk && responseComplete) {
        console.log(this.responseText); //debug
      
        //PARSE THE RESPONSE
        let responseData = JSON.parse(this.responseText);
        
    }//end if     

}//end function

 

function showGeoLoc() {

    if (navigator.geolocation) { //then
        navigator.geolocation.getCurrentPosition(position => {
            //get our coordinates for our current position
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            //declare variables. their value will show in our lat and lon textbox
            let showLat = document.getElementById("latitudeTextbox");
            let showLon = document.getElementById("longitudeTextbox");

            //store the value of our lat and lon into our variables
            showLat.value = latitude;
            showLon.value = longitude;
        }, error => {
            console.log('Need access to get location.');
        });
    }//end if

}//end function

function GetAPI(responseData) {
    //get lat and long values 
    const lat = document.getElementById("latitudeTextbox").value;
    const lon = document.getElementById("longitudeTextbox").value;

    //build our url back together with our lat and lon
    var apiUrl = 'https://api.weather.gov/points/';
    var url = apiUrl + lat + ',' + lon;

    fetch(url)
        .then((response) => {
                return response.json();
        })
        .then(function (data) {
          //grabs the grid values from our json data
            var gridX = data.properties.gridX;
            var gridY = data.properties.gridY;
            let relativeLocation = data.properties.relativeLocation;
             city = relativeLocation.properties.city;
             state = relativeLocation.properties.state;
            console.log(city);
          console.log(data);
          //call function
          ForecastData(gridX, gridY);
        });

}//end function

function ForecastData(gridX, gridY) {

    var api = 'https://api.weather.gov/gridpoints/MEG/';
    var endUrl = '/forecast';
    var url = api + gridX + ',' + gridY + endUrl;

    //variables to store our weather forecast
    let weatherProperties = [];
    let weatherPeriods = [];

    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            //storing our json weather data (specfically properties) into variable
            weatherProperties = data.properties;

            //storing our weather periods (from accessing properties) into variable
            weatherPeriods = weatherProperties.periods;

            //getting the first forecast update (specifically the detailed forecast inside periods) and storing to variable
            var todaysForecast = weatherPeriods[0].detailedForecast;

            //show our data in our textarea
            let showData = document.getElementById("forecastData");
            showData.value = '\t\t\t' + city + ',' + ' ' + state + '\n\n' + todaysForecast;
            console.log(todaysForecast); 
            
        });

}//end function
 


