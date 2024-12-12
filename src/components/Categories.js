import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Card, Button } from 'antd';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://kaaryar-ecom.liara.run/v1/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div>Loading categories...</div>;
  }

  return (
    <div style={{ padding: '20px 300px' }}>
      <Row gutter={[16, 16]}>
        {categories.map((category) => (
          <Col key={category._id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={
                <img
                  alt={category.name}
                  src={category.image} // Assuming the category API provides image URLs
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              }
            >
              <Card.Meta title={category.name} />
              <Button
                type="primary"
                style={{ marginTop: '10px', backgroundColor: '#d31837', border: 'none' }}
                block
              >
                Shop Now
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Categories;
