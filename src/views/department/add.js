import React, { Component } from 'react'
import {Form, Input, Radio, Button, InputNumber} from 'antd'
import {AddDepartment, DetailedApi, EditdApi} from '@/api/department'

import { message } from 'antd'


class DepartmentAdd extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            formLaout: {
                labelCol: {span:3},
                wrapperCol: {span: 12}
            },
            id: ''
        }
    }
    onSubmit = (val) => {
        this.setState({
            loading: true
        })
        this.state.id ? this.editDepartment(val) : this.addDepartment(val)
    }
    // 新增
    addDepartment = (val) => {
        AddDepartment(val).then(res => {
            message.success('添加成功!')
            this.setState({
                loading: false
            })
            this.refs.form.resetFields()
        }).catch(() => {
            this.setState({
                loading: false
            })
        })
    }
    editDepartment = (val) => {
        EditdApi({...val, id: this.state.id}).then(res => {
            message.success('修改成功!')
            this.setState({
                loading: false
            })
        }).catch(() => {
            this.setState({
                loading: false
            })
        })
    }
    componentWillMount(){
        console.log(this.props.location.state, 999)
        if(this.props.location.state) {
            this.setState({
                id: this.props.location.state.id
            })
        }
    }
    componentDidMount() {
        this.getDetail()
    }
    getDetail = () => {
        if ( !this.props.location.state)  { return false }
        DetailedApi({id: this.props.location.state.id }).then(res => {
            console.log(res)
            this.refs.form.setFieldsValue(res.data)
        })
    }
    render() {
        return (
            <Form ref="form" initialValues={{number: 0, status: true}} onFinish={this.onSubmit} {...this.state.formLaout}>
                <Form.Item label="部门名称:" name="name">
                    <Input />
                </Form.Item>
                <Form.Item label="人员数量:" name="number">
                    <InputNumber min={0} max={100} />
                </Form.Item>
                <Form.Item label="禁启用:" name="status">
                    <Radio.Group>
                        <Radio value={false}>禁用</Radio>
                        <Radio value={true}>启用</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="描述:" name="content">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item>
                    <Button loading={this.state.loading} type="primary" htmlType="submit">确定</Button>
                </Form.Item>
            </Form>
        )
    }
}

export default DepartmentAdd