import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../constants/api";


// Import Images
import bnrImg1 from "../../images/banner/img1.jpg";
import waveBlue from "../../images/shap/wave-blue.png";
import circleDots from "../../images/shap/circle-dots.png";
import plusBlue from "../../images/shap/plus-blue.png";


export default function News() {
	const [CategoryOne, setCategoryOne] = useState([]);
	const navigate = useNavigate();


	useEffect(() => {
		getCategoryOne();
	}, []);

	

	const getCategoryOne = () => {
		api
			.get('/section/getServiceNurseHome')
			.then((res) => {
				setCategoryOne(res.data.data);
			})
			.catch(() => {});
	};

	const formatTextAsList = (input) => {
		if (!input) return "";
		const lines = input.split("\n");
		return `<ul>${lines.map((line) => `<li>${line.trim()}</li>`).join("")}</ul>`;
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
						<h2>{CategoryOne.length > 0 ? CategoryOne[0].category_title : 'Category Two'}</h2> {/* Add heading for Category One */}
						<div className="text-center mt-4">
					
            </div>
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
							{CategoryOne.map((data, index) => (

								<div className="col-lg-4 col-md-6 mb-30">
									<div className="feature-container feature-bx4">
									<div className="icon-content">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: data.product_description ? formatTextAsList(data.product_description) : "",
                          }}
                        />
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

