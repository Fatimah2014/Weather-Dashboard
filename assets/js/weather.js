$(document).ready(function(){
    $('#submit').click(function(){
        
        var city = $('#city').val();
        if(city != ''){

            $.ajax({
                url:'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial' +
                    "&APPID=fb6b4042ea4d940072429a5a56987d87",  
                type: 'GET',
                dataType: "Jsonp",
                success: function(data){
                    console.log(data);

                }
            }).then(function(res) {
                console.log(res)
                buildMainContainer(res)
            });
                
        }else{
            $("#error").html('field cannot be empty');
        }
        

        $.ajax({ 
           url: 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial' +
                    "&APPID=fb6b4042ea4d940072429a5a56987d87",  
            // url: `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=fb6b4042ea4d940072429a5a56987d87`,
            method: 'GET',
          }).then(function (response) {
            console.log('Ajax Reponse \n-------------');
            console.log(response);
            $('#forecast-row').empty()
            for (let i = 0; i < response.list.length; i++) {
                if(response.list[i].dt_txt.includes('12:00:00')){
                    buildIndividualCard(response.list[i])
                } 
            }
          });
        
    });
//displaying the 5 day forcast to the cards
    function buildIndividualCard(dataForNoon) {

        var newCard = $('<div>').attr('id', 'card').attr('class', 'columns small-1')
        newCard.text(dataForNoon.dt_txt)
        
         $('#forecast-row').append(newCard)
       

    }


    //appending the current weather to the dom//
    function buildMainContainer(dataObj) {
        $('#city-cont').empty()
        var newHeader = $("<h2>").text(dataObj.name) ;
        var newicon = $("<p>").text(`${data.weather[0].icon}`);
        var newWeather = $("<p>").text(`Temperature: ${dataObj.main.temp} C`);
        var currentWind = $("<p>").text(`Wind: ${dataObj.wind.speed} MPH`);
        var currentHumid = $('<p>').text(`Humidity: ${dataObj.main.humidity}%`);
        $('#city-cont').append(newicon)
        $('#city-cont').append(newHeader)
        $('#city-cont').append(newWeather)
        $('#city-cont').append(currentWind)
        $('#city-cont').append(currentHumid)
    }
});
moment().format("MM,DD,YYYY")
// function display(data) 
// var containerEl = $('#city-cont');


    


// var requestUrl = 'https://api.github.com/orgs/Netflix/repos';

$.ajax({
    url: "api.openweathermap.org/data/2.5/forecast?q={city name}&appid={$fb6b4042ea4d940072429a5a56987d87}",
    method: 'GET',
  }).then(function (response) {
    console.log('Ajax Reponse \n-------------');
    console.log(response);
  });



// fb6b4042ea4d940072429a5a56987d87  