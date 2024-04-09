import React, { Fragment, useEffect, useState, useImperativeHandle, forwardRef } from 'react'
import { Table, Button } from 'antd';
import { type } from '@testing-library/user-event/dist/type';
/**
 * @data 数据数组,当使用这个参数之后，将自己手动更新参数loader接口获取列表将不可用
 * 
 * @configList 表格配置 (必填)
 * {
 *      title:string,
 *      dataIndex:string,
 *      key:string,
 *      render:():element=>{}
 * }
 * 
 * 
 * @rowSelection 多线单选(不用就别传)
 * {type:checkbox | radio}
 * @loader 接口获取列表
 * @rows 一页多少条 默认10条
 * @soonLoader 是否渲染页面是就直接调用数据 默认为true
 * @rowkey 不给这个key有警告
 * @bordered 是否展示边框
 * @maxhight
 * */
function MyTable(props, ref) {
    const { data, configList, rowSelection, loader, rows = 10, soonLoader = true, rowkey = 'id', bordered = true,maxhight=500 } = props;
    const [selectList, setSelectList] = useState([])
    let selectOptions = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectList([...selectedRows])
        },
    }
    if (!rowSelection) {
        selectOptions = undefined;
    } else {
        selectOptions = { ...rowSelection, ...selectOptions }
    }
    //是否加载
    const [loading, setLoading] = useState(false);
    //最后表格所使用的数据
    let [dataSource, setDataSource] = useState([]);
    //表格当前页数
    const [pagination, setPagination] = useState({
        pageSizeOptions: [10, 20, 50],
        total: 0,
        showSizeChanger: true,
        onChange: (e, a) => {
            pageChange(e, a)
        },
        showTotal: (total) => ` 共${total}条`
    })
    const [pageAndSize, setPageAndSize] = useState({
        current: 1,
        pageSize: rows
    })
    //
    //储存条件查询
    let [query1, setQuery] = useState({});
    //当列表页数改变时
    function pageChange(current, pageSize) {
        setPageAndSize(e => ({
            ...e,
            current,
            pageSize
        }))
    }
    useEffect(() => {
        //判断是否使用props.data从而判断通过哪种方式获取列表数据
        if (data) {
            //使用用户传入的data作为列表数据
            setDataSource([...data])
        } else {
            //使用接口获取列表数据
            if (soonLoader) {

                //第一次进入都是都是第一页
                getList()
            }
        }
    }, [data, query1, pageAndSize])

    //useImperativeHandle钩子指定方法或者数据暴露给父组件
    useImperativeHandle(ref, () => ({
        reGetList,
        selectList
    }))
    //获取列表时传入的参数
    function getList() {
        setLoading(true)
        const { current, pageSize } = pageAndSize
        let querydata = { page: current, rows: pageSize, ...query1 }
        loader(querydata)
            .then(res => {
                setDataSource(res.rows)
                setPagination(e => ({
                    ...e,
                    total: res.total
                }))
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    //给父组件刷新或自己调用组件的方法
    function reGetList(data = {}) {
        //储存其他参数
        setQuery(data)
        setPageAndSize(e => ({
            ...e,
            current: 1
        }))
    }
    return (
        <Fragment>
            <Table 
            bordered={bordered} 
            loading={loading} 
            dataSource={dataSource} 
            columns={configList} 
            rowKey={(e) => e[rowkey]} 
            rowSelection={selectOptions} 
            pagination={{ ...pagination, ...pageAndSize }} 
            scroll={{
                y: maxhight,
            }}></Table>
        </Fragment>
    )
}
//高阶函数-forwardRef-传入一个组件，将组件转发出去
export default forwardRef(MyTable)