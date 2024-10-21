import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Import Images
import aboutThumb1 from '../../images/about/pic-1.jpg';
import aboutThumb2 from '../../images/about/pic-2.jpg';
import aboutThumb3 from '../../images/about/pic-3.jpg';
import ptImg1 from '../../images/shap/wave-orange.png';
import ptImg2 from '../../images/shap/circle-small-blue.png';
import ptImg4 from '../../images/shap/square-dots-orange.png';
import ptImg5 from '../../images/shap/square-blue.png';
import api from '../../constants/api';

const AboutSection = () => {
  const [story, setStory] = useState([]);

  const getMenu = () => {
    api
      .get('/content/getStory')
      .then((res) => {
        setStory(res.data.data); // Assuming your data structure is correct
      })
      .catch((error) => {
        console.error('Error fetching menu:', error);
      });
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
                  <li><img className="about-thumb1" src={aboutThumb1} alt="" /></li>
                  <li><img className="about-thumb2" src={aboutThumb2} alt="" /></li>
                  <li><img className="about-thumb3" src={aboutThumb3} alt="" /></li>
                  <li><div className="exp-bx">20<span>Year Experience</span></div></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 mb-30">
              <div className="heading-bx">
                <h6 className="title-ext text-secondary">About Us</h6>
                <h2 className="title">{story && story.title}</h2>
                <p>We provide the special tips and advice of health care treatment and high level of best technology involved in our hospital.</p>
              </div>
              <div className="row">
                <div className="col-lg-6 col-sm-6 mb-30 mb-sm-20">
                  <div className="feature-container feature-bx1 feature1">
                    <div className="icon-md">
                      <span className="icon-cell">
                        <svg enableBackground="new 0 0 512 512" height="85" viewBox="0 0 512 512" width="85" xmlns="http://www.w3.org/2000/svg">
                          <path d="m509.82 327.343-21.991-27.599c-1.896-2.381-4.775-3.768-7.82-3.768h-7.712l-74.353-93.385c-1.897-2.383-4.777-3.771-7.823-3.771h-22.862v-22.765c0-19.014-15.43-34.483-34.396-34.483h-97.678v-4.552c0-28.428-23.127-51.555-51.555-51.555s-51.555 23.127-51.555 51.555v4.552h-97.678c-18.966 0-34.397 15.47-34.397 34.484v251.241c0 5.523 4.478 10 10 10h22.279c4.628 22.794 24.758 39.999 48.815 39.999s44.186-17.205 48.814-39.999h250.37c4.628 22.794 24.757 39.999 48.814 39.999s44.187-17.205 48.815-39.999h24.093c5.522 0 10-4.477 10-10v-93.722c0-2.264-.769-4.461-2.18-6.232zm-124.52-108.523 61.432 77.156h-79.474v-77.156zm-233.226-81.799c0-17.399 14.155-31.555 31.555-31.555s31.555 14.156 31.555 31.555v4.552h-63.109v-4.552zm-132.074 39.035c0-7.986 6.459-14.483 14.397-14.483h298.464c7.938 0 14.396 6.497 14.396 14.483v241.241h-217.35c-4.628-22.794-24.757-39.999-48.814-39.999s-44.187 17.205-48.815 39.999h-12.278zm61.094 281.24c-16.44 0-29.816-13.458-29.816-29.999s13.376-29.999 29.816-29.999 29.815 13.458 29.815 29.999-13.375 29.999-29.815 29.999zm347.998 0c-16.44 0-29.815-13.458-29.815-29.999s13.375-29.999 29.815-29.999 29.816 13.458 29.816 29.999-13.376 29.999-29.816 29.999zm62.908-39.999h-14.093c-4.628-22.794-24.758-39.999-48.815-39.999s-44.186 17.205-48.814 39.999h-13.02v-101.321h107.932l16.81 21.096z"/>
                          <path d="m183.629 66.808c5.522 0 10-4.477 10-10v-12.104c0-5.523-4.478-10-10-10s-10 4.477-10 10v12.104c0 5.523 4.477 10 10 10z"/>
                          <path d="m236.764 94.969c1.934 1.829 4.404 2.736 6.871 2.736 2.652 0 5.299-1.048 7.266-3.127l10.626-11.229c3.796-4.011 3.621-10.341-.391-14.137s-10.341-3.621-14.137.391l-10.626 11.229c-3.796 4.012-3.621 10.341.391 14.137z"/>
                          <path d="m116.358 94.579c1.967 2.078 4.613 3.126 7.266 3.126 2.467 0 4.938-.907 6.871-2.737 4.012-3.796 4.187-10.125.391-14.137l-10.627-11.229c-3.796-4.011-10.126-4.187-14.137-.39-4.012 3.796-4.187 10.125-.391 14.137z"/>
                          <path d="m90.896 216.592h184.372v113.287h-184.372z" fill="#b2f0fb"/>
                        </svg>
                      </span> 
                    </div>
                    <div className="icon-content">
                      <h4 className="ttr-title">Emergency Help</h4>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-6 mb-30 mb-sm-20">
                  <div className="feature-container feature-bx1 feature2">
                    <div className="icon-md">
                      <span className="icon-cell">
                        <svg enableBackground="new 0 0 512 512" height="85" viewBox="0 0 512 512" width="85" xmlns="http://www.w3.org/2000/svg">
                          <path d="m351.524 124.49h-37.907v-37.907h-44.657v37.907h-37.906v44.657h37.906v37.907h44.657v-37.907h37.907z"/>
                          <path d="m485.018 152.148c-15.744 0-31.238 6.184-42.507 17.832l-61.885 61.885c-20.56 20.56-43.931 36.647-70.626 46.649v-22.412c27.91-8.431 54.076-20.052 77.221-36.897 20.56-14.963 38.084-32.491 53.084-52.013 8.88-12.43 15.472-26.024 19.962-40.168 4.49-14.144 6.659-28.049 6.659-40.032 0-27.124-14.167-43.925-40.472-43.925-21.74 0-41.831 14.074-41.831 37.96 0 16.293 8.32 29.147 24.29 29.147 13.427 0 20.637-9.647 23.66-18.908 1.143-3.912 2.211-7.757 2.211-11.054 0-10.352-5.849-16.092-15.397-16.092-10.16 0-18.094 8.38-18.094 19.58 0 10.264 8.174 19.645 23.06 19.645 13.897 0 21.59-8.27 21.59-19.392 0-14.168-9.007-23.417-21.393-23.417-9.487 0-17.081 7.186-19.036 15.014-.327 1.172-.707 2.86-1.086 4.947-1.712 9.83-5.217 21.23-9.57 31.84-4.362 10.566-11.105 19.708-19.67 27.293-2.697 2.35-5.455 4.356-8.32 6.146-19.596 10.638-38.988 18.344-58.935 23.956-13.946 3.982-29.395 6.091-44.173 6.091-36.161 0-75.801-13.202-106.54-27.739-20.78-10.681-37.593-20.753-43.146-26.285-8.437-8.437-12.89-16.971-12.89-25.064 0-14.593 8.684-29.788 24.663-38.354 11.538-6.691 26.103-11.745 41.479-15.065 7.054-1.522 14.553-2.814 22.314-3.947-12.28 2.088-23.18 5.108-34.161 9.135-5.932 1.657-12.107 3.851-18.422 5.66-5.444 1.592-11.289 3.826-17.35 4.671-4.925 0.698-9.363 2.173-13.343 5.571-4.674 4.614-6.264 10.448-6.264 15.27 0 3.492 0.803 6.659 3.062 9.147 5.371 5.318 17.274 11.793 36.562 20.225 18.81 8.407 40.19 16.82 62.486 19.965 3.144 0.446 6.232 0.725 9.291 0.725 35.247 0 76.477-7.145 119.74-21.932 16.082-4.853 31.992-10.859 44.652-18.751l-17.362-17.362c-6.58-6.58-10.492-15.509-10.492-24.214 0-6.293 1.774-12.516 5.148-17.674 2.433-4.205 5.83-8.336 9.626-11.625 3.146-2.659 6.676-4.982 10.379-7.123 3.39-1.816 6.807-3.033 10.137-4.032 2.806-.794 5.391-1.252 8.033-1.252 9.825 0 19.514 2.836 28.073 8.312 13.66 8.885 22.996 21.188 28.716 34.551 6.75 15.319 9.522 32.896 11.78 48.958h51.907c5.522 0 10-4.478 10-10v-85.659c0-5.522-4.478-10-10-10z"/>
                          <path d="m351.524 124.49h-37.907v-37.907h-44.657v37.907h-37.906v44.657h37.906v37.907h44.657v-37.907h37.907z"/>
                        </svg>
                      </span> 
                    </div>
                    <div className="icon-content">
                      <h4 className="ttr-title">Medical Support</h4>
                    </div>
                  </div>
                </div>
              </div>
              <Link to="/about" className="btn">Read More</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
