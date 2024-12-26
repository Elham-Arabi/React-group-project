import React, { useEffect, useState } from "react";
import useDebounce from "./UseDebounce";
import { Input, Spin, List } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";

const SearchHeader = ({ setSearch, search }) => {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isList, setIsList] = useState(true);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const fetchData = async () => {
      if (debouncedSearch) {
        setLoading(true);
        try {
          const response = await axios.get(
            `https://kaaryar-ecom.liara.run/v1/products?page=1&limit=10`
          );
          setSearchResults(response.data.products);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    };

    fetchData();
  }, [debouncedSearch]);

  const itemSelect = (name) => {
    setSearch(name);
    setIsList(false);
  };
  const changeInput = (value) => {
    setSearch(value);
    if (!isList) setIsList(true);
  };

  return (
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
      {loading ? (
        <Spin size="small" style={{ marginTop: "8px" }} />
      ) : (
        debouncedSearch &&
        searchResults.length > 0 &&
        isList && (
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
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            dataSource={searchResults.filter((item) =>
              item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
            )}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                onClick={() => itemSelect(item.name)}
                style={{ padding: "8px", cursor: "pointer" }}
              >
                {item.name}
              </List.Item>
            )}
          />
        )
      )}
    </div>
  );
};

export default SearchHeader;
