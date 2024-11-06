import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../constants/api";
import { Accordion } from "react-bootstrap";

// Import Images
import bnrImg1 from "../../images/banner/img1.jpg";
import waveBlue from "../../images/shap/wave-blue.png";
import circleDots from "../../images/shap/circle-dots.png";
import plusBlue from "../../images/shap/plus-blue.png";

// Import Sections
import FeatureSection3 from "../elements/feature-section3";
import TeamSection from "../elements/team";
import LatestNewsSection from "../elements/latest-news-slider";
import Shop from "../elements/shop";

export default function ServiceDetail() {
  const [service, setService] = useState({});
  // const [popularTitle, setPopularTitle] = useState({});
  const [popular, setPopular] = useState([]);

  // Function to get service details
  const getService = () => {
    api
      .get("/section/getService11")
      .then((res) => {
        setService(res.data.data[0] || {});
      })
      .catch(() => {});
  };

  useEffect(() => {
    getService();
  }, []);

  // Function to get popular items
  const getPopular = () => {
    api
      .get("/section/getPopular")
      .then((res) => {
        setPopular(res.data.data || []);
      })
      .catch(() => {});
  };

  useEffect(() => {
    getPopular();
  }, []);

  // // Function to get popular title
  // const getPopularTitle = () => {
  //   api
  //     .get("/section/getPopular11")
  //     .then((res) => {
  //       setPopularTitle(res.data.data[0] || {});
  //     })
  //     .catch(() => {});
  // };

  // useEffect(() => {
  //   getPopularTitle();
  // }, []);

  // Function to remove HTML tags
  const removeHtmlTags = (text) => {
    return text ? text.replace(/<\/?[^>]+(>|$)/g, "") : "";
  };

  return (
    <div className="page-content bg-white">
      <div className="banner-wraper">
        <div className="page-banner" style={{ backgroundImage: `url(${bnrImg1})` }}>
          <div className="container">
            <div className="page-banner-entry text-center">
              <h1>Service Details</h1>
              <nav aria-label="breadcrumb" className="breadcrumb-row">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-home"
                      >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Service
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <img className="pt-img1 animate-wave" src={waveBlue} alt="" />
          <img className="pt-img2 animate2" src={circleDots} alt="" />
          <img className="pt-img3 animate-rotate" src={plusBlue} alt="" />
        </div>
      </div>

      <section className="section-area section-sp1">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mb-30">
              <div className="ttr-media mb-30">
                <img
                  src={`https://homeservices.unitdtechnologies.com/storage/uploads/${service.file_name}`}
                  alt=""
                  className="rounded"
                />
              </div>
              <div className="clearfix">
                <div className="head-text mb-30">
                  <h2 className="title mb-15">{service.title}</h2>
                  <p className="mb-0">{removeHtmlTags(service.description )}</p>
                </div>
              </div>
              <div className="clearfix">
                {/* <div className="head-text mb-30">
                  <h4 className="title mb-10">{popularTitle.title || ""}</h4>
                  <p className="mb-0">{removeHtmlTags(popularTitle.description || "")}</p>
                </div> */}
                <Accordion defaultActiveKey="0" className="accordion ttr-accordion1">
                  {popular.map((item, index) => (
                    <Accordion.Item eventKey={item.content_id} key={index}>
                      <Accordion.Header>{item.title}</Accordion.Header>
                      <Accordion.Body>
                        <p className="mb-0">{removeHtmlTags(item.description || "")}</p>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>
     <Shop/>
      <FeatureSection3 />
      <TeamSection />
      <LatestNewsSection />
    </div>
  );
}
