import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Select, Slider } from 'antd';
import axios from 'axios';
import '../css/ProductDetails.css'; 

const { Option } = Select;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortOrder, setSortOrder] = useState('asc'); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://kaaryar-ecom.liara.run/v1/products');
        const data = Array.isArray(response.data) ? response.data : response.data.products;

        const prices = data.map((product) => product.price || 0);
        const min = Math.min(...prices);
        const max = Math.max(...prices);

        setProducts(data);
        setFilteredProducts(data);
        setMinPrice(min);
        setMaxPrice(max);
        setPriceRange([min, max]);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);
  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
    const filtered = products.filter(
      (product) => product.price >= value[0] && product.price <= value[1]
    );
    const sorted = filtered.sort((a, b) =>
      sortOrder === 'asc' ? a.price - b.price : b.price - a.price
    );
    setFilteredProducts(sorted);
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
    const sorted = [...filteredProducts].sort((a, b) =>
      value === 'asc' ? a.price - b.price : b.price - a.price
    );
    setFilteredProducts(sorted);
  };

  useEffect(() => {
    const sorted = [...products].filter((product) =>
   product.price >= priceRange[0] && product.price <= priceRange[1])
    .sort((a,b) => sortOrder === 'asc' ? a.price -b.price : b.price - a.pr);
    setFilteredProducts(sorted);
  }, [sortOrder, priceRange, products]);

  return (
    <div className="product-list-container">
      <Row gutter={[16, 16]} className="filter-row">
        <Col span={12}>
          <div className="filter-option">
            <span>Sort by Price:</span>
            <Select
              defaultValue="asc"
              style={{ width: 200 }}
              onChange={handleSortChange}
            >
              <Option value="asc">Lowest to Highest</Option>
              <Option value="desc">Highest to Lowest</Option>
            </Select>
          </div>
        </Col>
        <Col span={12}>
          <div className="filter-option">
            <span>Filter by Price Range:</span>
            <Slider
              range
              min={minPrice}
              max={maxPrice}
              value={priceRange}
              onChange={handlePriceRangeChange}
              tooltip={{ formatter: (value) => `$${value}` }}
            />
          </div>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className="product-grid">
        {filteredProducts.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={
                <img
                  alt={product.name}
                  src={product.images?.[0] || 'https://via.placeholder.com/150'}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              }
            >
              <Card.Meta
                title={product.name}
                description={`Price: $${product.price?.toFixed(2) || 'N/A'}`}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductList;
