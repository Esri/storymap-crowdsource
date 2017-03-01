import $ from 'jquery';
import React from 'react';
import ReactDOM from 'reactDom';
import {getIcon} from 'babel/utils/helper/icons/IconGenerator';
import Helper from 'babel/utils/helper/Helper';
import 'bootstrap/modal';
import 'bootstrap/transition';

export default class Modal extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.node = ReactDOM.findDOMNode(this);
    $(this.node).modal({
      backdrop: false,
      keyboard: false,
      show: true
    });
  }

  componentWillUnmount() {
    $(this.node).modal('hide');
  }

  render() {

    const modalClasses = Helper.classnames([this.props.className,this.props.classNames,'modal']);

    const createMarkup = function createMarkup(content) {
      return {__html: content};
    };

    const parseContent = function parseContent(contentObj) {
      if (contentObj.html) {
        return <div dangerouslySetInnerHTML={createMarkup(contentObj.content)} />;
      } else if (contentObj.content) {
        return contentObj.content;
      } else {
        return contentObj;
      }
    };

    return (
      <div className={modalClasses} tabIndex="-1" role="dialog">
        <div className="vertical-align-helper">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header" style={this.props.headerStyle}>
                { this.props.closeButton ? (
                  <div className="close-button-wrapper">
                    <button type="button" className="close-btn btn text-btn" aria-label="Close" onClick={this.props.closeAction}>
                      <span aria-hidden="true" dangerouslySetInnerHTML={{__html: getIcon('close')}}></span>
                    </button>
                  </div>
                ) : null }
                <h4 className="modal-title">
                  { parseContent(this.props.title) }
                </h4>
              </div>
              <div className="modal-body">
                { parseContent(this.props.body) }
              </div>
              <div className="modal-footer">
                { parseContent(this.props.footer) }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

Modal.propTypes = {
  title: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.shape({})
  ]),
  body: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.shape({})
  ]),
  footer: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.shape({})
  ]),
  headerStyle: React.PropTypes.shape({}),
  classNames: React.PropTypes.array,
  closeButton: React.PropTypes.bool,
  closeAction: React.PropTypes.func
};

Modal.defaultProps = {
  title: '',
  body: '',
  footer: '',
  headerStyle: {},
  classNames: [],
  closeButton: false,
  closeAction: () => {}
};
