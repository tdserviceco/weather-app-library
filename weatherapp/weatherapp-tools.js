export default class weatherAppTools {
  constructor() {
    this.body = document.querySelector('.weather-app');
    this.loading = document.querySelector('.weather-app.loading')
  }

  defaultCity(apiKey) {
    if (!this.body.classList.contains('loading')) {
      this.body.classList.add('loading');
    }
    let container = document.createElement('div');
    container.classList.add('container');
    this.body.appendChild(container)
    this.searchBar(apiKey)
    navigator.geolocation.getCurrentPosition((pos) => {

      if (this.body.classList.contains('loading')) {
        this.body.classList.remove('loading');
      }

      this.cityByLatLon(apiKey, pos.coords.latitude, pos.coords.longitude,).then(res => {
        const resultBody = document.createElement('section');
        resultBody.classList.add('result');
        let cityName = document.createElement('h3');
        let weatherDegree = document.createElement('h3');

        
        cityName.classList.add('city-name');
        weatherDegree.classList.add('city-weather-degree');
     
        cityName.textContent = res.name;
        weatherDegree.textContent = `${res.main.temp_max}°C`

        resultBody.appendChild(cityName)
        resultBody.appendChild(weatherDegree)

        container.appendChild(resultBody);
      }).catch(error => {
        console.log(error)
      })

    });
  }


  searchBar(key) {

    const formBlock = document.createElement('form');
    formBlock.classList.add('city-form')
    const inputSearch = document.createElement('input');
    const searchButton = document.createElement('input');
    searchButton.setAttribute('type', 'submit');
    searchButton.classList.add('submit-btn');
    searchButton.innerText = 'Search';

    inputSearch.setAttribute('id', 'searchBar');
    inputSearch.setAttribute('name', 'searchBar');
    inputSearch.setAttribute('type', 'text');
    inputSearch.classList.add('searchBar');
    inputSearch.setAttribute('placeholder', 'Type a city');

    formBlock.appendChild(inputSearch)
    formBlock.appendChild(searchButton)
    const container = document.querySelector('.container');
    container.appendChild(formBlock);
    this.getNewCity(key)
  }

  getNewCity(apiKey) {

    const form = document.querySelector('form');
    if (!this.body.classList.contains('loading')) {
      this.body.classList.add('loading');
    }
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      let cityName = document.querySelector('.city-name');
      let weatherDegree = document.querySelector('.city-weather-degree');

      let value = e.target.searchBar.value;
      this.getCityValue(apiKey, value).then(res => {
        if (this.body.classList.contains('loading')) {
          this.body.classList.remove('loading');
        }
        
        if (cityName) {
          cityName.textContent = res.name;
        }

        if (weatherDegree) {
          weatherDegree.textContent = `${res.main.temp_max}°C`
        }

      }).catch(error => {
        console.log(error)
      });
    })
  }


  error() {
    const errorBlock = document.createElement('div');
    errorBlock.setAttribute('class', 'error-block');

    const errorText = document.createElement('h4');
    errorText.setAttribute('class', 'error-text')
    errorBlock.appendChild(errorText)

    this.body.appendChild(errorBlock)
  }


  async cityByLatLon(apiKey, lat, lon) {
    const errorBlock = document.querySelector('.error-block')
    const errorText = document.querySelector('.error-text')
    let url = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    if (url.status >= 200 && url.status < 300) {
      let response = await url.json();
      return response
    }
    else {
      if (errorBlock) {
        if (errorText) {
          errorText.textContent = `error code: ${url.status} - ${url.statusText}`
          errorBlock.appendChild(errorText);
          this.body.appendChild(errorBlock)
        }
      }
    }
  }

  async getCityValue(apiKey, city) {
    console.log('getNewCity', apiKey)

    const errorBlock = document.querySelector('.error-block')
    const errorText = document.querySelector('.error-text')
    if (errorText.classList.contains('show')) {
      errorText.classList.remove('show')
      errorText.classList.add('hide')
    }
    let url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    if (url.status >= 200 && url.status < 300) {
      let response = await url.json();
      return response
    }
    else {
      if (errorBlock) {
        if (errorText) {
          errorText.classList.remove('hide');
          errorText.classList.add('show');

          errorText.textContent = `error code: ${url.status} - ${url.statusText}`
          errorBlock.appendChild(errorText);
          this.body.appendChild(errorBlock)
        }
      }
    }
  }
} 