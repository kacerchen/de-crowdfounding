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
import Async from '../../../helpers/asyncComponent';
import Button, { ButtonGroup } from '../../../components/uielements/button';
import {
    DateRangePicker,
} from '../../../components/uielements/reactDates';
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
        selectedProject['currency'] = value;
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
    }

    updateProject(selectedProject) {
        this.setState({ selectedProject });
    }

    renderDatePicker() {
        const {
            selectedProject,
        } = this.props;

        let startDate = selectedProject.startDate;
        let endDate = selectedProject.endDate;
        let focusedInput = selectedProject.focusedInput;

        let options = {
          startDate: selectedProject.startDate,
          endDate: selectedProject.endDate,
          startDateId: "your_unique_start_date_id",
          endDateId: "your_unique_end_date_id",
          onDatesChange: ({ startDate, endDate }) => {
              selectedProject.startDate = startDate // ? startDate.locale('pl').format('LLLL') : null
              selectedProject.endDate = endDate // ? endDate.locale('pl').format('LLLL')  : null
              this.setState(selectedProject)
          },
          focusedInput: selectedProject.focusedInput,
          onFocusChange:(focusedInput) => {
            selectedProject.focusedInput = focusedInput;
            this.setState(selectedProject)
          },
        }

        this.state.configsValue[0].options.forEach(option => {
          options[option.id] = option.value;
        });
        
        // if (this.props.view === 'MobileView') {
        //   options.numberOfMonths = 1;
        // }
        return (
          <div className="isoReactDate">
            {<DateRangePicker isOutsideRange={() => false} {...options} />}
          </div>
        );
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

    enterIconLoading = () => {
        this.setState({ iconLoading: true });
    };

    render() {
        const { rowStyle, colStyle, gutter } = basicStyle;
        let { id, selectedProject } = this.props;
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
                <h3>Project id: {id}</h3>

                <Row style={rowStyle} gutter={gutter} justify="start">
                    <Col md={12} sm={12} xs={24} style={colStyle}>
                        <CardInfoWrapper id={containerId} className="isoCardWrapper" />
                            <InfoFormWrapper>
                                <Form className="isoCardInfoForm">
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

                                    <InputField
                                        placeholder={selectedProject.videourl}
                                        type="text"
                                        className={`videourl`}
                                        onChange={event => {
                                            selectedProject['videourl'] = event.target.value;
                                            this.updateProject(selectedProject);
                                        }}
                                        name='videourl'
                                        key='2'
                                    />

                                    <InputField
                                        placeholder={selectedProject.goalamount}
                                        type="text"
                                        className={`goalamount`}
                                        style={{"margin-top": "6px"}}
                                        onChange={event => {
                                            selectedProject['goalamount'] = event.target.value;
                                            this.updateProject(selectedProject);
                                        }}
                                        name='goalamount'
                                        key='3'
                                        addonBefore="$"
                                        addonAfter={selectAfter(selectedProject, this.updateProject)}
                                    />

                                    <InputField
                                        placeholder={selectedProject.projectaccount}
                                        type="text"
                                        className={`isoAccountInput projectaccount`}
                                        onChange={event => {
                                            selectedProject['projectaccount'] = event.target.value;
                                            this.updateProject(selectedProject);
                                        }}
                                        name='projectaccount'
                                        key='4'
                                    />

                                    <div className='isoAccountInput'>
                                        {this.renderDatePicker()}
                                    </div>

                                </Form>
                            </InfoFormWrapper>
                        </Col>
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <CardInfoWrapper id={containerId} className="isoCardWrapper" />
                                <h4>Classification: </h4>
                                <ContentHolder>
                                    <Tag color="#f50">#Art</Tag>
                                    <Tag color="#2db7f5">#Phone/ Accessories</Tag>
                                    <Tag color="#87d068">#Food</Tag>
                                    <Tag color="#108ee9">#Tech</Tag>
                                </ContentHolder>
                        </Col>
                    </Row>
                    <Row style={rowStyle} gutter={gutter} justify="start">
                        <Col>
                            <ContentHolder>
                                <Editor {...editorOption} />
                            </ContentHolder>
                        </Col>
                    </Row>
                    <Row style={rowStyle} gutter={gutter} justify="start">
                        <Col md={8} sm={8} xs={24} style={colStyle}></Col>
                        <Col md={8} sm={8} xs={24} style={colStyle}></Col>
                        <Col md={8} sm={8} xs={24} style={{"margin": "6% 0 3% 0"}}>
                            <Button
                                type="primary"
                                // icon="update"
                                loading={this.state.iconLoading}
                                onClick={this.enterIconLoading}
                                >
                            <span class="material-icons" style={{"font-size": "18px", "margin-top": "10%"}}>update</span>
                            Update
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

export default connect(mapStateToProps)(ProjectPage);