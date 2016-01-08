var server = require('express');
var app = new server();
var fs = require('fs');
var path = require('path');
var multer  = require('multer');
var upload = multer();

var port = process.env.PORT || 3500;

// Access control headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Generic get, static files
app.get('/:filename?', function(req, res) {
  console.log("file:", req.params.filename);
  var file = /script\.js|favicon\.ico/i.test(req.params.filename) ? req.params.filename : "index.html";
  var fileName = path.join(__dirname, file);
  res.sendFile(fileName, function (err) {
    if (err) {
      console.log('File Error:', err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });
});

// Handle single file upload
app.post('/upload', upload.single('afile'), function (req, res) {
  if(req.file) {
    res.json({
      'filename': req.file.originalname,
      'size': req.file.size,

    });
  } else {
    res.status(400).end();
  }
});

// Server Start
app.listen(port, function(){
  console.log("Listening on port: " + port);
});
