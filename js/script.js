const apiKey = "4d7005e65cf53c37";

const getWeather = function(city, state) {
  $.ajax({
    url: "https://api.wunderground.com/api/" + apiKey + "/conditions/q/" + state + "/" + city + ".json",
    dataType: "jsonp",
    success: data => {
      var forecast = data['current_observation'];
      tempC = forecast['temp_c'];
      tempF = forecast['temp_f'];
      $('#temp').text(tempF);
      $('#image').attr('src',forecast['icon_url']);
    }
  });
}

const switchTemp = (type) => {
  if ($('#type').text() === 'F') {
    $('#type').text('C');
    $('#temp').text(tempC);
  } else {
    $('#type').text('F');
    $('#temp').text(tempF);
  }
}

$(document).ready(() => {

  let tempF = "";
  let tempC = "";

  $.ajax({
    url: "https://api.wunderground.com/api/" + apiKey + "/geolookup/q/autoip.json",
    dataType: "jsonp",
    success: data => {
      let local = data['location'];
      $('#city').text(local.city);
      $('#state').text(local.state);
      getWeather(local.city, local.state);

    }
  });

  $('#type').text("F");
  $('#type').click(() => {
    switchTemp($('#type').text());
  });

});
