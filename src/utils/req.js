import axios from 'axios'
import { message } from 'antd'
//import { useNavigate } from 'react-router-dom'
import { store } from '@/redux/store'
import { isLoginAction } from '@/redux/action/login'
//带上Cookie让后端知道是我传的
axios.defaults.withCredentials = true;
const service = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? 'http://localhost:63739' : '', // api的base_url
    timeout: 120000 // 请求超时时间
})
// respone响应拦截器
service.interceptors.response.use(
    response => {
        /**
        * 状态码	状态说明
          0	    请求受到提示，但成功，message将返回提示正文
          1	    （常用）请求成功，message将返回请求正文
          2	    （常用）请求出错，message将返回错误正文
          3	    （常用）请求检测到没有登录，message将返回错误描述
          4	    （常用）请求检测到没有权限不允许处理，message将返回错误描述
          5	    请求检测到其他警告，不允许处理，message将返回错误描述
        */
        const res = response.data
        const stateCode = res.state
        const stateEnum = {
            'tip': 0, // 提示
            'success': 1, // 成功
            'error': 2, // 出错
            'noLogin': 3, // 没有登陆
            'noPermission': 4, // 没有权限
            'warning': 5 // 警告
        }
        switch (stateCode) {
            case stateEnum.tip:
                message.warning(res.message);
                return res
            case stateEnum.success:
                return res
            case stateEnum.error:
            case stateEnum.noPermission:
            case stateEnum.warning:
                message.error(res.message);
                return res
            case stateEnum.noLogin:
                //store.commit('SET_LOGINAGAIN', true)
                console.log('res', res)
                store.dispatch(isLoginAction(false))
                //useNavigate("/login");
                return res
            default:
                return res
        }
    },
    error => {
        console.log('err' + error)// for debug
        message.error(error.message);
        return Promise.reject(error)
    }
)

export default service
