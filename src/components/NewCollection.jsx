import React from 'react';
import { Col, Row, Button, Typography, Image } from 'antd';
import "antd/dist/reset.css";
import "../css/NewCollection.css";

const { Title, Text } = Typography;

const NewCollection = () => {
  return (
    <div className="new-collection-container">
      <Row justify="center" gutter={[16, 16]} className="new-collection-row">
        <Col xs={24} md={8}>
          <Image
            className="new-collection-image"
            src="https://picsum.photos/seed/qf2VJg/640/480"
            alt="Laptop"
            preview={false}
          />
        </Col>

        <Col xs={24} md={8} className="new-collection-timer">
          <div>
            <Row justify="center" gutter={[10, 10]}>
              {["02 DAYS", "10 HOURS", "34 MINS", "60 SECS"].map((time, index) => {
                const [value, unit] = time.split(" ");
                return (
                  <Col key={index} className="timer-item">
                    <Title level={5} className="timer-item-title">{value}</Title>
                    <Text className="timer-item-text">{unit}</Text>
                  </Col>
                );
              })}
            </Row>
            <Title level={3} className="deal-title">HOT DEAL THIS WEEK</Title>
            <Text className="deal-description">NEW COLLECTION UP TO 50% OFF</Text>
            <div>
              <Button type="primary" size="large" className="shop-now-btn">
                SHOP NOW
              </Button>
            </div>
          </div>
        </Col>

        <Col xs={24} md={8}>
          <Image
            className="new-collection-image"
            src="https://picsum.photos/seed/t5q2QlQa/640/480"
            alt="Headphones"
            preview={false}
          />
        </Col>
      </Row>
    </div>
  );
};

export default NewCollection;
