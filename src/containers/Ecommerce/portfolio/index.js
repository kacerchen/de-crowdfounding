import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import FrappeChart from 'frappe-charts/dist/frappe-charts.min.esm';
import PageHeader from '../../../components/utility/pageHeader';
import Box from '../../../components/utility/box';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import ContentHolder from '../../../components/utility/contentHolder';
import Button from '../../../components/uielements/button';
import basicStyle from '../../../config/basicStyle';
import * as configs from './config';
import 'frappe-charts/dist/frappe-charts.min.css';
import * as fetchdata from './fetchdata';
import config from '../../../config';

class Portfolio extends Component  {
    constructor(props) {
        super(props);

        this.state = {
            fetched_data: [],
            formatted_data: {},
            basicData: {},
            updatedChartConfig: {},
            currentIndex: 2
        };
    }

    // state = {
    //     currentIndex: 2
    // };

    initUpdateChart() {
        const sampleAccount = "6RHERAEOZSULXVK3GLNE32QYJBKJTO4YE3D2GPCVUF5IRK2R6EBCA3INDU";
        const selected_days = 30;
        fetchdata.getHistoryBalance(
            sampleAccount,
            selected_days,
            (res) => {
                let formatted = this.formatData(res);
                const basicData = {
                    labels: formatted['times'],
                    datasets: [
                      {
                        title: 'Balance',
                        color: 'light-blue',
                        values: formatted['balances']
                      }
                    ]
                };
        
                const updatedChartConfig = {
                    header: 'Updateable Chart',
                    title: '',
                    parent: '#frappeupdatedChart',
                    parentId: 'frappeupdatedChart',
                    data: basicData,
                    type: 'line',
                    show_dots: 0,
                    heatline: 1
                };

                this.updatedChart = new FrappeChart(updatedChartConfig);
                this.setState({
                    fetched_data: res,
                    formatted_data: formatted,
                    basicData,
                    updatedChartConfig
                });
            }
        );
    }

    formatData(dataArr) {
        let balances = [];
        let times = [];

        dataArr.forEach((obj) => {
            balances.unshift(obj.balance);
            times.unshift(this.convertToTime(obj.timestamp));
        });

        return { balances, times };
    }

    convertToTime(timestamp) {
        let date = new Date(timestamp * 1000);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let formatted = `${year}-${month}-${day}`;
        return formatted;
    }
  
    componentDidMount() {
        this.initUpdateChart();

        // new FrappeChart(configs.barChart);
        // new FrappeChart(configs.lineChart);
        // new FrappeChart(configs.scatterChart);
        // new FrappeChart(configs.pieChart);
        // new FrappeChart(configs.percentageChart);
        // new FrappeChart(configs.heatMap);
        // new FrappeChart(configs.heatMapHalloween);
        // let obj = this.setConfig();
        // this.updatedChart = new FrappeChart(obj);
    }
    addData = () => {
        let { currentIndex, basicData } = this.state;
        currentIndex += 1;
        const data = basicData.datasets[currentIndex % 3];
        this.updatedChart.add_data_point(data.values, data.title);
        this.setState({ currentIndex });
    };
    removeData = () => {
        const { currentIndex } = this.state;
        if (currentIndex > 0) {
        this.updatedChart.remove_data_point(currentIndex);
        this.setState({ currentIndex: currentIndex - 1 });
        }
    };
    render() {
        const { rowStyle, colStyle, gutter } = basicStyle;
        // const { updatedChartConfig } = this.state;
        
        return (
        <LayoutWrapper className="isoMapPage">
            <PageHeader>Portfolio</PageHeader>
            <Row style={rowStyle} gutter={gutter} justify="start">
            <Col md={24} xs={24} style={colStyle}>
                <Box title="Portfolio balance">
                <ContentHolder>
                    <div style={{display:'flex', justifyContent: 'flex-end'}}>
                    <Button onClick={this.addData} style={{marginRight: '10px'}}>+ Add Value</Button>
                    <Button onClick={this.removeData}>Remove Value</Button>
                    </div>
                    <div id="frappeupdatedChart" />
                </ContentHolder>
                </Box>
            </Col>
            </Row>
        </LayoutWrapper>
        );
    }
}

function mapStateToProps(state) {
    // const { cards } = {...state.Projects.toJS()};
    return {
      ...state.Projects.toJS(),
    };
}
  
export default connect(mapStateToProps)(Portfolio);