window.addEventListener('load', main());

let fromKelvinToCelsius = (n) => n - 273;

let toCelsius = (n) => (n - 32) * 5 / 9;
let toFahrenheit = (n) => n * 9 / 5 + 32;

function main() {
    const location_ = document.querySelector('.location');
    const temperature_ = document.querySelector('.temperature');
    const description_ = document.querySelector('.description');

    let latitude, longitude;

    if (navigator.geolocation) {

        // gets the geolocation
        navigator.geolocation.getCurrentPosition(position => {

            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            const key = '*****************************';
            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

            // making the request
            fetch(api)
                .then(response => response.json())
                .then(data => {

                    // Getting the Values
                    const temperature = data.main.temp;
                    const { description, icon } = data.weather[0];
                    const city = data.name;
                    const { country } = data.sys;

                    // Updating the Timezone
                    location_.querySelector('.location-timezone').innerHTML = `${city}/${country}`;

                    // Updating the Icons
                    location_.querySelector('.location-icon').setAttribute('src', `./icons/${icon}.png`);

                    // Updating the Temperature
                    let celsiusDegrees = fromKelvinToCelsius(temperature).toString().slice(0, 4);
                    temperature_.querySelector('.temperature-degrees').innerHTML = celsiusDegrees;

                    // Updating the Description
                    description_.querySelector('p').innerHTML = description;

                    // Changing from C to F and from F to C
                    temperature_.addEventListener('click', () => {
                        if (temperature_.querySelector('span').innerHTML == 'C') {
                            temperature_.querySelector('span').innerHTML = 'F';
                            temperature_.querySelector('.temperature-degrees').innerHTML = toFahrenheit(celsiusDegrees).toString().slice(0, 4);
                        } else {
                            temperature_.querySelector('span').innerHTML = 'C';
                            temperature_.querySelector('.temperature-degrees').innerHTML = celsiusDegrees;
                        }
                    });

                });
        });
    }
}