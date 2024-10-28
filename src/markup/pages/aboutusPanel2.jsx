import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import testShape from "../../images/testimonials/shape.png";
import testPic1 from "../../images/testimonials/pic1.jpg";
import testPic2 from "../../images/testimonials/pic2.jpg";
import testPic3 from "../../images/testimonials/pic3.jpg";
import testPic4 from "../../images/testimonials/pic4.jpg";
import testPic5 from "../../images/testimonials/pic5.jpg";
import testPic6 from "../../images/testimonials/pic6.jpg";
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

  const formatTextWithLineBreaks = (input) => {
    let tempDiv = document.createElement("div");
    tempDiv.innerHTML = input;
    const textContent = tempDiv.textContent || tempDiv.innerText || "";
    return textContent.replace(/\n/g, "<br />");
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
                <img className="bg-img" src={testShape} alt="" />
                <ul>
                  <li data-member="1">
                    <Link to="#">
                      <img src={testPic1} alt="" />
                    </Link>
                  </li>
                  <li data-member="2">
                    <Link to="#">
                      <img src={testPic2} alt="" />
                    </Link>
                  </li>
                  <li data-member="3">
                    <Link to="#">
                      <img src={testPic3} alt="" />
                    </Link>
                  </li>
                  <li data-member="4">
                    <Link to="#">
                      <img src={testPic4} alt="" />
                    </Link>
                  </li>
                  <li data-member="5">
                    <Link to="#">
                      <img src={testPic5} alt="" />
                    </Link>
                  </li>
                  <li data-member="6">
                    <Link to="#">
                      <img src={testPic6} alt="" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="slider-item">
                <div className="testimonial-bx">
                  <div className="testimonial-content">
                    <p>
                    <div dangerouslySetInnerHTML={{ __html: caregiver.description ? formatTextWithLineBreaks(caregiver.description) : '' }} />
                    </p>
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
