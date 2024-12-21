import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Card, Rate, Button } from 'antd';
import NewCollection from './NewCollection';
import TopSellingSection from './TopSellingSectio';
import CollectionComponent from './CollectionComponent';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://kaaryar-ecom.liara.run/v1/products?page=1&limit=10');
        const validCategories = response.data.products.map((category) => ({
          _id: category._id,
          name: category.name || 'No Name',
          images: category.images || [],
          price: category.price || 0,
          rating: category.rating || 0,
          category: typeof category.category === 'string' ? category.category : 'Unknown', // مدیریت مقدار رشته
        }));
        setCategories(validCategories);
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
    <div>
      <div>
        <CollectionComponent />
      </div>
      <div style={{ padding: '20px 300px' }}>
        <h2>New Products</h2>
        <Row gutter={[16, 16]}> {console.log(categories)}
        {categories.map((category) => (
  <Col key={category._id} xs={24} sm={12} md={8} lg={6}>
    <Card
      hoverable
      cover={
        <img
          alt={category.name}
          src={category.images?.[0] || 'https://via.placeholder.com/200'} // استفاده از تصویر پیش‌فرض
          style={{ height: '200px', objectFit: 'cover' }}
        />
      }
    >
      <Card.Meta title={category.name || 'No Name'} />
      <div style={{ marginTop: '10px', fontWeight: 'bold', color: '#d31837' }}>
        ${category.price?.toFixed(2) || '0.00'}
      </div>
      <div>
        <Rate style={{ color: '#d31837' }} defaultValue={category.rating || 0} disabled />
      </div>
    </Card>
    <div
      className="add-to-cart-btn-container"
      style={{ backgroundColor: '#000' }}
    >
      <Button
        type="primary"
        block
        style={{
          marginTop: '10px',
          marginLeft: '25px',
          backgroundColor: '#d31837',
          width: '150px',
          borderRadius: '50px',
        }}
      >
        Add to Cart
      </Button>
    </div>
  </Col>
))}
        </Row>
      </div>
      <div>
        <NewCollection />
      </div>
      <div>
      <TopSellingSection products={categories} />
      </div>
    </div>
  );
};

export default Categories;
