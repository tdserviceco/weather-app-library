import tools from './weatherapp-tools.js';

class WeatherApp extends tools {
  constructor() {
    super()
    this.key = '' //ApiKey enters here
    this.body = document.querySelector('.weather-app');
    this.defaultCity(this.key)
    this.error()
  }
}

export default new WeatherApp;