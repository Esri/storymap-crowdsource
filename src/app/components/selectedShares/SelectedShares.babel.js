import $ from 'jquery';
import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import {getIcon} from 'babel/utils/helper/icons/IconGenerator';
import SelectedDisplay from './SelectedDisplay';

export default class SelectedShares extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      scrolled: false
    };

    // autobind methods
    this.navigateWithArrowKeys = this.navigateWithArrowKeys.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    $(document).on('keydown',this.navigateWithArrowKeys);
  }

  componentWillUnmount() {
    $(document).off('keydown',this.navigateWithArrowKeys);
  }

  render() {

    const mainClasses = Helper.classnames([this.props.className,this.props.classNames,'selected-share'],{
      scrolled: this.state.scrolled
    });

    return (
      <div className={mainClasses}>
        {this.props.featuresInExtent.length > 1 ? (
          <div className="selected-navigation">
            <button
              type="button"
              className="prev-btn btn text-btn"
              aria-label="Previous"
              onClick={this.props.previousAction}
              dangerouslySetInnerHTML={{__html: getIcon('arrow-left-open')}}>
            </button>
            <button
              type="button"
              className="next-btn btn text-btn"
              aria-label="Next"
              onClick={this.props.nextAction}
              dangerouslySetInnerHTML={{__html: getIcon('arrow-right-open')}}>
            </button>
            <button
              type="button"
              className="close-btn btn text-btn"
              aria-label="Close"
              onClick={this.props.closeAction}
              dangerouslySetInnerHTML={{__html: getIcon('close')}}>
            </button>
          </div>
        ) : (
          <div className="selected-navigation">
            <button
              type="button"
              className="close-btn btn text-btn"
              aria-label="Close"
              onClick={this.props.closeAction}
              dangerouslySetInnerHTML={{__html: getIcon('close')}}>
            </button>
          </div>
        )}
        <SelectedDisplay
          onScroll={this.onScroll}
          reviewEnabled={this.props.reviewEnabled}
          approveAction={this.props.approveAction}
          rejectAction={this.props.rejectAction}
          feature={this.props.feature}
          displayOrder={this.props.displayOrder}
          attributePath={this.props.attributePath}
          fields={this.props.fields}
          idField={this.props.idField}
          primaryField={this.props.primaryField}
          secondaryField={this.props.secondaryField}
          vettedField={this.props.vettedField}
          media={this.props.media}
          thumbnailUrlPrepend={this.props.thumbnailUrlPrepend}
          thumbnailUrlAppend={this.props.thumbnailUrlAppend}
          layer={this.props.layer}>
        </SelectedDisplay>
      </div>
    );
  }

  navigateWithArrowKeys(e) {
    switch (e.which) {
      case 27:
        this.props.closeAction();
        break;
      case 37:
        this.props.previousAction();
        break;
      case 39:
        this.props.nextAction();
        break;
    }

  }

  onScroll(e) {
    if (e.target.scrollTop > 0 && !this.state.scrolled) {
      this.setState({
        scrolled: true
      });
    } else if (e.target.scrollTop === 0 && this.state.scrolled) {
      this.setState({
        scrolled: false
      });
    }
  }

}

SelectedShares.propTypes = {
  reviewEnabled: React.PropTypes.bool,
  approveAction: React.PropTypes.func,
  rejectAction: React.PropTypes.func,
  closeAction: React.PropTypes.func,
  previousAction: React.PropTypes.func,
  nextAction: React.PropTypes.func,
  feature: React.PropTypes.shape({
    attributes: React.PropTypes.shape({})
  }),
  displayOrder: React.PropTypes.array,
  attributePath: React.PropTypes.string.isRequired,
  fields: React.PropTypes.shape({}),
  idField: React.PropTypes.string.isRequired,
  primaryField: React.PropTypes.string.isRequired,
  secondaryField: React.PropTypes.string.isRequired,
  vettedField: React.PropTypes.string,
  media: React.PropTypes.shape({
    type: React.PropTypes.string,
    field: React.PropTypes.string
  }),
  thumbnailUrlPrepend: React.PropTypes.string,
  thumbnailUrlAppend: React.PropTypes.string,
  layer: React.PropTypes.oneOfType([
    React.PropTypes.shape({
      url: React.PropTypes.string,
      credential: React.PropTypes.shape({
        server: React.PropTypes.string,
        token: React.PropTypes.string
      })
    }),
    React.PropTypes.bool
  ])
};

SelectedShares.defaultProps = {
  feature: {
    attributes: {}
  },
  displayOrder: [],
  thumbnailUrlPrepend: '',
  thumbnailUrlAppend: '',
  reviewEnabled: false,
  approveAction: () => {},
  rejectAction: () => {},
  closeAction: () => {},
  previousAction: () => {},
  nextAction: () => {}
};
