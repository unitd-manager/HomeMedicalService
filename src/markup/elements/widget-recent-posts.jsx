import React, { Component } from 'react';
import api from '../../constants/api'; // Ensure this points to your API constants
import { Link } from 'react-router-dom';

// Import Images
import bnrImg1 from "../../images/banner/img1.jpg";
import testPic1 from "../../images/testimonials/pic1.jpg";
import testPic2 from "../../images/testimonials/pic2.jpg";
import testPic3 from "../../images/testimonials/pic3.jpg";

class BlogDetails extends Component {
  state = {
    blogPosts: [], // State to store blog posts
    loading: true, // State to manage loading state
  };

  // Fetch blog images from the API
  fetchBlogImages = async () => {
    try {
      const response = await api.get('/blog/getBlogImage');
      this.setState({ blogPosts: response.data.data, loading: false });
    } catch (error) {
      console.error("Error fetching blog images:", error);
      this.setState({ loading: false }); // Set loading to false on error
    }
  };

  // Lifecycle method to fetch data
  componentDidMount() {
    this.fetchBlogImages();
  }

  render() {
    const { blogPosts, loading } = this.state;

    return (
      <>
        <div className="page-content bg-white">
          <div className="banner-wraper">
            <div className="page-banner" style={{ backgroundImage: "url(" + bnrImg1 + ")" }}>
              <div className="container">
                <div className="page-banner-entry text-center">
                  <h1>Blog Details</h1>
                  <nav aria-label="breadcrumb" className="breadcrumb-row">
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                      <li className="breadcrumb-item active" aria-current="page">Blog Details</li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>

          <section className="section-area section-sp1">
            <div className="container">
              {loading ? (
                <p>Loading...</p> // Show loading message while fetching
              ) : (
                blogPosts.map((post) => (
                  <div key={post.blog_id} className="blog-card mb-30">
                    <div className="post-media">
                      <img src={post.file_name} alt="" /> {/* Use fetched image */}
                    </div>
                    <div className="post-info">
                      <ul className="post-meta">
                        <li className="author"><img src={testPic1} alt="" /> {post.author}</li>
                        <li className="date"><i className="far fa-calendar-alt"></i> {post.date}</li>
                      </ul>
                      <h4 className="post-title">{post.title}</h4>
                      <p>{post.description}</p> {/* Display description if available */}
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </>
    );
  }
}

export default BlogDetails;
