import React, { useEffect, useState } from "react";
import { Layout, Menu, Button, Row, Col, Space, Flex } from "antd";
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
  const [isShow, setIsShow] = useState(false);
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
    setIsShow(false);
    setCategory(category);
    setSearch("");
  };

  return (
    <Layout>
      <div
        style={{
          backgroundColor: "#000",
          color: "#fff",
          padding: "10px 300px 10px",
        }}
      >
        <Row justify="space-between">
          <Col>
            <Space size="large">
              <span>
                <LocalPhoneIcon style={{ color: "#d31837" }} />{" "}
                <a
                  href="tel:+09375291734"
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  09375241374
                </a>
              </span>
              <span>
                <EmailIcon style={{ color: "#d31837" }} />{" "}
                <a
                  href="mailto:earabi@gmail.com"
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  earabi@gmail.com
                </a>
              </span>
              <span>
                <PlaceIcon style={{ color: "#d31837" }} /> karyar
              </span>
            </Space>
          </Col>
          <Col>
            <Space size="large">
              <span>
                <AttachMoneyIcon style={{ color: "#d31837" }} /> USD
              </span>
              <a
                href="#account"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                <LockIcon style={{ color: "#d31837" }} />
                My Account
              </a>
            </Space>
          </Col>
        </Row>
      </div>
      <Header style={{ backgroundColor: "#000", padding: "10px 300px" }}>
        <Row justify="space-between" align="middle">
          <Col>
            <h1 style={{ color: "#fff", marginBottom: "10px" }}>
              Electro<span style={{ color: "#d31837" }}>.</span>
            </h1>
          </Col>
          <Col flex="auto" style={{ marginLeft: "100px" }}>
            <Flex align="middle">
              <Col>
                <div>
                  <Button
                    style={{
                      borderRadius: "20px 0 0 20px",
                      border: "1px solid #d31837",
                      backgroundColor: "#fff",
                      color: "#d31837",
                      width: "150px",
                    }}
                    onClick={() => setIsShow(!isShow)}
                  >
                    {category}
                  </Button>
                  {isShow && (
                    <Menu
                      style={{
                        position: "absolute",
                        zIndex: "100",
                      }}
                    >
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
                        <Menu.Item key="no-category">
                          No Categories Available
                        </Menu.Item>
                      )}
                    </Menu>
                  )}
                </div>
              </Col>
              <Col>
                <SearchHeader search={search} setSearch={setSearch} />
              </Col>
            </Flex>
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
          <Menu.Item key="home">Home</Menu.Item>
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
