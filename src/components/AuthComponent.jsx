import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import axios from 'axios';

const AuthComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || 'User');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const checkAccountExists = async (email) => {
    try {
      const response = await axios.post('https://kaaryar-ecom.liara.run/v1/auth/verify', { email });
      return response.data.exists || false;
    } catch (error) {
      console.error('Error checking email existence:', error);
      message.error('Error checking email.');
      return false;
    }
  };

  const handleAuth = async (values) => {
    const { email, password, name } = values;

    if (isRegistering) {
      const accountExists = await checkAccountExists(email);
      if (accountExists) {
        message.error('This email is already registered. Please sign in.');
        return;
      }
    }

    const apiUrl = isRegistering
      ? 'https://kaaryar-ecom.liara.run/v1/auth/register'
      : 'https://kaaryar-ecom.liara.run/v1/auth/login';

    try {
      const response = await axios.post(apiUrl, {
        email,
        password,
        ...(isRegistering && { name }),
      });

      if (response.data.token) {
        localStorage.setItem('userToken', response.data.token); 
        localStorage.setItem('userEmail', email); 
        setIsLoggedIn(true);
        setToken(response.data.token);
        setUserEmail(email); 
        message.success(isRegistering ? 'Sign-up successful' : 'Sign-in successful');
        setIsModalVisible(false);
      } else {
        throw new Error(response.data.message || 'Authentication failed.');
      }
    } catch (error) {
      console.error('Authentication Error:', error);
      message.error(error.response?.data?.error || 'Error occurred during authentication.');
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        'https://kaaryar-ecom.liara.run/v1/auth/logout',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.removeItem('userToken');
      localStorage.removeItem('userEmail');
      setUserEmail('User');
      setIsLoggedIn(false);
      setToken(null);
      message.success('Logout successful');
    } catch (error) {
      console.error('Logout Error:', error);
      message.error('Error occurred during logout.');
    }
  };

  const handleFormSubmit = (values) => {
    handleAuth(values);
  };

  return (
    <div style={{ padding: 20 }}>
      {isLoggedIn ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontWeight: 'bold', color: '#d31837' }}>Welcome, {userEmail}!</span>
          <Button
            type="primary"
            onClick={logout}
            style={{ backgroundColor: '#d31837', color: 'white' }}
          >
            Logout
          </Button>
        </div>
      ) : (
        <div>
          <Button
            type="primary"
            onClick={() => setIsModalVisible(true)}
            style={{ backgroundColor: '#d31837', color: 'white' }}
          >
            Sign In / Sign Up
          </Button>
          <Modal
            title={isRegistering ? 'Sign Up' : 'Sign In'}
            visible={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
            destroyOnClose
          >
            <Form
              name="auth"
              onFinish={handleFormSubmit}
              initialValues={{
                email: '',
                password: '',
              }}
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              {isRegistering && (
                <Form.Item
                  name="name"
                  rules={[{ required: isRegistering, message: 'Please enter your name' }]}
                >
                  <Input placeholder="Name" />
                </Form.Item>
              )}
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please enter your password' },
                  {
                    pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
                    message: 'Password must include letters, numbers, and special characters',
                  },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: '100%', backgroundColor: '#d31837', color: 'white' }}
                >
                  {isRegistering ? 'Sign Up' : 'Sign In'}
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => setIsRegistering(!isRegistering)}
                  style={{ width: '100%', color: '#d31837' }}
                >
                  {isRegistering ? 'Already have an account? Sign In' : 'No account? Sign Up'}
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default AuthComponent;
