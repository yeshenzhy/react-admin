import React from 'react';
import { Button } from 'antd';
export default class Home extends React.Component {
    render() {
        return (
            <div>
              <Button type="primary">Primary</Button>
                <a href='#/detail'>去detail</a>
            </div>
        )
    }
}