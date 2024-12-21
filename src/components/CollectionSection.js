import React from 'react';
import { useSelector } from 'react-redux';
import { selectCollections } from '../redux/collectionsSlice';
import { Card, Col, Row, Button } from 'antd';
import "antd/dist/reset.css";

const CollectionSection = () => {
  const collections = useSelector(selectCollections);

  return (
    <Row gutter={16} justify="center">
      {collections.map((collection) => (
        <Col span={8} key={collection.id}>
          <Card
            hoverable
            cover={<img alt={collection.title} src={collection.image} />}
            style={{ borderRadius: '8px' }}
          >
            <Card.Meta title={collection.title} />
            <Button type="primary" style={{ marginTop: '10px' }}>
              SHOP NOW
            </Button>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CollectionSection;