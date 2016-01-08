// Button Handler
document.getElementById('fileform').addEventListener('submit', function(e) {
  e.preventDefault();
  var form = document.getElementById('fileform');

  var data = new FormData(form);

  var req = new XMLHttpRequest();
  req.open("POST", '/upload');
  req.onload = function(event) {
    if(req.status >= 200 && req.status < 400) {
      var myData = JSON.parse(event.target.responseText);
      var content = document.createElement('tr');
      content.innerHTML = "<td>" + myData.filename + "</td><td>" + myData.size + "</td>";
      document.getElementById('results').appendChild(content);
    } else {
      var content = document.createElement('tr');
      content.innerHTML = '<td colspan="2" class="text-center">Error Reading File</td>';
      document.getElementById('results').appendChild(content);
    }
  };
  req.send(data);


});