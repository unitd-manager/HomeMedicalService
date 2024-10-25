import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Import Images
import bg1 from '../../images/background/line-bg1.png';
import ptImg1 from '../../images/shap/circle-orange.png';
import ptImg2 from '../../images/shap/plus-orange.png';
import ptImg3 from '../../images/shap/circle-dots.png';
import ptImg4 from '../../images/shap/plus-orange.png';


class aboutSection extends Component{
	render(){
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
                <div className="work-bx" style={{ minHeight: '250px', flexGrow: 1 }}>
                  <div className="work-num-bx">01</div>
                  <div className="work-content">
                    <h5 className="title text-secondary mb-10">Make Appointment</h5>
                    <p>
                      Call us or WhatsApp or simply fill our form to connect with
                      our Help Care Manager.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 mb-30 d-flex">
                <div className="work-bx active" style={{ minHeight: '250px', flexGrow: 1 }}>
                  <div className="work-num-bx">02</div>
                  <div className="work-content">
                    <h5 className="title text-secondary mb-10">Take Treatment</h5>
                    <p>
                      We will send you an Attender/Caregiver profile based on
                      your requirements.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 mb-30 d-flex">
                <div className="work-bx" style={{ minHeight: '250px', flexGrow: 1 }}>
                  <div className="work-num-bx">03</div>
                  <div className="work-content">
                    <h5 className="title text-secondary mb-10">Registration</h5>
                    <p>
                      We arrange a face-to-face meeting with our Care Manager &
                      Attender/Caregiver.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 mb-30 d-flex">
                <div className="work-bx" style={{ minHeight: '250px', flexGrow: 1 }}>
                  <div className="work-num-bx">04</div>
                  <div className="work-content">
                    <h5 className="title text-secondary mb-10">Payment</h5>
                    <p>
                      Pay once your Attender/Caregiver is deployed at your
                      residence.
                    </p>
                  </div>
                </div>
              </div>
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
}

export default aboutSection;