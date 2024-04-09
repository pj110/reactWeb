//设备类型枚举
const Enum_DeviceType = {
    0: 'IPC',
    1: 'NVR',
    2: 'DVR',
    3: 'UNKNOW'
}
const Enum_DeviceType2 = {
    'IPC': 0,
    //'NVR': 1,
    //'DVR': 2,
    //'UNKNOW': 3
}
//设备流接入类型
const Enum_DeviceStreamType = {
    0: 'GB28181',
    1: 'Rtsp',
    2: 'Http',
    3: 'Rtmp'
}
const Enum_DeviceStreamType2 = {
    'GB28181': 0,
    'Rtsp': 1,
    'Http': 2,
    'Rtmp': 3
}
const getEnum = function (name, isTransform) {
    const data = eval('Enum_' + name)
    let newData = []
    if (isTransform) {
        for (const i in data) {
            const obj = {}
            obj['label'] = i
            obj['value'] = data[i]
            obj['key'] = data[i]
            newData.push(obj)
        }
    } else {
        newData = data
    }
    return newData
}
export default getEnum
