import React from 'react';
import {Link} from 'react-router-dom';

// Elements
import AboutSection from "../pages/about";
import Goal from "../pages/goal";
import AboutPanel3 from "../pages/aboutusPanel3";
import AboutPanel5 from "../pages/aboutusPanel5";
import OurStory from "./ourStory";
import AboutPanel2 from "../pages/aboutusPanel2";
// import AboutPanel4 from "../pages/aboutusPanel4";
import Quotes from "../pages/Quotes";
import bnrImg1 from "../../images/banner/img1.jpg";
import waveBlue from "../../images/shap/wave-blue.png";
import circleDots from "../../images/shap/circle-dots.png";
import plusBlue from "../../images/shap/plus-blue.png";

const aboutus = () => {
	
		return (
			<>
				
				<div className="page-content bg-white">
					
					<div className="banner-wraper">
						<div className="page-banner" style={{backgroundImage: "url("+bnrImg1+")"}}>
							<div className="container">
								<div className="page-banner-entry text-center">
									<h1>About Us</h1>
									<nav aria-label="breadcrumb" className="breadcrumb-row">
										<ul className="breadcrumb">
											<li className="breadcrumb-item"><Link to="/"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> Home</Link></li>
											<li className="breadcrumb-item active" aria-current="page">About Us</li>
										</ul>
									</nav>
								</div>
							</div>
							<img className="pt-img1 animate-wave" src={waveBlue} alt=""/>
							<img className="pt-img2 animate2" src={circleDots} alt=""/>
							<img className="pt-img3 animate-rotate" src={plusBlue} alt=""/>
						</div>
					</div>
					
					<AboutSection />
					
					<Goal/>
					
					<AboutPanel2 />

					<AboutPanel3 />

					
					<OurStory />

					<Quotes />
					
					<AboutPanel5 />
				
				</div>
				
			</>
		);
	}


export default aboutus;