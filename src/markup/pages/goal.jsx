import React, { useState, useEffect } from "react";

// Import Images
import testPic2 from "../../images/testimonials/pic2.jpg";
import api from "../../constants/api";

const Choose = () => {
  const [content, setContent] = useState([]); // Initialize content as null

  // Fetch content from API
  const getContent = () => {
    api
      .get("/content/Goals")
      .then((res) => {
        console.log(res.data); // Log to check the response structure
        if (res.data && res.data.data && res.data.data.length > 0) {
          setContent(res.data.data[0]); // Set the first item from the data
        }
      })
      .catch((error) => {
        console.error("Error fetching content:", error);
      });
  };

  const formatTextAsList = (input) => {
    if (!input) return "";
    const lines = input.split("\n").filter((line) => line.trim() !== "");
    const listItems = lines.map((line, index) => `<li key=${index}>${line.trim()}</li>`).join("");
    return `<ul>${listItems}</ul>`;
  };

  useEffect(() => {
    getContent();
  }, []);

  return (
    <>
      <section className="section-sp1 about-area">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Column */}
          <div className="col-lg-6 mb-30">
            <div className="heading-bx">
              {/* <h6 className="title-ext text-secondary">About Us</h6> */}
              <h2 className="title">{content.title}</h2>
              {/* Render the formatted description */}
              <div
                        dangerouslySetInnerHTML={{
                          __html: content.description
                            ? formatTextAsList(content.description)
                            : "",
                        }}
                      />
              {/* Read More/Less Button */}
           
            </div>
          </div>

          {/* Right Column */}
          <div className="col-lg-6 mb-30">
            <div >
              {/* Render Image */}
          
                <img
                  src={`https://homeservices.unitdtechnologies.com/storage/uploads/${content.file_name}`}
                  alt="Content Illustration"
                />
            
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Choose;
