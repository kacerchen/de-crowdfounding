import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import clone from 'clone';
import Button from '../../../components/uielements/button';
import PageHeader from '../../../components/utility/pageHeader';
import Box from '../../../components/utility/box';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import Card from '../../../components/project';
import cardActions from '../../../redux/project/actions';
import basicStyle from '../../../config/basicStyle';
import { ButtonWrapper } from '../../../components/card/cardModal.style';
import {
    DateRangePicker,
  } from '../../../components/uielements/reactDates';
import configs from './dateconfig';
import SimpleTable from '../../Tables/antTables/tableViews/simpleView';
import { createColumns } from './fakeconfig';

const { addCard, editCard, deleteCard, restoreCards } = cardActions;
class Projects extends Component {
    constructor(props) {
        super(props);
        this.addColumn = this.addColumn.bind(this);
        this.editColumn = this.editColumn.bind(this);
        this.submitProject = this.submitProject.bind(this);
        this.updateProject = this.updateProject.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.renderDatePicker = this.renderDatePicker.bind(this);

        this.columns = createColumns(this.editColumn, this.props.deleteCard);

        this.state = {
            editView: false,
            selectedProject: null,
            modalType: '',
            configsValue: configs,
        };
    }

    editColumn(project) {
        this.setState({
          editView: true,
          selectedCard: clone(project),
          modalType: 'edit',
        });
    }

    addColumn() {
        this.setState({
          editView: true,
          selectedProject: {
            id: new Date().getTime(),
            key: new Date().getTime(),
            name: '',
            description: '',
            goalamount: '',
            currency: '',
            projectaccount: '',
            timelimit: '',
            startDate: null,
            endDate: null,
            focusedInput: null,
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

    submitProject(project) {
        if (this.state.modalType === 'edit') {
          this.props.editCard(this.state.selectedProject);
        } else {
          this.props.addCard(this.state.selectedProject);
        }
        this.setState({
          editView: false,
          selectedProject: null,
        });
    }

    updateProject(selectedProject) {
        this.setState({ selectedProject });
    }

    renderDatePicker() {
        const {
            selectedProject,
        } = this.state;

        let startDate = selectedProject.startDate;
        let endDate = selectedProject.endDate;
        let focusedInput = selectedProject.focusedInput;

        let options = {
          startDate: selectedProject.startDate,
          endDate: selectedProject.endDate,
          startDateId: "your_unique_start_date_id",
          endDateId: "your_unique_end_date_id",
          onDatesChange: ({ startDate, endDate }) => {
              selectedProject.startDate = startDate // ? startDate.locale('pl').format('LLLL') : null
              selectedProject.endDate = endDate // ? endDate.locale('pl').format('LLLL')  : null
              this.setState(selectedProject)
          },
          focusedInput: selectedProject.focusedInput,
          onFocusChange:(focusedInput) => {
            selectedProject.focusedInput = focusedInput;
            this.setState(selectedProject)
          },
        }

        this.state.configsValue[0].options.forEach(option => {
          options[option.id] = option.value;
        });
        
        if (this.props.view === 'MobileView') {
          options.numberOfMonths = 1;
        }
        return (
          <div className="isoReactDate">
            {<DateRangePicker isOutsideRange={() => false} {...options} />}
          </div>
        );
    }

    dateToString(cards) {
      cards.forEach((card) => {
        if(typeof(card.startDate) != "string") {
          card.startDate = card.startDate.locale('pl').format('LLLL');
        }
        if(typeof(card.endDate) != "string") {
          card.endDate = card.endDate.locale('pl').format('LLLL');
        }
      });

      return cards;
    }

    render(){
        const { rowStyle, colStyle, gutter } = basicStyle;
        const { editView, selectedProject, modalType } = this.state;
        const cards = this.dateToString(clone(this.props.cards));
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

                    <SimpleTable columns={this.columns} dataSource={cards} />

                    {selectedProject ? (
                        <Card
                        editView={editView}
                        modalType={modalType}
                        selectedProject={selectedProject}
                        handleCancel={this.handleCancel}
                        submitProject={this.submitProject}
                        updateProject={this.updateProject}
                        renderDatePicker={this.renderDatePicker}
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

function mapStateToProps(state) {
  return {
    ...state.Projects.toJS(),
  };
}

export default connect(mapStateToProps, {
  addCard,
  editCard,
  deleteCard,
  restoreCards,
})(Projects);