import React from 'react';
import { DeleteCell } from '../../Tables/antTables/helperCells';
function createColumns(editColumn, deleteColumn) {
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
      title: 'Goal Amount',
      dataIndex: 'goalamount',
      rowKey: 'goalamount'
    },
    {
        title: 'Currency',
        dataIndex: 'currency',
        rowKey: 'currency'
    },
    {
        title: 'Project Account',
        dataIndex: 'projectaccount',
        rowKey: 'projectaccount'
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
    goalamount: '30000',
    currency: 'USD',
    projectaccount: '**************************',
    startDate: '11/08/2020',
    endDate: '12/31/2020'
  },
  {
    id: 2,
    key: 2,
    name: 'Project B',
    description: 'Nullam id dolor id nibh ultricies vehicula ut id elit.',
    goalamount: '10000',
    currency: 'ALGO',
    projectaccount: '**************************',
    startDate: '11/08/2020',
    endDate: '01/31/2021'
  },
  {
    id: 1,
    key: 3,
    name: 'Project C',
    description: 'Nulla vitae elit libero, a pharetra augue.',
    goalamount: '5000',
    currency: 'USDC',
    projectaccount: '**************************',
    startDate: '11/08/2020',
    endDate: '02/10/2021'
  }
];
export { createColumns, fakedata };
