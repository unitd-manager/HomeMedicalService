import React, { useEffect, useState } from "react";
// import Slider from "react-slick";
import plusOrange from "../../images/shap/plus-orange.png";
import squareBlue from "../../images/shap/square-blue.png";
import circleDots from "../../images/shap/circle-dots.png";
import circleOrange2 from "../../images/shap/circle-orange-2.png";
import api from "../../constants/api";

const TestimonialSection = () => {

	const [content, setContent] = useState([]);
  
	const getContent = () => {
	  api
		.get('/content/getQuotes')
		.then((res) => {
		  setContent(res.data.data[0]); 
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
	  }, []);
  return (
    <>
      <section className="section-area section-sp3 testimonial-wraper" style={{paddingBottom:'100px'}}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
            <div className="slider-item">
										<div className="testimonial-bx">
											<div className="testimonial-content">
												<p style={{fontSize:"22px"}}><div dangerouslySetInnerHTML={{ __html: content.description ? formatTextWithLineBreaks(content.description) : '' }} />
                        </p>
											</div>
									
											<div className="quote-icon">
												<i className="fas fa-quote-left"></i>
											</div>
										</div>
									</div>
             
            </div>
          </div>
        </div>
        <img className="pt-img1 animate1" src={plusOrange} alt="" />
        <img className="pt-img2 animate2" src={squareBlue} alt="" />
        <img className="pt-img3 animate3" src={circleDots} alt="" />
        <img className="pt-img4 animate4" src={circleOrange2} alt="" />
      </section>
    </>
  );
};

export default TestimonialSection;
