const express = require('express')
var bodyParser = require('body-parser');
const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));

app.get('/canvas', (req, res) => res.sendFile(__dirname + '/public/canvas.html'));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.listen(3000, () => console.log('Listening on port 3000!'))