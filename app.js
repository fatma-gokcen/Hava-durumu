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
}
