import request from '@/utils/req'
//POST获取列表

export function GetAllDevice(data) {
    return request({
        url: '/api/Device/GetAllDevice',
        method: 'post',
        data
    })
}
export function StreamLive(data) {
    return request({
        url: '/api/Device/StreamLive?Id='+data,
        method: 'get'
    })
}