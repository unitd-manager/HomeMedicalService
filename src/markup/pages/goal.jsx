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

 	// Function to remove HTML tags and decode entities like &nbsp;
const removeHtmlTags = (text) => {
	// Remove HTML tags
	const decodedText = text ? text.replace(/&nbsp;/g, " ") : "";
	const cleanText = decodedText ? decodedText.replace(/<\/?[^>]+(>|$)/g, "") : "";
	return cleanText;
  };
  
  // Function to format the cleaned text as a list
  const formatTextAsList = (input) => {
	if (!input) return null;
	
	const lines = input.split("\n").filter((line) => line.trim() !== "");
  
	const listItems = lines.map((line, index) => (
	  <li key={index} style={{ fontFamily: "montserrat", fontSize: "16px", color: "blue", marginBottom: "8px" , listStyleType: "disc"}}>
		{line.trim()}
	  </li>
	));
  
	return <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>{listItems}</ul>;
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
              {content.description && formatTextAsList(removeHtmlTags(content.description))}

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
