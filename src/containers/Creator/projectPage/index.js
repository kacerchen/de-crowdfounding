import React, { Component } from 'react';
import AntdTreeSelect from '../../Forms/editor';
import { connect } from 'react-redux';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import LayoutContent from '../../../components/utility/layoutContent';
import { CardInfoWrapper, InfoFormWrapper } from '../../../components/project/projectModal.style';
import Form from '../../../components/uielements/form';
import { Input, Row, Col } from 'antd';
import { InputWrapper } from '../../../components/uielements/styles/input.style';
import Select, { SelectOption } from '../../../components/uielements/select';
import configs from '../project/dateconfig';
import basicStyle from '../../../config/basicStyle';
import Tags from '../../../components/uielements/tag';
import TagWrapper from '../../Uielements/Tag/tag.style';
import ContentHolder from '../../../components/utility/contentHolder';
import SimpleTable from '../../Tables/antTables/tableViews/simpleView';
import Async from '../../../helpers/asyncComponent';
import Button, { ButtonGroup } from '../../../components/uielements/button';
import {
    DateRangePicker,
} from '../../../components/uielements/reactDates';
import cardActions from '../../../redux/project/actions';
import investActions from '../../../redux/investment/actions';
import clone from 'clone';
import moment from 'moment';
// import { useParams } from 'react-router-dom';

const Option = SelectOption;

const { TextArea } = Input;

const InputField = InputWrapper(Input);

const Editor = (props) => <Async load={import(/* webpackChunkName: "forms-editor" */ '../../../components/uielements/editor')} componentProps={props} />;

const Tag = props => (
    <TagWrapper>
      <Tags {...props}>{props.children}</Tags>
    </TagWrapper>
);

const selectAfter = (selectedProject, updateProject) => {
    return <Select 
      onChange={value => {
        selectedProject['goalAssetId'] = value;
        updateProject(selectedProject);
      }}
      name='currency'
      key='3'
      style={{ width: 70 }}>
      <Option value="USD">USD</Option>
      <Option value="ALGO">ALGO</Option>
      <Option value="USDC">USDC</Option>
      <Option value="USDT">USDT</Option>
    </Select>
};

const { addCard, editCard, deleteCard, restoreCards } = cardActions;
const { requestInvestmentsByAccount } = investActions;

class ProjectPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedProject: null,
            configsValue: configs,
            editorState: null,
            loading: false,
            iconLoading: false,
        };

        this.columns = [
            {
              title: 'Backer',
              dataIndex: 'payid',
              rowKey: 'payid'
            },
            {
              title: 'Amount',
              dataIndex: 'amount',
              rowKey: 'amount'
            }
        ];

        this.updateProject = this.updateProject.bind(this);
    }

    uploadCallback(file) {
        return new Promise(
          (resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://api.imgur.com/3/image');
            xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
            const data = new FormData();
            data.append('image', file);
            xhr.send(data);
            xhr.addEventListener('load', () => {
              const response = JSON.parse(xhr.responseText);
              resolve(response);
            });
            xhr.addEventListener('error', () => {
              const error = JSON.parse(xhr.responseText);
              reject(error);
            });
          }
        );
    }

    updateProject(selectedProject) {
        this.setState({ selectedProject });
    }

    saveUpdates = () => {
        // this.setState({ iconLoading: true });
        editCard(this.selectedProject);
    };

    dateToString(card) {
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
  
        return card;
    };

    getInvestors() {
        let investments = this.selectedProject['investors'];
        return investments;
    }

    render() {
        const { rowStyle, colStyle, gutter } = basicStyle;
        let { id, selectedProject } = this.props;
        let p = this.dateToString(clone(selectedProject));
        const containerId = 'card-wrapper';
        const onEditorStateChange = (editorState) => {
            this.setState({ editorState });
        }
        const editorOption = {
            style: { width: '90%', height: '70%' },
            editorState: this.state.editorState,
            toolbarClassName: 'home-toolbar',
            wrapperClassName: 'home-wrapper',
            editorClassName: 'home-editor',
            onEditorStateChange: onEditorStateChange,
            uploadCallback: this.uploadCallback,
            toolbar: { image: { uploadCallback: this.uploadCallback } },
        };
        return (
            <LayoutContentWrapper style={{ height: '100%' }}>
                <LayoutContent>
                <h3 style={{"color": "#999999"}}>Project id: {id}</h3>

                <Row style={rowStyle} gutter={gutter} justify="start">
                    <Col md={12} sm={12} xs={24} style={colStyle}>
                        <CardInfoWrapper id={containerId} className="isoCardWrapper" />
                            <InfoFormWrapper>
                                <Form className="isoCardInfoForm">
                                    <h4>Project Name: </h4>
                                    <InputField
                                        placeholder={selectedProject.name}
                                        type="text"
                                        className={`isoCardInput name`}
                                        onChange={event => {
                                            selectedProject['name'] = event.target.value;
                                            this.updateProject(selectedProject);
                                        }}
                                        name='name'
                                        key='0'
                                    />

                                    <h4>Description: </h4>
                                    <TextArea
                                        placeholder={selectedProject.description}
                                        type="text"
                                        className={`isoCardInput description`}
                                        onChange={event => {
                                            selectedProject['description'] = event.target.value;
                                            this.updateProject(selectedProject);
                                        }}
                                        name='description'
                                        key='1'
                                    />

                                    <h4>Video URL: </h4>
                                    <InputField
                                        placeholder={selectedProject.videoUrl}
                                        type="text"
                                        className={`videourl`}
                                        onChange={event => {
                                            selectedProject['videoUrl'] = event.target.value;
                                            this.updateProject(selectedProject);
                                        }}
                                        name='videourl'
                                        key='2'
                                    />

                                    

                                </Form>
                            </InfoFormWrapper>
                        </Col>
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            {/* <Row>
                                <CardInfoWrapper id={containerId} className="isoCardWrapper" />
                                <h4>Classification: </h4>
                                <ContentHolder>
                                    <Tag color="#f50">#Art</Tag>
                                    <Tag color="#2db7f5">#Phone/ Accessories</Tag>
                                    <Tag color="#87d068">#Food</Tag>
                                    <Tag color="#108ee9">#Tech</Tag>
                                </ContentHolder>
                                
                            </Row> */}
                            <Row style={{"margin-top": "5%"}}>
                                <div style={{"margin-left": "10%"}}>
                                    <h4>Goal Amount: </h4>
                                    <span>${selectedProject['goalAmount']} {selectedProject['goalAssetId']}</span>
                                </div>
                            </Row>
                            <Row style={{"margin-top": "1%"}}>
                                <div style={{"margin-left": "10%"}}>
                                    <h4>Start Date: </h4>
                                    <span>{p['startDate']}</span>
                                </div>
                            </Row>
                            <Row style={{"margin-top": "1%"}}>
                                <div style={{"margin-left": "10%"}}>
                                    <h4>End Date: </h4>
                                    <span>{p['endDate']}</span>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={rowStyle} gutter={gutter} justify="start">
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <div style={{"margin": "10% 0% 0% 0%"}}>
                            <SimpleTable columns={this.columns} dataSource={selectedProject['investors']} />
                            </div>
                        </Col>
                    </Row>
                    <Row style={rowStyle} gutter={gutter} justify="start">
                        <Col>
                            <ContentHolder>
                                <Editor {...editorOption}
                                    selectedProject={selectedProject}
                                    updateProject={this.updateProject}
                                />
                            </ContentHolder>
                        </Col>
                    </Row>
                    <Row style={rowStyle} gutter={gutter} justify="start">
                        <Col md={8} sm={8} xs={24} style={colStyle}></Col>
                        <Col md={8} sm={8} xs={24} style={colStyle}></Col>
                        <Col md={8} sm={8} xs={24} style={{"margin": "6% 0 3% 0"}}>
                            <Button
                                type="primary"
                                icon="save"
                                // loading={this.state.iconLoading}
                                onClick={this.saveUpdates}
                                >
                            Save
                            </Button>
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

export default connect(mapStateToProps, {
    addCard,
    editCard,
    deleteCard,
    restoreCards,
    requestInvestmentsByAccount,
})(ProjectPage);