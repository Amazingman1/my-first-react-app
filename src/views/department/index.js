import React, { Component, Fragment } from 'react'
import { Form, Input, Button, Table, Switch } from 'antd'
import { GetDepartmentApi, ChangeStatustApi } from '@/api/department'
class DepartmentIndex extends Component {
    constructor(props){
        super(props)
        this.state = {
            columns: [
                { title: '部门名称', dataIndex: 'name', key: 'name'},
                { 
                    title: '禁启用',
                    dataIndex: 'status',
                    key: 'status',
                    render: (status, rowData) => {
                        return <Switch onChange={() => this.onHandlerSwitch(rowData)} loading={rowData.id === this.state.id} checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={status === "1" ? true : false} />
                    }
                },
                { title: '人员数量', dataIndex: 'number', key: 'name'},
                {
                    title: '操作',
                    dataIndex: 'operation',
                    key: 'operation', 
                    width: 215, 
                    render: (text, rowData) => {
                        return (
                            <div className="inline-button">
                                <Button type="primary">
                                编辑
                                    {/* <Link to={{ pathname: '/index/department/add', state:{ id: rowData.id}}}>编辑</Link> */}
                                </Button>
                                <Button>删除</Button>
                            </div>
                        )
                    }
                }
            ],
            data: [],
            pageNumber: 1,
            pageSize: 10,
            keyWork: ''
        }
    }
    onHandlerSwitch = (rowData) => {
        console.log(rowData, '开关')
        ChangeStatustApi({id: rowData.id, status: !Number(rowData.status)}).then(res => {
            console.log('修改结果')
            this.getList()
        })
    }
    // 声明周期 DOM 挂载完成
    componentDidMount() {
        this.getList()
    }
    // 获取数据
    getList = () => {
        const { pageNumber, pageSize, keyWork } = this.state
        const datas = {
            pageNumber: pageNumber,
            pageSize: pageSize
        }
        if(keyWork){
            datas.name = keyWork
        }
        GetDepartmentApi(datas).then(res => {
            console.log(res, '列表')
            this.setState({
                data: res.data.data
            })
        })
    }
    onFinish = (value) => {
        console.log(value)
        this.setState({
            keyWork: value.username,
            pageNumber: 1,
            pageSize: 10,
        })
        this.getList()
    }
    render() {
        const { columns , data} = this.state
        return (
            <Fragment>
                <Form  onFinish={this.onFinish} layout="inline">
                    <Form.Item label="部门名称:" name="username">
                        <Input placeholder="请输入部门名称" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">搜索</Button>
                    </Form.Item>
                </Form>
                <Table rowKey="id" columns={columns} dataSource={data} bordered />
            </Fragment>
        )
    }
}

export default DepartmentIndex