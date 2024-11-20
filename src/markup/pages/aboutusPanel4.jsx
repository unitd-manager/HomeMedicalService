import React, { useEffect, useState } from "react";
import testPic1 from "../../images/about/lakshimi mission hospital (1).png";
import api from "../../constants/api";

const TestimonialSection = () => {
  const [content, setContent] = useState([]);
  const [contentTab, setContentTab] = useState([]);

  // Fetch the main content
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

  // Fetch the tab content
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

  // Function to remove HTML tags and decode entities like &nbsp;
  const removeHtmlTags = (text) => {
    const decodedText = text ? text.replace(/&nbsp;/g, " ") : "";
    const cleanText = decodedText ? decodedText.replace(/<\/?[^>]+(>|$)/g, "") : "";
    return cleanText;
  };

  // Function to format the cleaned text as a list
  const formatTextAsList = (input) => {
    if (!input) return null;
    
    const lines = input.split("\n").filter((line) => line.trim() !== "");

    const listItems = lines.map((line, index) => (
      <li key={index} style={{ fontFamily: "montserrat", fontSize: "16px", color: "blue", marginBottom: "8px" , listStyleType: "disc" }}>
        {line.trim()}
      </li>
    ));

    return <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>{listItems}</ul>;
  };

  // Load content on component mount
  useEffect(() => {
    getContent();
    getTabContent();
  }, []);

  return (
    <>
      <section className="section-area section-sp1">
        <div className="container">
          <div className="row" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="heading-bx text-center">
  <h6 className="title-ext text-secondary">
    Lakshmi Mission Hospital
  </h6>
  <h2 className="title m-b0">{content && content.title}</h2>
  <div className="col-lg-12">
    <div
      className="media-outline"
      style={{
        display: 'flex',
        gap: '20px',
        justifyContent: 'center',
        flexWrap: 'wrap', // Allows wrapping in smaller screens
      }}
    >
      <div className="about-thumb1">
        <img
          src={`https://homeservices.unitdtechnologies.com/storage/uploads/${content && content.file_name}`}
          alt=""
          style={{
            width: '500px',
            height: '450px',
            maxWidth: '100%',
            marginBottom: '20px', // Adds space between stacked images
          }}
        />
      </div>
      <div className="about-thumb1">
        <img
          src={testPic1}
          alt=""
          style={{
            width: '500px',
            height: '450px',
            maxWidth: '100%',
          }}
        />
      </div>
    </div>
  </div>
</div>


            {/* Ensure equal height containers */}
            {Array.isArray(contentTab) &&
              contentTab.map((item, index) => (
                <div key={index} className="col-lg-4 col-sm-6 mb-30">
                  <div className="feature-container feature-bx4" style={{
                   
                    height: "700px",
                 
                  }}>
                    <span className="icon-cell">
                      <img
                        src={`https://homeservices.unitdtechnologies.com/storage/uploads/${item && item.file_name}`}
                        alt="care"
                        style={{
                          width: '100px',
                          height: '100px',
                          margin: '10px',
                        }}
                      />
                    </span>
                    <div className="icons-content">
                      <h3 className="ttr-title">{item.title}</h3>
                      {item.description && formatTextAsList(removeHtmlTags(item.description))}
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
