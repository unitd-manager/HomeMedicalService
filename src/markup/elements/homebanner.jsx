import React, { useState, useEffect } from 'react';
import api from "../../constants/api";

// Import Images
import bg1 from '../../images/main-banner/bg1.jpg';
import doctorImg from '../../images/main-banner/oldpeople.jpg';
// import ptImg1 from '../../images/shap/trangle-orange.png';
// import ptImg2 from '../../images/shap/square-blue.png';
import ptImg3 from '../../images/shap/chicle-blue-2.png';
// import ptImg4 from '../../images/shap/plus-orange.png';
import ptImg5 from '../../images/shap/wave-orange.png';

export default function AboutSection() {

	const [content, setContent] = useState([]);

	useEffect(() => {
		getContent();
	}, []);

	const getContent = () => {
		api
		  .get("/content/getElderHome")
		  .then((res) => {
			setContent(res.data.data);
		  })
		  .catch((error) => {
			console.error("Error fetching content data:", error);
		  });
	};

	return (
			<>
				
				<div className="main-banner" style={{ backgroundImage: `url(${bg1})` }}>
					<div className="container inner-content">
					{content.map((data, index) => (
						<div className="row align-items-center">
							{/* Image on the left */}
							<div className="col-lg-5 col-md-6 col-sm-5">
								<div className="banner-img">
								<img src={doctorImg} alt="Doctor" style={{ width: '500px', height: 'auto' }} />
								</div>
							</div>
							{/* Text on the right */}
							<div className="col-lg-7 col-md-6 col-sm-7">
    <h1>{data.title}</h1>
    <h4>{data.description}</h4>
    <a href="tel:+919000191112" className="btn btn-secondary btn-lg shadow" style={{ marginRight: '10px' }}>Call Us</a>
    <a href="https://wa.me/919000191112" className="btn btn-secondary btn-lg shadow">WhatsApp Us</a>
</div>
						</div>
										))}

					</div>
					{/* Uncomment these if you want to use the decorative images */}
					{/* <img className="pt-img1 animate1" src={ptImg1} alt=""/>
					<img className="pt-img2 animate2" src={ptImg2} alt=""/> */}
					<img className="pt-img3 animate3" src={ptImg3} alt=""/>
					{/* <img className="pt-img4 animate4" src={ptImg4} alt=""/> */}
					<img className="pt-img5 animate-wave" src={ptImg5} alt=""/>
				</div>
			</>
		);
	}
