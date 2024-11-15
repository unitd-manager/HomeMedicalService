import React, { useEffect, useState } from 'react';
import aboutThumb1 from '../../images/about/doc1.jpg';
import aboutThumb2 from '../../images/about/doc2.jpg';
import aboutThumb3 from '../../images/about/doc3.jpg';
import api from '../../constants/api';

const AboutSection = () => {
  const [story, setStory] = useState([]);

  const getMenu = () => {
    api
      .get('/content/getStory')
      .then((res) => {
        setStory(res.data.data[0]); 
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
    getMenu();
  }, []);

  return (
    <>
      <section className="section-sp1 about-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-30">
              <div className="about-thumb-area">
                <ul>
                <li><img className="about-thumb1" src={aboutThumb1} alt="" style={{ width: '250px', height: '300px' }}/></li>
										<li><img className="about-thumb2" src={aboutThumb2} alt="" style={{ width: '250px', height: '300px' }}/></li>
										<li><img className="about-thumb3" src={aboutThumb3} alt=""/></li>
                  <li><div className="exp-bx">2+<span>Year Experience</span></div></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 mb-30">
              <div className="heading-bx">
                <h6 className="title-ext text-secondary">About Us</h6>
                 <h2 className="title">{story && story.title}</h2> 
                <p>{story.description ? stripHtmlTags(story.description) : ''}</p>
              </div>
            
              {/* <Link to="/about" className="btn">Read More</Link> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
