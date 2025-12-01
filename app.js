//1.  DOM elementleri eklendi
const cityInput = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchBtn");
const resultDiv = document.querySelector("#result");

//3. Hava durumu verisini çekme fonksiyonu
async function getWeatherData(city) {

    if (!city) {
        resultDiv.innerHTML = "<p>Lütfen bir şehir adı giriniz</p>";
        return;
    }

    resultDiv.innerHTML = "<p>Hava durumu bilgisi yükleniyor...</p>";

    try {
        // API KEY artık burada yok! Backend’e istek atıyoruz.
        const response = await fetch(`/weather?city=${city}`);
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        displayWeather(data);

    } catch (error) {
        resultDiv.innerHTML = `Hata: ${error.message}`;
    }
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

// 8. Olay Dinleyicileri
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    getWeatherData(city);
});

cityInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});
