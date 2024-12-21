import React from 'react';
import { Row, Col, Card, Typography, Button, Rate, Divider } from 'antd';

const { Title, Text } = Typography;

const TopSellingSection = ({products}) => {
  return (
    <div style={{ padding: '30px 300px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
        TOP SELLING
      </Title>
      <Row gutter={[24, 24]} justify="center">
        {products.map((product) => (
  <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
    <Card
      hoverable
      cover={
        <img
          alt={product.name}
          src={product.image}
          style={{ height: '200px', objectFit: 'contain' }}
        />
      }
      style={{ textAlign: 'center' }}
    >
      <Text type="secondary">{product.category || 'No Category'}</Text>
      <Title level={5} style={{ margin: '10px 0' }}>
        {product.name || 'No Name'}
      </Title>
      <Title level={4} style={{ color: '#d31837' }}>
        ${product.price?.toFixed(2) || '0.00'}
      </Title>
      <Rate disabled allowHalf defaultValue={product.rating || 0} />
      {product.isNew && (
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            backgroundColor: '#d31837',
            color: 'white',
            padding: '5px 10px',
            fontSize: '12px',
            fontWeight: 'bold',
          }}
        >
          NEW
        </div>
      )}
    </Card>
  </Col>
))}
      </Row>
      <Divider />
      <Row justify="space-between" style={{ marginTop: '20px' }}>
        {[1, 2, 3].map((section) => (
          <Col key={section} xs={24} sm={12} md={8}>
            <Title level={4}>TOP SELLING</Title>
            <ul style={{ paddingLeft: '0', listStyle: 'none' }}>
              <li style={{ marginBottom: '10px' }}>
                <Text strong>Product Name Goes Here</Text>
                <Text style={{ color: '#d31837', marginLeft: '10px' }}>
                  $890.00
                </Text>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Text strong>Product Name Goes Here</Text>
                <Text style={{ color: '#d31837', marginLeft: '10px' }}>
                  $900.00
                </Text>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Text strong>Product Name Goes Here</Text>
                <Text style={{ color: '#d31837', marginLeft: '10px' }}>
                  $920.00
                </Text>
              </li>
            </ul>
          </Col>
        ))}
      </Row>
      <Divider />
      <div
        style={{
          textAlign: 'center',
          padding: '20px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <Title level={4}>Sign Up for the NEWSLETTER</Title>
        <div>
          <input
            type="email"
            placeholder="Enter Your Email"
            style={{
              padding: '10px',
              width: '300px',
              marginRight: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
          <Button type="primary" style={{ backgroundColor: '#d31837', border: 'none' }}>
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopSellingSection;
