import React, { Component } from 'react';
import { Row, Col } from 'antd';
import PageHeader from '../utility/pageHeader';
import Box from '../utility/box';
import LayoutWrapper from '../utility/layoutWrapper';
import ContentHolder from '../utility/contentHolder';
import ChartWrapper from '../../containers/Charts/chart.style';
import { Chart } from "react-google-charts";
import basicStyle from '../../config/basicStyle';
import 'frappe-charts/dist/frappe-charts.min.css';
import * as fetchdata from './fetchdata';
import moment from 'moment';

export default class extends Component  {
    constructor(props) {
        super(props);

        this.state = {
            formatted_data_line: [['x', 'balance'], [0, 0]],
            selectedProject: null
        };
        this.initLineChart = this.initLineChart.bind(this);
    }

    getSource(sampleAccount, selected_days) {
        return new Promise((resolve, reject) => {
            fetchdata.getHistoryBalance(
                sampleAccount,
                selected_days,
                (res) => {
                    let formatted = this.formatDataGoogleLine(res);
                    // let configObj = configs.lineChartGoogle;
                    // configObj['rows'] = formatted;
                    resolve(formatted);
                }
            );
        });
    }

    async initLineChart(selectedProject) {
        const sampleAccount = "6RHERAEOZSULXVK3GLNE32QYJBKJTO4YE3D2GPCVUF5IRK2R6EBCA3INDU";
        let selected_days;
        let formatted;

        if (selectedProject) {
            let startDate = selectedProject['startDate'];
            let endDate = selectedProject['endDate'];
            let startStr = startDate.format('L');
            let now = moment();
            let endStr;

            let difNow = now.diff(startDate, 'days');
            let difEnd = endDate.diff(startDate, 'days');

            // let dif = difNow + 1;
            selected_days = difNow + 1;
            if(difNow >= difEnd) {
                endStr = endDate.format('L');
            } else {
                endStr = now.format('L');
            }

            formatted = await this.getSource(sampleAccount, selected_days);
            
            if(startStr && endStr) {
                formatted = this.fetchDataByRange(startStr, endStr, formatted);
            }
        }

        this.setState({
            formatted_data_line: formatted
        });

        return formatted;
    }

    fetchDataByRange(start, end, data) {
        let startIndex;
        let endIndex;
        data.forEach((arr) => {
            if(arr.includes(start)) {
                startIndex = data.indexOf(arr);
            } else if(arr.includes(end)) {
                endIndex = data.indexOf(arr);
            }
        });

        let slicedArr = data.slice(startIndex, endIndex + 1);

        return slicedArr;
    }

    formatDataGoogleLine(dataArr) {
        let rowArr = [];

        dataArr.forEach((obj) => {
            let row = [];
            row.push(this.convertToTime(obj.timestamp));
            row.push(obj.balance);
            rowArr.unshift(row);
        });

        return rowArr;
    }

    convertToTime(timestamp) {
        let date = new Date(timestamp * 1000);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let formatted = `${month}/${day}/${year}`;
        return formatted;
    }
  
    componentDidMount() {
        let selectedProject = this.props.project;
        this.setState({ selectedProject });

        this.initLineChart(selectedProject);
        // this.initLineChart({days: 365});
    }

    render() {
        const { rowStyle, colStyle, gutter } = basicStyle;
        const { project } = this.props;
        const { formatted_data_line } = this.state;
        
        return (
            <Box title="History Balance">
                <ContentHolder>
                    <ChartWrapper>
                        <Chart
                            width={'100%'}
                            height={'300px'}
                            chartType="LineChart"
                            loader={<div>Loading Chart</div>}
                            data={[['x', 'balance'], ...formatted_data_line]}
                            options={{
                                hAxis: {
                                    textStyle: {
                                        color: '#788195',
                                    },
                                    title: 'Time',
                                    titleTextStyle: {
                                        color: '#788195',
                                    },
                                },
                                vAxis: {
                                    textStyle: {
                                        color: '#788195',
                                    },
                                    title: 'Balance',
                                    titleTextStyle: {
                                        color: '#788195',
                                    },
                                },
                                colors: ['#48A6F2'],
                                dataOpacity: 1.0,
                                animation: {
                                    duration: 1000,
                                    easing: 'in',
                                    startup: true,
                                },
                            }}
                            rootProps={{ 'data-testid': '1' }}
                            />
                    </ChartWrapper>
                </ContentHolder>
            </Box>
        );
    }
}