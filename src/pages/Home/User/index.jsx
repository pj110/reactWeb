//条件查询暂时又一部分问题
import React, { useState, useRef } from 'react'
import MyTable from '@/components/MyTable'
import { Form, Input, Button, Space, Modal, Switch, Popconfirm } from 'antd'
import { SearchOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { SysUserGetList, SysUserGet, SysUserUpdate, SysUserAdd, SysUserDelete } from '@/api/user'
import './user.scss'
const { Search } = Input;
export default function User() {
  //拿到table组件暴露的方法
  const tableRef = useRef(null)
  //antd创建的form示例
  const [form] = Form.useForm();
  //弹窗标题
  const [title, setTitle] = useState('编辑')
  //打开弹窗flage
  const [open, setOpen] = useState(false);
  //打开异步flage
  const [confirmLoading, setConfirmLoading] = useState(false);
  //表格配置项
  const [configList, setConfigList] = useState([
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '用户登陆名',
      dataIndex: 'loginName',
      key: 'loginName'
    },
    {
      title: '用户昵称',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '创建时间',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (text) => {
        return (<span key={text}>{text.split('T').join(' ')}</span>)
      }
    },
    {
      title: '操作',
      dataIndex: 'cz',
      key: 'cz',
      render: (_, record) => (
        <Space>
          <Button onClick={edit(record)}>编辑</Button>
          <Button onClick={delList(record)} type='primary' danger>删除</Button>
        </Space>
      )
    }
  ])
  //弹窗清空关闭回调
  const handleCancel = () => {
    console.log('Clicked cancel button');
    //清空
    form.resetFields();
    setOpen(false);
  };
  //弹窗确定回调
  const handleOk = () => {
    //触发表单验证
    form
      .validateFields()
      .then((values) => {
        setConfirmLoading(true)
        console.log(getUser)
        let data = { ...values };
        if (data.isEnable) {
          data.isEnable = 1
        } else {
          data.isEnable = 2
        }
        //let oldData = { ...getUser }
        if (title === '编辑') {
          let newData = Object.assign(getUser, data)
          SysUserUpdate(newData)
            .then(res => {
              setConfirmLoading(false)
              tableRef.current.reGetList()
              //关闭弹窗
              handleCancel();
            })
            .catch(err => {

            })
        } else {
          SysUserAdd(data)
            .then(res => {
              setConfirmLoading(false)
              tableRef.current.reGetList()
              //关闭弹窗
              handleCancel();
            })
            .catch(err => { })
        }
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });

  };
  const [getUser, setGetUser] = useState({});
  //编辑
  function edit(data) {
    return async () => {
      const asyncData = await SysUserGet(data.id)
      if (asyncData.state === 1) {
        setTitle('编辑')
        let { message } = asyncData
        //存拿到的数据
        setGetUser(message);
        message.isEnable = message.isEnable === 1 ? true : false
        form.setFieldsValue({ ...message });
        setOpen(true);
      }

    }
  }
  const { confirm } = Modal;
  //删除
  function delList(data) {
    return () => {
      console.log(data)
      confirm({
        title: '确认删除?',
        icon: <ExclamationCircleFilled />,
        content: '删除之后无法恢复',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          SysUserDelete({ id: data.id })
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
  function loadDataFn(data) {
    return SysUserGetList(data)
  }
  const onSearch = (values) => {
    tableRef.current.reGetList({ keyword: values })
  };
  //添加
  function addUser() {
    setTitle('添加')
    setOpen(true);

  }
  return (
    <div id='user'>
      <div className='user_form'>
        <Button icon={<SearchOutlined />} onClick={addUser} type="primary">添加</Button>
        <Search
          placeholder="请输入内容"
          onSearch={onSearch}
          style={{
            width: 200,
          }}
          enterButton
        />
      </div>
      <MyTable configList={configList} loader={loadDataFn} ref={tableRef} rowkey='id'></MyTable>
      <Modal
        forceRender={true}
        title={title}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" loading={confirmLoading} onClick={handleOk}>
            确认
          </Button>
        ]}
      >
        <Form
          labelCol={{ span: 4}}
          form={form}>
          <Form.Item
            name="loginName"
            label="登陆名称">
            <Input></Input>
          </Form.Item>
          <Form.Item
            name="userName"
            label="用户名称">
            <Input></Input>
          </Form.Item>
          <Form.Item name='isEnable' label="是否启用" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item
            name="describe"
            label="备注">
            <Input type="textarea"></Input>
          </Form.Item>
        </Form>
      </Modal>
    </div >
  )
}
