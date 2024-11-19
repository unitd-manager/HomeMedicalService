import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../constants/api";


// Import Images
import bnrImg1 from "../../images/banner/img1.jpg";
import waveBlue from "../../images/shap/wave-blue.png";
import circleDots from "../../images/shap/circle-dots.png";
import plusBlue from "../../images/shap/plus-blue.png";


export default function News() {
	const [CategoryTwo, setCategoryTwo] = useState([]);
	const navigate = useNavigate();


	useEffect(() => {
		getCategoryTwo();
	}, []);

	
	const getCategoryTwo = () => {
		api
			.get('/section/getServiceHmeService')
			.then((res) => {
				setCategoryTwo(res.data.data);
			})
			.catch(() => {});
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
	  <li key={index} style={{ fontFamily: "montserrat", fontSize: "16px", color: "blue", marginBottom: "8px" , listStyleType: "disc"}}>
		{line.trim()}
	  </li>
	));
  
	return <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>{listItems}</ul>;
  };
  
	


		return (
			<>
				
				<div className="page-content bg-white">
					
					<div className="banner-wraper">
						<div className="page-banner" style={{backgroundImage: "url("+bnrImg1+")"}}>
							<div className="container">
								<div className="page-banner-entry text-center">
									<h1>Services</h1>
									<nav aria-label="breadcrumb" className="breadcrumb-row">
										<ul className="breadcrumb">
											<li className="breadcrumb-item"><Link to="/"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> Home</Link></li>
											<li className="breadcrumb-item active" aria-current="page">Services</li>
										</ul>
									</nav>
								</div>
							</div>
							<img className="pt-img1 animate-wave" src={waveBlue} alt=""/>
							<img className="pt-img2 animate2" src={circleDots} alt=""/>
							<img className="pt-img3 animate-rotate" src={plusBlue} alt=""/>
						</div>
					</div>
					
				
					<section className="section-area section-sp1">
						<div className="container">
						<h2>{CategoryTwo.length > 0 ? CategoryTwo[0].category_title : 'Category Three'}</h2> {/* Add heading for Category One */}
						  {/* Book Service Button */}
						  <div className="text-center mt-5 mb-5">
			<button
    className="btn btn-primary btn-lg"
    style={{
      width: "250px",
      padding: "15px 30px",
      fontSize: "20px",
      fontWeight: "bold",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    }}
    onClick={() => navigate("/services")}
  >
    Book Service
  </button>
  </div>

							<div className="row">
							{CategoryTwo.map((data, index) => (

								<div className="col-lg-4 col-md-6 mb-30">
									<div className="feature-container feature-bx4" style={{
                   
				   height: "690px",
				
				 }}>
									<div className="icon-content">
									{data.product_description && formatTextAsList(removeHtmlTags(data.product_description))}
                      </div>
                
									</div>
								</div>
								     ))}
								
							</div>	
						</div>
					</section>
					
				
				</div>
				
			</>
		);
	
}

