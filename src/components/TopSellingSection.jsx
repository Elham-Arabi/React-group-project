import React from 'react';
import { Card, Typography, Rate, Divider, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined } from '@ant-design/icons';
import CustomSlider from './CustomSlider';
import "../css/TopSellingSection.css";

const { Title, Text } = Typography;

const TopSellingSection = ({ products }) => {
  const navigate = useNavigate();

  if (!products || products.length === 0) {
    return <div>No top-selling products available.</div>;
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="top-selling-section">
      <Title level={2} className="section-title">TOP SELLING</Title>
      <CustomSlider settings={sliderSettings}>
        {products.map((product) => (
          <div key={product._id} className="product-card-container">
            <Card
              hoverable
              cover={
                <img
                  alt={product.name}
                  src={product.images?.[0] || 'https://via.placeholder.com/200'}
                  className="product-image"
                  onClick={() => navigate(`/ProductFeatureCard/${product._id}`)}
                />
              }
              className="product-card"
              onClick={() => navigate(`/ProductFeatureCard/${product._id}`)}
            >
              <Text type="secondary">{product.category || 'No Category'}</Text>
              <Title level={5} className="product-title">{product.name || 'No Name'}</Title>
              <Title level={4} className="product-price">${Math.ceil(product.price) || '0'}</Title>
              <Rate className="product-rating" disabled allowHalf defaultValue={product.rating || 0} />
            </Card>
            <div className="add-to-cart-btn-container">
              <Button
                type="primary"
                className="add-to-cart-btn"
                onClick={() => navigate(`/ProductFeatureCard/${product._id}`)}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </CustomSlider>
      <Divider />
      <div className="newsletter-section">
        <Title level={4}>Sign Up for the NEWSLETTER</Title>
        <div>
          <input
            type="email"
            placeholder="Enter Your Email"
            className="newsletter-input"
          />
          <Button type="primary" className="subscribe-btn">Subscribe</Button>
        </div>
        <div className="social-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FacebookOutlined />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <TwitterOutlined />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <InstagramOutlined />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <LinkedinOutlined />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopSellingSection;
