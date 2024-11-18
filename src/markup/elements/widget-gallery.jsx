import React, { Component } from 'react';
import api from "../../constants/api";

class WidgetGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      galleryImages: [], // To store the images fetched from the API
      isLoading: true,   // Loading state
      error: null,       // Error state
    };
  }

  componentDidMount() {
    // Fetch data from the API
    api
      .get("/product/getImageProducts")
      .then((response) => {
        if (response.data.msg === "Success") {
          this.setState({ galleryImages: response.data.data, isLoading: false });
        } else {
          this.setState({ error: "Failed to fetch images", isLoading: false });
        }
      })
      .catch((err) => {
        console.error("Error fetching gallery images:", err);
        this.setState({ error: "An error occurred", isLoading: false });
      });
  }

  render() {
    const { galleryImages, isLoading, error } = this.state;

    return (
      <>
        <div className="widget widget_gallery">
          <h4 className="widget-title">Our Products</h4>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <ul style={styles.galleryContainer}>
              {galleryImages.map((image, index) => (
                <li key={index} style={styles.galleryItem}>
                  <img
                    src={`https://homeservices.unitdtechnologies.com/storage/uploads/${image.file_name}`} // Update with your actual media file path
                    alt={image.title || "Gallery Image"}
                    style={styles.galleryImage}
                  />
                  {image.title && (
                    <span style={styles.imageTitle}>{image.title}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </>
    );
  }
}

const styles = {
	galleryContainer: {
	  display: 'flex',
	  flexWrap: 'wrap', // Allows wrapping to the next row
	  gap: '10px', // Space between items
	  padding: 0,
	  margin: 0,
	  listStyleType: 'none', // Removes bullets
	  justifyContent: 'center', // Centers items in the container
	},
	galleryItem: {
	  flex: '1 0 18%', // Allows 5 items per row (100% / 5 = 20%, adjust for gap)
	  maxWidth: '18%', // Ensure the items don't exceed their allocated space
	  border: '2px solid #ccc', // Adds border to each item
	  borderRadius: '8px', // Optional: Rounded corners
	  padding: '5px', // Space between the border and content
	  textAlign: 'center', // Centers the title below the image
	  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Optional: Adds shadow
	  display: 'flex', // Use flexbox to ensure equal item height
	  flexDirection: 'column', // Aligns image and title vertically
	  justifyContent: 'space-between', // Ensures title aligns at the bottom
	},
	galleryImage: {
	  maxWidth: '100%',
	  height: 'auto', // Maintain aspect ratio
	  display: 'block',
	  marginBottom: '5px', // Space between the image and title
	},
	imageTitle: {
	  fontSize: '14px',
	  color: '#333',
	  textAlign: 'center',
	  marginTop: '5px', // Add space between image and title
	},
  };
  
  export default WidgetGallery;
