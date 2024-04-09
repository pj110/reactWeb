
import React from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Form, Input } from 'antd'
import { isLoginAction } from '@/redux/action/login'
import { PasswordLogin } from '@/api/login.js'
import './login.scss'

function Login(props) {
    const navigate = useNavigate()
    console.log('props', props)
    const { isLoginAction } = props
    const login = async () => {
        let isLogin = true;
        let data = await PasswordLogin({
            userName: "admin",
            passWord: "123456"
        })
        console.log(data)
        if (data.state === 1) {
            isLoginAction(isLogin)
            navigate('/home')
        }
    }
    const onFinish = (values) => {
        login(values)
    }
    const onFinishFailed = (errorInfo) => {
        
    }
    return (
        <div id='login'>
            <Card className='login-card'>
                <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}>
                    <Form.Item
                        label="账号"
                        name="userName"
                        rules={[
                            {
                                required: true,
                                message: '请填写您的账号!',
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="passWord"
                        rules={[
                            {
                                required: true,
                                message: '请填写您的密码!',
                            },
                        ]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            登陆
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            {/* <Button onClick={login}>登陆按钮</Button> */}
        </div>
    )
}
export default connect(
    (store) => ({ store }),
    {
        isLoginAction
    }
)(Login)