setup = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      const getDefaultCity = new WeatherApp('', latitude, longitude);

      getDefaultCity.defaultCity.then(res => {

        const weatherIcon = new LayoutForWeatherApp(res.icon)
        const icon = document.querySelector('.weather-type-icon img');
        icon.setAttribute('src', weatherIcon.buildIcon)

        const weatherInCity = new LayoutForWeatherApp(res.city_name)
        const city = document.querySelector('.city p');
        city.textContent = weatherInCity.buildWeatherInCity;

        const weatherDescription = new LayoutForWeatherApp(res.description)
        const buildingDescription = document.querySelector('.weather-description p');
        buildingDescription.textContent = weatherDescription.buildDescription;

        const weatherDegree = new LayoutForWeatherApp(res.degree)
        const buildingDegree = document.querySelector('.weather-degree p');
        buildingDegree.textContent = `${Math.round(weatherDegree.buildDegree)}°c`;

        const weatherSpeed = new LayoutForWeatherApp(res.windSpeed)
        const buildingWindSpeed = document.querySelector('.weather-speed p');
        buildingWindSpeed.textContent = `${weatherSpeed.buildWindSpeed}m/s`;
        weatherClassAdd(res.degree);
      })
     
    });
  }
  FormField()
}

FormField = () => {
  //Hämta input från formulär av classnamn .weather-form
  const form = document.querySelector('.weather-form');

  form.addEventListener('submit', (e) => {
    // från form.addEventListener('submit', formSubmited) hämtar vi värdet och returnerar det tillbaka till FetchCityValue.
    e.preventDefault();
    let city = e.target.city.value;
    const getNewCity = new WeatherApp('212514b52ee74f93d002ad15b350fc09', '', '', city);

    getNewCity.newCitySearch.then(newCityRes => {

      const weatherIcon = new LayoutForWeatherApp(newCityRes.icon)
      const icon = document.querySelector('.weather-type-icon img');
      icon.setAttribute('src', weatherIcon.buildIcon)

      const weatherInCity = new LayoutForWeatherApp(newCityRes.city_name)
      const city = document.querySelector('.city p');
      city.textContent = weatherInCity.buildWeatherInCity;

      const weatherDescription = new LayoutForWeatherApp(newCityRes.description)
      const buildingDescription = document.querySelector('.weather-description p');
      buildingDescription.textContent = weatherDescription.buildDescription;

      const weatherDegree = new LayoutForWeatherApp(newCityRes.degree)
      const buildingDegree = document.querySelector('.weather-degree p');
      buildingDegree.textContent = `${Math.round(weatherDegree.buildDegree)}°c`;

      const weatherSpeed = new LayoutForWeatherApp(newCityRes.windSpeed)
      const buildingWindSpeed = document.querySelector('.weather-speed p');
      buildingWindSpeed.textContent = `${weatherSpeed.buildWindSpeed}m/s`;
      weatherClassAdd(newCityRes.degree);

      navigator.geolocation.getCurrentPosition((position) => {
        const currentCity = new WeatherApp('212514b52ee74f93d002ad15b350fc09', position.coords.latitude, position.coords.longitude);
        currentCity.defaultCity.then(currentCityRes => {
          return compareTwoCities(newCityRes, currentCityRes)
        })
      })
    

    })
  });

  compareTwoCities = (newCityRes, currentCityRes) => {
    const cityCompareText = document.querySelector('.current-city-with-search-city p');
    // Har ingen catch i denna för vi kommer alltid få rätt stad (malmö)
    // Däremot använder jag Math.abs() för omvandla - till + för vi måste säga att det är + skillnad.

    let currentCity = currentCityRes.city_name;
    let searchCity = newCityRes.city_name;
    let currentCityDegree = currentCityRes.degree;
    let searchCityDegree = newCityRes.degree;
    const differenceBetweenCity = Math.abs(Math.round(currentCityDegree) - Math.round(searchCityDegree));
    if (searchCity === 'Malmo' || searchCity === 'Malmö gielda') {
      return cityCompareText.textContent = 'Jämför du samma stad?'
    }
    return cityCompareText.textContent = `Skilland mellan ${currentCity} och ${searchCity} är: ${differenceBetweenCity} i grader`
  }
}

weatherClassAdd = (weatherDegree) => {
  console.log(weatherDegree)
  // Väder check så ifall det är viss temperatur ute då byter vi färg på texten
  // Har också skrivit in kontroll om viss klass existeras ta bort de och sedan ersätt med nya klass.
  const weatherContainer = document.querySelector('body');
  if (weatherDegree <= 10) {
    if (weatherContainer.classList.contains('warm-weather')) {
      weatherContainer.classList.remove('warm-weather');
    }
    else if (weatherContainer.classList.contains('decent-weather')) {
      weatherContainer.classList.remove('decent-weather');
    }
    weatherContainer.classList.add('cold-weather');
  }
  else if (weatherDegree >= 20) {
    if (weatherContainer.classList.contains('cold-weather')) {
      weatherContainer.classList.remove('cold-weather');
    }
    else if (weatherContainer.classList.contains('decent-weather')) {
      weatherContainer.classList.remove('decent-weather');
    }
    weatherContainer.classList.add('warm-weather');
  }

  else {
    if (weatherContainer.classList.contains('cold-weather')) {
      weatherContainer.classList.remove('cold-weather');
    }
    else if (weatherContainer.classList.contains('warm-weather')) {
      weatherContainer.classList.remove('warm-weather');
    }
    weatherContainer.classList.add('decent-weather');
  }
}

setup()