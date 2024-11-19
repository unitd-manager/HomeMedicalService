import React, { useState, useEffect } from "react";

// Import Images
import testPic2 from "../../images/testimonials/pic2.jpg";
import api from "../../constants/api";

const Choose = () => {
  const [content, setContent] = useState([]); // Initialize content as null

  // Fetch content from API
  const getContent = () => {
    api
      .get("/content/WhyChooseUs")
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
    <li key={index} style={{ fontFamily: "montserrat",fontSize: "16px", color: "blue", textAlign: "left", marginBottom: "8px" , listStyleType: "disc"}}>
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
      <div className="author-box blog-user mb-50">
	  <div
          className="author-profile"
          style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
        >
		<div className="col-lg-6 mb-30" style={{ marginBottom: "30px" }}>
		<img
                  src={`https://homeservices.unitdtechnologies.com/storage/uploads/${content.file_name}`}
              alt="Author"
              style={{
                display: "block",
                margin: "0 auto",
                width: "300px",
                height: "auto",
              }}
            />
			</div>
      <div className="col-lg-6 mb-30">
      <div className="heading-bx">
           
              <>
                <h5>{content.title}</h5>
                {content.description && formatTextAsList(removeHtmlTags(content.description))}
              </>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Choose;
