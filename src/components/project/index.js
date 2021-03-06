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

const selectAfter = (units, selectedProject, updateProject) => {
  let options_template = units.map((unit) => { 
    return <Option value={unit.id}>{unit.name}</Option>
   });

  return <Select 
    onChange={value => {
      selectedProject['goalAssetId'] = parseInt(value);
      updateProject(selectedProject);
    }}
    name='currency'
    key='3'
    style={{ width: 100 }}>
    
    {options_template}
    {/* <Option value="USD">USD</Option>
    <Option value="ALGO">ALGO</Option>
    <Option value="USDC">USDC</Option>
    <Option value="USDT">USDT</Option> */}
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
            units
        } = this.props;

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
                          selectedProject['videoUrl'] = event.target.value;
                          updateProject(selectedProject);
                      }}
                      name='videourl'
                      key='2'
                  />

                  <InputField
                    placeholder='Goal Amount'
                    type="text"
                    className={`goalamount`}
                    style={{"margin-top":"10px"}}
                    onChange={event => {
                        selectedProject['goalAmount'] = event.target.value;
                        updateProject(selectedProject);
                    }}
                    name='goalamount'
                    key='3'
                    addonBefore="$"
                    addonAfter={selectAfter(units, selectedProject, updateProject)}
                  />

                  <InputField
                      placeholder='Project Account'
                      type="text"
                      className={`isoAccountInput projectaccount`}
                      onChange={event => {
                          selectedProject['creatorAddress'] = event.target.value;
                          selectedProject['receiverAddress'] = event.target.value;
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