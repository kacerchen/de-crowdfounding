import React, { Component } from 'react';
import { connect } from 'react-redux';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import LayoutContent from '../../../components/utility/layoutContent';
import { Row, Col } from 'antd';
import basicStyle from '../../../config/basicStyle';
import { CardInfoWrapper, InfoFormWrapper } from '../../../components/project/projectModal.style';
import IntlMessages from '../../../components/utility/intlMessages';
import Progress from '../../../components/uielements/progress';
import { rtl } from '../../../config/withDirection';
import Button, { ButtonGroup } from '../../../components/uielements/button';
import { Icon } from 'antd';
import Tabs, { TabPane } from '../../../components/uielements/tabs';
import SimpleTable from '../../Tables/antTables/tableViews/simpleView';
import { ButtonWrapper } from '../../../components/card/cardModal.style';
import Card from '../../../components/paybox';
import cardActions from '../../../redux/project/actions';
import investActions from '../../../redux/investment/actions';
import Chart from '../../../components/chart';
import clone from 'clone';
import moment from 'moment';
// import { useParams } from 'react-router-dom';

const { addCard, editCard, deleteCard, restoreCards, requestCards } = cardActions;
const { addInvestment, requestInvestments } = investActions;
class ShowcasePage extends Component {

    constructor(props) {
      super(props);

      this.state = {
        modalType: '',
        editView: false,
        paybox: null
      }

      this.columns = [
        {
          title: 'Backer',
          dataIndex: 'payid',
          rowKey: 'payid'
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          rowKey: 'amount'
        }
      ];

      this.updateProject = this.updateProject.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
      this.openPayBox = this.openPayBox.bind(this);
    }

    calculatePercentage(curBalance, goalAmout) {
      let b = Number(curBalance);
      let g = Number(goalAmout);
      let percentage = (b/ g) * 100; 
      return percentage.toFixed();
    }

    dateToString(project) {
      if(moment.isMoment(project.startDate)) {
        project.startDate = project.startDate.locale('pl').format('LLLL');
      } else {
        project.startDate = moment.unix(project.startDate/1000).format("MM/DD/YYYY");
      }
      if(moment.isMoment(project.endDate)) {
        project.endDate = project.endDate.locale('pl').format('LLLL');
      } else {
        project.endDate = moment.unix(project.endDate/1000).format("MM/DD/YYYY");
      }

      return project;
    }

    openPayBox() {
      this.setState({
        editView: true,
        modalType: 'add',
        paybox: {
          accountholder: '',
          amount: ''
        }
      });
    }

    handleCancel() {
      this.setState({
        editView: false,
        paybox: null,
      });
    }

    updateProject(selectedProject, payObj) {
      let editView =  false;
      let paybox = null;

      this.props.addInvestment({
        fundId: this.props.id,
        investorAddress: payObj['payid'],
        investmentAmount: Number(payObj['amount']),
      });
      // this.setState({ editView, paybox });
      let totalBal = Number(selectedProject['balance']) + Number(payObj['amount']);
      selectedProject['investors'].push(payObj);
      selectedProject['balance'] = totalBal;
      this.setState({ selectedProject, editView, paybox });
    }

    selectLast(selectedProject, num) {
      let arr = selectedProject.investors;
      if(arr.length != 0) {
        return arr.slice(Math.max(arr.length - num, 0));
      }

      return arr;
    }

    initTableData() {
      this.props.requestCards();
      // console.log(this.props.cards);
    }

    componentDidMount() {
      this.initTableData();
    }

