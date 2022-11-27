$(document).ready(function(){
     const nowDate = dayjs().format('MM/DD/YYYY'); 
     const currentDayCityTitle = $('#currentDayCityTitle')
     currentDayCityTitle.prepend(`${nowDate}`)
// fetch(`http://api.openweathermap.org/geo/1.0/direct?q=Moncton&limit=5&appid=16a5c412e49d3028ec0cd77b6a8df834`)
// .then(data => {
//      console.log(data)
//      return data.json()
// })
// .then(data => {
//      let cityLat = data[0].lat
//      let cityLon = data[0].lon
// // console.log(cityLat);
// // console.log(cityLon);
// })

//creating container for current weather data
fetch('https://api.openweathermap.org/data/2.5/weather?q=Moncton&appid=16a5c412e49d3028ec0cd77b6a8df834') 
.then(data => {
     return data.json()
})
.then(data => {
     const currentWeather = data;
     // console.log(currentWeather);
     const currentDayTemp = data.main.temp;
     // console.log(currentDayTemp);
     const currentDayWind = data.wind.speed;
     // console.log(currentDayWind);
     const currentDayHumidity = data.main.humidity
     // console.log(currentDayHumidity);
     const currentDayIconID = data.weather[0].icon
     const currentDayIcon = `http://openweathermap.org/img/w/${currentDayIconID}.png`
     // console.log(currentDayIcon)
     $('#current-temp').append(`${currentDayTemp}$deg F`)
     $('#iconCurrentDay').attr('src',currentDayIcon)
     $('#current-wind').append(`${currentDayWind}MPH`)
     $('#current-humidity').append(`${currentDayHumidity}%`)
})


//creating containers for forecast data
fetch('https://api.openweathermap.org/data/2.5/forecast?lat=46.097995&lon=-64.80011&appid=16a5c412e49d3028ec0cd77b6a8df834')
.then(data => {
     return data.json();
})
.then(data => {  
     function appendSection () {
          for( let i = 1; i<6; i++){
               const forecastData = data.list[i]
               // console.log(forecastData);
               const forecastTemp = data.list[i].main.temp
               // console.log(forecastTemp);
               const forecastWind = data.list[i].wind.speed
               // console.log(forecastWind);
               const forecastHumidity = data.list[i].main.humidity
               // console.log(forecastHumidity);
               const forecastDayIconID = data.list[i].weather[0].icon
               const forecastDayIcon = `http://openweathermap.org/img/w/${forecastDayIconID}.png`
               const forecastDate = dayjs().add(i, 'day').format('MM/DD/YYYY') 
               var newSection = 
                              `<div id="day${i}" class="day">
                                   <p id="forecast-date">${forecastDate}</p>
                                   <p id="icon"><img src="http://openweathermap.org/img/w/${forecastDayIconID}.png"</p>
                                   <p id="forecast-temp-day-">Temp: ${forecastTemp}F</p>
                                   <p id="forecast-wind-day-">Wind: ${forecastWind}MPH</p>
                                   <p id="forecast-humidity-day-">Humidity: ${forecastHumidity}%</p>
                              </div>`; 
               // console.log(newSection);
               $('#current-city-forecast').append(newSection)
               }
          } 
     appendSection();
})
     

$('button').on('click', function(){
     console.log('uraaaaaaaa')
})



})