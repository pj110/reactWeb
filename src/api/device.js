import request from '@/utils/req'


export function DeviceGetList(data) {
    return request({
        url: '/api/Device/GetList',
        method: 'post',
        data
    })
}

export function GetAllGroupName() {
    return request({
        url: '/api/Device/GetAllGroupName',
        method: 'get'
    })
}

export function DeviceGet(data) {
    return request({
        url: `/api/Device/Get?Id=${data}`,
        method: 'get'
    })
}
export function GetMediaServerEasyList() {
    return request({
        url: `/api/AKStream/GetMediaServerEasyList`,
        method: 'get'
    })
}


export function DeviceUpdate(data) {
    return request({
        url: '/api/Device/Update',
        method: 'post',
        data
    })
}

export function DeviceAdd(data) {
    return request({
        url: '/api/Device/Add',
        method: 'post',
        data
    })
}


export function UpdateGroupName(data) {
    return request({
        url: '/api/Device/UpdateGroupName',
        method: 'post',
        data
    })
}

export function ExportExcel(data) {
    return request({
        url: '/api/Device/ExportExcel',
        method: 'post',
        data
    })
}
export function DeviceDelete(data) {
    return request({
        url: '/api/Device/Delete',
        method: 'post',
        data
    })
}