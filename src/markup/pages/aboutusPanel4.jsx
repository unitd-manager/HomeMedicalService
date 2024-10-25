import React, { useEffect, useState } from "react";
// import Slider from "react-slick";
import api from "../../constants/api";

const TestimonialSection = () => {

	const [content, setContent] = useState([]);
	const [contentTab, setContentTab] = useState([]);
  
	const getContent = () => {
	  api
		.get('/content/getLakshmiMission')
		.then((res) => {
		  setContent(res.data.data[0]); 
		})
		.catch((error) => {
		  console.error('Error fetching menu:', error);
		});
	};
	const getTabContent = () => {
	  api
		.get('/content/getLakshmiMissionTab')
		.then((res) => {
		  setContentTab(res.data.data); 
		})
		.catch((error) => {
		  console.error('Error fetching menu:', error);
		});
	};
	const formatTextWithLineBreaks = (input) => {
		let tempDiv = document.createElement("div");
		tempDiv.innerHTML = input;
		const textContent = tempDiv.textContent || tempDiv.innerText || "";
		return textContent.replace(/\n/g, "<br />");
	  };
	useEffect(() => {
	  getContent();
	  getTabContent();
	  }, []);
  return (
    <>
    <section className="section-area section-sp1">
						<div className="container">
							<div className="row">
              <div className="heading-bx text-center">
                <h6 className="title-ext text-secondary">
                  Lakshmi Mission Hospital
                </h6>
                <h2 className="title m-b0">{content&&content.title}</h2>
                <div className="col-lg-12" >
									<div className="media-outline">
										<div className="media-shape">
											<img src={`https://homeservices.unitdtechnologies.com/storage/uploads/${content&&content.file_name}`} alt="" />
										</div>
									
									</div>
								</div>
                </div>
				{Array.isArray(contentTab) && contentTab.map((item, index) => (
								<div key={index} className="col-lg-4 col-md-6 mb-30">
									<div className="feature-container feature-bx2 feature1">
										<div className="feature-box-xl mb-20">
											<span className="icon-cell">
											
											<img src={`https://homeservices.unitdtechnologies.com/storage/uploads/${item&&item.file_name}`} alt="" />
											</span> 
										</div>
										<div className="icon-content">
											<h3 className="ttr-title">{item.title}</h3>
											<p>
											<div dangerouslySetInnerHTML={{ __html: item.description ? formatTextWithLineBreaks(item.description) : '' }} />
											</p>
										</div>
									</div>
								</div>
								))}
							
                </div>
                </div>
                </section>
    </>
  );
};

export default TestimonialSection;
