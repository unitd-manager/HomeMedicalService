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
	const [content1, setContent1] = useState([]);


	useEffect(() => {
		getContent();
		getContent1();
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

	const getContent1 = () => {
		api
		  .get("/content/Who")
		  .then((res) => {
			setContent1(res.data.data);
		  })
		  .catch((error) => {
			console.error("Error fetching content data:", error);
		  });
	};
	const stripHtmlTags = (input) => {
		let tempDiv = document.createElement("div");
		tempDiv.innerHTML = input;
		return tempDiv.textContent || tempDiv.innerText || "";
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
 
    <br />
    {content1.length > 0 && (
        <p style={{ marginTop: '40px', fontSize: "12px", color: "#000080" }}>
            {content1[0].description ? stripHtmlTags(content1[0].description) : ''}
        </p>
    )}
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
