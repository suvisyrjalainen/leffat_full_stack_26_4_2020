const express = require('express')
const app = express();
//app.listen(3000, () => console.log("kuuntelen"));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("kuuntelen porttia " + port));
app.use(express.static("public"));

app.use(express.json({limit: '1mb'}));

const arvostelut = [
    {
        "leffa": "Titanic",
        "arvostelu": "Klassikkokamaa",
        "arvostelija": "Suvi"
    },
    {
        "leffa": "Star Wars",
        "arvostelu": "Silmäkarkkia",
        "arvostelija": "Suvi 2"
    }
]

app.get('/api/arvostelut', function (request, response) {
  response.send(arvostelut);
})

app.post('/api/arvostele', function (request, response) {
  console.log(request.body);
  arvostelut.push(request.body);
  response.send(200);
  console.log(arvostelut);
})
