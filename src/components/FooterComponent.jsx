import React from "react";
import { Layout, Row, Col, Menu, Space } from "antd";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import PlaceIcon from "@mui/icons-material/Place";
import '../css/FooterComponent.css'; 

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
    <Footer className="footer">
      <Row justify="space-between">
        <Col span={6}>
          <h3>About Us</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p className="contact-info">
            <PlaceIcon /> Address: 1234 Stonecool Rd
          </p>
          <p className="contact-info">
            <EmailIcon /> Email: email@example.com
          </p>
          <p className="contact-info">
            <LocalPhoneIcon /> Phone: +123456789
          </p>
        </Col>

        <Col span={6}>
          <h3>Categories</h3>
          <Menu mode="vertical" theme="dark" className="menu">
            {categories && categories.length > 0 ? (
              categories.map((category, index) => (
                <Menu.Item key={`category-${index}`} className="menu-item">
                  {category}
                </Menu.Item>
              ))
            ) : (
              <Menu.Item key="no-category" className="menu-item">
                No Categories Available
              </Menu.Item>
            )}
          </Menu>
        </Col>

        <Col span={6}>
          <h3>Information</h3>
          <Menu mode="vertical" theme="dark" className="menu">
            {information && information.length > 0 ? (
              information.map((info, index) => (
                <Menu.Item key={`info-${index}`} className="menu-item">
                  {info}
                </Menu.Item>
              ))
            ) : (
              <Menu.Item key="no-info" className="menu-item">
                No Information Available
              </Menu.Item>
            )}
          </Menu>
        </Col>

        <Col span={6}>
          <h3>Service</h3>
          <Menu mode="vertical" theme="dark" className="menu">
            {service && service.length > 0 ? (
              service.map((serviceItem, index) => (
                <Menu.Item key={`service-${index}`} className="menu-item">
                  {serviceItem}
                </Menu.Item>
              ))
            ) : (
              <Menu.Item key="no-service" className="menu-item">
                No Services Available
              </Menu.Item>
            )}
          </Menu>
        </Col>
      </Row>

      <Row justify="center" className="footer-bottom">
        <Col>
          <Space className="footer-text">
            © 2024 Electro. All Rights Reserved.
          </Space>
        </Col>
      </Row>
    </Footer>
  );
};

export default FooterComponent;