    render() {
        let { id, selectedProject } = this.props;
        const { modalType, paybox, editView } = this.state;
        const { rowStyle, colStyle, gutter } = basicStyle;
        const containerId = 'card-wrapper';
        const marginStyle = {
          margin: rtl === 'rtl' ? '0 0 10px 10px' : '0 10px 10px 0',
        };
        let p = this.calculatePercentage(selectedProject.balance, selectedProject.goalAmount);
        let bar = p >= 100 ? <Progress percent={100} style={marginStyle} /> :
        <Progress percent={p} status="active" style={marginStyle} />;
        let copy_project = clone(selectedProject);
        let formattedProject = this.dateToString(clone(selectedProject));
        return (
            <LayoutContentWrapper style={{ height: '100%' }}>
                <LayoutContent>
                <h3 style={{"color": "#999999"}}>Project ID: {id}</h3>
                <Row style={rowStyle} gutter={gutter} justify="start">
                  <Col md={12} sm={12} xs={24} style={colStyle}>
                    <CardInfoWrapper id={containerId} className="isoCardWrapper" />
                      <iframe 
                        width="100%" 
                        height="315" 
                        src={selectedProject.videoUrl} 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; 
                        encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                      </iframe>
                  </Col>
                  <Col md={12} sm={12} xs={24} style={colStyle}>
                    <div style={{"margin-left": "10px"}}>
                      <h1>{selectedProject.name}</h1>
                      <p style={{"margin-top": "4%"}}>{selectedProject.description}</p>
                      <p style={{"margin-top": "6%"}}>
                        <span>
                          <Col md={12} sm={12} xs={24} style={colStyle}>
                            <b style={{"font-size": "20px", "color": "#4f4e4e"}}>
                              {"$" + selectedProject.balance + " "}
                            </b>
                            {selectedProject.goalAssetId} raised
                          </Col>
                          <Col md={12} sm={12} xs={24} style={{"marginBottom": "16px", "text-align": "right"}}>
                              Goal to 
                            <b style={{"font-size": "20px", "color": "#4f4e4e"}}>
                              {" $" + selectedProject.goalAmount + " "}
                            </b>
                          </Col>
                        </span>
                      </p>
                      {bar}
                      <Col md={12} sm={12} xs={24} style={colStyle}>
                        <div style={{"margin-top": "4%"}}>
                          <b>
                            <span class="material-icons" style={{"font-size": "16px", "margin-right": "2%"}}>flag</span>
                            Project launched at: 
                          </b>
                          <p>
                            {formattedProject.startDate}
                          </p>
                        </div>
                      </Col>
                      <Col md={12} sm={12} xs={24} style={colStyle}>
                        <div style={{"margin-top": "4%"}}>
                          <b>
                            <span class="material-icons" style={{"font-size": "16px", "margin-right": "2%"}}>highlight_off</span>
                            Will close on: 
                          </b>
                          <p>
                            {formattedProject.endDate}
                          </p>
                        </div>
                      </Col>
                      <Col md={12} sm={12} xs={24} style={colStyle}>
                        <div style={{"margin-left": "10%"}}>
                          <ButtonWrapper className="isoButtonWrapper">
                            <Button
                                type="primary"
                                icon="pay-circle"
                                onClick={this.openPayBox}
                                >
                            Back it
                            </Button>
                          </ButtonWrapper>
                          {paybox ? (
                              <Card
                              editView={editView}
                              modalType={modalType}
                              selectedProject={selectedProject}
                              handleCancel={this.handleCancel}
                              updateProject={this.updateProject}
                              />
                          ) : (
                              ''
                          )}
                        </div>
                      </Col>
                    </div>
                  </Col>
                </Row>

                <Row style={rowStyle} gutter={gutter} justify="start">
                  <Col md={12} sm={12} xs={24} style={colStyle}>
                    <div style={{"margin-top": "10%"}}>
                      <Chart project={copy_project} />
                    </div>
                  </Col>
                  <Col md={12} sm={12} xs={24} style={colStyle}>
                    <div style={{"margin": "10% 0% 0% 10%"}}>
                      <SimpleTable columns={this.columns} dataSource={this.selectLast(selectedProject, 5)} />
                    </div>
                  </Col>
                </Row>

                <Row style={rowStyle} gutter={gutter} justify="start">
                    <Col style={{"margin-top": "10%"}}>
                      <Tabs defaultActiveKey="1">
                        <TabPane
                          tab={
                            <span>
                              <Icon type="message" />Details
                            </span>
                          }
                          key="1"
                        >
                          <div dangerouslySetInnerHTML={{__html: selectedProject.additionalHtml ? selectedProject.additionalHtml.value : ''}} />
                        </TabPane>
                        <TabPane
                          tab={
                            <span>
                              <Icon type="question" />FAQ
                            </span>
                          }
                          key="2"
                        >
                          No question yet
                        </TabPane>
                      </Tabs>
                    </Col>
                </Row>
                </LayoutContent>
            </LayoutContentWrapper>
           
        );
    }
}

function mapStateToProps(state, ownProps) {
  const { cards } = {...state.Projects.toJS()};
  const id = ownProps.match.params.id;
  const selectedProject = cards.filter((card) => {
      // console.log(card);
      return card.id == id;
  })[0];


  return {
    id,
    selectedProject
  };
}

export default connect(mapStateToProps, {
  addCard,
  editCard,
  deleteCard,
  restoreCards,
  requestCards,
  addInvestment, 
  requestInvestments,
})(ShowcasePage);