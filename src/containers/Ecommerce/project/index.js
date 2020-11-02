import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import clone from 'clone';
import Button from '../../../components/uielements/button';
import PageHeader from '../../../components/utility/pageHeader';
import Box from '../../../components/utility/box';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import Card from '../../../components/card';
import basicStyle from '../../../config/basicStyle';
import { ButtonWrapper } from '../../../components/card/cardModal.style';

class Projects extends Component {
    constructor(props) {
        super(props);
        this.addColumn = this.addColumn.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        this.state = {
            editView: false,
            selectedProject: null,
            modalType: '',
        };
    }

    addColumn() {
        this.setState({
          editView: true,
          selectedProject: {
            id: new Date().getTime(),
            key: new Date().getTime(),
            number: '',
            name: '',
            expiry: '',
            cvc: '',
          },
          modalType: 'add',
        });
    }

    handleCancel() {
        this.setState({
          editView: false,
          selectedProject: null,
        });
    }

    render(){
        const { rowStyle, colStyle, gutter } = basicStyle;
        const { editView, selectedProject, modalType } = this.state;
        return (
            <LayoutWrapper>
            <PageHeader>Projects</PageHeader>
            <Row style={rowStyle} gutter={gutter} justify="start">
                <Col md={24} sm={24} xs={24} style={colStyle}>
                    <Box>
                    <ButtonWrapper className="isoButtonWrapper">
                        <Button type="primary" className="" onClick={this.addColumn}>
                        Add New Project
                        </Button>
                    </ButtonWrapper>

                    {selectedProject ? (
                        <Card
                        editView={editView}
                        modalType={modalType}
                        selectedProject={selectedProject}
                        handleCancel={this.handleCancel}
                        />
                    ) : (
                        ''
                    )}
                   
                    </Box>
                </Col>
            </Row>
            </LayoutWrapper>
        );
    }
}

export default connect()(Projects);