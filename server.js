// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api", function (req, res) {
  let datetime = new Date();
  datetime.setMinutes(datetime.getMinutes());
  let obj = {
    unix: datetime.getTime(),
    utc: datetime.toUTCString(),
  };
  return res.json(obj);
});

app.get("/api/:timestamp", function (req, res) {
  let datetime = new Date();
  datetime.setMinutes(datetime.getMinutes() - 3);

  let intRegex = /^\d+$/;
  if (req.params.timestamp !== "") {
    let isInt = intRegex.test(req.params.timestamp);
    if (isInt) {
      datetime = new Date(parseInt(req.params.timestamp));
    } else {
      datetime = new Date(req.params.timestamp);
    }
  }

  if (isNaN(datetime)) {
    return res.json({ error: "Invalid Date" });
  }

  let obj = {
    unix: datetime.getTime(),
    utc: datetime.toUTCString(),
  };
  console.log(
    "Date: ",
    datetime,
    obj,
    req.params.timestamp,
    parseInt(req.params.timestamp)
  );
  return res.json(obj);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
