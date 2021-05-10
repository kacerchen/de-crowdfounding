import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import clone from 'clone';
import Button from '../../../components/uielements/button';
import PageHeader from '../../../components/utility/pageHeader';
import Box from '../../../components/utility/box';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import reclaimActions from '../../../redux/reclaim/actions';
import basicStyle from '../../../config/basicStyle';
import { ButtonWrapper } from '../../../components/card/cardModal.style';
import moment from 'moment';
import SimpleTable from '../../Tables/antTables/tableViews/simpleView';
import { createColumns } from './fakeconfig';

const {
  requestReclaimsByAccount,
} = reclaimActions;

class ReclaimedProjects extends Component {
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

    dateToString(reclaims) {
      if(reclaims == undefined) {
        return [];
      }

      reclaims.forEach((reclaim) => {
        if(moment.isMoment(reclaim.creationDate)) {
          reclaim.creationDate = reclaim.creationDate.locale('pl').format('LLLL');
        } else {
          reclaim.creationDate = moment.unix(reclaim.creationDate/1000).format("MM/DD/YYYY");
        }
      });

      return reclaims;
    }

    initTableData() {
      let account = this.state.accountId;
      this.props.requestReclaimsByAccount(account);
      // console.log(this.props.closeouts);
    }

    componentDidMount() {
      this.initTableData();
    }

    render(){
        const { rowStyle, colStyle, gutter } = basicStyle;
        const reclaims = this.dateToString(clone(this.props.reclaims_byAcc));
        // console.log(this.props);
        return (
            <LayoutWrapper>
            <PageHeader>Reclaim Projects</PageHeader>
            <Row style={rowStyle} gutter={gutter} justify="start">
                <Col md={24} sm={24} xs={24} style={colStyle}>
                    <Box>
                      <SimpleTable columns={this.columns} dataSource={reclaims} />
                    </Box>
                </Col>
            </Row>
            </LayoutWrapper>
        );
    }
}

function mapStateToProps(state) {
  // let projects = await state.ClaimedProjects;
  console.log(state);
  return {
    ...state.Reclaims.toJS(),
  };
}

export default connect(mapStateToProps, {
  requestReclaimsByAccount,
})(ReclaimedProjects);