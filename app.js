// DOM elementleri eklendi
const cityInput = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchBtn");
const resultDiv = document.querySelector("#result");


searchBtn.addEventListener("click", () => {
    const city = cityInput.value;
    console.log("Aranan şehir:", city)
})