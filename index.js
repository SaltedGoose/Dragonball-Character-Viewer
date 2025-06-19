import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const apiUrl = "https://dragonball-api.com/api/characters";

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    res.render("index.ejs");
})

app.get("/search", async (req, res) => {
    try {
        const response = await axios.get(apiUrl, {params : {
            name : req.query.character
        }});
        if (response.data.length === 1){
            const result = response.data[0];
            const facts = {
                name : result.name,
                ki : result.ki,
                maxKi : result.maxKi,
                race : result.race,
                gender : result.gender,
                affiliation : result.affiliation
            }
            res.render("index.ejs", {facts: facts, img : result.image});   
        }else{
            res.render("index.ejs")
        }
    }catch (error){
        console.log(error);
    }
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})