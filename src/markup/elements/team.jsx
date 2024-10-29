import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from "../../constants/api";

// Import Images
import ptImg1 from '../../images/shap/trangle-orange.png';
import ptImg2 from '../../images/shap/square-dots-orange.png';
import ptImg3 from '../../images/shap/line-circle-blue.png';
import ptImg4 from '../../images/shap/wave-blue.png';
import ptImg5 from '../../images/shap/circle-dots.png';

export default function Team() {
    const [team, setTeam] = useState([]); // State to hold team members

    useEffect(() => {
        getTeam();
    }, []);

    const getTeam = () => {
        api
            .get("/section/getTeam")
            .then((res) => {
                setTeam(res.data.data); // Set the team data from API response
            })
            .catch((error) => {
                console.error("Error fetching team members:", error);
            });
    };

    return (
        <>
            <div className="page-content bg-white">
                <div className="banner-wraper">
                    <div className="page-banner">
                        <div className="container">
                            <div className="page-banner-entry text-center">
                                <h1>Our Team</h1>
                                <nav aria-label="breadcrumb" className="breadcrumb-row">
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> Home</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Our Team</li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <img className="pt-img1 animate-wave" src={ptImg4} alt="" />
                        <img className="pt-img2 animate2" src={ptImg5} alt="" />
                        <img className="pt-img3 animate-rotate" src={ptImg3} alt="" />
                    </div>
                </div>

                <section className="section-area section-sp1 team-wraper">
                    <div className="container">
                        <div className="row">
                            {team.slice(0, 3).map((teamMember, index) => ( // Display only the first three members
                                <div key={index} className="col-lg-4 col-sm-6">
                                    <div className="team-member mb-30">
                                        <div className="team-media">
                                            <img
                                                src={`https://homeservices.unitdtechnologies.com/storage/uploads/${teamMember.file_name}`}
                                                alt={teamMember.title}
                                                style={{ width: "130px", height: "130px", objectFit: "cover" }}
                                            />
                                        </div>
                                        <div className="team-info">
                                            <div className="team-info-comntent">
                                                <h4 className="title">{teamMember.title}</h4>
                                                <span className="text-secondary">{teamMember.description.replace(/<[^>]+>/g, '')}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <img className="pt-img1 animate1" src={ptImg1} alt="" />
                    <img className="pt-img2 animate2" src={ptImg2} alt="" />
                    <img className="pt-img3 animate-rotate" src={ptImg3} alt="" />
                    <img className="pt-img4 animate-wave" src={ptImg4} alt="" />
                    <img className="pt-img5 animate-wave" src={ptImg5} alt="" />
                </section>
            </div>
        </>
    );
}
