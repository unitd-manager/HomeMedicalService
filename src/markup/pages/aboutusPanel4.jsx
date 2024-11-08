import React, { useEffect, useState } from "react";
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

  // Format the description as a list
  const formatTextAsList = (input) => {
    if (!input) return "";
    // Split the input by line breaks
    const lines = input.split("\n");
    // Wrap each line in <li> tags and join them
    const listItems = lines.map((line) => `<li>${line.trim()}</li>`).join("");
    // Return the complete list wrapped in <ul>
    return `<ul>${listItems}</ul>`;
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
          <div className="row">
            <div className="heading-bx text-center">
              <h6 className="title-ext text-secondary">
                Lakshmi Mission Hospital
              </h6>
              <h2 className="title m-b0">{content && content.title}</h2>
              <div className="col-lg-12">
                <div className="media-outline">
                  <div className="media-shape">
                    <img
                      src={`https://homeservices.unitdtechnologies.com/storage/uploads/${content && content.file_name}`}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            {Array.isArray(contentTab) &&
              contentTab.map((item, index) => (
                <div key={index} className="col-lg-4 col-md-6 mb-30">
                  <div className="features-container features-bx2">
                    <div className="features-box-md mb-20">
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
                    </div>
                    <div className="icons-content">
                      <h3 className="ttr-title">{item.title}</h3>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.description
                            ? formatTextAsList(item.description)
                            : "",
                        }}
                      />
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
