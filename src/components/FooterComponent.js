import React from "react";
import { Layout, Row, Col, Menu, Space } from "antd";

import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import PlaceIcon from "@mui/icons-material/Place";

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
          <h3 style={{ color: "#d31837" }}>About Us</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>
            <PlaceIcon style={{ color: "#d31837", marginRight: "8px" }} />
            Address: 1234 Stonecool Rd
          </p>
          <p>
            <EmailIcon style={{ color: "#d31837", marginRight: "8px" }} />
            Email: email@example.com
          </p>
          <p>
            <LocalPhoneIcon style={{ color: "#d31837", marginRight: "8px" }} />
            Phone: +123456789
          </p>
        </Col>

        {/* "Categories" */}
        <Col span={6}>
          <h3 style={{ color: "#d31837" }}>Categories</h3>
          <Menu
            mode="vertical"
            theme="dark"
            style={{ backgroundColor: "transparent", border: "none" }}
          >
            {categories && categories.length > 0 ? (
              categories.map((category, index) => (
                <Menu.Item key={`category-${index}`} style={{ color: "#fff" }}>
                  {category}
                </Menu.Item>
              ))
            ) : (
              <Menu.Item key="no-category" style={{ color: "#fff" }}>
                No Categories Available
              </Menu.Item>
            )}
          </Menu>
        </Col>
        {/* information section */}
        <Col span={6}>
          <h3 style={{ color: "#d31837" }}>Information</h3>
          <Menu
            mode="vertical"
            theme="dark"
            style={{ backgroundColor: "transparent", border: "none" }}
          >
            {information && information.length > 0 ? (
              information.map((info, index) => (
                <Menu.Item key={`info-${index}`} style={{ color: "#fff" }}>
                  {info}
                </Menu.Item>
              ))
            ) : (
              <Menu.Item key="no-info" style={{ color: "#fff" }}>
                No Information Available
              </Menu.Item>
            )}
          </Menu>
        </Col>
        <Col span={6}>
          <h3 style={{ color: "#d31837" }}>Service</h3>
          <Menu
            mode="vertical"
            theme="dark"
            style={{ backgroundColor: "transparent", border: "none" }}
          >
            {service && service.length > 0 ? (
              service.map((serviceItem, index) => (
                <Menu.Item key={`service-${index}`} style={{ color: "#fff" }}>
                  {serviceItem}
                </Menu.Item>
              ))
            ) : (
              <Menu.Item key="no-service" style={{ color: "#fff" }}>
                No Services Available
              </Menu.Item>
            )}
          </Menu>
        </Col>
      </Row>
      <Row
        justify="center"
        style={{
          marginTop: "20px",
          borderTop: "1px solid #444",
          paddingTop: "10px",
        }}
      >
        <Col>
          <Space style={{ color: "#fff", fontSize: "12px" }}>
            © 2024 Electro. All Rights Reserved.
          </Space>
        </Col>
      </Row>
    </Footer>
  );
};

export default FooterComponent;
