import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Col, Select, Spin } from "antd";

const { Meta } = Card;
const { Option } = Select;
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
    </div>
  );
};

export default ProdutDetails;
