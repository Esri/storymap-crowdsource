import $ from 'jquery';
import React from 'react';
import ReactDOM from 'reactDom';
import Helper from 'babel/utils/helper/Helper';
import {getIcon} from 'babel/utils/helper/icons/IconGenerator';
import 'bootstrap/tooltip';
import 'bootstrap/transition';

export const IconTooltip = class IconTooltip extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.node = ReactDOM.findDOMNode(this);

    $(this.node).tooltip({
      title: this.props.content,
      placement: this.props.placement
    });
  }

  componentWillUnmount() {
    $(this.node).tooltip('destroy');
  }

  render() {

    const btnClass = Helper.classnames(this.props.className,'text-btn');
    const icon = getIcon(this.props.icon);
    const iconHtml = {
      __html: icon
    };

    return (
      <button type="button" className={btnClass} dangerouslySetInnerHTML={iconHtml}></button>
    );
  }

};

IconTooltip.propTypes = {
  icon: React.PropTypes.string,
  placement: React.PropTypes.string
};

IconTooltip.defaultProps = {
  icon: 'help',
  placement: 'auto'
};

export default IconTooltip;
