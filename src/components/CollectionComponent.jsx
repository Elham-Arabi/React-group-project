import React from "react";
import { Row, Col, Card, Typography } from "antd";
import { Link } from "react-router-dom";
import "../css/CollectionComponent.css";

const { Text, Title } = Typography;

const CollectionComponent = () => {
  const collections = [
    { id: 1, title: "Laptop Collection", imgSrc: "/images/2035554291.png" },
    { id: 2, title: "Accessories Collection", imgSrc: "/images/headset-kleur-zwart.jpg" },
    { id: 3, title: "Cameras Collection", imgSrc: "/images/camera-photo2.jpg" },
  ];

  return (
    <Row className="collection-row" gutter={[16, 16]}>
      {collections.map((collection) => (
        <Col key={collection.id} xs={24} sm={12} md={8}>
          <Link to={`/product-details/${collection.id}`}>
            <Card
              hoverable
              className="collection-card"
              cover={<img alt={collection.title} src={collection.imgSrc} />}
            >
              <div className="red-overlay">
                <div className="text-container">
                  <Title level={4} className="collection-title">
                    {collection.title}
                  </Title>
                  <Text className="collection-shop-now">SHOP NOW ➔</Text>
                </div>
              </div>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
};

export default CollectionComponent;
