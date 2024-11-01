import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import AOS from "aos";
import api from "../../constants/api";

// Import Images
import bnrImg1 from "../../images/banner/img1.jpg";
import pic1 from "../../images/about/pic-1.jpg";
import icon1 from "../../images/icon/icon1.png";
import icon2 from "../../images/icon/icon2.png";
import icon3 from "../../images/icon/icon3.png";
import animateWave from "../../images/shap/wave-blue.png";
import animate2 from "../../images/shap/circle-dots.png";
import animateRotate from "../../images/shap/plus-blue.png";
import ReCAPTCHA from "react-google-recaptcha";
import { message } from 'antd';



const ContactUs = () => {
	const [companyName, setCompanyName] = useState('');
	const [address, setAddress] = useState({});
	const [contact, setContact] = useState({});
  const [mailId, setMailId] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null); // Add state for captcha
  const [user, setUser] = useState({
    first_name: "",
    email: "",
    phone: "",
    notes: "",
  });

  useEffect(() => {
    // AOS.init();
    getEmail();
    getCompanyName();
    getAddress();
    getMobile();
    // getEnquiryEmail();
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log({ [name]: value });
  };

  const onFinish = (e) => {
    if (!captchaValue) {
      return message.error("Please complete the CAPTCHA!");
    }
    e.preventDefault();
    const values = { ...user };
    console.log("Received values of form: ", values);
    api
      .post("/contact/insertContact", values)
      .then((res) => {
        console.log(res.data.data);
        message.success("Registered Successfully ");
      })
      .catch((err) => {
        console.log(err);
      });
  };

//   const getEnquiryEmail = () => {
//     api.get("/getMailId").then((res) => {
//       setMailId(res.data.data[0]);
//     });
//   };

const getEmail = async () => {
	try {
		const res = await api.get('/setting/getEmail');
		setMailId(res.data.data[0]);
	} catch (error) {
		console.error("Error fetching email:", error);
	}
};

const getCompanyName = async () => {
	try {
		const res = await api.get('/setting/getCompanyName');
		setCompanyName(res.data.data[0]);
	} catch (error) {
		console.error("Error fetching company name:", error);
	}
};

const getAddress = async () => {
	try {
		const res = await api.get('/setting/getAddress');
		setAddress(res.data.data[0]);
	} catch (error) {
		console.error("Error fetching address:", error);
	}
};

const getMobile = async () => {
	try {
		const res = await api.get('/setting/getContacts');
		setContact(res.data.data[0]);
	} catch (error) {
		console.error("Error fetching contact:", error);
	}
}; 
const onCaptchaChange = (value) => {
  setCaptchaValue(value); // Set the captcha value when user completes it
};

  return (
    <>
      <div className="page-content bg-white">
        <div className="banner-wraper">
          <div className="page-banner banner-lg contact-banner" style={{ backgroundImage: `url(${bnrImg1})` }}>
            <div className="container">
              <div className="page-banner-entry text-center">
                <h1>Contact Us</h1>
                <nav aria-label="breadcrumb" className="breadcrumb-row">
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                          <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        Home
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Contact Us</li>
                  </ul>
                </nav>
              </div>
            </div>
            <img className="pt-img1 animate-wave" src={animateWave} alt="" />
            <img className="pt-img2 animate2" src={animate2} alt="" />
            <img className="pt-img3 animate-rotate" src={animateRotate} alt="" />
          </div>
        </div>

        <section>
          <div className="container">
            <div className="contact-wraper">
              <div className="row">
                <div className="col-lg-6 mb-30">
                  <form className="form-wraper contact-form ajax-form" onSubmit={onFinish}>
                    <div className="ajax-message"></div>
                    <div className="row">
                      <div className="form-group col-md-12">
                        <input name="first_name" type="text" required className="form-control" placeholder="Your Name" onChange={handleChange} />
                      </div>
                      <div className="form-group col-md-12">
                        <input name="email" type="email" required className="form-control" placeholder="Email" onChange={handleChange} />
                      </div>
                      <div className="form-group col-md-12">
                        <input name="phone" type="text" required className="form-control" placeholder="Phone Numbers" onChange={handleChange} />
                      </div>
                      <div className="form-group col-md-12">
                        <textarea name="notes" required className="form-control" placeholder="Type Message" onChange={handleChange}></textarea>
                      </div>
                      <div wrapperCol={{ span: 16, offset: 8 }}>
                    <ReCAPTCHA
                      sitekey="6LcG8mkqAAAAAAMtU5DZKoOIzzVbStlV4DpfEryp" // Replace with your reCAPTCHA site key
                      onChange={onCaptchaChange}
                    />
                  </div>
                      <div className="col-lg-12">
                        <button name="submit" type="submit" className="btn w-100 btn-secondary btn-lg">Submit</button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col-lg-6 mb-30">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d516470.8695088285!2d77.8212477604417!3d9.316971306374716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b01453d47ccc2bd%3A0xd97b394f8212c42!2sLAKSHMI%20MISSION%20HOSPITAL!5e1!3m2!1sen!2sin!4v1729857704876!5m2!1sen!2sin"
                    width="500"
                    height="550"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-area section-sp1">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6 mb-30">
                <div className="feature-container feature-bx4 feature4">
                  <div className="icon-md feature-icon">
                    <img src={icon1} alt="" />
                  </div>
                  <div className="icon-content">
                    <h5 className="ttr-title">Contact Number</h5>
                    <p>{contact.phone}</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mb-30">
                <div className="feature-container feature-bx4 feature3">
                  <div className="icon-md feature-icon">
                    <img src={icon3} alt="" />
                  </div>
                  <div className="icon-content">
                    <h5 className="ttr-title">Email Address</h5>
                    <p> {mailId.mailId}</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mb-30">
                <div className="feature-container feature-bx4 feature3">
                  <div className="icon-md feature-icon">
                    <img src={icon2} alt="" />
                  </div>
                  <div className="icon-content">
                    <h5 className="ttr-title">Address</h5>
                    <p>	{address.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactUs;
