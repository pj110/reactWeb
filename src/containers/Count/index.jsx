import { connect } from 'react-redux'
import React from 'react'
import { Button } from 'antd'
import { IncrementAction, UncrementAction } from '../../redux/action/count'
import './count.scss'
function CountUI(props) {
    const { count, IncrementAction, UncrementAction } = props;
    function incerment() {
        IncrementAction(1)
    }
    function uncerment() {
        UncrementAction(1)
    }
    return (
        <div className='count'>
            <h2>现在的数字是{count}</h2>
            <Button type="primary" onClick={incerment} danger>点我加一</Button>
            <Button onClick={uncerment} >点我减一</Button>
        </div>
    )
}

export default connect(
    (store) => ({ count: store.count }),
    {
        IncrementAction,
        UncrementAction
    }
)(CountUI)