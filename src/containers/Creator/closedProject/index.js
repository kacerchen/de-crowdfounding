import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import clone from 'clone';
import Button from '../../../components/uielements/button';
import PageHeader from '../../../components/utility/pageHeader';
import Box from '../../../components/utility/box';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import closeoutActions from '../../../redux/closeout/actions';
import basicStyle from '../../../config/basicStyle';
import { ButtonWrapper } from '../../../components/card/cardModal.style';
import moment from 'moment';
import SimpleTable from '../../Tables/antTables/tableViews/simpleView';
import { createColumns } from './fakeconfig';

const {
  requestCloseoutsByAccount,
} = closeoutActions;

class ClosedProjects extends Component {
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

    dateToString(closeouts) {
      if(closeouts == undefined) {
        return [];
      }
      
      closeouts.forEach((closeout) => {
        if(moment.isMoment(closeout.closeoutDate)) {
          closeout.closeoutDate = closeout.closeoutDate.locale('pl').format('LLLL');
        } else {
          closeout.closeoutDate = moment.unix(closeout.closeoutDate/1000).format("MM/DD/YYYY");
        }
      });

      return closeouts;
    }

    initTableData() {
      let account = this.state.accountId;
      this.props.requestCloseoutsByAccount(account);
      // console.log(this.props.closeouts);
    }

    componentDidMount() {
      this.initTableData();
    }

    render(){
        const { rowStyle, colStyle, gutter } = basicStyle;
        const closeouts = this.dateToString(clone(this.props.closeouts_byAcc));
        // console.log(this.props);
        return (
            <LayoutWrapper>
            <PageHeader>Closeout Projects</PageHeader>
            <Row style={rowStyle} gutter={gutter} justify="start">
                <Col md={24} sm={24} xs={24} style={colStyle}>
                    <Box>
                      <SimpleTable columns={this.columns} dataSource={closeouts} />
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
    ...state.Closeouts.toJS(),
  };
}

export default connect(mapStateToProps, {
  requestCloseoutsByAccount,
})(ClosedProjects);