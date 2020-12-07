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
// import { useParams } from 'react-router-dom';

class ShowcasePage extends Component {

    constructor(props) {
      super(props);
    }

    calculatePercentage(curBalance, goalAmout) {
      let b = Number(curBalance);
      let g = Number(goalAmout);
      let percentage = (b/ g) * 100; 
      return percentage.toFixed();
    }

    dateToString(project) {
      if(typeof(project.startDate) != "string") {
        project.startDate = project.startDate.locale('pl').format('LLLL');
      }
      if(typeof(project.endDate) != "string") {
        project.endDate = project.endDate.locale('pl').format('LLLL');
      }

      return project;
    }

    render() {
        let { id, selectedProject } = this.props;
        const { rowStyle, colStyle, gutter } = basicStyle;
        const containerId = 'card-wrapper';
        const marginStyle = {
          margin: rtl === 'rtl' ? '0 0 10px 10px' : '0 10px 10px 0',
        };
        let p = this.calculatePercentage(selectedProject.balance, selectedProject.goalamount);
        let bar = p >= 100 ? <Progress percent={100} style={marginStyle} /> :
        <Progress percent={p} status="active" style={marginStyle} />;
        let formattedProject = this.dateToString(selectedProject);
        return (
            <LayoutContentWrapper style={{ height: '100vh' }}>
                <LayoutContent>
                <h3 style={{"color": "#999999"}}>Project ID: {id}</h3>
                <Row style={rowStyle} gutter={gutter} justify="start">
                  <Col md={12} sm={12} xs={24} style={colStyle}>
                    <CardInfoWrapper id={containerId} className="isoCardWrapper" />
                      <iframe 
                        width="100%" 
                        height="315" 
                        src={selectedProject.videourl} 
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
                              {<IntlMessages id={"$" + selectedProject.balance + " "} />}
                            </b>
                            {<IntlMessages id={selectedProject.currency} />} raised
                          </Col>
                          <Col md={12} sm={12} xs={24} style={{"marginBottom": "16px", "text-align": "right"}}>
                              Goal to 
                            <b style={{"font-size": "20px", "color": "#4f4e4e"}}>
                              {<IntlMessages id={" $" + selectedProject.goalamount + " "} />}
                            </b>
                          </Col>
                        </span>
                      </p>
                      {bar}
                      <div style={{"margin-top": "4%"}}>
                        <b>
                          <span class="material-icons" style={{"font-size": "16px", "margin-right": "2%"}}>flag</span>
                          Project launched at: 
                        </b>
                        <p>
                          {formattedProject.startDate}
                        </p>
                      </div>
                      <div style={{"margin-top": "4%"}}>
                        <b>
                          <span class="material-icons" style={{"font-size": "16px", "margin-right": "2%"}}>highlight_off</span>
                          Will close on: 
                        </b>
                        <p>
                          {formattedProject.endDate}
                        </p>
                      </div>
                    </div>
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
      return card.id == id;
  })[0];

  return {
    id,
    selectedProject
  };
}

export default connect(mapStateToProps)(ShowcasePage);