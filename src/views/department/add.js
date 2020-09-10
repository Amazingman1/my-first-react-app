import React, { Component } from 'react'
import {Form, Input, Radio, Button, InputNumber} from 'antd'
import {AddDepartment} from '@/api/department.js'

class DepartmentAdd extends Component {
    constructor(props){
        super(props)
        this.state = {
            formLaout: {
                labelCol: {span:3},
                wrapperCol: {span: 12}
            }
        }
    }
    onSubmit = (val) => {
        console.log(val)
        AddDepartment(val).then(res => {
            console.log(res, '保存结果')
        })
    }
    render() {
        return (
            <Form onFinish={this.onSubmit} {...this.state.formLaout}>
                <Form.Item label="部门名称:" name="name">
                    <Input />
                </Form.Item>
                <Form.Item label="人员数量:" name="number">
                    <InputNumber min={0} max={100} />
                </Form.Item>
                <Form.Item label="禁启用:" name="status">
                    <Radio.Group defaultValue={true}>
                        <Radio value={false}>禁用</Radio>
                        <Radio value={true}>启用</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="描述:" name="content">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">确定</Button>
                </Form.Item>
       
            </Form>
        )
    }
}

export default DepartmentAdd