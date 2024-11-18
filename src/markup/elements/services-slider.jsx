import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import api from "../../constants/api";

// Import Images
import lineCircleBlue from "../../images/shap/line-circle-blue.png";
import squareDotsOrange from "../../images/shap/square-dots-orange.png";
import waveBlue from "../../images/shap/wave-blue.png";
import squareRotate from "../../images/shap/square-rotate.png";

const News = () => {
  const [services, setServices] = useState([]);
  const [News, setNews] = useState([]);
  const [CategoryOne, setCategoryOne] = useState([]);
  const [CategoryTwo, setCategoryTwo] = useState([]);

  useEffect(() => {
    getNews();
    getCategoryOne();
    getCategoryTwo();
    getServices();
  }, []);

  const getServices = () => {
    api.get('/section/getService12')
      .then((res) => setServices(res.data.data))
      .catch(() => {});
  };

  const getNews = () => {
    api.get('/section/getServiceNurse')
      .then((res) => setNews(res.data.data))
      .catch(() => {});
  };

  const getCategoryOne = () => {
    api.get('/section/getServiceNurseHome')
      .then((res) => setCategoryOne(res.data.data))
      .catch(() => {});
  };

  const getCategoryTwo = () => {
    api.get('/section/getServiceHmeService')
      .then((res) => setCategoryTwo(res.data.data))
      .catch(() => {});
  };

  const stripHtmlTags = (input) => {
    let tempDiv = document.createElement("div");
    tempDiv.innerHTML = input;
    return tempDiv.textContent || tempDiv.innerText || "";
  };
  const formatTextAsList = (input) => {
    if (!input) return "";
    const lines = input.split("\n");
    return `<ul>${lines.map((line) => `<li>${line.trim()}</li>`).join("")}</ul>`;
  };
  
  // Truncate the list and show only the first maxLines
  const truncateList = (htmlText, maxLines) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlText;
  
    const listItems = tempDiv.querySelectorAll("li");
    const truncatedList = Array.from(listItems).slice(0, maxLines).map(item => item.outerHTML).join("");
  
    // If the list has more items than maxLines, add an ellipsis
    if (listItems.length > maxLines) {
      return `<ul>${truncatedList}<li>...</li></ul>`;
    }
  
    return `<ul>${truncatedList}</ul>`;
  };
  
  // Combined function to format and truncate text
  const processDescription = (description, maxLines) => {
    const formattedText = formatTextAsList(description); // Format as list
    return truncateList(formattedText, maxLines); // Truncate the list
  };

  // Custom arrow components
  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        onClick={onClick}
        style={{
          ...style,
          display: "block",
          right: "-10px",
          fontSize: "30px",
          color: "red",
          cursor: "pointer",
        }}
      >
        ➔
      </div>
    );
  };

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        onClick={onClick}
        style={{
          ...style,
          display: "block",
          left: "-10px",
          fontSize: "30px",
          color: "red",
          cursor: "pointer",
        }}
      >
        ➔
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 591,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <>
      <section className="section-area section-sp1 service-wraper">
        <div className="row align-items-center">
          {services.map((data, index) => (
            <div className="col-xl-4 col-lg-7 mb-30" key={index}>	
              <div className="heading-bx">
                <h2 className="title">{data.title}</h2>
                <p>{data.description ? stripHtmlTags(data.description) : ''}</p>
              </div>
              <Link to="/services" className="btn btn-secondary btn-lg shadow">All Services</Link>
            </div>
          ))}

          <div className="col-xl-8 mb-15">	
            <Slider {...settings} className="service-slide slick-arrow-none">
              {News.map((data, index) => (
                <div className="slider-item" key={index}>
                  <div className="feature-container feature-bx2 feature1">
                    <div className="icon-content">
                    <div className="truncate-text">
  {data.product_description ? (
    <span
      dangerouslySetInnerHTML={{
        __html: processDescription(data.product_description, 1), // Adjust maxLines to show only the first point
      }}
    />
  ) : null}
</div>
                      <Link to="/service-detail" className="btn btn-primary light">View More</Link>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>

            <Slider {...settings} className="service-slide slick-arrow-none">
              {CategoryOne.map((data, index) => (
                <div className="slider-item" key={index}>
                  <div className="feature-container feature-bx2 feature1">
                    <div className="icon-content">
                    <div className="truncate-text">
  {data.product_description ? (
    <span
      dangerouslySetInnerHTML={{
        __html: processDescription(data.product_description, 1), // Adjust maxLines to show only the first point
      }}
    />
  ) : null}
</div>
                      <Link to="/service-detail1" className="btn btn-primary light">View More</Link>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>

            <Slider {...settings} className="service-slide slick-arrow-none">
              {CategoryTwo.map((data, index) => (
                <div className="slider-item" key={index}>
                  <div className="feature-container feature-bx2 feature1">
                    <div className="icon-content">
                    <div className="truncate-text">
  {data.product_description ? (
    <span
      dangerouslySetInnerHTML={{
        __html: processDescription(data.product_description, 1), // Adjust maxLines to show only the first point
      }}
    />
  ) : null}
</div>
                      <Link to="/service-detail2" className="btn btn-primary light">View More</Link>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>	 
        </div>
        <img className="pt-img1 animate-rotate" src={lineCircleBlue} alt=""/>
        <img className="pt-img2 animate2" src={squareDotsOrange} alt=""/>
        <img className="pt-img3 animate-wave" src={waveBlue} alt=""/>
        <img className="pt-img4 animate1" src={squareRotate} alt=""/>
      </section>
    </>
  );
};

export default News;
