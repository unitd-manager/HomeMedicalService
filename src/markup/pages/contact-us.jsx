import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from "../../constants/api";
import ReCAPTCHA from "react-google-recaptcha";
import { message } from 'antd';

// Import Images
import bnrImg1 from "../../images/banner/img1.jpg";
import icon1 from "../../images/icon/icon1.png";
import icon2 from "../../images/icon/icon2.png";
import icon3 from "../../images/icon/icon3.png";
import animateWave from "../../images/shap/wave-blue.png";
import animate2 from "../../images/shap/circle-dots.png";
import animateRotate from "../../images/shap/plus-blue.png";

const ContactUs = () => {
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState({});
  const [contact, setContact] = useState({});
  const [mailId, setMailId] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);
  const [user, setUser] = useState({
    first_name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message

  useEffect(() => {
    getEmail();
    getCompanyName();
    getAddress();
    getMobile();
    window.scrollTo(0, 0);
  }, []);

  const validateFields = () => {
    let validationErrors = {};
    if (!user.first_name) validationErrors.first_name = "Name is required.";
    if (!user.email) validationErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(user.email)) validationErrors.email = "Email is invalid.";
    if (!user.phone) validationErrors.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(user.phone)) validationErrors.phone = "Phone number must be 10 digits.";
    if (!user.notes) validationErrors.notes = "Message is required.";
    return validationErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    // Clear the error message for the field being edited
    setErrors({ ...errors, [name]: "" });
  };

  const onFinish = (e) => {
    e.preventDefault();
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!captchaValue) {
      return message.error("Please complete the CAPTCHA!");
    }

    api.post("/contact/insertContact", user)
      .then((res) => {
        setSuccessMessage("Thank you for reaching out! Your message has been successfully submitted.");
        setUser({ first_name: "", email: "", phone: "", notes: "" }); // Reset form fields
        setCaptchaValue(null); // Reset CAPTCHA
        message.success("Form submitted successfully!");
      })
      .catch((err) => {
        message.error("An error occurred while submitting the form.");
        console.log(err);
      });
  };

  const onCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  // Fetching functions
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

  return (
    <div className="page-content bg-white">
      {/* Page Banner */}
      <div className="banner-wraper">
        <div className="page-banner banner-lg contact-banner" style={{ backgroundImage: `url(${bnrImg1})` }}>
          <div className="container">
            <div className="page-banner-entry text-center">
              <h1>Contact Us</h1>
              <nav aria-label="breadcrumb" className="breadcrumb-row">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
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

      {/* Contact Form */}
      <section>
        <div className="container">
          <div className="contact-wraper">
            <div className="row">
              <div className="col-lg-6 mb-30">
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                <form className="form-wraper contact-form ajax-form">
                  <div className="row">
                    <div className="form-group col-md-12">
                      <input
                        name="first_name"
                        type="text"
                        className="form-control"
                        value={user.first_name}
                        placeholder="Your Name"
                        onChange={handleChange}
                      />
                      {errors.first_name && <span className="text-danger">{errors.first_name}</span>}
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        name="email"
                        type="email"
                        className="form-control"
                        value={user.email}
                        placeholder="Email"
                        onChange={handleChange}
                      />
                      {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        name="phone"
                        type="text"
                        className="form-control"
                        value={user.phone}
                        placeholder="Phone Number"
                        onChange={handleChange}
                      />
                      {errors.phone && <span className="text-danger">{errors.phone}</span>}
                    </div>
                    <div className="form-group col-md-12">
                      <textarea
                        name="notes"
                        className="form-control"
                        value={user.notes}
                        placeholder="Type Message"
                        onChange={handleChange}
                      ></textarea>
                      {errors.notes && <span className="text-danger">{errors.notes}</span>}
                    </div>
                    <div className="form-group col-md-12">
                      <ReCAPTCHA
                        sitekey="6LfnZ3IqAAAAAILh6W3SwazKLmifIV2VqL0-fV1c" // Replace with your reCAPTCHA site key
                        onChange={onCaptchaChange}
                      />
                    </div>
                    <div className="col-lg-12">
                      <button onClick={(e) => {
				onFinish(e); 
		}}  type="submit" className="btn w-100 btn-secondary btn-lg">Submit</button>
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

      {/* Contact Details */}
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
              <div className="feature-container feature-bx4 feature4">
                <div className="icon-md feature-icon">
                  <img src={icon3} alt="" />
                </div>
                <div className="icon-content">
                  <h5 className="ttr-title">Email Address</h5>
                  <p>{mailId.mail}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-30">
              <div className="feature-container feature-bx4 feature2">
                <div className="icon-md feature-icon">
                  <img src={icon2} alt="" />
                </div>
                <div className="icon-content">
                  <h5 className="ttr-title">Address</h5>
                  <p>{address.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
