import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import api from "../../constants/api";

// Import Images
import lineCircleBlue from "../../images/shap/line-circle-blue.png";
import squareDotsOrange from "../../images/shap/square-dots-orange.png";
import waveBlue from "../../images/shap/wave-blue.png";
import squareRotate from "../../images/shap/square-rotate.png";

const News = () => {
	const [services, setServices] = useState([]);
		const [News, setNews] = useState([]);
		const [CategoryOne, setCategoryOne] = useState([]);
		const [CategoryTwo, setCategoryTwo] = useState([]);
	
		useEffect(() => {
			getNews();
			getCategoryOne();
			getCategoryTwo();
			getServices();
		}, []);

		const getServices = () => {
			api
				.get('/section/getService12')
				.then((res) => {
					setServices(res.data.data);
				})
				.catch(() => {});
		};
	
	
		const getNews = () => {
			api
				.get('/section/getService1')
				.then((res) => {
					setNews(res.data.data);
				})
				.catch(() => {});
		};
	
		const getCategoryOne = () => {
			api
				.get('/section/getService2')
				.then((res) => {
					setCategoryOne(res.data.data);
				})
				.catch(() => {});
		};
	
		const getCategoryTwo = () => {
			api
				.get('/section/getService3')
				.then((res) => {
					setCategoryTwo(res.data.data);
				})
				.catch(() => {});
		};
	
		const stripHtmlTags = (input) => {
			let tempDiv = document.createElement("div");
			tempDiv.innerHTML = input;
			return tempDiv.textContent || tempDiv.innerText || "";
		};
	
		// Function to truncate text to a specified number of lines
		const truncateText = (text, maxLines) => {
			const words = text.split(' ');
			let truncated = '';
			let lineCount = 0;
			const lineLimit = 25; // Approximate word count per line
	
			for (const word of words) {
				if (lineCount < maxLines) {
					if ((truncated + word).length <= lineLimit * (lineCount + 2)) {
						truncated += word + ' ';
					} else {
						truncated += '...'; // Add ellipsis if exceeding the line limit
						break;
					}
				}
				if (truncated.split(' ').length >= lineLimit) {
					lineCount++;
				}
			}
			return truncated.trim();
		};
	
			
		const settings = {
			dots: false,
			infinite: true,
			speed: 1000,
			slidesToShow: 3,
			slidesToScroll: 1,
			responsive: [
				{
					breakpoint: 991,
					settings: {
						slidesToShow: 2,
					}
				},
				{
					breakpoint: 591,
					settings: {
						slidesToShow: 1,
					}
				}
			]
		};
		
		return(
			<>
				
				<section className="section-area section-sp1 service-wraper">
					<div className="row align-items-center">
					{services.map((data, index) => (
						<div className="col-xl-4 col-lg-7 mb-30">	
							<div className="heading-bx">
								<h6 className="title-ext text-secondary">Services</h6>
								<h2 className="title">{data.title}</h2>
								<p>{data.description ? stripHtmlTags(data.description) : ''}</p>
							</div>
							<Link to="/services" className="btn btn-secondary btn-lg shadow">All Services</Link>
						</div>
						                        ))}

						<div className="col-xl-8 mb-15">	
							<Slider {...settings} className="service-slide slick-arrow-none">
							{News.map((data, index) => (
                            <div className="slider-item" key={index}>
                                <div className="feature-container feature-bx2 feature1">
                                    <div className="icon-content">
                                        <h3 className="ttr-title">{data.title}</h3>
                                        <p className="truncate-text">
                                            {data.product_description ? truncateText(stripHtmlTags(data.product_description), 2) : ''}
                                        </p>
                                        <Link to="/service-detail" className="btn btn-primary light">View More</Link>
                                    </div>
                                </div>
                            </div>
                        ))}

							</Slider>
							<Slider {...settings} className="service-slide slick-arrow-none">
							{CategoryOne.map((data, index) => (
                            <div className="slider-item" key={index}>
                                <div className="feature-container feature-bx2 feature1">
                                    <div className="icon-content">
                                        <h3 className="ttr-title">{data.title}</h3>
                                        <p className="truncate-text">
                                            {data.product_description ? truncateText(stripHtmlTags(data.product_description), 2) : ''}
                                        </p>
                                        <Link to={`/service-detail/${data.catgory_id}`} className="btn btn-primary light">View More</Link>
                                    </div>
                                </div>
                            </div>
                        ))}

								
							</Slider>
							<Slider {...settings} className="service-slide slick-arrow-none">
							{CategoryTwo.map((data, index) => (
                            <div className="slider-item" key={index}>
                                <div className="feature-container feature-bx2 feature1">
                                    <div className="icon-content">
                                        <h3 className="ttr-title">{data.title}</h3>
                                        <p className="truncate-text">
                                            {data.product_description ? truncateText(stripHtmlTags(data.product_description), 2) : ''}
                                        </p>
                                        <Link to="/service-detail" className="btn btn-primary light">View More</Link>
                                    </div>
                                </div>
                            </div>
                        ))}

							</Slider>
						</div>	 
					</div>
					<img className="pt-img1 animate-rotate" src={lineCircleBlue} alt=""/>
					<img className="pt-img2 animate2" src={squareDotsOrange} alt=""/>
					<img className="pt-img3 animate-wave" src={waveBlue} alt=""/>
					<img className="pt-img4 animate1" src={squareRotate} alt=""/>
				</section>
				
			</>
		);
	} 
	export default News

