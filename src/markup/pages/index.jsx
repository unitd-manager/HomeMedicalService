import React from 'react';

// Elements
import MainBannerSection from "../elements/home";
import BannerSection from "../elements/homebanner";
import AboutSection from "../elements/about";
import WorkSection from "../elements/work";
import AppointmentSection from "../elements/appointment";
import TestimonialSection from "../elements/testimonial";
import ServicesSliderSection from "../elements/services-slider";
import LatestNewsSection from "../elements/latest-news-slider";

function Index(){
	
	return(
		<>
			
			<MainBannerSection />

			<BannerSection/>
			
			<AboutSection />
			
			<WorkSection />
			
			<AppointmentSection />
			
			<ServicesSliderSection />
			
			<TestimonialSection />
			
			<LatestNewsSection />
			
		</>
		
	);
}

export default Index;