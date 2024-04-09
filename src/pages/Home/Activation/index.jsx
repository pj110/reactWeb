import React, { useState, useRef, useEffect } from 'react'
import MyTable from '@/components/MyTable'
import { Form, Input, Button, Space, Modal, Select, Popconfirm } from 'antd'
import { SearchOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { GetWaitList, ActiveDevice } from '@/api/activation'
import { GetMediaServerEasyList } from '@/api/device'
import getEnum from '@/utils/enum'
const DeviceStreamType = getEnum('DeviceStreamType', false)

export default function Activation() {  //表格配置项
    const [serverEasyList, getServerEasyList] = useState([])
    const { Option } = Select;
    useEffect(() => {
        async function getServerList() {
            let data = await GetMediaServerEasyList()
            getServerEasyList([...data.message])
        }
        getServerList()
    }, [])
    const [configList, setConfigList] = useState([
        {
            title: '通道Id',
            dataIndex: 'channelId',
            key: 'channelId'
        },
        {
            title: '通道名称',
            dataIndex: 'channelName',
            key: 'channelName'
        },
        {
            title: '设备Id',
            dataIndex: 'deviceId',
            key: 'deviceId',
        },
        {
            title: 'IP地址',
            dataIndex: 'ipV4Address',
            key: 'ipV4Address',
        },
        {
            title: '入口Id',
            dataIndex: 'mainId',
            key: 'mainId',
        },
        {
            title: '服务器Id',
            dataIndex: 'mediaServerId',
            key: 'mediaServerId',
        },
        {
            title: '网络协议',
            dataIndex: 'NVRConnectionMode',
            key: 'NVRConnectionMode',
            render: (text) => {
                return (<span key={text}>{DeviceStreamType[text]}</span>)
            }
        },
        {
            title: '激活',
            dataIndex: 'cz',
            key: 'cz',
            render: (_, record) => (
                <Space>
                    <Button onClick={activationDevice(record)} type='primary' danger>激活</Button>
                </Space>
            )
        }
    ])
    const tableRef = useRef(null)
    const [tableData, setTableData] = useState({})
    //打开弹窗
    function activationDevice(e) {
        setTableData({ ...e })
        setOpen(true)
    }
    function loadDataFn(data) {
        return GetWaitList(data)
    }

    const [form] = Form.useForm();
    function onCancel() {
        setOpen(false)
        form.resetFields();

    }
    function onOk() {
        form
            .validateFields()
            .then((values) => {
                let data = Object.assign({ ...tableData }, { ...values })
                ActiveDevice(data)
                    .then(res => {
                        if (res.state === 1) {
                            onCancel()
                            reGetList()
                            setTableData({})
                        }
                    })
                    .catch(res => {

                    })
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    }

    //刷新列表
    const reGetList = () => {
        tableRef.current.reGetList()
    }
    const [open, setOpen] = useState(false)
    return (
        <>
            <MyTable configList={configList} loader={loadDataFn} ref={tableRef} rowkey='id'></MyTable>
            <Modal
                open={open}
                title='激活'
                okText="确认"
                cancelText="取消"
                onCancel={onCancel}
                onOk={onOk}
            >
                <Form
                    form={form}
                    name="form_in_modal"
                    labelCol={{ span: 5 }}
                >
                    <Form.Item
                        name="mediaServerId"
                        label="媒体服务器ID">
                        <Select
                            allowClear
                            placeholder="请选择">

                            {
                                serverEasyList.map(res => {
                                    return (
                                        <Option key={res.mediaServerId} value={res.mediaServerId}>{res.mediaServerId}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="channelName"
                        label="通道名称">
                        <Input></Input>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
