import React from 'react';
import { Card, Typography, Rate, Divider, Button } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined } from '@ant-design/icons';
import CustomSlider from './CustomSlider';
import "../css/TopSellingSection.css";

const { Title, Text } = Typography;

const TopSellingSection = ({ products }) => {
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
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div style={{ padding: '30px 300px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
        TOP SELLING
      </Title>
      <CustomSlider settings={sliderSettings}>
        {products.map((product) => (
          <div key={product._id} style={{ padding: '10px' }}>
            <Card styles={{}}
              hoverable
              cover={
                <img
                  alt={product.name}
                  src={product.images?.[0] || 'https://via.placeholder.com/200'}
                  style={{ height: '200px', objectFit: 'contain' }}
                />
              }
              style={{ textAlign: 'center' }}
            >
              <Text type="secondary">{product.category || 'No Category'}</Text>
              <Title level={5} style={{ margin: '5px 0',fontSize: '14px' }}>
                {product.name || 'No Name'}
              </Title>
              <Title level={4} style={{ color: '#d31837' }}>
                ${Math.ceil(product.price) || '0'}
              </Title>
              <Rate style={{ color: '#d31837' }} disabled allowHalf defaultValue={product.rating || 0} />
            </Card>
          </div>
        ))}
      </CustomSlider>
      <Divider />
      <div
        style={{
          textAlign: 'center',
          padding: '20px',
          backgroundColor: '#f9f9f9',
          backgroundImage: 'url(/images/Lovepik.png)', 
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left center',
        }}
      >
        <Title level={4}>Sign Up for the NEWSLETTER</Title>
        <div>
          <input
            type="email"
            placeholder="Enter Your Email"
            style={{
              padding: '7px',
              width: '300px',
              borderTopLeftRadius: '50px',
              borderBottomLeftRadius: '50px',
              borderRight: 'none',
            }}
          />
          <Button
            type="primary"
            style={{
              backgroundColor: '#d31837',
              padding: '18px',
              borderRadius: '0 20px 20px 0',
              border: '1px',
            }}
          >
            Subscribe
          </Button>
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
