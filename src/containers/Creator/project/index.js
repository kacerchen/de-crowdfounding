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
import claimActions from '../../../redux/claim/actions';
import closeoutActions from '../../../redux/closeout/actions';
import basicStyle from '../../../config/basicStyle';
import { ButtonWrapper } from '../../../components/card/cardModal.style';
import {
    DateRangePicker,
  } from '../../../components/uielements/reactDates';
import moment from 'moment';
import configs from './dateconfig';
import SimpleTable from '../../Tables/antTables/tableViews/simpleView';
import { createColumns } from './fakeconfig';
import * as fetchdata from './fetchdata';

const { 
  addCard, 
  editCard, 
  deleteCard, 
  restoreCards, 
  requestCards,
  requestCardsByAccount, 
  requestCardsById,
} = cardActions;

const {
  addClaim,
} = claimActions;

const {
  addCloseout,
} = closeoutActions;

class Projects extends Component {
    constructor(props) {
        super(props);
        this.addClaimColumn = this.addClaimColumn.bind(this);
        this.addCloseoutColumn = this.addCloseoutColumn.bind(this);
        this.addColumn = this.addColumn.bind(this);
        this.editColumn = this.editColumn.bind(this);
        this.submitProject = this.submitProject.bind(this);
        this.updateProject = this.updateProject.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.renderDatePicker = this.renderDatePicker.bind(this);

        const url = this.props.location.pathname;

        this.columns = createColumns(this.addClaimColumn, this.addCloseoutColumn, this.props.deleteCard, url);

        this.state = {
            editView: false,
            selectedProject: null,
            modalType: '',
            configsValue: configs,
            units: null,
            accountId: 'bob$pagoservices.com',
        };
    }

    addClaimColumn(claim) {
      console.log(claim);
      this.props.addClaim(claim);
    }

    addCloseoutColumn(closeout) {
      console.log(closeout);
      this.props.addCloseout(closeout);
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
            appId: new Date().getTime(),
            key: new Date().getTime(),
            name: '',
            description: '',
            videoUrl: '',
            balance: '0',
            goalAmount: '',
            goalAssetId: '',
            creatorAddress: '',
            receiverAddress: '',
            // timelimit: '',
            additional: '',
            investors: [],
            startDate: null,
            endDate: null,
            closeOutDate: null,
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
              selectedProject.closeOutDate = endDate
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
      if(cards == undefined) {
        return [];
      }

      cards.forEach((card) => {
        if(moment.isMoment(card.startDate)) {
          card.startDate = card.startDate.locale('pl').format('LLLL');
        } else {
          card.startDate = moment.unix(card.startDate/1000).format("MM/DD/YYYY");
        }
        if(moment.isMoment(card.endDate)) {
          card.endDate = card.endDate.locale('pl').format('LLLL');
        } else {
          card.endDate = moment.unix(card.endDate/1000).format("MM/DD/YYYY");
        }
        if(moment.isMoment(card.closeOutDate)) {
          card.closeOutDate = card.closeOutDate.locale('pl').format('LLLL');
        } else {
          card.closeOutDate = moment.unix(card.closeOutDate/1000).format("MM/DD/YYYY");
        }
      });

      return cards;
    }

    initOptions() {
      // this.test();
      fetchdata.getAllAssets((res) => {
        let unitsArr = [];

        for (let asset of res) {
          // let unit = asset['params']['unit-name'];
          let id = asset['assetId'];
          let name = asset['assetName'];
          unitsArr.push({ id, name });
        }

        this.setState({
          units: unitsArr
        })
      });
    }

    initTableData() {
      let account = this.state.accountId;
      this.props.requestCardsByAccount(account);
      // this.props.requestCards();
      console.log(this.props.cards);
    }

    componentDidMount() {
      this.initTableData();
      this.initOptions();
    }

    render(){
        const { rowStyle, colStyle, gutter } = basicStyle;
        const { editView, selectedProject, modalType, units } = this.state;
        const cards = this.dateToString(clone(this.props.cards_byAcc));
        // console.log(this.props);
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

                    {/* <ButtonWrapper className="isoButtonWrapper">
                      <Button type="primary" className="" onClick={this.test()}>
                        Fetch Funds
                      </Button>
                    </ButtonWrapper> */}

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
                        units={units}
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
  // let projects = await state.Projects;
  // console.log(state);
  return {
    ...state.Projects.toJS(),
  };
}

export default connect(mapStateToProps, {
  addCard,
  editCard,
  deleteCard,
  restoreCards,
  requestCards,
  requestCardsByAccount,
  requestCardsById,
  addClaim,
  addCloseout,
})(Projects);