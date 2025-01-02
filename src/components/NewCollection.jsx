import {  Col, Row, Button, Typography, Image } from 'antd';
import "antd/dist/reset.css";

const { Title, Text } = Typography;

const NewCollection = () => {
  return (
    <div style={{ backgroundColor: '#f5f5f5', padding: '20px',marginBottom: '30px' }}>
      <Row justify="center" gutter={[16, 16]} style={{ marginLeft: '200px', marginRight:'200px'}}>
        <Col xs={24} md={8}>
          <Image style={{width: '300px', height: '200px'}}
            src="https://picsum.photos/seed/qf2VJg/640/480" 
            alt="Laptop"
            width="100%"
            preview={false}
          />
        </Col>

        <Col xs={24} md={8} style={{ textAlign: 'center', paddingTop: '30px' }}>
          <div>
            <Row justify="center" gutter={[10, 10]} >
              <Col style={{backgroundColor: '#d31837',padding: '3px', margin: '10px', borderRadius: '100%', width: '60px', height: '60px'}}><Title level={4} style={{ color: '#fff', margin: 0 }}>02</Title><Text style={{color: '#fff'}}>DAYS</Text></Col>
              <Col style={{backgroundColor: '#d31837',padding: '3px', margin: '10px', borderRadius: '100%', width: '60px', height: '60px'}}><Title level={4} style={{ color: '#fff', margin: 0 }}>10</Title><Text style={{color: '#fff'}}>HOURS</Text></Col>
              <Col style={{backgroundColor: '#d31837',padding: '3px', margin: '10px', borderRadius: '100%', width: '60px', height: '60px'}}><Title level={4} style={{ color: '#fff', margin: 0 }}>34</Title><Text style={{color: '#fff'}}>MINS</Text></Col>
              <Col style={{backgroundColor: '#d31837',padding: '3px', margin: '10px', borderRadius: '100%', width: '60px', height: '60px'}}><Title level={4} style={{ color: '#fff', margin: 0 }}>60</Title><Text style={{color: '#fff'}}>SECS</Text></Col>
            </Row>
            <Title level={3}>HOT DEAL THIS WEEK</Title>
            <Text>NEW COLLECTION UP TO 50% OFF</Text>
            <div style={{ marginTop: '10px' }}>
              <Button type="primary" size="large" style={{ backgroundColor: '#d31837', borderColor: 'red', borderRadius: '50px' }}>
                SHOP NOW
              </Button>
            </div>
          </div>
        </Col>

        <Col xs={24} md={8}>
          <Image style={{width: '300px', height: '200px'}}
            src="https://picsum.photos/seed/t5q2QlQa/640/480" 
            alt="Headphones"
            width="100%"
            preview={false}
          />
        </Col>
      </Row>
    </div>
  );
};

export default NewCollection;
