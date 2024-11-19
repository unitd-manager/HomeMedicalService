import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import testShape from "../../images/testimonials/old couple.png";
// import testPic1 from "../../images/testimonials/pic1.jpg";
// import testPic2 from "../../images/testimonials/pic2.jpg";
// import testPic3 from "../../images/testimonials/pic3.jpg";
// import testPic4 from "../../images/testimonials/pic4.jpg";
// import testPic5 from "../../images/testimonials/pic5.jpg";
// import testPic6 from "../../images/testimonials/pic6.jpg";
import plusOrange from "../../images/shap/plus-orange.png";
import squareBlue from "../../images/shap/square-blue.png";
import circleDots from "../../images/shap/circle-dots.png";
import circleOrange2 from "../../images/shap/circle-orange-2.png";
import api from "../../constants/api";

const TestimonialSection = () => {
  const [caregiver, setCaregiver] = useState([]);

  const getMenu = () => {
    api
      .get('/content/getAboutCaregivers')
      .then((res) => {
        setCaregiver(res.data.data[0]); 
      })
      .catch((error) => {
        console.error('Error fetching menu:', error);
      });
  };

 // Function to remove HTML tags and decode entities like &nbsp;
const removeHtmlTags = (text) => {
  // Remove HTML tags
  const decodedText = text ? text.replace(/&nbsp;/g, " ") : "";
  const cleanText = decodedText ? decodedText.replace(/<\/?[^>]+(>|$)/g, "") : "";
  return cleanText;
};

// Function to format the cleaned text as a list
const formatTextAsList = (input) => {
  if (!input) return null;
  
  const lines = input.split("\n").filter((line) => line.trim() !== "");

  const listItems = lines.map((line, index) => (
    <li key={index} style={{ fontFamily: "montserrat", fontSize: "16px", color: "blue", marginBottom: "8px" , listStyleType: "disc"}}>
      {line.trim()}
    </li>
  ));

  return <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>{listItems}</ul>;
};



  useEffect(() => {
    getMenu();
  }, []);

  return (
    <>
      <section className="section-area section-sp3 testimonial-wraper">
        <div className="container">
          <div className="heading-bx text-center">
            <h6 className="title-ext text-secondary">Care Givers</h6>
            <h2 className="title m-b0">
            {caregiver && caregiver.title}
            </h2>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-6 text-center">
              <div className="thumb-wraper">
                <img className="bg-img" src={testShape} alt="" 
             />
           
              </div>
            </div>
            <div className="col-lg-6">
              <div className="slider-item">
                <div className="testimonial-bx">
                  <div className="testimonial-content">
                  {caregiver.description && formatTextAsList(removeHtmlTags(caregiver.description))}
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
