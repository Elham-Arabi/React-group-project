import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Rate, Button, Menu } from 'antd';
import CustomSlider from './CustomSlider';
import NewCollection from './NewCollection';
import TopSellingSection from './TopSellingSection';
import CollectionComponent from './CollectionComponent';
import '../css/Categories.css'; 

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
    <div>
      <Menu
        mode="horizontal"
        onClick={handleMenuClick}
        selectedKeys={[activeCategory]}
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
      <div className="categories-container">
        <h2 className="new-products-title">New Products</h2>
        <CustomSlider settings={sliderSettings}>
          {filteredCategories.map((category) => (
            <div key={category._id} className="category-card">
              <Link to={`/ProductFeatureCard/${category._id}`}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={category.name}
                      src={category.images?.[0] || 'https://via.placeholder.com/200'}
                    />
                  }
                >
                  <Card.Meta title={category.name || 'No Name'} />
                  <div className="category-card-meta">
                    ${Math.ceil(category.price) || '0'}
                  </div>
                  <Rate className="category-card-rate" defaultValue={category.rating || 0} disabled />
                </Card>
              </Link>
              <div className="add-to-cart-btn-container">
                <Button
                  className="add-to-cart-btn"
                  onClick={() => {
                    if (category?._id) {
                      navigate(`/ProductFeatureCard/${category._id}`);
                    } else {
                      console.error('Category ID is not available.');
                    }
                  }}
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
