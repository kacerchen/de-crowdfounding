import React, { Component } from 'react';
import CardReactFormContainer from 'card-react';
import Form from '../uielements/form';
import { Input, Icon } from 'antd';
import Select, { SelectOption } from '../uielements/select';
import isoModal from '../feedback/modal';
import { CardInfoWrapper, InfoFormWrapper } from './payboxModal.style';
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
  constructor(props) {
    super(props);

    this.state = {
      payObj: {}
    }
  }

  render() {
      const {
          editView,
          modalType,
          selectedProject,
          handleCancel,
          updateProject,
      } = this.props;

      let { payObj } = this.state;

      const saveButton = () => {
          let { payObj } = this.state;
          selectedProject['investors'].push(payObj);
          let newBal = Number(selectedProject['balance']) + Number(payObj['amount']);
          selectedProject['balance'] = newBal.toString();
          updateProject(selectedProject);
      };

      const containerId = 'card-wrapper';

      return (
          <Modal
              visible={editView}
              title={modalType === 'edit' ? 'Edit Project' : 'Back Project'}
              onCancel={handleCancel}
              cancelText="Cancel"
              onOk={saveButton}
              okText={modalType === 'edit' ? 'Edit Project' : 'Back Project'}
          >

          <CardInfoWrapper id={containerId} className="isoCardWrapper" />
          <InfoFormWrapper>
            <Form className="isoCardInfoForm">
                <div style={{"margin": "auto", "margin-bottom": "5%"}}>
                  <Icon type="dollar" style={{ fontSize: '40px' }} spin />
                  <b><Icon type="dollar" style={{ fontSize: '20px' }} spin /></b>
                </div>
                <InputField
                    placeholder='Account'
                    type="text"
                    className={`isoCardInput name`}
                    onChange={event => {
                        payObj['account'] = event.target.value;
                        // updateProject(selectedProject);
                    }}
                    name='account'
                    key='0'
                />

                <InputField
                  placeholder='Enter amount'
                  type="text"
                  className={`amount`}
                  onChange={event => {
                      payObj['amount'] = event.target.value;
                      // updateProject(selectedProject);
                  }}
                  name='amount'
                  key='1'
                  addonBefore="$"
                  addonAfter={selectedProject['currency']}
                />
            </Form>
          </InfoFormWrapper>
  
          </Modal>
      );
  };

}