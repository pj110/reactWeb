import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, useMatch } from 'react-router-dom'
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom'
import { VideoCameraOutlined, InboxOutlined, UserOutlined } from '@ant-design/icons';
import './home.scss'
import { flattenRoutes, routers, getBreadcrumbs } from '../../routers/index'

const { Header, Content, Footer } = Layout;
const App = () => {
    const location = useLocation();
    const flattenRoutesList = flattenRoutes(routers);
    let pathList = getBreadcrumbs(flattenRoutesList, location).map(res => ({ title: res }))

    const items = [{
        key: '/home/videoAccess',
        label: `视频广场`,
        icon: <VideoCameraOutlined />,
    }, {
        key: 'device',
        label: `设备管理与设备激活`,
        icon: <InboxOutlined />,
        children: [
            {
                label: '设备管理',
                key: '/home/device',
            },
            {
                label: '设备激活',
                key: '/home/activation',
            },
        ]
    }, {
        key: '/home/user',
        label: `用户管理`,
        icon: <UserOutlined />,
    }]
    console.log(items)
    const navigate = useNavigate()
    useEffect(() => {
        console.log('1111')
        setCurrent(location.pathname)
    }, []);
    let pathName = location.pathname.split('/').splice(1)
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const onClick = (e) => {
        console.log('click ', e, location.pathname);
        setCurrent(e.key);
        navigate(e.key)
    }
    //确定现在进入的是谁
    const [current, setCurrent] = useState('mail');
    return (
        <Layout className="layout">
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className="demo-logo" ></div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[current]}
                    onClick={onClick}
                    items={items}
                />
            </Header>
            <Content
                style={{
                    padding: '0 50px',
                }}
            >
                <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                    items={pathList}
                >
                    {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item> */}
                </Breadcrumb>
                <div
                    className="site-layout-content"
                    style={{
                        background: colorBgContainer,
                    }}
                >
                    <Outlet></Outlet>
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                Ant Design ©2023 Created by Ant UED
            </Footer>
        </Layout>
    );
};
export default App;