import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../constants/api';

// Import Images
import bnrImg1 from "../../images/banner/img1.jpg";
import waveBlue from "../../images/shap/wave-blue.png";
import circleDots from "../../images/shap/circle-dots.png";
import plusBlue from "../../images/shap/plus-blue.png";
import blogDefaultPic1 from "../../images/blog/default/pic1.jpg";
import testPic3 from "../../images/testimonials/pic3.jpg";

const BlogDetails = () => {
  const [blogs, setBlogs] = useState([]);
  const { id } = useParams();
  // const data = location.state?.data;
  const striptHTMLTags = (input) => {
    return input ? input.replace(/<[^>]*>/g, "") : ""; // Regular expression to match HTML tags
  };
  // Function to fetch blog details
  const getBlogs = useCallback(() => {
    api.post("/blog/getBlogTitle", { blog_id: id })
      .then((res) => {
        console.log("res.data:", res.data); // Log the data part of the response
        if (res.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
          setBlogs(res.data.data);
        } else {
          console.warn("No blog data found for this title or incorrect structure.");
        }
      })
      .catch((error) => {
        console.error("Error fetching blog details:", error);
      });
  }, [id]);
  useEffect(() => {
    getBlogs();
  }, [id]);

  return (
    <div className="page-content bg-white">
      <div className="banner-wraper">
        <div className="page-banner" style={{ backgroundImage: `url(${bnrImg1})` }}>
          <div className="container">
            <div className="page-banner-entry text-center">
              <h1>Blog</h1>
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
                      </svg> Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">Blog Details</li>
                </ul>
              </nav>
            </div>
          </div>
          <img className="pt-img1 animate-wave" src={waveBlue} alt="" />
          <img className="pt-img2 animate2" src={circleDots} alt="" />
          <img className="pt-img3 animate-rotate" src={plusBlue} alt="" />
        </div>
      </div>

      <section className="section-area section-sp1 bg-white">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-7 col-xl-8 mb-30 mb-md-50">
              <div className="blog-card blog-single">
                <div className="post-media">
                  <img src={blogDefaultPic1} alt="Blog Default" />
                </div>
                <div className="info-bx">
                  <ul className="post-meta">
                    <li className="author">
                      <Link to="/blog-details">
                        <img src={testPic3} alt="Author" /> Sonar Moyna
                      </Link>
                    </li>
                    <li className="date"><i className="far fa-calendar-alt"></i> 19 July 2021</li>
                  </ul>
                  {blogs.length > 0 ? (
  blogs.map((blog, index) => (
    <div key={index}>
      <div className="ttr-post-title">
        <h2 className="post-title">{blog.title}</h2>
      </div>
      <div className="ttr-post-text">
        <p>{blog.description ? striptHTMLTags(blog.description) : ''}</p>

      </div>
    </div>
  ))
) : (
  <p>No blog details available for this title.</p>
)}
                  <div className="ttr-post-footer">
                    <div className="share-post ml-auto">
                      <ul className="social-media mb-0">
                        <li><strong>Share:</strong></li>
                        <li><a rel="noreferrer" target="_blank" href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a></li>
                        <li><a rel="noreferrer" target="_blank" href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a></li>
                        <li><a rel="noreferrer" target="_blank" href="https://www.linkedin.com/"><i className="fab fa-linkedin-in"></i></a></li>
                        <li><a rel="noreferrer" target="_blank" href="https://twitter.com/"><i className="fab fa-twitter"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetails;
