import React, { useEffect, useState } from "react";
import useDebounce from "./UseDebounce";
import { Input, List, Button, Flex } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchHeader = ({ setSearch, search }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isList, setIsList] = useState(true);
  const [id, setId] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const fetchData = async () => {
      if (debouncedSearch) {
        try {
          const response = await axios.get(
            `https://kaaryar-ecom.liara.run/v1/products?page=1&limit=10`
          );
          setSearchResults(response.data.products);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        setSearchResults([]);
      }
    };

    fetchData();
  }, [debouncedSearch]);

  const itemSelect = (item) => {
    setId(item._id);
    setSearch(item.name);
    setIsList(false);
  };
  const changeInput = (value) => {
    setSearch(value);
    if (!isList) setIsList(true);
  };

  return (
    <>
      <Flex>
        <div style={{ position: "relative", width: "100%" }}>
          <Input
            placeholder="Search here"
            style={{
              borderLeft: "none",
              borderRight: "none",
              borderRadius: "0",
              marginBottom: "10px",
            }}
            value={search}
            onChange={(e) => changeInput(e.target.value)}
            suffix={<SearchOutlined />}
            allowClear
          />
        </div>
        <div>
          {debouncedSearch && searchResults.length > 0 && isList && (
            <List
              bordered
              size="small"
              style={{
                position: "absolute",
                zIndex: 1000,
                background: "#fff",
                width: "100%",
                marginTop: "4px",
                borderRadius: "4px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // سایه برای زیبایی
                overflowY: "auto",
              }}
              dataSource={searchResults.filter((item) =>
                item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
              )}
              renderItem={(item) => (
                <List.Item
                  key={item.id}
                  onClick={() => itemSelect(item)}
                  style={{ padding: "8px", cursor: "pointer" }}
                >
                  {item.name}
                </List.Item>
              )}
            />
          )}
        </div>
        <Link to={`/ProductDetails/${id}`}>
          <Button
            type="primary"
            style={{
              backgroundColor: "#d31837",
              borderRadius: "0 20px 20px 0",
              border: "none",
            }}
          >
            Search
          </Button>
        </Link>
      </Flex>
    </>
  );
};

export default SearchHeader;
