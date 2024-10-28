import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import api from "../../constants/api";
import {Accordion} from 'react-bootstrap';

// Import Images
import bnrImg1 from "../../images/banner/img1.jpg";
import waveBlue from "../../images/shap/wave-blue.png";
import circleDots from "../../images/shap/circle-dots.png";
import plusBlue from "../../images/shap/plus-blue.png";
import servicesPic1 from "../../images/services/pic1.jpg";
// import pdf from "../../images/icon/pdf.png";
// import doc from "../../images/icon/doc.png";


	export default function ServiceDetail() {
		const [Service, setService] = useState([]);
		const [PopularTitle, setPopularTitle] = useState([]);
		const [Popular, setPopular] = useState([]);
		  const getService = () => {
			// var formated = title.split("-").join(" ");
			api
			  .get("/section/getService11")
			  .then((res) => {
				setService(res.data.data[0]);
				//setCurrentData(res.data.data);
			  })
			  .catch(() => {});
		  };

		  useEffect(() => {
			getService();
			//getCategory();
		  }, []);


		  const getPopular = () => {
			// var formated = title.split("-").join(" ");
			api
			  .get("/section/getPopular")
			  .then((res) => {
				setPopular(res.data.data);
				//setCurrentData(res.data.data);
			  })
			  .catch(() => {});
		  };

		  useEffect(() => {
			getPopular();
			//getCategory();
		  }, []);


		  const getPopular11 = () => {
			// var formated = title.split("-").join(" ");
			api
			  .get("/section/getPopular11")
			  .then((res) => {
				setPopularTitle(res.data.data[0]);
				//setCurrentData(res.data.data);
			  })
			  .catch(() => {});
		  };

		  useEffect(() => {
			getPopular11();
			//getCategory();
		  }, []);

		  const removeHtmlTags = (text) => {
			return text ? text.replace(/<\/?[^>]+(>|$)/g, "") : ""; 
		};
		
	

		return (
			<>
				
				<div className="page-content bg-white">
					
					<div className="banner-wraper">
						<div className="page-banner" style={{backgroundImage: "url("+bnrImg1+")"}}>
							<div className="container">
								<div className="page-banner-entry text-center">
									<h1>Service Details</h1>
									<nav aria-label="breadcrumb" className="breadcrumb-row">
										<ul className="breadcrumb">
											<li className="breadcrumb-item"><Link to="/"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> Home</Link></li>
											<li className="breadcrumb-item active" aria-current="page">Service</li>
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
								<div className="col-lg-10 mb-30">
									<div className="ttr-media mb-30">
										<img
										src={`https://homeservices.unitdtechnologies.com/storage/uploads/${Service&&Service.file_name}`}
										alt=""
										className="rounded"
										/>
									</div>
									<div className="clearfix">
										<div className="head-text mb-30">
											<h2 className="title mb-15">{Service&&Service.title}</h2>
											<p className="mb-0">{removeHtmlTags(Service&&Service.description)}</p>
										</div>
								
									</div>
									<div className="clearfix">
										<div className="head-text mb-30">
											<h4 className="title mb-10">{PopularTitle&&PopularTitle.title}</h4>
											<p className="mb-0">{removeHtmlTags(PopularTitle&&PopularTitle.description)}</p>
										</div>
										<Accordion defaultActiveKey="0" className="accordion ttr-accordion1">
										
										{Popular.map((Popular, index) =>(
												<>
											<Accordion.Item eventKey={Popular.content_id}>
												<Accordion.Header>{Popular.title}</Accordion.Header>
												<Accordion.Body>
													<p className="mb-0">{Popular.description.replace(/<[^>]+>/g, '')}</p>
												</Accordion.Body>
											</Accordion.Item>
										
											</>
											    ))}
												
										</Accordion>
									</div>
								</div>
								{/* <div className="col-lg-4">
									<aside className="sticky-top pb-1">
										<div className="widget">
											<ul className="service-menu">
												<li className="active"><Link to="/service-detail"><span>Engine Diagnostics</span><i className="fa fa-angle-right"></i></Link></li>
												<li><Link to="/service-detail"><span>Lube Oil and Filters</span><i className="fa fa-angle-right"></i></Link></li>
												<li><Link to="/service-detail"><span>Belts and Hoses</span><i className="fa fa-angle-right"></i></Link></li>
												<li><Link to="/service-detail"><span>Air Conditioning</span><i className="fa fa-angle-right"></i></Link></li>
												<li><Link to="/service-detail"><span>Brake Repair</span><i className="fa fa-angle-right"></i></Link></li>
												<li><Link to="/service-detail"><span>Tire and Wheel Services</span><i className="fa fa-angle-right"></i></Link></li>
											</ul>
										</div>
										<div className="widget">
											<div className="brochure-bx">
												<h5 className="title-head">Download</h5>
												<Link to="#" className="download-link">
													<img src={pdf} alt=""/>
													<h5 className="title">Download our Brochures</h5>
													<span>Download</span>
												</Link>
												<Link to="#" className="download-link">
													<img src={doc} alt=""/>
													<h5 className="title">Our Company Details</h5>
													<span>Download</span>
												</Link>
											</div>
										</div>
										
									</aside>
								</div> */}
							</div>
						</div>
					</section>
					
				</div>
				
			</>
		);
	
}

