import React, { useEffect, useState, useRef } from 'react'
import { Form, Card, Input, Radio, Button, Space, Modal, Switch, Popconfirm, message } from 'antd'
import { GetAllDevice, StreamLive } from '@/api/videoAccess'
import './videoAccess.scss'
import Tree from './components/Trees'
import VideoBox from './components/VideoBox'
const { Search } = Input;
export default function VideoAccess() {
    const videoBox = useRef(null)//
    //tableRef.current.reGetList()
    function startPlay(type) {
        return videoBox.current.startPlay(type)
    }
    const [type, setType] = useState('FLV')
    const [messageApi, contextHolder] = message.useMessage();
    const key = 'getUrl';
    useEffect(() => {
        let pamasData = {
            isPage: false,
            keyword: ''
        }
        getTree(pamasData)
    }, [])
    const [treeData, setTreeData] = useState([])
    //销毁视频
    function destroyPlay() {
        videoBox.current.destroyPlay()
        form.setFieldsValue({
            url: '',
            Id: '',
            Channel:''
        })
        setUrlObj({})
    }
    //获取
    async function getTree(pamasData) {
        let data = await GetAllDevice(pamasData);
        if (data.state === 1) {
            let { message } = data;
            message.forEach(element => {
                element.Id = element.name
                element.Name = element.name
            });
            setTreeData([...data.message])
        }
    }
    function onSearch(e) {
        let pamasData = {
            isPage: false,
            keyword: e
        }
        getTree(pamasData)
    }
    const [disabled, setDisabled] = useState(false)
    const [urlObj, setUrlObj] = useState({})
    const [selectedKeys,setselectedKeys]=useState([])
    async function getFunction(e) {
        console.log('selected', e.node.key);
        if (!e.node.value) {
            setselectedKeys([e.node.key])
            destroyPlay()
            setDisabled(true)
            messageApi.open({
                key,
                type: 'loading',
                content: '加载中...',
            });
            let res = await StreamLive(e.node.Id)
            if (res.state === 1) {
                setVideoType('FLV')
                console.log(videoBox)
                setUrlObj(res.message)
                messageApi.open({
                    key,
                    type: 'success',
                    content: '加载成功',
                    duration: 2,
                });
                form.setFieldsValue({
                    url: res.message.httpFlv,
                    Id: e.node.Id
                })

            }
            setDisabled(false)
        }
    }
    function changeGroup(e) {
        const { target: { value } } = e;
        setVideoType(value)
        //判断看的是flv还是hls
        switch (value) {
            case 'FLV':
                form.setFieldsValue({
                    url: urlObj.httpFlv
                })
                break;
            case 'HLS':
                form.setFieldsValue({
                    url: urlObj.hls
                })
                break;

            default:

                break;
        }
    }

    const [videoType, setVideoType] = useState('FLV')
    const [form] = Form.useForm();
    return (
        <div id='VideoAccess'>
            {contextHolder}
            <div className='VideoAccess_treeBox'>

                <Search
                    placeholder="请输入内容"
                    onSearch={onSearch}
                    enterButton
                />
                <Tree treeData={treeData} disabled={disabled} getFunction={getFunction} selectedKeys={selectedKeys}></Tree>
            </div>
            <div className='VideoAccess_videoBox'>
                <VideoBox ref={videoBox} url={urlObj} type={videoType}></VideoBox>
                <Card style={{ marginTop: '10px' }}>
                    <Form.Item label="码流切换"
                        labelCol={{ span: 3 }}>
                        <Radio.Group defaultValue="FLV" buttonStyle="solid" onChange={changeGroup} value={videoType}>
                            <Radio.Button value="FLV">FLV</Radio.Button>
                            <Radio.Button value="HLS">HLS</Radio.Button>
                        </Radio.Group>

                    </Form.Item>
                    <Form
                        form={form}
                        layout='horizontal'
                        disabled={true}
                        labelCol={{ span: 3 }}
                    >
                        <Form.Item label="码流地址" name="url">
                            <Input></Input>
                        </Form.Item>
                        <Form.Item label="EasyCVR_Id" name="Id">
                            <Input></Input>
                        </Form.Item>
                        <Form.Item label="EasyCVR_Channel" name="Channel">
                            <Input></Input>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    )
}
