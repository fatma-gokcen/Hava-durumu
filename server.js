import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.static("./")); // index.html ve script.js için

app.get("/weather", async (req, res) => {
    const city = req.query.city;
    const API_KEY = process.env.API_KEY;

    try {
        const apiURL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;

        const response = await fetch(apiURL);
        const data = await response.json();

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Sunucu hatası" });
    }
});

app.listen(3000, () => {
    console.log("Server çalışıyor: http://localhost:3000");
});
