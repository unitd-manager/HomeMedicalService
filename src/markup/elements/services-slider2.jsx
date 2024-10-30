import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../constants/api';
// Elements
import FeatureSection3 from "../elements/feature-section3";
import TeamSection from "../elements/team";
import LatestNewsSection from "../elements/latest-news-slider";

// Import Images
import bnrImg1 from "../../images/banner/img1.jpg";
import waveBlue from "../../images/shap/wave-blue.png";
import circleDots from "../../images/shap/circle-dots.png";
import plusBlue from "../../images/shap/plus-blue.png";

const ServiceSlider2 = () => {
  const { category_id } = useParams(); // Access the category_id from URL
  const [serviceDetail, setServiceDetail] = useState(null); // State to hold the fetched data
  const [loading, setLoading] = useState(true); // State to handle loading status

  // Fetch service details based on the category_id
  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        const response = await api.post(`/section/getAllServices/${category_id}`);
        setServiceDetail(response.data); // Set the service details from the response
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching service details:", error);
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchServiceDetail();
  }, [category_id]);

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle case where no data is found
  if (!serviceDetail) {
    return <div>No service details available.</div>;
  }

  return (
    <>
      <div className="service-detail-container">
        <h1>{serviceDetail.title}</h1>
        <p>{serviceDetail.description}</p>

        {/* Example display of additional fields */}
        <div>
          <h3>Details</h3>
          <ul>
            <li>Category: {serviceDetail.category_title}</li>
            <li>Price: ${serviceDetail.price}</li>
            {/* Include other fields as necessary */}
          </ul>
        </div>

        {/* Back button */}
        <button onClick={() => window.history.back()} className="btn btn-primary">Go Back</button>
      </div>

      {/* Additional sections */}
      <FeatureSection3 />
      <TeamSection />
      <LatestNewsSection />
    </>
  );
};

export default ServiceSlider2;
