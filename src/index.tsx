import * as React from 'react';
import { Form as __Form } from 'antd';


export const Form = __Form
export const VisionFormContext = React.createContext({});
export const VisionFormItem = (props: {
  label?: string;
  name?: string;
  rule?: any[];
  children: React.ReactElement
}) => {
  const {
    label,
    name,
    rule
  } = props;
  return <Form.Item {...{
    label,
    name,
    rule
  }}>
    {props.children}
  </Form.Item>
}

export default {
  Form,
  VisionFormContext,
  VisionFormItem
}