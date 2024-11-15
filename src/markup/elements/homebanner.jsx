import React, { useState, useEffect } from 'react';
import api from "../../constants/api";

// Import Images
import bg1 from '../../images/main-banner/bg1.jpg';
import doctorImg from '../../images/main-banner/Home345.png';
import ptImg1 from '../../images/shap/trangle-orange.png';
import ptImg2 from '../../images/shap/square-blue.png';
import ptImg4 from '../../images/shap/plus-orange.png';


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
								<img src={doctorImg} alt="Doctor"  />
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
				<img className="pt-img1 animate1" src={ptImg1} alt="Orange Triangle" />
				<img className="pt-img2 animate2" src={ptImg2} alt="Blue Square" />
				<img className="pt-img4 animate4" src={ptImg4} alt="Orange Plus" />
			</div>
			</>
		);
	}
