import React, { useEffect, useState } from "react";
import { Row, Col, Card, Select, Slider, Rate, Button, Checkbox } from "antd";
import axios from "axios";
import "../css/ProductDetails.css";
import { Link } from "react-router-dom";

const { Option } = Select;

const ProductDetails = () => {
  const [products, setProducts] = useState([]);
  const [isSelect, setIsSelect] = useState(false);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const productResponse = await axios.get(
          "https://kaaryar-ecom.liara.run/v1/products"
        );
        const productData = Array.isArray(productResponse.data)
          ? productResponse.data
          : productResponse.data.products;

        console.log("Products:", productData);

        const updatedProducts = productData.map((product) => ({
          ...product,
          category: product.category || "uncategorized",
        }));

        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);

        // max and min price
        const prices = updatedProducts.map((product) => product.price || 0);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        setMinPrice(min);
        setMaxPrice(max);
        setPriceRange([min, max]);

        // Fetch category
        const categoryResponse = await axios.get(
          "https://kaaryar-ecom.liara.run/v1/categories"
        );
        const categoryData = Array.isArray(categoryResponse.data)
          ? categoryResponse.data
          : categoryResponse.data.categories;

        console.log("Categories:", categoryData);
        setCategories(categoryData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // change category
  const handleCategoryChange = (categoryId) => {
    const updatedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    setSelectedCategories(updatedCategories);

    filterAndSortProducts(priceRange, updatedCategories, sortOrder);
  };

  const handlePriceRangeChange = (value) => {
    setPriceRange(value);

    filterAndSortProducts(value, selectedCategories, sortOrder);
  };

  const handleSortChange = (value) => {
    setSortOrder(value);

    filterAndSortProducts(priceRange, selectedCategories, value);
  };

  // filter and sort products
  const filterAndSortProducts = (range, categories, order) => {
    const filtered = products.filter(
      (product) =>
        (categories.length === 0 ||
          categories.includes(product.category._id)) &&
        product.price >= range[0] &&
        product.price <= range[1]
    );

    const sorted = filtered.sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );

    setFilteredProducts(sorted);
  };

  return (
    <div className="product-list-container">
      <div style={{ marginRight: "20px" }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={5} lg={5}>
            <Row gutter={[16, 16]} className="filter-row">
              <Col span={24}>
                <div>
                  <h2>CATEGORIES</h2>
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <div key={category._id} style={{ marginBottom: "10px" }}>
                        <Checkbox
                          checked={selectedCategories.includes(category._id)}
                          onChange={() => handleCategoryChange(category._id)}
                        >
                          {category.name} (
                          {
                            products.filter(
                              (product) => product.category._id === category._id
                            ).length
                          }
                          )
                        </Checkbox>
                      </div>
                    ))
                  ) : (
                    <p>No categories available</p>
                  )}
                </div>
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
              <Col span={24}>
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
          </Col>

          <Col xs={24} sm={24} md={19} lg={19}>
            <Row gutter={[20, 20]} className="product-grid">
              {filteredProducts.map((product) => (
                <Col key={product._id} xs={24} sm={12} md={8} lg={8} on>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={product.name}
                        src={
                          product.images?.[0] ||
                          "https://via.placeholder.com/150"
                        }
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                    }
                    onPointerEnter={() => setIsSelect(true)}
                    onPointerLeave={() => setIsSelect(false)}
                  >
                    <Card.Meta title={product.name || "No Name"} />
                    <div
                      style={{
                        marginTop: "10px",
                        fontWeight: "bold",
                        color: "#d31837",
                      }}
                    >
                      ${Math.ceil(product.price) || "0"}
                    </div>
                    <div>
                      <Rate
                        style={{ color: "#d31837" }}
                        defaultValue={product.rating || 0}
                        disabled
                      />
                    </div>
                    {isSelect && (
                      <div className="add-to-cart-btn-container">
                        <Link to={`/ProductFeatureCard/${product._id}`}>
                          <Button
                            type="primary"
                            block
                            style={{
                              marginTop: "10px",
                              backgroundColor: "#d31837",
                              width: "150px",
                              borderRadius: "50px",
                            }}
                          >
                            Add to Cart
                          </Button>
                        </Link>
                      </div>
                    )}
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProductDetails;
