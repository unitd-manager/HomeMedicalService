import React, { useEffect, useState } from "react";
import api from "../../constants/api";

const Glance = () => {
  const [content, setContent] = useState([]); // Initialize as null

  // Fetch content from API
  const getContent = () => {
    api
      .get('/content/Glance')
      .then((res) => {
        console.log(res.data); // Log to check the response structure
   
          setContent(res.data.data[0]); // Ensure data[0] exists
        
      })
      .catch((error) => {
        console.error('Error fetching content:', error);
      });
  };

  useEffect(() => {
    getContent();
  }, []);

 

  // Function to format the description as a list
  const formatTextAsList = (input) => {
    if (!input) return "";
    const lines = input.split("\n").filter((line) => line.trim() !== "");
    const listItems = lines.map((line, index) => `<li key=${index}>${line.trim()}</li>`).join("");
    return `<ul>${listItems}</ul>`;
  };

  return (
    <section className="section-sp1 about-area">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Column */}
          <div className="col-lg-6 mb-30">
            <div className="heading-bx">
              <h6 className="title-ext text-secondary">About Us</h6>
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
  );
};

export default Glance;
