import React from "react";
import { Row, Col, Card, Typography } from "antd";
import "../css/CollectionComponent.css";

const { Text, Title } = Typography;

const CollectionComponent = () => {
  const collections = [
    { title: "Laptop Collection", imgSrc: "" },
    { title: "Accessories Collection", imgSrc: "accessories.jpg" },
    { title: "Cameras Collection", imgSrc: "cameras.jpg" },
  ];

  return (
    <Row gutter={[16, 16]} justify="center" style={{paddingLeft: '150px', paddingRight:'150px'}}>
      {collections.map((collection, index) => (
        <Col key={index} xs={24} sm={12} md={8}>
          <Card
            hoverable
            style={{ position: "relative", overflow: "hidden" }}
            cover={<img alt={collection.title} src={collection.imgSrc} />}
          >
            <div className="red-overlay">
              <div className="text-container">
                <Title level={4} style={{ color: "#fff", marginBottom: "0" }}>
                  {collection.title}
                </Title>
                <Text style={{ color: "#fff", fontSize: "16px" }}>SHOP NOW ➔</Text>
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CollectionComponent;
