import request from '@/utils/req'


export function GetWaitList(data) {
    return request({
        url: '/api/Device/GetWaitForActiveVideoChannelList',
        method: 'post',
        data
    })
}

export function ActiveDevice(data) {
    return request({
        url: '/api/Device/ActiveDevice',
        method: 'post',
        data
    })
}
