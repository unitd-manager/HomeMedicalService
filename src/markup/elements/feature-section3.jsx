import React from "react";
import caregivers from '../../images/about/honest.png';
import engagement from '../../images/about/home.png';
import demand from '../../images/about/convenience.png';
import safety from '../../images/about/shield.png';

class LatestNewsSection extends Component {
	render() {
		return (
			<>
				<section className="section-sp1 service-wraper2">
					<div className="container">
						<div className="row">
							<div className="col-xl-3 col-sm-6 mb-30">
								<div className="feature-container feature-bx3">
									<h2 className="counter text-secondary">2+</h2>
									<h5 className="ttr-title">Years With You</h5>
									<p>We’ve been proudly serving our community for over two years, constantly striving to improve our services.</p>
								</div>
							</div>
							<div className="col-xl-3 col-sm-6 mb-30">
								<div className="feature-container feature-bx3">
									<h2 className="counter text-secondary">12</h2>
									<h5 className="ttr-title">Awards</h5>
									<p>Recognized for excellence, we’ve earned numerous awards for our commitment to quality and service.</p>
								</div>
							</div>
							<div className="col-xl-3 col-sm-6 mb-30">
								<div className="feature-container feature-bx3">
									<h2 className="counter text-secondary">15</h2>
									<h5 className="ttr-title">Doctors</h5>
									<p>Our team includes 15 experienced doctors who are dedicated to providing top-notch healthcare.</p>
								</div>
							</div>
							<div className="col-xl-3 col-sm-6 mb-30">
								<div className="feature-container feature-bx3">
									<h2 className="counter text-secondary">100+</h2>
									<h5 className="ttr-title">Satisfied Clients</h5>
									<p>We’ve helped over 800 clients achieve better health and well-being through our personalized services.</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			</>
		);
	}
}

export default features;
