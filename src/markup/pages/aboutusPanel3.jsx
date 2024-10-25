import React, { useEffect, useState } from "react";
import api from "../../constants/api";

const Features = () => {
  const [content, setContent] = useState([]);
  const [contentTab, setContentTab] = useState([]);

  const getContent = () => {
    api
      .get('/content/getWhyLakshmiMission')
      .then((res) => {
        setContent(res.data.data[0]); 
      })
      .catch((error) => {
        console.error('Error fetching menu:', error);
      });
  };
  const getTabContent = () => {
    api
      .get('/content/getWhyLakshmiMissionTab')
      .then((res) => {
        setContentTab(res.data.data); 
      })
      .catch((error) => {
        console.error('Error fetching menu:', error);
      });
  };
  const stripHtmlTags = (input) => {
    let tempDiv = document.createElement("div");
    tempDiv.innerHTML = input;
    return tempDiv.textContent || tempDiv.innerText || "";
  };
  useEffect(() => {
    getContent();
    getTabContent();
    }, []);
    return (
      <>
        <section className="section-sp1 service-wraper2">
          <div className="container">
            <div className="row">
              <div className="heading-bx text-center">
                <h6 className="title-ext text-secondary">
                  Lakshmi Mission Hospital
                </h6>
                <h2 className="title m-b0">{content && content.title}
                </h2>
                <p>
                <p>{content.description ? stripHtmlTags(content.description) : ''}</p>

                </p>
              </div>
              {Array.isArray(contentTab) && contentTab.map((item, index) => (
  <div key={index} className="col-xl-3 col-sm-6 mb-30">
    <div className="feature-container feature-bx3">
      <img
        src={`https://homeservices.unitdtechnologies.com/storage/uploads/${item.file_name}`}
        alt="care"
        style={{ width: '100px', height: 'auto', margin: '25px' }}
      />
      <h5 className="ttr-title">{item.title}</h5>
   
      <p>{item.description ? stripHtmlTags(item.description) : ''}</p>

    </div>
  </div>
))}
            </div>
          </div>
        </section>
      </>
    );
  }

export default Features;
