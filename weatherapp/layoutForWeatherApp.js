class LayoutForWeatherApp {
  constructor(build) {
    this.build = build;
  }

  get buildWeatherInCity() {
    return this.weatherInCity(this.build)
  }

  weatherInCity(city) {
    return city;
  }
  
  get buildDescription() {
    return this.weatherDescription(this.build)
  }

  weatherDescription(description) {
    return description;
  }

  get buildDegree() {
    return this.weatherDegree(this.build)
  }

  weatherDegree(degree) {
    return degree;
  }

  get buildWindSpeed() {
    return this.weatherWindSpeed(this.build)
  }

  weatherWindSpeed(windSpeed) {
    return windSpeed;
  }

  get buildIcon() {
    return this.weatherIcon(this.build)
  }

  weatherIcon(icon) {
    return icon;
  }

}