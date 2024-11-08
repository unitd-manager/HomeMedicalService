import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Slider from "react-slick";
import api from '../../constants/api';

// Import Images
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

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  
  useEffect(() => {
    // Fetch testimonials from API
    api.get("/content/testimonials")
      .then(response => {
        if (response.data.msg === "Success") {
          setTestimonials(response.data.data);
        }
      })
      .catch(error => console.error("Error fetching testimonials:", error));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
<>
      <section className="section-area section-sp3 testimonial-wraper">
        <div className="container">
          <div className="heading-bx text-center">
            {/* <h6 className="title-ext text-secondary">Testimonials</h6> */}
            <h2 className="title m-b0">
             Testimonials
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
              {/* <div className="slider-item">
                <div className="testimonial-bx">
                  <div className="testimonial-content">
                    <p>
                      ✓ Available for 5, 10 & 24 Hours <br/>
					  ✓ Exceptional Quality of Care  <br/>
					  ✓ Dedicated Care Manager <br/>
					  ✓ Best Fit Profiles as per your Need <br/>
                    </p>
                  </div>
                </div>
              </div> */}
              <Slider {...settings} className="testimonial-slide">
          {testimonials.map((testimonial) => (
            <div key={testimonial.content_id} className="slider-item">
              <div className="testimonial-bx">
                <div className="testimonial-content">
                  <p>{testimonial.description}</p>
                </div>
                <div className="client-info">
                  <h5 className="name">{testimonial.title}</h5>
                  <p>Patient</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
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
