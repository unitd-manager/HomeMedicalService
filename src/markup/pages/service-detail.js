import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import api from "../../constants/api";

// Elements
import FeatureSection3 from "../elements/feature-section3";
import TeamSection from "../elements/team";
import LatestNewsSection from "../elements/latest-news-slider";

// Import Images
import bnrImg1 from "../../images/banner/img1.jpg";
import waveBlue from "../../images/shap/wave-blue.png";
import circleDots from "../../images/shap/circle-dots.png";
import plusBlue from "../../images/shap/plus-blue.png";


export default function News() {
	const [News, setNews] = useState([]);

	useEffect(() => {
		getNews();
		//getCategory();
	  }, []);
	
	  const getNews = () => {
		// var formated = title.split("-").join(" ");
		api
		  .get("/section/getService")
		  .then((res) => {
			setNews(res.data.data);
			//setCurrentData(res.data.data);
		  })
		  .catch(() => {});
	  };

		return (
			<>
				
				<div className="page-content bg-white">
					
					<div className="banner-wraper">
						<div className="page-banner" style={{backgroundImage: "url("+bnrImg1+")"}}>
							<div className="container">
								<div className="page-banner-entry text-center">
									<h1>Services</h1>
									<nav aria-label="breadcrumb" className="breadcrumb-row">
										<ul className="breadcrumb">
											<li className="breadcrumb-item"><Link to="/"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> Home</Link></li>
											<li className="breadcrumb-item active" aria-current="page">Services</li>
										</ul>
									</nav>
								</div>
							</div>
							<img className="pt-img1 animate-wave" src={waveBlue} alt=""/>
							<img className="pt-img2 animate2" src={circleDots} alt=""/>
							<img className="pt-img3 animate-rotate" src={plusBlue} alt=""/>
						</div>
					</div>
					
					<section className="section-area section-sp1">
						<div className="container">
							<div className="row">
							{News.map((data, index) => (

								<div className="col-lg-4 col-md-6 mb-30">
									<div className="feature-container feature-bx2 feature1">
										<div className="feature-box-xl mb-20">
											<span className="icon-cell">
											<img
  src={`https://homeservices.unitdtechnologies.com/storage/uploads/${data.file_name}`}
  alt={data.title}
  style={{ width: "130px",height:"130px", objectFit: "cover" }}
/>

											</span> 
										</div>
										<div className="icon-content">
											<h3 className="ttr-title">{data.title}</h3>
											<p>{data.description}</p>
											{/* <Link to="/service-detail" className="btn btn-primary light">View More</Link> */}
										</div>
									</div>
								</div>
								     ))}
								
							</div>	
						</div>
					</section>
					
					<FeatureSection3 />
					
					<TeamSection />
					
					<LatestNewsSection />
					
				</div>
				
			</>
		);
	
}

