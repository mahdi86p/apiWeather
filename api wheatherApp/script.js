const cityElem = document.querySelector('#cityElem');
const cityNameElem = document.querySelector('#cityName');
const cityWindSpeedElem = document.querySelector('#cityWindSpeed')
const cityWindDeggreElem = document.querySelector('#cityWindDeggre')
const cityWeatherStatusElem = document.querySelector('#cityWeatherStatus')

const apiKey = '132826e03d55858dcf8510de3573d349';
const submitBtn = document.querySelector('button');
const cityNameinput = document.querySelector('input');


function changeBackground(){
    const body = document.body;
    const randomNum = Math.ceil(Math.random() * 2)

    //url(backgrounds/1.jpg)
    console.log('url(backgrounds/' + randomNum + '.jpg)')
    body.style.background = 'url(backgrounds/' + randomNum + '.jpg)'
    body.style.backgroundAttachment = 'fixed'
    body.style.backgroundSize = 'cover'
    body.style.backgroundPosition = 'center'
}

window.addEventListener('load' , changeBackground)

function takeInfoFunc() {
    
    const cityName = cityNameinput.value;
    if (cityName === '') {
        alert("Please enter a city name"); // Add alert for empty input  
        return;
    }
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    
    fetch(url)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then((data) => {
            cityElem.style.opacity = 1
            cityElem.style.background = 'transparent'
            cityElem.style.backdropFilter = 'blur("50px")'

            // Check if the data has the expected structure  
            if (data && data.name && data.sys && data.wind && data.weather) {
                const countryName = data.sys.country;
                const cityName = data.name;
                const cityWindSpeed = data.wind.speed; // Corrected variable name  
                const cityWindDeg = data.wind.deg; // Corrected variable name  
                const cityStatus = data.weather[0].main;
                const cityTempElem = document.querySelector('#cityTemp'); // اضافه کردن عنصر برای نمایش دما  

                // درون بلوک then(data => {})  
                const cityTemp = data.main.temp; // دریافت دما به کلوین  
                const cityTempCelsius = (cityTemp - 273.15).toFixed(2); // تبدیل به سلسیوس و دقت 2 رقم اعشار  

                cityTempElem.innerHTML = '<span class="text-muted">Temperature: </span><h1>' + cityTempCelsius + ' °C</h1>'; // نمایش دما  
                cityNameElem.innerHTML = `${cityName}, ${countryName}`;
                cityWindSpeedElem.innerHTML = '<span class="text-muted">Weather wind speed : </span><h1>' + cityWindSpeed + '</h1>'
                cityWindDeggreElem.innerHTML = '<span class="text-muted">Weather wind deggree : </span><h1>' + cityWindDeg + '</h1>'
                cityWeatherStatusElem.innerHTML = '<span class="text-muted">Weather Status : </span><h1>' + cityStatus + '</h1>'

            } else {
                console.log('Invalid data structure received from the API');
            }
        })
        .catch((error) => {
            console.error('Error occurred:', error);
            alert('Please enter a valid city');
        });



    cityNameinput.value = ''
}

submitBtn.addEventListener('click', () => {
    takeInfoFunc()
})

window.addEventListener('keydown', (event) => {
    event.code === 'Enter' ? takeInfoFunc() : ''
})