



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
                getUV(res)
                // buildMainContainer(res)
            });
        getForecast(city)
                
        }else{
            $("#error").html('field cannot be empty');
        }
        

    });
//displaying the 5 day forecast to the cards
    function buildIndividualCard(dataForNoon) {
        var newIcon = $("<img>").attr("src", `http://openweathermap.org/img/w/${dataForNoon.weather[0].icon}.png` )
        var newHeader = $("<h2>").text(dataForNoon.name) ;
        var newWeather = $("<p>").text(`Temperature: ${dataForNoon.main.temp} `);
        var newWind = $("<p>").text(`Wind: ${dataForNoon.wind.speed} MPH`);
        var humid = $('<p>').text(`Humidity: ${dataForNoon.main.humidity}%`);
        var date = $('<p>').text( `${dataForNoon.dt_txt}`);
        
        var newCard = $('<div>').attr('id', 'card').attr('class', 'columns small-1')
        newCard.append(date)
        newCard.append(newIcon)
        newCard.append(newHeader)
        newCard.append(newWeather)
        newCard.append(newWind)
        newCard.append(humid)
     

        $('#forecast-row').append(newCard)

    }
    function getForecast(city){
    

        $.ajax({ 
            url: 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial' +
                     "&appid=fb6b4042ea4d940072429a5a56987d87",  
             // url: `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=fb6b4042ea4d940072429a5a56987d87`,
             method: 'GET',
           }).then(function (response) {
             // console.log('Ajax Response \n-------------');
             console.log(response);
             $('#forecast-row').empty()
             for (let i = 0; i < response.list.length; i++) {
                 if(response.list[i].dt_txt.includes('12:00:00')){
                     buildIndividualCard(response.list[i])
                 } 
             }
             });
    
    }
    function getUV(data)  {
      
        $.ajax({ 
            url: `http://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=fb6b4042ea4d940072429a5a56987d87`,  
             // url: `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=fb6b4042ea4d940072429a5a56987d87`,
             method: 'GET',
           }).then(function (response) {
             // console.log('Ajax Response \n-------------');
             console.log(response,"UV");
           buildMainContainer(data,response.current.uvi)
             });  
    }
    
    //appending the current weather to the dom//
    function buildMainContainer(dataObj,uvIndex) {
        let color;
        if (uvIndex < 3){color = "green"
        } else if (uvIndex >= 3 && uvIndex < 6){color = "yellow"
    }else if (uvIndex >= 6 && uvIndex < 8) {color = "orange" 
    }else if (uvIndex >= 8 && uvIndex < 11) {color = "red" 
} else {color = "darkred"}


        $('#city-cont').empty()
        var newUv = $('<p>').text(`UV Index: ${uvIndex}`).css({"background-color":color})
        var newIcon = $("<img>").attr("src", `http://openweathermap.org/img/w/${dataObj.weather[0].icon}.png` )
        var newHeader = $("<h2>").text(dataObj.name) ;
        var newWeather = $("<p>").text(`Temperature: ${dataObj.main.temp} `);
        var currentWind = $("<p>").text(`Wind: ${dataObj.wind.speed} MPH`);
        var currentHumid = $('<p>').text(`Humidity: ${dataObj.main.humidity}%`);
        var currentDate = moment().format("MM/DD/YYYY, h:mm:ss a ")
        // $('#city-cont').append(newicon)
        $('#city-cont').append(newIcon)
        $('#city-cont').append(newHeader)
        $('#city-cont').append(newWeather)
        $('#city-cont').append(currentWind)
        $('#city-cont').append(currentHumid)
        $('#city-cont').append(currentDate)
        $('#city-cont').append(newUv)
    }
});
// moment().format("MM,DD,YYYY")
// function display(data) 
// var containerEl = $('#city-cont');


    


// var requestUrl = 'https://api.github.com/orgs/Netflix/repos';


// fb6b4042ea4d940072429a5a56987d87  