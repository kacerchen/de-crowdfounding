import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import clone from 'clone';
import PageHeader from '../../../components/utility/pageHeader';
import Box from '../../../components/utility/box';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import ContentHolder from '../../../components/utility/contentHolder';
import basicStyle from '../../../config/basicStyle';
import IntlMessages from '../../../components/utility/intlMessages';
import Card from '../../Uielements/Card/card.style';

class Showcases extends Component {

    constructor(props) {
      super(props);
    }

    dateToString(cards) {
      cards.forEach((card) => {
        if(typeof(card.startDate) != "string") {
          card.startDate = card.startDate.locale('pl').format('LLLL');
        }
        if(typeof(card.endDate) != "string") {
          card.endDate = card.endDate.locale('pl').format('LLLL');
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

    render() {
      const { rowStyle, colStyle, gutter } = basicStyle;
      const cards = this.dateToString(clone(this.props.cards));
      const cards_jsx = [];
      for(let i = 0; i < cards.length; i++){
        cards_jsx.push(
            <Col md={8} sm={8} xs={24} style={colStyle}>
              <ContentHolder>
                <Card bodyStyle={{ padding: 0 }}>
                  <div className="custom-image">
                  <iframe 
                    width="100%" 
                    height="315" 
                    src="https://www.youtube.com/embed/tgbNymZ7vqY" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; 
                    encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                  </iframe>
                  </div>
                  <div className="custom-card">
                    <h3>
                      {<IntlMessages id={cards[i].name} />}
                    </h3>
                    <p>{<IntlMessages id={cards[i].description} />}</p>
                  </div>
                </Card>
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

export default connect(mapStateToProps)(Showcases);