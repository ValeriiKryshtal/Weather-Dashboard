$(document).ready(function(){
     //setting hooks 
     const searches = JSON.parse(window.localStorage.getItem("search")) || [];
     const nowDate = dayjs().format('MM/DD/YYYY'); 
     const currentDayCityTitle = $('#currentDayCityTitle')
     currentDayCityTitle.prepend(`${nowDate}`)
     const recievedSearch = JSON.parse(localStorage.getItem("search"))
     const searchBtn = $('#search-btn')

     let input = $('#input');
     let inputValue = input[0].value;
     // cycle for creating new section for each previous search
     for (let i =0; i<searches.length; i++){
               const newPreviosSearch = `<button id="eachPreviousSearch${i}" class="eachPreviousSearch">${recievedSearch[i]}</button>`
               $('#previos-search').prepend(newPreviosSearch);
               $(`#eachPreviousSearch${i}`).on('click', function(){
                    $('#previos-search').prepend(newPreviosSearch);
                    inputValue = recievedSearch[i]
                    currentSearch(inputValue)
               });

          }
     // added listener to the "search" button
     $('#search-btn').on('click', function (){ 
          inputValue = input[0].value;
               const newSearch = `<button id="eachPreviousSearch${0}" class="eachPreviousSearch">${inputValue}</button>`
               $('#previos-search').prepend(newSearch);
          currentSearch()
     })
     // function that will update the weather info and add new sections
     function currentSearch(){
          currentDayCityTitle.empty();
          $('#current-city-forecast').empty();
          $('#current-temp').empty();
          $('#current-wind').empty();
          $('#current-humidity').empty();
          fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=16a5c412e49d3028ec0cd77b6a8df834`)
          .then(data => {
               return data.json();
          })
          .then(data => {  
          // function that will update weather 5 days forecast 
               function appendSection () {
               // function that will create and add new card for each new forecast day
                    for( let i = 1; i<6; i++){
                         const forecastData = data.list[i]
                         const forecastTemp = data.list[i].main.temp
                         const forecastWind = data.list[i].wind.speed
                         const forecastHumidity = data.list[i].main.humidity
                         const forecastDayIconID = data.list[i].weather[0].icon
                         const forecastDayIcon = `http://openweathermap.org/img/w/${forecastDayIconID}.png`
                         const forecastDate = dayjs().add(i, 'day').format('MM/DD/YYYY') 
                         const degreSymbol = '&deg;'
                         var newSection = 
                                        `<div id="day${i}" class="day">
                                             <p id="forecast-date">${forecastDate}</p>
                                             <p id="icon"><img src="http://openweathermap.org/img/w/${forecastDayIconID}.png"</p>
                                             <p id="forecast-temp-day-">Temp: ${forecastTemp}${degreSymbol}F</p>
                                             <p id="forecast-wind-day-">Wind: ${forecastWind}MPH</p>
                                             <p id="forecast-humidity-day-">Humidity: ${forecastHumidity}%</p>
                                        </div>`; 
                         $('#current-city-forecast').append(newSection)
                         }
               } 
               appendSection();
          });
          fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=imperial&appid=16a5c412e49d3028ec0cd77b6a8df834`) 
          .then(data => {
               return data.json()
          })
          .then(data => {
               //function that will update current weather info
               const currentWeather = data;
               const currentDayTemp = data.main.temp;
               const currentDayWind = data.wind.speed;
               const currentDayHumidity = data.main.humidity
               const currentDayIconID = data.weather[0].icon
               const currentDayIcon = `http://openweathermap.org/img/w/${currentDayIconID}.png`
               const degreSymbol = '&deg;'
               const symb = `<img id="iconCurrentDay" 
                              src=${currentDayIcon}
                              alt="icon"
                              height="100px">`
               currentDayCityTitle.append(`${inputValue} (${nowDate}) ${symb}`)
               $('#current-temp').prepend(`Temp:${currentDayTemp}${degreSymbol} F`)
               $('#current-wind').append(`Wind: ${currentDayWind} MPH`)
               $('#current-humidity').append(`Humidity: ${currentDayHumidity} %`)
          })
          if (input !== "") {
               var newSearch = inputValue;
               searches.push(newSearch);
               window.localStorage.setItem("search", JSON.stringify(searches));
          }
          }
})
