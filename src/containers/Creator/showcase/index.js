import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import clone from 'clone';
import PageHeader from '../../../components/utility/pageHeader';
import Box from '../../../components/utility/box';
import Progress from '../../../components/uielements/progress';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import ContentHolder from '../../../components/utility/contentHolder';
import basicStyle from '../../../config/basicStyle';
import IntlMessages from '../../../components/utility/intlMessages';
import Card from '../../Uielements/Card/card.style';
import cardActions from '../../../redux/project/actions';
import { rtl } from '../../../config/withDirection';
import { size } from 'styled-theme';
import moment from 'moment';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const { requestCards } = cardActions;
class Showcases extends Component {

    constructor(props) {
      super(props);
    }

    dateToString(cards) {
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
      });

      return cards;
    }

    chunkArray(myArray, chunk_size) {
      var index = 0;
      var arrayLength = myArray.length;
      var tempArray = [];
      
      for (index = 0; index < arrayLength; index += chunk_size) {
         let myChunk = myArray.slice(index, index+chunk_size);
          // Do something if you want with the group
          tempArray.push(myChunk);
      }
  
      return tempArray;
    }

    calculatePercentage(curBalance, goalAmout) {
      let b = Number(curBalance);
      let g = Number(goalAmout);
      let percentage = (b/ g) * 100; 
      return percentage;
    }

    calculateLeftDays(momentStr) {
      let dateObj = new Date(momentStr);
      let momentObj = moment(dateObj);
      return momentObj.endOf('day').fromNow();
    }

    initTableData() {
      this.props.requestCards();
      console.log(this.props.cards);
    }

    componentDidMount() {
      this.initTableData();
    }

    render() {
      const url = this.props.location.pathname;
      const { rowStyle, colStyle, gutter } = basicStyle;
      const marginStyle = {
        margin: rtl === 'rtl' ? '0 0 10px 10px' : '0 10px 10px 0',
      };
      const fontStyle = `{
        font-size: 25px;
      }`
      const cards = this.dateToString(clone(this.props.cards));
      const cards_jsx = [];
      for(let i = 0; i < cards.length; i++){
        let p = this.calculatePercentage(cards[i].balance, cards[i].goalAmount);
        let bar = p >= 100 ? <Progress percent={100} style={marginStyle} /> :
        <Progress percent={p} status="active" style={marginStyle} />;

        cards_jsx.push(
            <Col md={8} sm={8} xs={24} style={colStyle}>
              <ContentHolder>
                <Link to={`${url}/${cards[i].id}`}>
                  <Card bodyStyle={{ padding: 0 }}>
                    <div className="custom-image">
                    <iframe 
                      width="100%" 
                      height="315" 
                      src={cards[i].videoUrl} 
                      frameborder="0" 
                      allow="accelerometer; autoplay; clipboard-write; 
                      encrypted-media; gyroscope; picture-in-picture" 
                      allowfullscreen>
                    </iframe>
                    </div>
                    <div className="custom-card">
                      <h2>
                        {cards[i].name}
                      </h2>
                      <p>{cards[i].description}</p>
                      <p>
                        <span>
                          <b style={{"font-size": "20px", "color": "#4f4e4e"}}>
                            {cards[i].balance}
                          </b>
                          {cards[i].goalAssetId} raised
                        </span>
                      </p>
                      {bar}
                      <p>
                        <span class="material-icons" style={{"font-size": "16px"}}>watch_later</span>
                        {" Will close " + this.calculateLeftDays(cards[i].endDate)}
                      </p>
                    </div>
                  </Card>
                </Link>
              </ContentHolder>
            </Col>
        );
      }
      return (
        <LayoutWrapper>
          <Row style={rowStyle} gutter={gutter} justify="start">
            {cards_jsx}
          </Row>
        </LayoutWrapper>
      );
    }
}

function mapStateToProps(state) {
  return {
    ...state.Projects.toJS(),
  };
}

export default connect(mapStateToProps, {
  requestCards,
})(Showcases);