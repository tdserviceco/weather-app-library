class WeatherApp {

  constructor(apiKey, lat, lon, city) {
      this.apiKey = apiKey;
      this.lat = lat;
      this.lon = lon;
      this.city = city;
  }

  // Getter
  get defaultCity() {
    return this.fetchDefaultCity();
  }

  get newCitySearch() {
    return this.fetchNewCityResult();
  }

  get compareTwoCities() {
    return this.fetchCompareTwoCities();
  }

  // Method

  async fetchNewCityResult() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&lang=se&units=metric&appid=${this.apiKey}`;
    let response = await fetch(url);
    try {
      if (response.status > 200 || response.status < 200) {
        throw (response.statusText);
      }
      else if (response.status === 401 || response.status === 404) {
        throw (response.statusText);
      }
      else {
        let convertToJson = await response.json();

        return {
          description: convertToJson.weather[0].description,
          icon: `http://openweathermap.org/img/wn/${convertToJson.weather[0].icon}.png`,
          windSpeed: convertToJson.wind.speed,
          degree: convertToJson.main.temp,
          humidity: convertToJson.main.humidity,
          city_name: convertToJson.name
        }
      }
    }
    catch (error) {
      console.error(error);
    }
  }


  async fetchDefaultCity() {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&lang=se&units=metric&appid=${this.apiKey}`;
    let response = await fetch(url);
    try {
      if (response.status > 200 || response.status < 200) {
        throw (response.statusText);
      }
      else if (response.status === 401 || response.status === 404) {
        throw (response.statusText);
      }
      else {
        let convertToJson = await response.json();

        return {
          description: convertToJson.weather[0].description,
          icon: `http://openweathermap.org/img/wn/${convertToJson.weather[0].icon}.png`,
          windSpeed: convertToJson.wind.speed,
          degree: convertToJson.main.temp,
          humidity: convertToJson.main.humidity,
          city_name: convertToJson.name
        }
      }
    }
    catch (error) {
      console.error(error);
    }
  }
}