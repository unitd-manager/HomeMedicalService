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
	const [CategoryOne, setCategoryOne] = useState([]);
	const [CategoryTwo, setCategoryTwo] = useState([]);

	useEffect(() => {
		getNews();
		getCategoryOne();
		getCategoryTwo();
	}, []);

	const getNews = () => {
		api
			.get('/section/getService1')
			.then((res) => {
				setNews(res.data.data);
			})
			.catch(() => {});
	};

	const getCategoryOne = () => {
		api
			.get('/section/getService2')
			.then((res) => {
				setCategoryOne(res.data.data);
			})
			.catch(() => {});
	};

	const getCategoryTwo = () => {
		api
			.get('/section/getService3')
			.then((res) => {
				setCategoryTwo(res.data.data);
			})
			.catch(() => {});
	};

	const stripHtmlTags = (input) => {
		let tempDiv = document.createElement("div");
		tempDiv.innerHTML = input;
		return tempDiv.textContent || tempDiv.innerText || "";
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
						<div className="container" >
						<h2>{News.length > 0 ? News[0].category_title : 'Category One'}</h2> {/* Add heading for Category One */}
							<div className="row">
							{News.map((data, index) => (

								<div className="col-lg-4 col-md-6 mb-30">
									<div className="feature-container feature-bx2 feature1">
										<div className="icon-content">
											<h3 className="ttr-title">{data.title}</h3>
											<p>{data.product_description ? stripHtmlTags(data.product_description) : ''}</p>
											{/* <Link to="/service-detail" className="btn btn-primary light">View More</Link> */}
										</div>
									</div>
								</div>
								     ))}
								
							</div>	
						</div>
					</section>
					<section className="section-area section-sp1">
						<div className="container">
						<h2>{CategoryOne.length > 0 ? CategoryOne[0].category_title : 'Category Two'}</h2> {/* Add heading for Category One */}

							<div className="row">
							{CategoryOne.map((data, index) => (

								<div className="col-lg-4 col-md-6 mb-30">
									<div className="feature-container feature-bx2 feature1">
										<div className="icon-content">
											<h3 className="ttr-title">{data.title}</h3>
											<p>{data.product_description ? stripHtmlTags(data.product_description) : ''}</p>
											{/* <Link to="/service-detail" className="btn btn-primary light">View More</Link> */}
										</div>
									</div>
								</div>
								     ))}
								
							</div>	
						</div>
					</section>
					<section className="section-area section-sp1">
						<div className="container">
						<h2>{CategoryTwo.length > 0 ? CategoryTwo[0].category_title : 'Category Three'}</h2> {/* Add heading for Category One */}

							<div className="row">
							{CategoryTwo.map((data, index) => (

								<div className="col-lg-4 col-md-6 mb-30">
									<div className="feature-container feature-bx2 feature1">
										<div className="icon-content">
											<h3 className="ttr-title">{data.title}</h3>
											<p>{data.product_description ? stripHtmlTags(data.product_description) : ''}</p>
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

