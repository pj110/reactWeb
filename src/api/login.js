import request from '@/utils/req'
//登录
export function PasswordLogin(data) {
    return request({
        url: '/api/Login/Login',
        method: 'post',
        data
    })
}
//登出
export function logout() {
    return request({
        url: '/api/Login/Out',
        method: 'post'
    })
}