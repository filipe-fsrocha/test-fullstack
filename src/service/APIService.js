export class APIService {

    apiUrl = 'https://api.openweathermap.org/data/2.5'

    getToken() {
        return fetch('http://localhost:8000/api/getAccessKey')
    }

    findForecastByCity(city) {
        return fetch(`${this.apiUrl}/weather?q=${city}&appid=${this.getLocalToken()}&lang=pt_br&units=metric`)
            .then(data => data.json())
    }

    findHistoryForecast(lat, lon) {
        return fetch(`${this.apiUrl}/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${this.getLocalToken()}&lang=pt_br&units=metric`)
            .then(data => data.json())
    }

    getLocalToken() {
        if (localStorage.getItem('token')) return JSON.parse(localStorage.getItem('token')).accessKey
        return ''
    }

    listHistoryForecast() {
        return fetch('http://localhost:8000/api/listForecast')
            .then(data => data.json())
    }

    saveForecast(forecast) {
        fetch('http://localhost:8000/api/saveForecast', {
            method: 'POST',
            body: JSON.stringify({
                country: forecast.sys.country,
                city: forecast.name,
                lon: forecast.coord.lon,
                lat: forecast.coord.lat
            })
        }).catch(error => console.log(error))
    }

}