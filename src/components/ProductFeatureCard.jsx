import React, { useEffect, useState } from "react";
import axios from "axios";
import { HeartOutlined, SwapOutlined,FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined  } from "@ant-design/icons";
import { Card, Rate, Row, Col, Button, Input, Select, Tabs, Progress, Carousel } from "antd";

const { TabPane } = Tabs;
const { Option } = Select;

const ProductFeatureCard = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://kaaryar-ecom.liara.run/v1/products/top-rated`
        );
        if (response.data && response.data.length > 0) {
          setProducts(response.data); 
          setSelectedProduct(response.data[0]); 
        } else {
          console.error("No products found");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "20px 250px" }}>
      <Row gutter={16}>
       
        <Col xs={24} md={8}>
          <Card>
            <Carousel 
              vertical={true} 
              arrows={false} 
              infinite={true} 
              dots={true} 
              dotPosition="left" 
              slidesToShow={4} 
            >
              {products.map((product, index) => (
                <div
                  key={index}
                  style={{
                    padding: "5px",
                    cursor: "pointer",
                    border:
                      selectedProduct?.id === product.id
                        ? "2px solid #d31837"
                        : "none",
                    marginBottom: "10px", 
                  }}
                  onClick={() => setSelectedProduct(product)} 
                >
                  <img
                    src={product?.images?.[0] || "https://via.placeholder.com/80"}
                    alt={product?.name || `Product ${index + 1}`}
                    style={{
                      width: "80px", 
                      height: "80px", 
                      marginBottom: "10px", 
                      display: "block", 
                      marginLeft: "auto", 
                      marginRight: "auto"
                    }} 
                  />
                </div>
              ))}
            </Carousel>
          </Card>
        </Col>

        
        <Col xs={24} md={16}>
          <Card>
            <Row gutter={16}>
            
              <Col xs={24} md={12}>
                <div>
                  <img
                    src={selectedProduct?.images?.[0] || "https://via.placeholder.com/300"}
                    alt={selectedProduct?.name || "Product"}
                    style={{ width: "300px", marginBottom: "10px" }}
                  />
                </div>
              </Col>

              
              <Col xs={24} md={12}>
                <h2 style={{fontWeight: 'bold' }}>{selectedProduct?.name || "PRODUCT NAME GOES HERE"}</h2>
                <Rate style={{color:'#d31837'}}
                    allowHalf
                    defaultValue={selectedProduct?.rating || 0}
                    disabled
                  />
      <p>{selectedProduct?.rating} ({selectedProduct?.ratingCount || 0} reviews)</p>
                <p style={{ fontSize: "14px" }}>
                  Reviews | <span href="#review">Add your review</span>
                </p>
                <h3 style={{ color: "#d31837" }}>
                  ${Math.ceil(selectedProduct?.price) || "0.00"}
                </h3>
                <p style={{ textDecoration: "line-through", color: "gray" }}>
                  $990.00
                </p>
                <p style={{ color: "#d31837", fontWeight: 'bold' }}>IN STOCK</p>
                <p>
                  {selectedProduct?.description ||
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                </p>
                <p style={{ color: "#d31837", fontWeight: 'bold' }}>
                  {selectedProduct?.category.name ||
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                </p>
                <Row gutter={16} style={{ marginBottom: "10px" }}>
                  <Col span={12}>
                    <label>Size:</label>
                    <Select
                      defaultValue="Select Size"
                      style={{ width: "100%" }}
                      placeholder="Select Size"
                    >
                      <Option value="S">Small</Option>
                      <Option value="M">Medium</Option>
                      <Option value="L">Large</Option>
                    </Select>
                  </Col>
                  <Col span={12}>
                    <label>Color:</label>
                    <Select
                      defaultValue="Select Color"
                      style={{ width: "100%" }}
                      placeholder="Select Color"
                    >
                      <Option value="Red">Red</Option>
                      <Option value="Blue">Blue</Option>
                      <Option value="Green">Green</Option>
                    </Select>
                  </Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: "10px" }}>
                  <Col span={12}>
                    <label>Qty:</label>
                    <Input type="number" defaultValue={1} min={1} />
                  </Col>
                </Row>
                <Button
                  type="primary"
                  style={{ backgroundColor: "#d31837", borderColor: "#d31837" }}
                >
                  ADD TO CART
                </Button>
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  <Button style={{border: 'none',fontSize:'13px'}}><HeartOutlined  />Add to Wishlist</Button>
                  <Button  style={{border: 'none',fontSize:'13px'}}><SwapOutlined /> Add to Compare</Button>
                </div>
                <p style={{ fontWeight: 'bold',paddingTop: '10px' }}>
                   CATEGORY: {selectedProduct?.category.name ||
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                </p>
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
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

     
      <Row style={{ marginTop: "20px" }} gutter={16} justify="center">
        <Col span={24}>
          <Tabs defaultActiveKey="1" centered
          >
            <TabPane tab="Description" key="1">
              <Row gutter={16}>
                <Col span={6}>
                  <h3>Product Overview</h3>
                  <p>{selectedProduct?.longDescription || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}</p>
                </Col>
                <Col span={6}>
                  <h3>Product Features</h3>
                  <p>Feature 1</p>
                  <p>Feature 2</p>
                </Col>
                <Col span={6}>
                  <h3>Technical Details</h3>
                  <p>Detail 1</p>
                  <p>Detail 2</p>
                </Col>
                <Col span={6}>
                  <h3>Additional Information</h3>
                  <p>More details about the product here.</p>
                </Col>
              </Row>
            </TabPane>

            <TabPane tab="Details" key="2">
              <Row gutter={16}>
                <Col span={6}>
                  <h3>Size Information</h3>
                  <p>{selectedProduct?.size || "Size details here."}</p>
                </Col>
                <Col span={6}>
                  <h3>Color Options</h3>
                  <p>{selectedProduct?.color || "Color options here."}</p>
                </Col>
                <Col span={6}>
                  <h3>Material</h3>
                  <p>{selectedProduct?.material || "Material details here."}</p>
                </Col>
                <Col span={6}>
                  <h3>Warranty</h3>
                  <p>{selectedProduct?.warranty || "Warranty details here."}</p>
                </Col>
              </Row>
            </TabPane>

            <TabPane tab="Reviews" key="3" >
              <Row gutter={16} >
                <Col span={6}>
                  <h3>{selectedProduct?.rating || 0}</h3>
                  <Rate style={{color:'#d31837'}}
                    allowHalf
                    defaultValue={selectedProduct?.rating || 0}
                    disabled
                  />
                  <Progress percent={90} showInfo={false} strokeColor="#d31837" />
                  <Progress percent={75} showInfo={false} strokeColor="#d31837" />
                  <Progress percent={50} showInfo={false}strokeColor="#d31837" />
                </Col>

                <Col span={6}>
                  <h4 >John</h4>
                  <p>{selectedProduct?.rating}</p>
                  <Rate defaultValue={5} disabled  style={{color:'#d31837'}}/>
                  <h4>John</h4>
                  <p>{selectedProduct?.rating}</p>
                  <Rate defaultValue={4} disabled style={{color:'#d31837'}} />
                  <h4 >John</h4>
                  <p>{selectedProduct?.rating}</p>
                  <Rate defaultValue={5} disabled  style={{color:'#d31837'}}/>
                </Col>
                <Col span={6}>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Est sint, sed perferendis, debitis corporis possimus error animi
                      </p>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Est sint, sed perferendis, debitis corporis possimus error animi
                      </p>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Est sint, sed perferendis, debitis corporis possimus error animi
                      </p>   
                </Col>

                <Col span={6}>
                  <h4>Submit Your Review</h4>
                  <Input
                    placeholder="Your Name"
                    style={{ marginBottom: "10px" }}
                  />
                  <Input
                    placeholder="Your Email"
                    style={{ marginBottom: "10px" }}
                  />
                  <Input.TextArea
                    rows={4}
                    placeholder="Your Review"
                    style={{ marginBottom: "10px" }}
                  />
                  <Rate />
                  <Button type="primary" style={{ marginTop: "10px", backgroundColor: '#d31837' }}>
                    Submit
                  </Button>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};

export default ProductFeatureCard;
