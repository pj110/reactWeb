import request from '@/utils/req'
//POST获取列表

export function SysUserGetList(data) {
    return request({
        url: '/api/SysUser/GetList',
        method: 'post',
        data
    })
}
//GET
export function SysUserGet(data) {
    return request({
        url: `/api/SysUser/Get?Id=${data}`,
        method: 'get'
    })
}
//POST用户修改
export function SysUserUpdate(data) {
    return request({
        url: '/api/SysUser/Update',
        method: 'post',
        data
    })
}
//POST用户添加
export function SysUserAdd(data) {
    return request({
        url: '/api/SysUser/Add',
        method: 'post',
        data
    })
}
//用户删除
export function SysUserDelete(data) {
    return request({
        url: '/api/SysUser/Delete',
        method: 'post',
        data
    })
}

