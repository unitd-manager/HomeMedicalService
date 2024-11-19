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
    flexWrap: 'wrap',
    gap: '20px',
    padding: 0,
    margin: 0,
    listStyleType: 'none',
    justifyContent: 'center',
  },
  galleryItem: {
    flex: '1 0 calc(25% - 20px)',
    maxWidth: 'calc(25% - 20px)',
    border: '2px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    textAlign: 'center',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // Center-aligns content
    alignItems: 'center',
    transition: 'transform 0.3s ease',
    overflow: 'hidden', // Ensures content doesn't overflow
  },
  galleryImage: {
    width: '100%',
    height: 'auto',
    display: 'block',
    maxWidth: '150px',
    marginBottom: '5px',
  },
  imageTitle: {
    fontSize: '10px',
    color: '#333',
    textAlign: 'center',
    wordWrap: 'break-word',
    width: '100%', // Ensures text stays within the item's width
    overflow: 'hidden', // Prevents text overflow
    textOverflow: 'ellipsis', // Adds ellipsis if text is too long
    whiteSpace: 'nowrap', // Keeps text on one line
  },
  '@media (max-width: 768px)': {
    galleryItem: {
      flex: '1 0 calc(50% - 20px)',
      maxWidth: 'calc(50% - 20px)',
    },
    galleryImage: {
      maxWidth: '120px',
    },
    imageTitle: {
      fontSize: '10px', // Adjust font size for tablets
    },
  },
  '@media (max-width: 480px)': {
    galleryItem: {
      flex: '1 0 calc(100% - 20px)',
      maxWidth: 'calc(100% - 20px)',
    },
    galleryImage: {
      maxWidth: '100px',
    },
    imageTitle: {
      fontSize: '10px',
      whiteSpace: 'normal', // Allows text to wrap to the next line
    },
  },
};

  export default WidgetGallery;
