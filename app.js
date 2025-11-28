//1.  DOM elementleri eklendi
const cityInput = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchBtn");
const resultDiv = document.querySelector("#result");

//2. API Anahtarı Tanımlandı(weatherapi)
const API_KEY = '1e107ab9424747a5a6c170558252411';

//3. Hava durumu verisini çekme fonksiyonu
async function getWeatherData(city) {

    // Şehir boş mu kontrol et
    if (!city) {
        resultDiv.innerHTML = "<p>Lütfen bir şehir adı giriniz</p>";
        return;
    }

    //4. Yükleniyor mesajı göster
    resultDiv.innerHTML = "<p>Hava durumu bilgisi yükleniyor...</p>";

    //5. Dinamik API URL oluşturuldu 
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;

    //6. Hata kontrolü 
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // API bir hata gönderirse
        if (data.error) {
            throw new Error(data.error.message);
        }

        // Başarılıysa veriyi ekrana yazdır
        displayWeather(data);

    } catch (error) {
        resultDiv.innerHTML = `Hata: ${error.message}`;
    }

    // 7. Veriyi HTML'e Yerleştirme Fonksiyonu
    function displayWeather(data) {
        const cityName = data.location.name;
        const tempC = data.current.temp_c;
        const conditionText = data.current.condition.text;
        const iconUrl = data.current.condition.icon;
        const humidity = data.current.humidity;
        const windKph = data.current.wind_kph;

        resultDiv.innerHTML = `
        <h2>${cityName}, ${data.location.country}</h2>
        <div class="weather-details">
            <img src="https:${iconUrl}" alt="${conditionText}" class="weather-icon">
            <p class="temperature">🌡️ Sıcaklık: <strong>${tempC}°C</strong></p>
            <p class="condition">☁️ Hava Durumu: ${conditionText}</p>
            <hr>
            <p class="humidity">💧 Nem: ${humidity}%</p>
            <p class="wind">💨 Rüzgar Hızı: ${windKph} kph</p>
        </div>
    `;
    }
}
// 8. Olay Dinleyicileri (Event Listeners)

// 1. Butona tıklama olayı
searchBtn.addEventListener("click", () => {
    // Input değerini al ve boşlukları temizle
    const city = cityInput.value.trim();
    getWeatherData(city);
});

cityInput.addEventListener("keyup", (event) => {
    // Eğer basılan tuş "Enter" ise, butona tıklama işlevini çağır
    if (event.key === "Enter") {
        searchBtn.click();
    }
});

//   fetch('https://api.weatherapi.com/v1/current.json?key=1e107ab9424747a5a6c170558252411&q=Istanbul')
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error(error));