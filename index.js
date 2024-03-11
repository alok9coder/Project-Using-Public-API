import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 8000;

const options = {
  method: 'GET',
  url: 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random',
  headers: {
    accept: 'application/json',
    'X-RapidAPI-Key': '25e171384fmshd1206f0df25eee2p19aac8jsn35a8682518aa',
    'X-RapidAPI-Host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com'
  }
};

const title = "API hub";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        const result = await axios.request(options);
        console.log(result.data.value);
        console.log(result.status);
        res.render("index.ejs", {
            content: JSON.stringify(result.data.value),
            pageTitle: title,
        });
    } catch (error) {
        console.log(error.response.data.splice(0, error.response.data.length - 3));
        console.log(error.response.status);
        res.render("index.ejs", {
            content: JSON.stringify(error.response.data).splice(0, error.response.data.length - 3),
            category: error.response.status,
            pageTitle: title,
        });
    }
});

app.post("/next", async (req, res) => {
    const nextJoke = req.body.next;
    console.log(`Next Joke Requested: ${nextJoke}`);

    try {
        const result = await axios.request(options);
        console.log(result.data.value);
        console.log(result.status);
        res.render("index.ejs", {
            content: JSON.stringify(result.data.value),
            pageTitle: title,
        });
    } catch (error) {
        console.log(error.response.data.splice(0, error.response.data.length - 3));
        console.log(error.response.status);
        res.render("index.ejs", {
            content: JSON.stringify(error.response.data).splice(0, error.response.data.length - 3),
            category: error.response.status,
            pageTitle: title,
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on Port ${port}`);
});
