import React, { useEffect, useState } from "react";
import api from "../../constants/api";

const Features = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [content, setContent] = useState(null); // Initialize as null

  const getContent = () => {
    api
      .get('/content/getOurStory')
      .then((res) => {
        console.log(res.data); // Log to check the response structure
        setContent(res.data.data[0]); 
      })
      .catch((error) => {
        console.error('Error fetching menu:', error);
      });
  };

  useEffect(() => {
    getContent();
  }, []);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  // Function to strip HTML tags from a string
  const stripHTMLTags = (input) => {
    return input ? input.replace(/<[^>]*>/g, "") : ""; // Regular expression to match HTML tags
  };

  // Check if content is defined before accessing its properties
  const fullContent = content ? stripHTMLTags(content.description) : ""; // Strip HTML tags
  const shortContent = fullContent.length > 300 ? fullContent.slice(0, 300) + '...' : fullContent; // Handle short content correctly

  return (
    <>
      <section className="section-sp1 about-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-30">
              <div className="heading-bx">
                <h6 className="title-ext text-secondary">About Us</h6>
                <h2 className="title">{content ? content.title : ""}</h2> {/* Check if content is defined */}
                <p>{isExpanded ? fullContent : shortContent}</p>
              </div>

              <button className="btn" onClick={toggleReadMore}>
                {isExpanded ? 'Show Less' : 'Read More'}
              </button>
            </div>
            <div className="col-lg-6 mb-30">
              <div className="about-thumb-area">
                {/* Assuming you have a file_name in your content object */}
                {content && content.file_name && (
                  <img src={`https://homeservices.unitdtechnologies.com/storage/uploads/${content.file_name}`} alt="story" style={{ width: "500px", height: 'auto' }} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
