import React, { useState } from "react";
import {
  Form,
  Input,
  Checkbox,
  Button,
  Select,
  Flex,
  Radio,
  Table,
  Divider,
  Typography,
} from "antd";

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

function Shop() {
  const [createAccount, setCreateAccount] = useState(false);
  const [differentAddress, setDifferentAddress] = useState(false);
  const [form] = Form.useForm();

  const orderSummaryData = [
    { key: "1", product: "1x Product Name Goes Here", total: "$980.00" },
    { key: "2", product: "2x Product Name Goes Here", total: "$1960.00" },
    { key: "3", product: "Shipping", total: "FREE" },
  ];

  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
  ];

  const handleCreateAccountChange = (e) => {
    setCreateAccount(e.target.checked);
  };

  const handleDifferentAddressChange = (e) => {
    setDifferentAddress(e.target.checked);
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <Title level={2}>Checkout</Title>
      <Divider />

      <Form
        layout="vertical"
        form={form}
        initialValues={{ remember: true }}
        style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}
      >
        <Flex gap={"300px"}>
          <div>
            {/* Billing Address */}
            <div style={{ flex: 1, minWidth: "400px" }}>
              <Title level={3}>Billing Address</Title>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  { required: true, message: "Please enter your first name" },
                ]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                  { required: true, message: "Please enter your last name" },
                ]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                label="Address"
                name="address"
                rules={[
                  { required: true, message: "Please enter your address" },
                ]}
              >
                <Input placeholder="Address" />
              </Form.Item>
              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: "Please enter your city" }]}
              >
                <Input placeholder="City" />
              </Form.Item>
              <Form.Item
                label="Country"
                name="country"
                rules={[
                  { required: true, message: "Please select your country" },
                ]}
              >
                <Select placeholder="Select Country">
                  <Option value="us">United States</Option>
                  <Option value="uk">United Kingdom</Option>
                  <Option value="ca">Canada</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Zip Code"
                name="zipCode"
                rules={[
                  { required: true, message: "Please enter your zip code" },
                ]}
              >
                <Input placeholder="Zip Code" />
              </Form.Item>
              <Form.Item
                label="Telephone"
                name="telephone"
                rules={[
                  { required: true, message: "Please enter your telephone" },
                ]}
              >
                <Input placeholder="Telephone" />
              </Form.Item>
              <Checkbox onChange={handleCreateAccountChange}>
                Create Account
              </Checkbox>
              {createAccount && (
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please enter your password" },
                  ]}
                >
                  <Input.Password placeholder="Enter Your Password" />
                </Form.Item>
              )}
            </div>

            {/* Shipping Address */}
            <div style={{ flex: 1, minWidth: "400px" }}>
              <Title level={3}>Shipping Address</Title>
              <Checkbox onChange={handleDifferentAddressChange}>
                Ship to a different address?
              </Checkbox>
              {differentAddress && (
                <Form.Item label="Order Notes" name="orderNotes">
                  <TextArea rows={4} placeholder="Order Notes" />
                </Form.Item>
              )}
            </div>
          </div>
          <div style={{ flex: 1, minWidth: "400px" }}>
            <Title level={3}>Your Order</Title>
            <Table
              dataSource={orderSummaryData}
              columns={columns}
              pagination={false}
            />
            <div
              style={{
                marginTop: "20px",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Total</span>
                <span>$2940.00</span>
              </div>
            </div>
            <Divider />
            <Title level={4}>Payment Method</Title>
            <Radio.Group>
              <Radio value="bank">Direct Bank Transfer</Radio>
              <Radio value="cheque">Cheque Payment</Radio>
              <Radio value="paypal">PayPal</Radio>
            </Radio.Group>
            <Form.Item
              name="terms"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          "You must accept the terms and conditions"
                        ),
                },
              ]}
            >
              <Checkbox>I’ve read and accept the terms & conditions</Checkbox>
            </Form.Item>
            <Button type="primary" htmlType="submit" block>
              Place Order
            </Button>
          </div>
        </Flex>
      </Form>
    </div>
  );
}

export default Shop;
