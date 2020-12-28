import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import PageHeader from '../../../components/utility/pageHeader';
import Box from '../../../components/utility/box';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import ContentHolder from '../../../components/utility/contentHolder';
import ChartWrapper from '../../Charts/chart.style';
import { Chart } from "react-google-charts";
import Select, { SelectOption } from '../../../components/uielements/select';
import clone from 'clone';
import basicStyle from '../../../config/basicStyle';
import 'frappe-charts/dist/frappe-charts.min.css';
import * as fetchdata from './fetchdata';
import moment from 'moment';

const Option = SelectOption;

class Portfolio extends Component  {
    constructor(props) {
        super(props);

        this.state = {
            fetched_data_line: [],
            formatted_data_line: [['x', 'balance'], [0, 0]],
            lineChartConfig: {},
            currentIndex: 2,
            selectedProject: null
        };
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
                    resolve({ formatted });
                }
            );
        });
    }

    async initLineChart(selectedDays) {
        const sampleAccount = "6RHERAEOZSULXVK3GLNE32QYJBKJTO4YE3D2GPCVUF5IRK2R6EBCA3INDU";
        const selected_days = selectedDays.days;

        let { formatted } = await this.getSource(sampleAccount, selected_days);

        if(selectedDays.startStr && selectedDays.endStr) {
            formatted = this.fetchDataByRange(selectedDays.startStr, selectedDays.endStr, formatted);
        }

        this.setState({
            formatted_data_line: formatted,
            // lineChartConfig: configObj
        });

        // fetchdata.getHistoryBalance(
        //     sampleAccount,
        //     selected_days,
        //     (res) => {
        //         let formatted = this.formatDataGoogleLine(res);
        //         let configObj = configs.lineChartGoogle;
        //         configObj['rows'] = formatted;
                
        //         this.setState({
        //             fetched_data_line: res,
        //             formatted_data_line: formatted,
        //             lineChartConfig: configObj
        //         });

        //         return configObj;
        //     }
        // );
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
        this.initLineChart({days: 365});
    }

    updateLineChart = (selectedProject) => {
        let startDate = selectedProject['startDate'];
        let endDate = selectedProject['endDate'];
        let startStr = startDate.format('L');
        let now = moment();
        let endStr;

        let difNow = now.diff(startDate, 'days');
        let difEnd = endDate.diff(startDate, 'days');

        let dif = difNow + 1;
        if(difNow >= difEnd) {
            endStr = endDate.format('L');
        } else {
            endStr = now.format('L');
        }

        this.initLineChart({ 
            days: dif,
            startStr,
            endStr
        });
    }

    selectProject = (projects) => {
        let options_template = projects.map((project) => { 
            let name = project['name'];
            return <Option value={name}>{name}</Option>
        });
      
        return <Select 
          onChange={value => {
            let p = projects.find((project) => {
                return project['name'] == value;
            });

            this.updateLineChart(p);
            this.setState({
                selectedProject: p
            });

          }}
          name='project'
          key='0'
          style={{ width: 100 }}>
          
          {options_template}
        </Select>
    };

    render() {
        const { rowStyle, colStyle, gutter } = basicStyle;
        const cards = clone(this.props.cards);
        const { formatted_data_line } = this.state;
        
        return (
        <LayoutWrapper className="isoMapPage">
            <PageHeader>Portfolio</PageHeader>
            {/* <Row style={rowStyle} gutter={gutter} justify="start">
                <Col md={24} xs={24} style={colStyle}>
                    <Box title="Portfolio balance">
                    <ContentHolder>
                        <div style={{"margin-top": "3%"}}>
                            {this.selectProject(cards)}
                        </div>
                        <GoogleChart {...lineChartConfig} />
                    </ContentHolder>
                    </Box>
                </Col>
            </Row> */}
            <Row style={rowStyle} gutter={gutter} justify="start">
                <Col md={24} xs={24} style={colStyle}>
                    <Box title="Portfolio balance">
                        <ContentHolder>
                            <div style={{"margin-top": "3%"}}>
                                {this.selectProject(cards)}
                            </div>

                            <ChartWrapper>
                                <Chart
                                    width={'100%'}
                                    height={'400px'}
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
                </Col>
            </Row>
        </LayoutWrapper>
        );
    }
}

function mapStateToProps(state) {
    const { cards } = {...state.Projects.toJS()};
    return {
      cards,
    };
}
  
export default connect(mapStateToProps)(Portfolio);