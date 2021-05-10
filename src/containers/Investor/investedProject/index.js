import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import clone from 'clone';
import Button from '../../../components/uielements/button';
import PageHeader from '../../../components/utility/pageHeader';
import Box from '../../../components/utility/box';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import investActions from '../../../redux/investment/actions';
import reclaimActions from '../../../redux/reclaim/actions';
import cardActions from '../../../redux/project/actions';
import basicStyle from '../../../config/basicStyle';
import { ButtonWrapper } from '../../../components/card/cardModal.style';
import moment from 'moment';
import SimpleTable from '../../Tables/antTables/tableViews/simpleView';
import { createColumns } from './fakeconfig';

const {
  requestInvestmentsByAccount,
} = investActions;

const {
  addReclaim,
} = reclaimActions;

const { 
  requestCardsById,
} = cardActions;

class InvestedProjects extends Component {
    constructor(props) {
        super(props);
        this.addReclaimColumn = this.addReclaimColumn.bind(this);

        const url = this.props.location.pathname;

        this.columns = createColumns(this.addReclaimColumn, url);

        this.state = {
            editView: false,
            selectedProject: null,
            units: null,
            accountId: 'test$pagoservices.com',
        };
    }

    addReclaimColumn(reclaim) {
      console.log(reclaim);
      this.props.addReclaim(reclaim);
    }

    dateToString(investments) {
      if(investments == undefined) {
        return [];
      }

      investments.forEach((investment) => {
        if(moment.isMoment(investment.creationDate)) {
          investment.creationDate = investment.creationDate.locale('pl').format('LLLL');
        } else {
          investment.creationDate = moment.unix(investment.creationDate/1000).format("MM/DD/YYYY");
        }
      });

      return investments;
    }

    initTableData() {
      let account = this.state.accountId;
      this.props.requestInvestmentsByAccount(account);
      // console.log(this.props.closeouts);
    }

    componentDidMount() {
      this.initTableData();
    }

    render(){
        const { rowStyle, colStyle, gutter } = basicStyle;
        // const closeouts = this.dateToString(clone(this.props.investments_byAcc));
        const investments = this.dateToString(clone(this.props.investments_byAcc));
        // console.log(this.props);
        return (
            <LayoutWrapper>
            <PageHeader>Invested Projects</PageHeader>
            <Row style={rowStyle} gutter={gutter} justify="start">
                <Col md={24} sm={24} xs={24} style={colStyle}>
                    <Box>
                      <SimpleTable columns={this.columns} dataSource={investments} />
                    </Box>
                </Col>
            </Row>
            </LayoutWrapper>
        );
    }
}

function mapStateToProps(state) {
  // let projects = await state.ClaimedProjects;
  // console.log(state);
  return {
    ...state.Investments.toJS(),
  };
}

export default connect(mapStateToProps, {
  requestInvestmentsByAccount,
  addReclaim,
  requestCardsById,
})(InvestedProjects);