let express = require("express")
let app = express()
let fs = require("fs")
var parser = require("body-parser")
let getJSON = require('get-json')
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/Frontend'));
app.set('view engine', 'ejs');
var urlParser = parser.urlencoded({extended:false})
app.post("/sss",urlParser,function (req, res) {
    console.log(req.body)
    let lat = req.body.lat
    let lng = req.body.lng
    getJSON(`https://cors.io/?https://api.darksky.net/forecast/335a95b9bed307f7e4555df2e0087ae2/${lat},${lng}`,function (error, resp) {
        res.send(resp)
    })
})
let server = app.listen(3000,function () {
    console.log("listening on port number %d",server.address().port)
})