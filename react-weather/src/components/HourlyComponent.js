import React from "react";

const HourlyComponent = props => {
	const { main, weather, wind, dt_txt, index } = props.hourly;
	return (
		<div>
			<h4>{index}</h4>
			<h5>main</h5>
			{main.temp}
			{main.feels_like}
			{main.temp_min}
			{main.temp_max}
			{main.humidity}
			<h5>{weather.main}</h5>
			<h6>{wind.speed}</h6>
			<h4>{dt_txt}</h4>
		</div>
	);
};

export default HourlyComponent;

/* 

    {
      "dt": 1578409200,
      "main": {
        "temp": 284.92,
        "feels_like": 281.38,
        "temp_min": 283.58,
        "temp_max": 284.92,
        "pressure": 1020,
        "sea_level": 1020,
        "grnd_level": 1016,
        "humidity": 90,
        "temp_kf": 1.34
      },
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "clouds": {
        "all": 100
      },
      "wind": {
        "speed": 5.19,
        "deg": 211
      },
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2020-01-07 15:00:00"
    },
 }
*/
