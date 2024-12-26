import React from "react";

import { Layout, Row, Col, Menu } from "antd";

const { Footer } = Layout;
const categories = [
  "Hot Deals",
  "Laptops",
  "Smartphones",
  "Cameras",
  "Accessories",
];
const information = [
  "About Us",
  "Contact Us",
  "Privacy Policy",
  "Orders and Returns",
  "Terms & Conditions",
];
const service = [
  "My Account",
  "View Cart",
  "Wishlist",
  "Track My Order",
  "Help",
];

const FooterComponent = () => {
  return (
    <Footer
      style={{
        backgroundColor: "#15151d",
        color: "#fff",
        padding: "50px 300px",
      }}
    >
      <Row justify="space-between">
        <Col span={6}>
          <h3>About Us</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>Address: 1234 Stonecool Rd</p>
          <p>Email: email@example.com</p>
        </Col>
        <Col span={6}>
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
