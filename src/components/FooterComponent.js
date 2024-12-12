import React from 'react';
import { useSelector } from 'react-redux';
import { Layout, Row, Col, Menu } from 'antd';

const { Footer } = Layout;

const FooterComponent = () => {
  // Access footer data from the Redux store
  const footerData = useSelector((state) => state);

  if (!footerData) {
    return null; 
  }

  const { categories, information, service } = footerData;

  return (
    <Footer style={{ backgroundColor: '#15151d', color: '#fff', padding: '50px 300px' }}>
      <Row justify="space-between">
        <Col span={6}>
          <h3>About Us</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>Address: 1234 Stonecool Rd</p>
          <p>Email: email@example.com</p>
        </Col>
        <Col span={6} >
          <h3>Categories</h3>
          <Menu mode="vertical" theme="dark">
            {categories &&
              categories.map((category, index) => (
                <Menu.Item key={`category-${index}`}>{category}</Menu.Item>
              ))}
          </Menu>
        </Col>
        <Col span={6}>
          <h3>Information</h3>
          <Menu mode="vertical" theme="dark">
            {information &&
              information.map((info, index) => (
                <Menu.Item key={`info-${index}`}>{info}</Menu.Item>
              ))}
          </Menu>
        </Col>
        <Col span={6}>
          <h3>Service</h3>
          <Menu mode="vertical" theme="dark">
            {service &&
              service.map((serviceItem, index) => (
                <Menu.Item key={`service-${index}`}>{serviceItem}</Menu.Item>
              ))}
          </Menu>
        </Col>
      </Row>
    </Footer>
  );
};

export default FooterComponent;
