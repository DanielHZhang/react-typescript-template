import * as React from 'react';
import { Component } from 'react';
import { Layout, Button, Select } from 'antd';

export default class App extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Layout className='App'>
        <Button>Wow</Button>
        <Select
          // showArrow={true}
          // onMouseEnter={() => console.log('test')}
          onMouseLeave={() => console.log('test')}
          value=''
        >
          <Select.Option>Test</Select.Option>
        </Select>
      </Layout>
    );
  }
}
