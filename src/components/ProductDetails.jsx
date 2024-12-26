import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Select, Slider } from 'antd';
import axios from 'axios';
import '../css/ProductDetails.css'; 

const { Option } = Select;
<<<<<<< HEAD

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
=======
const ProdutDetails = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("popular");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://kaaryar-ecom.liara.run/v1/products?page=${page}&limit=${limit}`
      );
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, limit]);

  return (
    <div style={{ padding: "20px" }}>
      {/* Sorting and Pagination Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div>
          <span style={{ marginRight: "10px" }}>Sort By:</span>
          <Select
            value={sortBy}
            onChange={setSortBy}
            style={{ width: "150px" }}
          >
            <Option value="popular">Popular</Option>
            <Option value="priceAsc">Price: Low to High</Option>
            <Option value="priceDesc">Price: High to Low</Option>
          </Select>
        </div>
        <div>
          <span style={{ marginRight: "10px" }}>Show:</span>
          <Select
            value={limit}
            onChange={(value) => setLimit(value)}
            style={{ width: "100px" }}
          >
            <Option value={10}>10</Option>
            <Option value={20}>20</Option>
            <Option value={30}>30</Option>
          </Select>
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {products.map((product) => (
            <Col xs={24} sm={12} md={8} lg={6} key={product._id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={product.title}
                    src={product.image || "https://via.placeholder.com/150"}
                  />
                }
                actions={[
                  <span>Add to Cart</span>,
                  <span>❤</span>,
                  <span>🔍</span>,
                ]}
              >
                <Meta
                  title={product.title}
                  description={
                    <>
                      <div>
                        <b>${product.price}</b> <del>${product.oldPrice}</del>
                      </div>
                      <div style={{ color: "gold" }}>
                        {"★".repeat(Math.round(product.rating))}
                        {"☆".repeat(5 - Math.round(product.rating))}
                      </div>
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Pagination */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Select
          value={page}
          onChange={(value) => setPage(value)}
          style={{ width: "150px" }}
        >
          {[...Array(5)].map((_, index) => (
            <Option key={index + 1} value={index + 1}>
              Page {index + 1}
            </Option>
          ))}
        </Select>
      </div>
>>>>>>> ee1ba43713cdd4f5c057b7210e51c19daa282ca8
    </div>
  );
};

<<<<<<< HEAD
export default ProductList;
=======
export default ProdutDetails;
>>>>>>> ee1ba43713cdd4f5c057b7210e51c19daa282ca8
