import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Rate, Button, Menu } from 'antd';
import CustomSlider from './CustomSlider';
import NewCollection from './NewCollection';
import TopSellingSection from './TopSellingSection';
import CollectionComponent from './CollectionComponent';


const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

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
          category: typeof category.category === 'string' ? category.category : 'Unknown',
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

  const handleMenuClick = (e) => {
    setActiveCategory(e.key);
  };

  const filteredCategories =
    activeCategory === 'All'
      ? categories
      : categories.filter((cat) => cat.category === activeCategory);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div >
      <Menu
        mode="horizontal"
        onClick={handleMenuClick}
        selectedKeys={[activeCategory]}
        style={{
          justifyContent: 'flex-end',
          paddingRight: '240px',
          marginBottom: '20px',
        }}
         className="custom-menu"
      >
        <Menu.Item key="All">All</Menu.Item>
        <Menu.Item key="Laptops">Laptops</Menu.Item>
        <Menu.Item key="Smartphones">Smartphones</Menu.Item>
        <Menu.Item key="Cameras">Cameras</Menu.Item>
        <Menu.Item key="Accessories">Accessories</Menu.Item>
      </Menu>

      <div>
        <CollectionComponent />
      </div>

      <div style={{ padding: '20px 300px' }}>
        <h2>New Products</h2>
        <CustomSlider settings={sliderSettings}>
          {filteredCategories.map((category) => (
            <div key={category._id} style={{ padding: '10px' }}>
              <Link to={`/ProductDetails/${category._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={category.name}
                      src={category.images?.[0] || 'https://via.placeholder.com/200'}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                  }
                >
                  <Card.Meta title={category.name || 'No Name'} />
                  <div style={{ marginTop: '10px', fontWeight: 'bold', color: '#d31837' }}>
                    ${Math.ceil(category.price) || '0'}
                  </div>
                  <div>
                    <Rate
                      style={{ color: '#d31837' }}
                      defaultValue={category.rating || 0}
                      disabled
                    />
                  </div>
                </Card>
              </Link>
              <div
                className="add-to-cart-btn-container"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '10px',
                }}
              >
                <Button
                  type="primary"
                  style={{
                    backgroundColor: '#d31837',
                    borderColor: '#d31837',
                    borderRadius: '50px',
                    width: '150px',
                  }}
                  onClick={() => navigate(`/ProductFeatureCard/${category._id}`)} 
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </CustomSlider>
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
