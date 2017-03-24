$(document).ready(function() {
  
  var apiKey = "4d7005e65cf53c37",
  tempF = "",
  tempC = "";
  
  function getWeather(city, state) {
    $.ajax({
      url: "https://api.wunderground.com/api/" + apiKey + "/conditions/q/" + state + "/" + city + ".json",
      dataType: "jsonp",
      success: function(parsed_json) {
        var forecast = parsed_json['current_observation'];
        tempC = forecast['temp_c'];
        tempF = forecast['temp_f'];
        $('#temp').text(tempF);
        $('#type').text("F");
        $('#imgURL').attr('src',forecast['icon_url']);
      }
    });
  }

  function switchTemp(type) {
    if ($('#type').text() == 'F') {
      $('#type').text('C');
      $('#temp').text(tempC);
    } else {
      $('#type').text('F');
      $('#temp').text(tempF);
    }
  }
  
  $.ajax({
    url: "https://api.wunderground.com/api/" + apiKey + "/geolookup/q/autoip.json",
    dataType: "jsonp",
    success: function(parsed_json) {
      
      var local = parsed_json['location'];
      
      $('#city').text(local['city']);
      $('#state').text(local['state']);
      getWeather(parsed_json.location.city, parsed_json.location.state);
      
    }
  });
  
  $('#type').click(function () {
    switchTemp($('#type').text());
  });
  
});