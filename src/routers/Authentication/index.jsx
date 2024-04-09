//路由鉴权
//高阶组件传入一个组件返回一个组件
//如果不达到要求则返回一个Navigate
import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
//将它封装成为一个容器组件用于接受store中的isLogin判断是否登陆，后面也可以获取到其他路由权限信息
function Authentication(props) {
    useEffect(() => {
        console.log('调用了useEffect', props)

    }, [])
    console.log('调用了我', props)
    //结构赋值
    const { store: { isLogin }, children } = props;
    //判断是否登陆
    if (isLogin) {
        return children
    } else {
        return <Navigate to='/login'></Navigate>
    }
}
export default connect(
    (store) => ({ store })
)(Authentication)