import React from 'react';
import { Form, Input, Button, Radio } from 'antd';

const BoyKiloForm = ({ onSubmit }) => {
  const onFinish = (values) => {
    console.log('Received values: ', values);
    onSubmit(values);
  };

  return (
    <div className="boy-kilo-container">
      <Form
        name="boy_kilo_form"
        className="boy-kilo-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="age"
          rules={[{ required: true, message: 'Please input your age!' }]}
        >
          <Input placeholder="Age" type="number" />
        </Form.Item>


        <Form.Item
          name="gender"
          rules={[{ required: true, message: 'Please select your gender!' }]}
        >
          <Radio.Group>
            <Radio.Button value="male">Male</Radio.Button>
            <Radio.Button value="female">Female</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="height"
          rules={[{ required: true, message: 'Please input your height!' }]}
        >
          <Input placeholder="Height (cm)" />
        </Form.Item>
        <Form.Item
          name="weight"
          rules={[{ required: true, message: 'Please input your weight!' }]}
        >
          <Input placeholder="Weight (kg)" />
        </Form.Item>
     
        
        <Form.Item>
          <Button type="primary" htmlType="submit" className="boy-kilo-form-button">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BoyKiloForm;
