import * as React from 'react';
import { Form as __Form } from 'antd';


export const Form = __Form
export const VisionFormContext = React.createContext({});
export const VisionFormItem = (props: {
  label?: string;
  name?: string;
  rule?: any[];
  valuePropName?: string;
  children: React.ReactElement
}) => {
  const {
    label,
    name,
    rule,
    valuePropName
  } = props;
  return <Form.Item {...{
    label,
    name,
    rules: rule,
    valuePropName
  }}>
    {props.children}
  </Form.Item>
}

export default {
  Form,
  VisionFormContext,
  VisionFormItem
}