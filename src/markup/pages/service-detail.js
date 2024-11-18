import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../constants/api";

// Import Images
import bnrImg1 from "../../images/banner/img1.jpg";
import waveBlue from "../../images/shap/wave-blue.png";
import circleDots from "../../images/shap/circle-dots.png";
import plusBlue from "../../images/shap/plus-blue.png";

export default function News() {
  const [News, setNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getNews();
  }, []);

  const getNews = () => {
    api
      .get("/section/getServiceNurse")
      .then((res) => {
        setNews(res.data.data);
      })
      .catch((err) => {
        console.error("Failed to fetch news", err);
      });
  };

  // Format the description as a list
  const formatTextAsList = (input) => {
    if (!input) return "";
    const lines = input.split("\n");
    return `<ul>${lines.map((line) => `<li>${line.trim()}</li>`).join("")}</ul>`;
  };

  return (
    <>
      <div className="page-content bg-white">
        {/* Page Banner */}
        <div className="banner-wraper">
          <div className="page-banner" style={{ backgroundImage: `url(${bnrImg1})` }}>
            <div className="container">
              <div className="page-banner-entry text-center">
                <h1>Services</h1>
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
                        </svg>{" "}
                        Home
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Services
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

        {/* Services Section */}
        <section className="section-area section-sp1">
          <div className="container">
            <h2>{News.length > 0 ? News[0].category_title : "Category One"}</h2>

            {/* Book Service Button */}
            <div className="text-center mt-5 mb-5">
			<button
    className="btn btn-primary btn-lg"
    style={{
      width: "250px",
      padding: "15px 30px",
      fontSize: "20px",
      fontWeight: "bold",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    }}
    onClick={() => navigate("/services")}
  >
    Book Service
  </button>
            </div>

            {/* Service Cards */}
            <div className="row">
              {News.length > 0 ? (
                News.map((data, index) => (
                  <div key={data.id || index} className="col-lg-4 col-md-6 mb-30">
                    <div className="feature-container feature-bx4">
                      <div className="icon-content">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: data.product_description ? formatTextAsList(data.product_description) : "",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center">
                  <p>No services available at the moment.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
