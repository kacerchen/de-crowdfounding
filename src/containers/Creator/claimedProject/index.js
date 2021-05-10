import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import clone from 'clone';
import Button from '../../../components/uielements/button';
import PageHeader from '../../../components/utility/pageHeader';
import Box from '../../../components/utility/box';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import claimActions from '../../../redux/claim/actions';
import basicStyle from '../../../config/basicStyle';
import { ButtonWrapper } from '../../../components/card/cardModal.style';
import moment from 'moment';
import SimpleTable from '../../Tables/antTables/tableViews/simpleView';
import { createColumns } from './fakeconfig';

const {
  requestClaimsByAccount,
} = claimActions;

class ClaimedProjects extends Component {
    constructor(props) {
        super(props);
        // this.addClaimColumn = this.addClaimColumn.bind(this);

        const url = this.props.location.pathname;

        this.columns = createColumns(url);

        this.state = {
            editView: false,
            selectedProject: null,
            units: null,
            accountId: 'bob$pagoservices.com',
        };
    }

    dateToString(claims) {
      if(claims == undefined) {
        return [];
      }

      claims.forEach((claim) => {
        if(moment.isMoment(claim.receiveDate)) {
          claim.receiveDate = claim.receiveDate.locale('pl').format('LLLL');
        } else {
          claim.receiveDate = moment.unix(claim.receiveDate/1000).format("MM/DD/YYYY");
        }
      });

      return claims;
    }

    initTableData() {
      let account = this.state.accountId;
      this.props.requestClaimsByAccount(account);
      console.log(this.props.claims);
    }

    componentDidMount() {
      this.initTableData();
    }

    render(){
        const { rowStyle, colStyle, gutter } = basicStyle;
        const claims = this.dateToString(clone(this.props.claims_byAcc));
        // console.log(this.props);
        return (
            <LayoutWrapper>
            <PageHeader>Claimed Projects</PageHeader>
            <Row style={rowStyle} gutter={gutter} justify="start">
                <Col md={24} sm={24} xs={24} style={colStyle}>
                    <Box>
                      <SimpleTable columns={this.columns} dataSource={claims} />
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
    ...state.Claims.toJS(),
  };
}

export default connect(mapStateToProps, {
  requestClaimsByAccount,
})(ClaimedProjects);