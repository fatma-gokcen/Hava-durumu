//1.  DOM elementleri eklendi
const cityInput = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchBtn");
const resultDiv = document.querySelector("#result");

//2. API Anahtarı Tanımlandı(weatherapi)
const API_KEY = '1e107ab9424747a5a6c170558252411';

//3. Hava durumu verisini çekme fonksiyonu
async function getWeatherData(city) {
    if (!city) {
        resultDiv.innerHTML = "<p>Lütfen bir şehir adı giriniz</p>"
        return;
    }
}


