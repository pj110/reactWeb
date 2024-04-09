import React, { useState, useRef, useEffect } from 'react'
import MyTable from '@/components/MyTable'
import { Form, Input, Button, Space, Select, Modal, Divider, message } from 'antd'
import { SearchOutlined, ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import {
    DeviceAdd,
    DeviceGetList,
    GetAllGroupName,
    DeviceGet,
    GetMediaServerEasyList,
    DeviceUpdate,
    UpdateGroupName,
    ExportExcel,
    DeviceDelete
} from '@/api/device'
import './device.scss'
import getEnum from '@/utils/enum'
import DevicePop from './components/DevicePop'
export default function User() {
    const { Search } = Input;
    const tableRef = useRef(null);
    //拿到弹窗组件暴露的from
    const popRef = useRef(null)
    const DeviceType = getEnum('DeviceType', false);
    const DeviceStreamType = getEnum('DeviceStreamType', false);
    const [allGroup, setAllGroup] = useState([])
    const [serverEasyList, getServerEasyList] = useState([])

    //获取所有分组列表
    async function getGrou() {
        let data = await GetAllGroupName()
        let newData = [];
        if (data.state === 1) {
            for (const i in data.message) {
                const obj = {}
                obj['label'] = data.message[i]
                obj['value'] = data.message[i]
                obj['key'] = i
                newData.push(obj)
            }
            console.log(newData)
            setAllGroup([...newData])
        }
    }
    useEffect(() => {
        async function getServerList() {
            let data = await GetMediaServerEasyList()
            getServerEasyList([...data.message])
        }
        getGrou()
        getServerList()
    }, [])
    const [configList, setConfigList] = useState([
        {
            title: '设备名称',
            dataIndex: 'Name',
            key: 'Name'
        },
        {
            title: '设备编号',
            dataIndex: 'DeviceId',
            key: 'DeviceId',
        },
        {
            title: '分组名称',
            dataIndex: 'GroupName',
            key: 'GroupName',
        },
        {
            title: '设备类型',
            dataIndex: 'DeviceType',
            key: 'DeviceType',
            render: (text) => DeviceType[text]
        },
        {
            title: 'IP地址',
            dataIndex: 'IP',
            key: 'IP',
        },
        {
            title: '端口',
            dataIndex: 'Port',
            key: 'Port',
        },
        {
            title: '通道',
            dataIndex: 'Channel',
            key: 'Channel',
        },
        {
            title: '网络协议',
            dataIndex: 'NVRConnectionMode',
            key: 'NVRConnectionMode',
            render: (text) => DeviceStreamType[text]
        },
        {
            title: '操作',
            dataIndex: 'cz',
            key: 'cz',
            render: (_, record) => {
                return (
                    <Space>
                        <Button onClick={edit(record)}>编辑</Button>
                        <Button onClick={delList(record)} type='primary' danger>删除</Button>
                    </Space>
                )
            }
        },
    ])
    const [deviceData, getDeviceData] = useState({})
    function edit(record) {
        return () => {
            console.log(popRef)
            DeviceGet(record.Id)
                .then(res => {
                    let { message } = res;
                    getDeviceData({ ...message })
                    popRef.current.form.setFieldsValue({ ...message })
                    setTitle('编辑')
                    setOpen(true)
                })
        }
    }
    const { confirm } = Modal;
    function delList(record) {
        return () => {
            console.log(record)
            confirm({
                title: '确认删除?',
                icon: <ExclamationCircleFilled />,
                content: '删除之后无法恢复',
                okText: '确定',
                okType: 'danger',
                cancelText: '取消',
                onOk() {
                    DeviceDelete({ Id: record.Id })
                        .then(res => {
                            tableRef.current.reGetList()
                        })
                },
                onCancel() {
                    console.log('Cancel');
                },
            });
        }
    }
    function addDevice() {
        setTitle('新增')
        setOpen(true)
    }
    function loadDataFn(data) {
        return DeviceGetList(data)
    }
    //刷新列表
    const reGetList = () => {
        tableRef.current.reGetList(searchObj)
    }
    //搜索框
    const onSearch = () => {
        console.log(`onSearch ${searchObj}`, searchObj);
        reGetList()
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    //下拉框Change事件
    const selectChange = (value) => {
        setSearchObj({
            ...searchObj,
            GroupName: value
        })
    }
    //inpu框change
    const keywordChange = (data) => {
        const { target: { value } } = data;
        setSearchObj({
            ...searchObj,
            keyword: value
        })

    }
    //条件查询对象
    const [searchObj, setSearchObj] = useState({
        keyword: '',
        GroupName: ''
    })
    //=====弹窗逻辑====
    const [open, setOpen] = useState(false)
    //关闭弹窗回调
    const onCancel = () => {
        //清除痕迹
        popRef.current.form.resetFields();
        setOpen(false)
    }
    //异步按钮
    const [confirmLoading, setConfirmLoading] = useState(false)
    //提交回调
    const handleOk = (values) => {
        setConfirmLoading(true)
        if (title === '编辑') {
            const newData = Object.assign({ ...deviceData }, { ...values })
            console.log(newData)
            DeviceUpdate(newData)
                .then(res => {
                    setConfirmLoading(false)
                    if (res.state === 1) {
                        onCancel()
                        reGetList()
                        getGrou()
                    }
                })
        } else {
            let data = { ...values, nvrConnectionMode: 1 }
            DeviceAdd(data)
                .then(res => {
                    setConfirmLoading(false)
                    if (res.state === 1) {
                        onCancel()
                        reGetList()
                        getGrou()
                    }
                })
        }
    }
    const [title, setTitle] = useState('编辑')
    //Group弹窗
    const [groupOpen, getGroupOpen] = useState(false)
    const updateGroupName = () => {
        console.log(tableRef.current.selectList)
        const selectListLength = tableRef.current.selectList.length
        if (selectListLength > 0) {
            getGroupOpen(true)
        } else {
            message.warning('请先选择');
        }
    }
    const [selectGroup, setSelectGroup] = useState('')
    const groupSelectChange = (value) => {
        setSelectGroup(value)
    }
    const onGroupOk = () => {
        let ids = []
        tableRef.current.selectList.forEach(res => {
            ids.push(res.Id + '')
        })
        let data = {
            id: selectGroup,
            IdArray: ids
        }
        UpdateGroupName(data).then(res => {
            if (res.state === 1) {
                getGrou()
                reGetList()
                setSelectGroup('')
                getGroupOpen(false)
            }
        })
    }
    const onGroupCancel = () => {
        getGroupOpen(false)
        setSelectGroup('')

    }

    const [name, setName] = useState('');
    const inputRef = useRef(null);
    const onNameChange = (event) => {
        setName(event.target.value);
    };
    const addItem = (e) => {
        setAllGroup([...allGroup, { label: name, value: name, key: allGroup.length + 1 }])
        setName('')
    };

    //导出
    function exportExcel() {
        let data = {
            isPage: false
        }
        ExportExcel(data).then((res) => {
            let url = 'http://36.134.190.9:8082' + res.message;
            window.location.href = url;
        })

    }
    return (
        <div id='device'>
            <div className='device_form'>
                <Space>
                    <Button icon={<SearchOutlined />} onClick={addDevice} type="primary">rtsp新增设备</Button>
                    <Button icon={<SearchOutlined />} onClick={updateGroupName} type="primary">批量修改分组</Button>
                    <Button icon={<SearchOutlined />} onClick={exportExcel} type="primary">导出</Button>
                </Space>
                <Space>
                    <Select
                        allowClear
                        placeholder="请选择"
                        style={{ width: 120 }}
                        onChange={selectChange}
                        options={allGroup}
                    />
                    <Input placeholder="请输入内容" onChange={keywordChange}></Input>
                    <Button onClick={onSearch} type="primary">搜索</Button>
                </Space>
            </div>
            <MyTable
                configList={configList}
                loader={loadDataFn}
                ref={tableRef}
                rowkey='Id'
                rowSelection={{ type: 'checkbox' }}
            ></MyTable>
            <DevicePop
                open={open}
                onCancel={onCancel}
                confirmLoading={confirmLoading}
                handleOk={handleOk}
                title={title}
                ref={popRef}
                serverEasyList={serverEasyList}
                allGroup={allGroup}
            />
            <Modal
                open={groupOpen}
                title='批量修改分组'
                okText="确定"
                cancelText="取消"
                onCancel={onGroupCancel}
                onOk={onGroupOk}
                width={300}
            >
                <Select
                    value={selectGroup}
                    style={{
                        width: '100%',
                    }}
                    placeholder="请选择"
                    onChange={groupSelectChange}
                    options={allGroup}
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
                                    ref={inputRef}
                                    value={name}
                                    onChange={onNameChange}
                                />
                                <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                    添加
                                </Button>
                            </Space>
                        </>
                    )}
                />
            </Modal>
        </div>
    )
}
