import React, { useState, useEffect } from 'react';
import api from "../../constants/api";


// Import Images
import bg1 from '../../images/main-banner/bg1.jpg';
import doctorImg from '../../images/main-banner/doctor.png';
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
		  .get("/content/getHome")
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
						<div className="row align-items-center" key={index}>
							<div className="col-lg-7 col-md-6 col-sm-7">
								<h6 className="title-ext text-primary">{data.title}</h6>
								<h1>{data.description}</h1>
							</div>
							<div className="col-lg-5 col-md-6 col-sm-5">
								<div className="banner-img">
									<img src={doctorImg} alt="Doctor" />
								</div>
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
