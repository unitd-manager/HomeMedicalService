import React from 'react';

// Elements
// import MainBannerSection from "../elements/home";
import BannerSection from "../elements/homebanner";
import AboutSection from "../elements/about";
import WorkSection from "../elements/work";
import AboutPanel4 from "../pages/aboutusPanel4";
import AppointmentSection from "../elements/appointment";
import TestimonialSection from "../elements/testimonial";
import ServicesSliderSection from "../elements/services-slider";
import LatestNewsSection from "../elements/latest-news-slider";
import { CiTextAlignCenter } from 'react-icons/ci';

function Index(){
	
	return(
		<>
			
			{/* <MainBannerSection /> */}

			<BannerSection/>
			<AboutSection />
			
			<WorkSection />
			<AboutPanel4/>

			<AppointmentSection />
			<h2 className="title" style={{ textAlign: "center" }}>Services</h2>
			<ServicesSliderSection />
			
			<TestimonialSection />
			
			<LatestNewsSection />
			
		</>
		
	);
}

export default Index;