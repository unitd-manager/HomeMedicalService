import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import api from '../../constants/api'; // Ensure this points to your API constants

// Import Images
import lingBg2 from "../../images/background/line-bg2.png"
import animate1 from "../../images/shap/trangle-orange.png"
import animate2 from "../../images/shap/square-dots-orange.png"
import animateRotate from "../../images/shap/line-circle-blue.png"
import animateWave from "../../images/shap/wave-blue.png"
import testPic1 from "../../images/testimonials/pic1.jpg"
import testPic2 from "../../images/testimonials/pic2.jpg"
import testPic3 from "../../images/testimonials/pic3.jpg"
import testPic4 from "../../images/testimonials/pic4.jpg"
import testPic5 from "../../images/testimonials/pic5.jpg"

// NewsItem Component
const NewsItem = ({ item }) => {
	return (
		<div className="slider-item">
			<div className="blog-card">
				<div className="post-media">
					<Link to="/blog-details"><img src={item.thumb} alt="" /></Link>
				</div>
				<div className="post-info">
					<ul className="post-meta">
						<li className="author"><Link to="/blog-details"><img src={item.authorPic} alt="" />{item.author}</Link></li>
						<li className="date"><i className="far fa-calendar-alt"></i>{item.date}</li>
					</ul>
					<h5 className="post-title"><Link to="/blog-details">{item.title}</Link></h5>
					<Link to="/blog-grid" className="btn btn-outline-primary btn-sm">Read More <i className="btn-icon-bx fas fa-chevron-right"></i></Link>
				</div>
			</div>
		</div>
	);
};

const settings = {
	dots: false,
	infinite: true,
	speed: 1000,
	slidesToShow: 3,
	slidesToScroll: 1,
	responsive: [
		{
			breakpoint: 1191,
			settings: {
				slidesToShow: 2,
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
			}
		},
	],
};

class LatestNewsSection extends Component {
	state = {
		content: [], // State to hold fetched news items
		loading: true, // State to manage loading state
	};

	// Fetch news items from the API
	fetchNewsItems = async () => {
		try {
			const response = await api.get('/blog/getBlogImage'); // Change this endpoint if necessary
			this.setState({ content: response.data.data, loading: false }); // Set fetched data and loading to false
		} catch (error) {
			console.error("Error fetching news items:", error);
			this.setState({ loading: false }); // Set loading to false on error
		}
	};

	// Lifecycle method to fetch data
	componentDidMount() {
		this.fetchNewsItems(); // Fetch news items when component mounts
	}

	render() {
		const { content, loading } = this.state; // Destructure state

		return (
			<>
				<section className="section-area section-sp1 blog-area" style={{ backgroundImage: "url(" + lingBg2 + ")", backgroundPosition: "center", backgroundSize: "cover", }}>
					<div className="container">
						<div className="heading-bx text-center">
							<h6 className="title-ext text-secondary">Blogs</h6>
						</div>

						{loading ? ( // Show loading state
							<p>Loading...</p>
						) : (
							<Slider {...settings} className="tt-slider blog-slide slider-sp0 slick-arrow-none">
								{content.map((item) => (
									<NewsItem key={item.blog_id} item={item} /> // Use blog_id as the key
								))}
							</Slider>
						)}
					</div>

					<img className="pt-img1 animate1" src={animate1} alt="" />
					<img className="pt-img2 animate2" src={animate2} alt="" />
					<img className="pt-img3 animate-rotate" src={animateRotate} alt="" />
					<img className="pt-img4 animate-wave" src={animateWave} alt="" />
				</section>
			</>
		);
	}
}

export default LatestNewsSection;
