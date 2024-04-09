import React, { useImperativeHandle, forwardRef, useState, useEffect } from 'react'
import { Form, Input, Button, Space, Select, Modal, Divider } from 'antd'
import { PlusOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import getEnum from '@/utils/enum'

function DevicePop({ open, onCancel, confirmLoading, handleOk, title, serverEasyList, allGroup }, ref) {
    const DeviceStreamType2 = getEnum('DeviceStreamType2', true);
    const DeviceType2 = getEnum('DeviceType2', true)
    const [form] = Form.useForm();
    const { Option } = Select;
    const submit = () => {
        form
            .validateFields()
            .then((values) => {
                //form.resetFields();
                handleOk(values);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    }
    const [group, setGroup] = useState([])
    useEffect(() => {
        setGroup([...allGroup])
    }, [allGroup])
    //useImperativeHandle钩子指定方法或者数据暴露给父组件
    useImperativeHandle(ref, () => ({
        form
    }))
    const [selectGroup, setSelectGroup] = useState('')
    const [name, setName] = useState('')
    const groupSelectChange = (value) => {
        setSelectGroup(value)
    }
    const addItem = (e) => {
        console.log([...group, { label: name, value: name, key: group.length + 1 }])
        setGroup([...group, { label: name, value: name, key: group.length + 1 }])
        setName('')
    };
    const onNameChange = (event) => {
        setName(event.target.value);
    };
    return (
        <Modal
            open={open}
            title={title}
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            footer={[
                <Button key="back" onClick={onCancel}>
                    取消
                </Button>,
                <Button key="submit" type="primary" loading={confirmLoading} onClick={submit}>
                    确认
                </Button>
            ]}
        >

            <Form
                form={form}
                name="form_in_modal"
                labelCol={{ span: 5 }}
            >
                <Form.Item name="akStreamMediaServerId" label="媒体服务器ID">
                    <Select
                        allowClear
                        placeholder="请选择"
                    >
                        {
                            serverEasyList.map(res => {
                                return (
                                    <Option key={res.mediaServerId} value={res.mediaServerId}>{res.mediaServerId}</Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item name="deviceType" label="设备类型">
                    <Select
                        allowClear
                        placeholder="请选择"
                        options={DeviceType2} />
                </Form.Item>
                <Form.Item name="deviceId" label="设备ID">
                    <Input />
                </Form.Item>
                <Form.Item name="ip" label="ip">
                    <Input />
                </Form.Item>
                <Form.Item name="deviceGroup" label="设备组">
                    <Input />
                </Form.Item>
                <Form.Item name="port" label="端口">
                    <Input />
                </Form.Item>
                <Form.Item name="name" label="名称">
                    <Input />
                </Form.Item>
                <Form.Item name="groupName" label="分组名">
                    <Select
                        allowClear
                        placeholder="请选择"
                        options={group}
                        onChange={groupSelectChange}
                        dropdownRender={(menu) => (
                            <>
                                {menu}
                                <Divider
                                    style={{
                                        margin: '8px 0',
                                    }}
                                />
                                <Space
                                    style={{
                                        padding: '0 8px 4px',
                                    }}
                                >
                                    <Input
                                        placeholder="输入新的分组"
                                        value={name}
                                        onChange={onNameChange}
                                    />
                                    <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                        添加
                                    </Button>
                                </Space>
                            </>
                        )} />
                </Form.Item>
                <Form.Item name="videoSrcUrl" label="媒体地址">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}
//高阶函数-forwardRef-传入一个组件，将组件转发出去
export default forwardRef(DevicePop)
