import React from 'react';
import { DeleteCell, EditableCell, EditCell } from '../../Tables/antTables/helperCells';
import moment from 'moment';
import Button from '../../../components/uielements/button';

function createColumns(url) {
  return [
    {
      title: 'Reclaim ID',
      dataIndex: 'id',
      rowKey: 'id'
    },
    {
      title: 'Project ID',
      dataIndex: 'fundId',
      rowKey: 'fundId'
    },
    {
      title: 'Investor',
      dataIndex: 'investorAddress',
      rowKey: 'investorAddress'
    },
    {
      title: 'Reclaim Amount',
      dataIndex: 'reclaimAmount',
      rowKey: 'reclaimAmount'
    },
    {
        title: 'Reclaimed Date',
        dataIndex: 'reclaimDate',
        rowKey: 'reclaimDate'
    },
    {
        title: 'Status',
        dataIndex: 'reclaimState',
        rowKey: 'reclaimState'
    },
    // {
    //   title: '',
    //   rowKey: 'action',
    //   render: (text, record) =>
    //     <span>
    //       <EditCell
    //         project={record}
    //         linkto={url}
    //       />
    //     </span>
    // }
  ];
}

const fakedata = [
  {
    id: "1",
    key: 1,
    fundId: "1",
    investorAddress: "bob$pagoservices.com",
    reclaimAmount: 750,
    reclaimDate: 1620517416733,
    reclaimState: null
  },
  // {
  //   id: 2,
  //   key: 2,
  //   name: 'Project B',
  //   description: 'Nullam id dolor id nibh ultricies vehicula ut id elit.',
  //   videourl: 'https://www.youtube.com/embed/HjxYvcdpVnU',
  //   balance: '5000',
  //   goalamount: '10000',
  //   currency: 'ALGO',
  //   projectaccount: '**************************',
  //   startDate: moment("20201108", "YYYYMMDD"),
  //   endDate: moment("20210121", "YYYYMMDD"),
  //   additional: '',
  //   investors: [
  //     {
  //       payid: 'kathy$pagoservices.com',
  //       amount: '56'
  //     }
  //   ]
  // },
  // {
  //   id: 1,
  //   key: 3,
  //   name: 'Project C',
  //   description: 'Nulla vitae elit libero, a pharetra augue.',
  //   videourl: 'https://www.youtube.com/embed/K4TOrB7at0Y',
  //   balance: '30000',
  //   goalamount: '5000',
  //   currency: 'USDC',
  //   projectaccount: '**************************',
  //   startDate: moment("20201108", "YYYYMMDD"),
  //   endDate: moment("20201210", "YYYYMMDD"),
  //   additional: '',
  //   investors: [
  //     {
  //       payid: 'alice$pagoservices.com',
  //       amount: '1000'
  //     },
  //     {
  //       payid: 'bob$pagoservices.com',
  //       amount: '29000'
  //     }
  //   ]
  // }
];
export { createColumns, fakedata };
