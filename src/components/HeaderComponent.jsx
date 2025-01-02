import React, { useEffect, useState } from "react";
import { Layout, Menu, Button, Row, Col, Space, Dropdown } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import axios from "axios";
import "antd/dist/reset.css";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import PlaceIcon from "@mui/icons-material/Place";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LockIcon from "@mui/icons-material/Lock";
import SearchHeader from "./SearchHeader";
import "../css/HeaderComponent.css";

const { Header } = Layout;

const HeaderComponent = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("Clothing");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://kaaryar-ecom.liara.run/v1/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategorySelect = (category) => {
    setCategory(category);
    setSearch("");
  };

  const menu = (
    <Menu>
      {categories.length > 0 ? (
        categories.map((category) => (
          <Menu.Item
            key={category._id}
            onClick={() => handleCategorySelect(category.name)}
          >
            {category.name}
          </Menu.Item>
        ))
      ) : (
        <Menu.Item key="no-category">No Categories Available</Menu.Item>
      )}
    </Menu>
  );

  return (
    <Layout>
      <div
        style={{
          backgroundColor: "#000",
          color: "#fff",
          padding: "10px 300px 10px",
        }}
      >
        <Row justify="space-between" align="middle">
          <Col>
            <Space size="large" style={{ display: "flex", alignItems: "center" }}>
              <span style={{ display: "flex", alignItems: "center" }}>
                <LocalPhoneIcon style={{ color: "#d31837", marginRight: "5px" }} />
                <a
                  href="tel:+09375291734"
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  09375241374
                </a>
              </span>
              <span style={{ display: "flex", alignItems: "center" }}>
                <EmailIcon style={{ color: "#d31837", marginRight: "5px" }} />
                <a
                  href="mailto:earabi@gmail.com"
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  earabi@gmail.com
                </a>
              </span>
              <span style={{ display: "flex", alignItems: "center" }}>
                <PlaceIcon style={{ color: "#d31837", marginRight: "5px" }} />
                karyar
              </span>
            </Space>
          </Col>
          <Col>
            <Space size="large" style={{ display: "flex", alignItems: "center" }}>
              <span style={{ display: "flex", alignItems: "center" }}>
                <AttachMoneyIcon style={{ color: "#d31837", marginRight: "5px" }} />
                USD
              </span>
              <a
                href="#account"
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <LockIcon style={{ color: "#d31837", marginRight: "5px" }} />
                My Account
              </a>
            </Space>
          </Col>
        </Row>
      </div>
      <Header style={{ backgroundColor: "#000", padding: "0 300px" }}>
        <Row justify="space-between" align="middle">
          <Col>
            <h1 style={{ color: "#fff", marginBottom: "10px" }}>
              Electro<span style={{ color: "#d31837"}}>.</span>
            </h1>
          </Col>
          <Col flex="auto" style={{ marginLeft: "100px" }}>
            <Space align="middle" style={{  columnGap: '0px' }}>
              <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft">
                <Button
                  style={{
                    borderRadius: "20px 0 0 20px",
                    border: "1px solid #d31837",
                    backgroundColor: "#fff",
                    color: "#d31837",
                    width: "150px",
                  }}
                >
                  {category}
                </Button>
              </Dropdown>
              <SearchHeader search={search} setSearch={setSearch} />
            </Space>
          </Col>
          <Col>
            <Space size="large">
              <a href="#wishlist" style={{ color: "#fff" }}>
                <HeartOutlined style={{ fontSize: "20px" }} /> Your Wishlist
              </a>
              <a href="#cart" style={{ color: "#fff" }}>
                <ShoppingCartOutlined style={{ fontSize: "20px" }} /> Your Cart
              </a>
            </Space>
          </Col>
        </Row>
      </Header>
      <div style={{ padding: "10px 300px 10px", backgroundColor: "#ffffff" }}>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["home"]}
          className="custom-menu"
        >
          <Menu.Item key="home"><a href="/">Home</a></Menu.Item>
          <Menu.Item key="hotdeals">Hot Deals</Menu.Item>
          <Menu.Item key="categories">Categories</Menu.Item>
          <Menu.Item key="laptops">Laptops</Menu.Item>
          <Menu.Item key="smartphones">Smartphones</Menu.Item>
          <Menu.Item key="cameras">Cameras</Menu.Item>
          <Menu.Item key="accessories">Accessories</Menu.Item>
        </Menu>
      </div>
    </Layout>
  );
};

export default HeaderComponent;
