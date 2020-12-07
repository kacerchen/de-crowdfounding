import React, { Component } from 'react';
import CardReactFormContainer from 'card-react';
import Form from '../uielements/form';
import { Input } from 'antd';
import Select, { SelectOption } from '../uielements/select';
import isoModal from '../feedback/modal';
import { CardInfoWrapper, InfoFormWrapper } from './projectModal.style';
import { InputWrapper } from '../uielements/styles/input.style';
import Modals from '../../containers/Feedback/Modal/modal.style';
import WithDirection from '../../config/withDirection';
// import { ReactDatesWrapper } from './reactDates.style';

const Option = SelectOption;

const WDModal = Modals(isoModal);
const Modal = WithDirection(WDModal);
const { TextArea } = Input;

const InputField = InputWrapper(Input);

const selectAfter = (selectedProject, updateProject) => {
  return <Select 
    onChange={value => {
      selectedProject['currency'] = value;
      updateProject(selectedProject);
    }}
    name='currency'
    key='3'
    style={{ width: 70 }}>
    <Option value="USD">USD</Option>
    <Option value="ALGO">ALGO</Option>
    <Option value="USDC">USDC</Option>
    <Option value="USDT">USDT</Option>
  </Select>
};

export default class extends Component {

    render() {
        const {
            modalType,
            editView,
            selectedProject,
            handleCancel,
            submitProject,
            updateProject,
            renderDatePicker,
        } = this.props;

        this.columns = [
            {
              title: 'Project Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Description',
              dataIndex: 'description',
              key: 'description',
            },
            {
              title: 'Goal Amount',
              dataIndex: 'goalamount',
              key: 'goalamount',
            },
            {
              title: 'Currency',
              dataIndex: 'currency',
              key: 'currency',
            },
            {
                title: 'Project Account',
                dataIndex: 'projectaccount',
                key: 'projectaccount',
            },
            {
                title: 'Timelimit',
                dataIndex: 'timelimit',
                key: 'timelimit',
            },
        ];

        const saveButton = () => {
            submitProject();
        };

        const containerId = 'card-wrapper';

        return (
            <Modal
                title={modalType === 'edit' ? 'Edit Project' : 'Add Project'}
                visible={editView}
                onCancel={handleCancel}
                cancelText="Cancel"
                onOk={saveButton}
                okText={modalType === 'edit' ? 'Edit Project' : 'Add Project'}
            >

            <CardInfoWrapper id={containerId} className="isoCardWrapper" />
            <InfoFormWrapper>
              <Form className="isoCardInfoForm">
                {/* {this.columns.map((column, index) => {
                  const { key, title } = column;
                  return (
                    <InputField
                      placeholder={title}
                      type="text"
                      className={`isoCardInput ${key}`}
                      onChange={event => {
                          selectedProject[key] = event.target.value;
                          updateProject(selectedProject);
                      }}
                      name={key}
                      key={index}
                    />

                    );
                  })} */}

                  <InputField
                      placeholder='Project Name'
                      type="text"
                      className={`isoCardInput name`}
                      onChange={event => {
                          selectedProject['name'] = event.target.value;
                          updateProject(selectedProject);
                      }}
                      name='name'
                      key='0'
                  />

                  <TextArea
                    placeholder='Description'
                    type="text"
                    className={`isoCardInput description`}
                    onChange={event => {
                        selectedProject['description'] = event.target.value;
                        updateProject(selectedProject);
                    }}
                    name='description'
                    key='1'
                  />

                  <InputField
                      placeholder='Video Link'
                      type="text"
                      className={`videourl`}
                      onChange={event => {
                          selectedProject['videourl'] = event.target.value;
                          updateProject(selectedProject);
                      }}
                      name='videourl'
                      key='2'
                  />

                  <InputField
                    placeholder='Goal Amount'
                    type="text"
                    className={`goalamount`}
                    onChange={event => {
                        selectedProject['goalamount'] = event.target.value;
                        updateProject(selectedProject);
                    }}
                    name='goalamount'
                    key='3'
                    addonBefore="$"
                    addonAfter={selectAfter(selectedProject, updateProject)}
                  />

                  <InputField
                      placeholder='Project Account'
                      type="text"
                      className={`isoAccountInput projectaccount`}
                      onChange={event => {
                          selectedProject['projectaccount'] = event.target.value;
                          updateProject(selectedProject);
                      }}
                      name='projectaccount'
                      key='4'
                  />

                  <div className='isoAccountInput'>
                    {renderDatePicker()}
                  </div>

              </Form>
            </InfoFormWrapper>
    
            </Modal>
        );
    };

}