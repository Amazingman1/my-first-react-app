import React, { Component, Fragment } from 'react'
import { Form, Input, Button, Table, Switch, message, Modal } from 'antd'
import { GetDepartmentApi, ChangeStatustApi, DeleteDepartmentApi } from '@/api/department'
import { Link } from 'react-router-dom'

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
                                    <Link to={{ pathname: '/index/department/add', state:{ id: rowData.id}}}>编辑</Link>
                                </Button>
                                <Button onClick={() => this.showModal(rowData.id)}>删除</Button>
                            </div>
                        )
                    }
                }
            ],
            data: [],
            pageNumber: 1,
            pageSize: 10,
            keyWork: '',
            // 选中数据
            selectedRowKeys: [],
            visible: false,
            id: '',
            confirmLoading: false
        }
    }
    onHandlerSwitch = (rowData) => {
        if (!rowData.status) { return false }
        this.setState({
            id: rowData.id
        })
        ChangeStatustApi({id: rowData.id, status: !Number(rowData.status)}).then(res => {
            console.log('修改结果')
            this.getList()
            this.setState({
                id: ''
            })
        }).catch(() => {
            this.setState({
                id: ''
            })
        })
    }
    // 删除
    deleteDepartment = ()=> {
        if( !this.state.id ) return
        this.setState({
            confirmLoading: true
        })
        DeleteDepartmentApi({id: this.state.id}).then(res => {
            message.success('删除成功！！')
            this.setState({
                confirmLoading: false
            })
            this.getList()
            this.hideModal()
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
    onCheckebosx = (selectedRowKeys) => {
        console.log(selectedRowKeys)
        this.setState({
            selectedRowKeys
        })
    }
    hideModal = () => {
        this.setState({
            visible: false,
        })
    }
    showModal(id){
        this.setState({
            visible: true,
            id
        })
    }
    render() {
        const { columns , data} = this.state
        const rowSelection = {
            onChange: this.onCheckebosx
        }
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
                <div className="table-wrap">
                    <Table rowSelection={rowSelection} rowKey="id" columns={columns} dataSource={data} bordered />
                </div>
                <Modal
                    title="提示"
                    visible={this.state.visible}
                    onOk={this.deleteDepartment}
                    onCancel={this.hideModal}
                    confirmLoading={this.state.confirmLoading}
                    okText="确认"
                    cancelText="取消"
                    >
                    <p className="text-center">确定删除此信息？<strong className="color-red">删除后将无法恢复</strong></p>
                </Modal>
            </Fragment>
        )
    }
}

export default DepartmentIndex