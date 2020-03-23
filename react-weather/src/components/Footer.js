import React from "react";

const Footer = () => {
	return (
		<div className='footer-copyright'>
			<div className='container center-align'>
				<a className='white-text' href='mailto:shankar.ni@northeastern.edu'>
					Nikhil Shankar: 001373456
				</a>{" "}
				&nbsp; &nbsp; &nbsp;
				<a className='white-text' href='https://openweathermap.org/'>
					OpenWeatherMap
				</a>{" "}
				&nbsp; &nbsp; &nbsp;
				<a className='white-text' href='https://materializecss.com/'>
					MaterializeCSS
				</a>{" "}
				&nbsp; &nbsp; &nbsp;
				<a className='white-text' href='https://darksky.net/dev'>
					DarkSkyAPI
				</a>
			</div>
		</div>
	);
};

export default Footer;
