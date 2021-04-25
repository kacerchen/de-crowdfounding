import React from 'react';
import { DeleteCell, EditableCell, EditCell } from '../../Tables/antTables/helperCells';
import moment from 'moment';
import Button from '../../../components/uielements/button';
// import { Button } from 'antd';
function createColumns(editColumn, deleteColumn, url) {
  return [
    {
      title: 'Project Name',
      dataIndex: 'name',
      rowKey: 'name'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      rowKey: 'description'
    },
    {
      title: 'Video',
      dataIndex: 'videoUrl',
      rowKey: 'videoUrl'
    },
    {
      title: 'Current Balance',
      dataIndex: 'balance',
      rowKey: 'balance'
    },
    {
      title: 'Goal Amount',
      dataIndex: 'goalAmount',
      rowKey: 'goalAmount'
    },
    {
        title: 'Currency',
        dataIndex: 'goalAssetId',
        rowKey: 'goalAssetId'
    },
    {
        title: 'Project Account',
        dataIndex: 'creatorAddress',
        rowKey: 'creatorAddress'
    },
    {
        title: 'Start Date',
        dataIndex: 'startDate',
        rowKey: 'startDate'
    },
    {
        title: 'End Date',
        dataIndex: 'endDate',
        rowKey: 'endDate'
    },
    {
      title: '',
      rowKey: 'action',
      render: (text, record) =>
        <span>
          <EditCell
            project={record}
            linkto={url}
          />
        </span>
    },
    {
      title: '',
      rowKey: 'action',
      render: (text, record) => {
        // <ButtonWrapper className="isoButtonWrapper">
        // </ButtonWrapper>
        return (
          <Button type="primary" onClick={console.log('click')}>
            Claim
          </Button>
        )
      }
    },
    {
      title: '',
      rowKey: 'action',
      render: (text, record) =>
        <span>
          <DeleteCell
            onDeleteCell={() => {
              deleteColumn(record);
            }}
          />
        </span>
    }
  ];
}

const fakedata = [
  {
    id: 3,
    key: 1,
    name: 'Project A',
    description: 'Nulla vitae elit libero, a pharetra augue.',
    videourl: 'https://www.youtube.com/embed/EngW7tLk6R8',
    balance: '1900',
    goalamount: '30000',
    currency: 'USD',
    projectaccount: '**************************',
    startDate: moment("20201108", "YYYYMMDD"),
    endDate: moment("20201231", "YYYYMMDD"),
    additional: '',
    investors: [
      {
        payid: 'kris$pagoservices.com',
        amount: '123'
      }
    ]
  },
  {
    id: 2,
    key: 2,
    name: 'Project B',
    description: 'Nullam id dolor id nibh ultricies vehicula ut id elit.',
    videourl: 'https://www.youtube.com/embed/HjxYvcdpVnU',
    balance: '5000',
    goalamount: '10000',
    currency: 'ALGO',
    projectaccount: '**************************',
    startDate: moment("20201108", "YYYYMMDD"),
    endDate: moment("20210121", "YYYYMMDD"),
    additional: '',
    investors: [
      {
        payid: 'kathy$pagoservices.com',
        amount: '56'
      }
    ]
  },
  {
    id: 1,
    key: 3,
    name: 'Project C',
    description: 'Nulla vitae elit libero, a pharetra augue.',
    videourl: 'https://www.youtube.com/embed/K4TOrB7at0Y',
    balance: '30000',
    goalamount: '5000',
    currency: 'USDC',
    projectaccount: '**************************',
    startDate: moment("20201108", "YYYYMMDD"),
    endDate: moment("20201210", "YYYYMMDD"),
    additional: '',
    investors: [
      {
        payid: 'alice$pagoservices.com',
        amount: '1000'
      },
      {
        payid: 'bob$pagoservices.com',
        amount: '29000'
      }
    ]
  }
];
export { createColumns, fakedata };
