import React, { useEffect, useState } from "react";
import api from "../../constants/api";

const Features = () => {
  const [contentTab, setContentTab] = useState([]);

  const getTabContent = () => {
    api
      .get('/content/TwoFac')
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
    getTabContent();
  }, []);

  return (
    <>
      <section className="section-sp1 service-wraper2">
        {/* Increased width by using custom class or style */}
        <div className="container-fluid">  {/* Use container-fluid to stretch the width */}
          <div className="row">
            <div className="heading-bx text-center">
              <h3>VISION & MISSION</h3>
            </div>
            <div className="col-12">
              {/* Flexbox for centering with wider tabs */}
              <div className="row d-flex justify-content-center">
                {Array.isArray(contentTab) && contentTab.map((item, index) => (
                  <div key={index} className="col-xl-4 col-lg-6 col-md-6 mb-30 d-flex justify-content-center">
                    <div className="feature-container feature-bx3 ">
                      <h5 className="ttr-title">{item.title}</h5>
                      <p className="text-wrap text-break">
  {item.description ? stripHtmlTags(item.description) : ''}
</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
