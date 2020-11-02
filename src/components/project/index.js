import React, { Component } from 'react';
import CardReactFormContainer from 'card-react';
import Form from '../uielements/form';
import { Input } from 'antd';
import isoModal from '../feedback/modal';
import { InputWrapper } from '../uielements/styles/input.style';
import Modals from '../../containers/Feedback/Modal/modal.style';
import WithDirection from '../../config/withDirection';

const WDModal = Modals(isoModal);
const Modal = WithDirection(WDModal);

const InputField = InputWrapper(Input);

export default class extends Component {
    render() {
        const {
            modalType,
            editView,
            selectedProject,
            handleCancel,
        } = this.props;

        const saveButton = () => {
            submitCard();
        };

        return (
            <Modal
                title={modalType === 'edit' ? 'Edit Card' : 'Add Card'}
                visible={editView}
                onCancel={handleCancel}
                cancelText="Cancel"
                okText={modalType === 'edit' ? 'Edit Card' : 'Add Card'}
            >
    
            </Modal>
        );
    };

}