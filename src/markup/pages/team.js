import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import api from "../../constants/api";

// Import Images
import bnrImg1 from "../../images/banner/img1.jpg";
import trangleOrange from "../../images/shap/trangle-orange.png";
import squareDotsOrange from "../../images/shap/square-dots-orange.png";
import lineCircleBlue from "../../images/shap/line-circle-blue.png";
import waveBlue from "../../images/shap/wave-blue.png";
import circleDots from "../../images/shap/circle-dots.png";
import plusBlue from "../../images/shap/circle-dots.png";


export default function Team() {

	const [Team, setTeam] = useState([]);

	useEffect(() => {
		getTeam();
		//getCategory();
	  }, []);
	
	  const getTeam = () => {
		// var formated = title.split("-").join(" ");
		api
		  .get("/section/getTeam")
		  .then((res) => {
			setTeam(res.data.data);
			//setCurrentData(res.data.data);
		  })
		  .catch(() => {});
	  };

	
		return (
			<>
				
				<div className="page-content bg-white">
					
					<div className="banner-wraper">
						<div className="page-banner" style={{backgroundImage: "url("+bnrImg1+")"}}>
							<div className="container">
								<div className="page-banner-entry text-center">
								<h1>Our Doctors</h1>
                                <p>Well-qualified, dedicated, and experienced professional team, including doctors, nurses, physiotherapists, nursing assistants, lab technicians, nutritional therapists, counselors, social workers, and more.</p>
									<nav aria-label="breadcrumb" className="breadcrumb-row">
										<ul className="breadcrumb">
											<li className="breadcrumb-item"><Link to="/"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> Home</Link></li>
											<li className="breadcrumb-item active" aria-current="page">Our Doctors</li>
										</ul>
									</nav>
								</div>
							</div>
							<img className="pt-img1 animate-wave" src={waveBlue} alt=""/>
							<img className="pt-img2 animate2" src={circleDots} alt=""/>
							<img className="pt-img3 animate-rotate" src={plusBlue} alt=""/>
						</div>
					</div>
					
					<section className="section-area section-sp1 team-wraper">
						<div className="container">
							<div className="row">
								{Team.map((teamMember, index) =>(
									 <div
									 key={index}
									 className="col-lg-4 col-sm-6"
									 style={{
										 display: "flex",
										 justifyContent: "center",
										 marginBottom: "30px",
									 }}
								 >
										<div
                        className="team-member"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "20px",
                            height: "100%",
                            minHeight: "350px", // Uniform height
                            width: "280px", // Fixed width for all panels
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            backgroundColor: "#f9f9f9",
                            textAlign: "center",
                        }}
                    >
											<div className="team-media">
											<img
											src={`https://homeservices.unitdtechnologies.com/storage/uploads/${teamMember.file_name}`}
											alt={teamMember.title}
											style={{
												width: "130px",
												height: "130px",
												objectFit: "cover",
												borderRadius: "50%",
												marginBottom: "15px",
											}}
											/>

											</div>
											<div className="team-info">
												<div className="team-info-comntent">
												<h4
                                className="title"
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    marginBottom: "10px",
                                }}
                            >
                                {teamMember.title}
                            </h4>
							<span
                                className="text-secondary"
                                style={{
                                    fontSize: "14px",
                                    color: "#555",
                                }}
                            >{teamMember.description.replace(/<[^>]+>/g, '')}</span>
												</div>
											
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
						
						<img className="pt-img1 animate1" src={trangleOrange} alt=""/>
						
						<img className="pt-img2 animate2" src={squareDotsOrange} alt=""/>
						
						<img className="pt-img3 animate-rotate" src={lineCircleBlue} alt=""/>
						
						<img className="pt-img4 animate-wave" src={waveBlue} alt=""/>
						
						<img className="pt-img5 animate-wave" src={plusBlue} alt=""/>
						
					</section>
					
				</div>
				
			</>
		);

}

