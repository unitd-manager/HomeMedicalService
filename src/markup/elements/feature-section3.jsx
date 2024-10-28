import React from "react";
import caregivers from '../../images/about/honest.png';
import engagement from '../../images/about/home.png';
import demand from '../../images/about/convenience.png';
import safety from '../../images/about/shield.png';

const features = () => {
    return (
      <>
        <section className="section-sp1 service-wraper2">
          <div className="container">
            <div className="row">
              <div className="heading-bx text-center">
                <h6 className="title-ext text-secondary">
                  Why Lakshmi Mission Hospital
                </h6>
                <h2 className="title m-b0">Why Lakshmi Mission Hospital</h2>
                <p>
                  Lakshmi Mission Hospital Care Managers ensures that every
                  interaction from the visit to regular follow ups are done in a
                  very personal way with an empathetic touch of family.
                </p>
              </div>
              <div className="col-xl-3 col-sm-6 mb-30">
                <div className="feature-container feature-bx3">
                  {/* <h2 className="counter text-secondary">2+</h2> */}
				  <img src={caregivers} alt="care" style={{ width: '100px', height: 'auto', margin:'25px'}} />
				  <h5 className="ttr-title">Trusted Caregivers</h5>
                  <p>
                    Our Care Managers & Helpee Hands are verified & trained in
                    handling seniors with utmost love & respect.
                  </p>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 mb-30">
                <div className="feature-container feature-bx3">
				<img src={engagement} alt="care" style={{ width: '100px', height: 'auto', margin:'25px'}} />
				<h5 className="ttr-title">Comfort & Engagement</h5>
                  <p>
                    We provide a supportive environment for your loved ones to
                    feel comfortable and engaged.
                  </p>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 mb-30">
                <div className="feature-container feature-bx3">
				<img src={demand} alt="care" style={{ width: '100px', height: 'auto', margin:'25px'}} />
                  <h5 className="ttr-title">On-Demand Convenience</h5>
                  <p>
                    Our flexible top up based plans enable you to truly
                    experience an on-demand services at your home.
                  </p>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 mb-30">
                <div className="feature-container feature-bx3">
				<img src={safety} alt="care" style={{ width: '100px', height: 'auto', margin:'25px'}} />
                  <h5 className="ttr-title">Safety Guaranteed</h5>
                  <p>
                    Our team and partners are vaccinated and we follow strict
                    covid19 protocols to ensure your loves one's safety.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

export default features;
