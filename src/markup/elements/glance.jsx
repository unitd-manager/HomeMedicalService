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


  return (
    <section className="section-sp1 about-area">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Column */}
          <div className="col-lg-6 mb-30">
          <div className="heading-bx">
  <h6 className="title-ext text-secondary">About Us</h6>
  <h2 className="title">{content.title}</h2>
  {/* Remove HTML tags and then format the cleaned text as a list */}
  {content.description && formatTextAsList(removeHtmlTags(content.description))}
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
