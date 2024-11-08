import React, { useState, useEffect } from 'react';
import api from "../../constants/api";
// import { Link } from 'react-router-dom';

// Import Images
import bg1 from '../../images/background/line-bg1.png';
import ptImg1 from '../../images/shap/circle-orange.png';
import ptImg2 from '../../images/shap/plus-orange.png';
import ptImg3 from '../../images/shap/circle-dots.png';
import ptImg4 from '../../images/shap/plus-orange.png';


export default function AboutSection() {

	const [content, setContent] = useState([]);
  const [content2, setContent2] = useState([]);
	const [content3, setContent3] = useState([]);
	const [content4, setContent4] = useState([]);


	useEffect(() => {
		getContent();
    getContent1();
    getContent2();
    getContent3();
	}, []);

	const getContent = () => {
		api
		  .get("/content/howItWorks1")
		  .then((res) => {
			setContent(res.data.data);
		  })
		  .catch((error) => {
			console.error("Error fetching content data:", error);
		  });
	};
  const getContent1 = () => {
		api
		  .get("/content/howItWorks2")
		  .then((res) => {
			setContent2(res.data.data);
		  })
		  .catch((error) => {
			console.error("Error fetching content data:", error);
		  });
	};
  const getContent2 = () => {
		api
		  .get("/content/howItWorks3")
		  .then((res) => {
			setContent3(res.data.data);
		  })
		  .catch((error) => {
			console.error("Error fetching content data:", error);
		  });
	};
  const getContent3 = () => {
		api
		  .get("/content/howItWorks4")
		  .then((res) => {
			setContent4(res.data.data);
		  })
		  .catch((error) => {
			console.error("Error fetching content data:", error);
		  });
	};
		return(
			<>
				
				<section
          className="section-area section-sp5 work-area"
          style={{
            backgroundImage: "url(" + bg1 + ")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "100%",
          }}
        >
	
          <div className="container-sm">
            <div className="heading-bx text-center">
              <h6 className="title-ext text-secondary">Working Process</h6>
              <h2 className="title">How it works?</h2>
            </div>
            <div className="row justify-content-center d-flex align-items-stretch">
          
              {/* Apply flex properties to align items properly */}
              <div className="col-lg-3 col-md-6 col-sm-6 mb-30 d-flex">
              {content.map((data, index) => (
                <div className="work-bx" style={{ minHeight: '250px', flexGrow: 1 }}>
                  <div className="work-num-bx">01</div>
                  <div className="work-content">
                    <h5 className="title text-secondary mb-10">{data.title}</h5>
                    <p>
                      {data.description}
                    </p>
                  </div>
                </div>
                              ))}

              </div>
              {content2.map((data, index) => (

              <div className="col-lg-3 col-md-6 col-sm-6 mb-30 d-flex">
                <div className="work-bx" style={{ minHeight: '250px', flexGrow: 1 }}>
                  <div className="work-num-bx">02</div>
                  <div className="work-content">
                    <h5 className="title text-secondary mb-10">{data.title}</h5>
                    <p>
                      {data.description}
                    </p>
                  </div>
                </div>
              </div>
                 ))}
                               {content3.map((data, index) => (

              <div className="col-lg-3 col-md-6 col-sm-6 mb-30 d-flex">
                <div className="work-bx" style={{ minHeight: '250px', flexGrow: 1 }}>
                  <div className="work-num-bx">03</div>
                  <div className="work-content">
                    <h5 className="title text-secondary mb-10">{data.title}</h5>
                    <p>
                      {data.description}
                    </p>
                  </div>
                </div>
              </div>
                               ))}
                               {content4.map((data, index) => (

              <div className="col-lg-3 col-md-6 col-sm-6 mb-30 d-flex">
                <div className="work-bx" style={{ minHeight: '250px', flexGrow: 1 }}>
                <div className="work-num-bx">04</div>
                  <div className="work-content">
                    <h5 className="title text-secondary mb-10">{data.title}</h5>
                    <p>
                      {data.description}
                    </p>
                  </div>
                </div>
              </div>
                                             ))}

            </div>
          </div>

          <img className="pt-img1 animate1" src={ptImg1} alt="" />
          <img className="pt-img2 animate2" src={ptImg2} alt="" />
          <img className="pt-img3 animate3" src={ptImg3} alt="" />
		  <img className="pt-img3 animate3" src={ptImg4} alt="" />

        </section>
				
			</>
		);
	}
