const express = require("express");
const app= express();
const port = 3000;
const bodyParser = require('body-parser');
const request = require("request");



app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



app.get("/", (req, res)=>{
    res.render('home');
});

app.post("/search", (req, res)=>{
    let url = "http://www.omdbapi.com/?s=" + req.body.search + '&apikey=c5b5b5de';
    request(url, (error, response, body )=>{
        if(error){
            console.log("SOMETHING WENT WRONG!");
            console.log(error);
            res.send("Page not Found");
        } else {
            if(response.statusCode === 200){
                let data = JSON.parse(body);
                if(data.Response !== 'False'){

                    let searchResults = data.Search;
                    console.log(searchResults);
                    res.render('results' ,{results: searchResults});
                }
                else{
                    res.render('notfound', {data:data});
                }
            }
        }
    });
});


app.get("/title/:id", (req, res)=>{
    let id = req.params.id;
    let url = "http://www.omdbapi.com/?i="+ id + "&plot=full&apikey=c5b5b5de";
    request(url, (error, response, body)=>{
        if(error){
            console.log("SOMETHING WENT WRONG!");
            console.log(error);
            res.send("Page not Found");
        } else {
            if(response.statusCode === 200){
                let data = JSON.parse(body);
                
                console.log(data);
                res.render('details', {data:data});
            }
        }
    })
});



app.listen(port, ()=>{
    console.log("App running on port 3000");
});


































