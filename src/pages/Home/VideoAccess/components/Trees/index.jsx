import React from 'react'
import { DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
const treeData1 = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
          {
            title: 'leaf',
            key: '0-0-0-2',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            title: 'leaf',
            key: '0-0-1-0',
          },
        ],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        children: [
          {
            title: 'leaf',
            key: '0-0-2-0',
          },
          {
            title: 'leaf',
            key: '0-0-2-1',
          },
        ],
      },
    ],
  },
];
export default function Trees({ treeData, disabled, getFunction, selectedKeys }) {
  const onSelect = (selectedKeys, info) => {
    getFunction(info)
  };
  return (
    <>
      <Tree
        selectedKeys={selectedKeys}
        height={600}
        showLine
        switcherIcon={<DownOutlined />}
        defaultExpandedKeys={['0-0-0']}
        onSelect={onSelect}
        treeData={treeData}
        fieldNames={{
          title: 'Name',
          children: 'value',
          key: 'Id'
        }}
        disabled={disabled}
      />
    </>
  )
}
