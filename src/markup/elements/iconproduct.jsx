import React, { useEffect, useState } from "react";
import api from "../../constants/api";


const TestimonialSection = () => {
  const [content, setContent] = useState([]);

  // Fetch the main content
  const getContent = () => {
    api
      .get('/product/getProductsIcon')
      .then((res) => {
        setContent(res.data.data[0]);
      })
      .catch((error) => {
        console.error('Error fetching menu:', error);
      });
  };

  
 

  // Load content on component mount
  useEffect(() => {
    getContent();
  }, []);

  return (
    <>
      <section className="section-area section-sp1">
        <div className="container">
          <div className="row">
            <div className="heading-bx text-center">
            
              <h2 className="title m-b0">{content && content.title}</h2>
              <div className="col-lg-12">
                <div className="media-outline" style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                  <div className="about-thumb1">
                    <img
                      src={`https://homeservices.unitdtechnologies.com/storage/uploads/${content && content.file_name}`}
                      alt=""
                    />
                  </div>
                
                  </div>
                </div>
              </div>
            </div>
        
        
        </div>
      </section>
    </>
  );
};

export default TestimonialSection;
