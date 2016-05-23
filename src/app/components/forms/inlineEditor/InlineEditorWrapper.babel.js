import $ from 'jquery';
import React from 'react'; // eslint-disable-line no-unused-vars
import Helper from 'babel/utils/helper/Helper';
import InlineInput from 'mode!isBuilder?./input/InlineInput';
import InlineTextarea from 'mode!isBuilder?./textarea/InlineTextarea';

export default class InlineEditorWrapper extends React.Component {

  constructor(props) {
    super(props);

    this.disableActionsProps = {
      onClick: null,
      tabIndex: -1,
      inlineEditDisableActions: false
    };

    // Autobind methods
    this.checkChildrenForEditProps = this.checkChildrenForEditProps.bind(this);
    this.enableEditingOnElement = this.enableEditingOnElement.bind(this);
  }

  checkChildrenForEditProps(element) {
    if (React.isValidElement(element)) {
      if (element.props.inlineEditConfig) {
        return this.enableEditingOnElement(element);
      } else if (element.props.inlineEditDisableActions) {
        return this.checkChildrenForEditProps(React.cloneElement(element,this.disableActionsProps));
      } else if (React.Children.count(element.props.children) > 0) {
        return React.cloneElement(element,null,React.Children.map(element.props.children,this.checkChildrenForEditProps));
      } else {
        return element;
      }
    } else {
      return element;
    }
  }

  enableEditingOnElement(element) {
    let newProps = null;

    if (element.props.inlineEditDisableActions) {
      $.extend(true,newProps,this.disableActionsProps);
    }

    switch (element.props.inlineEditConfig.type) {
      case 'textarea':
        return React.cloneElement(element,newProps,<InlineTextarea
          addNotifications={this.props.addNotifications}
          removeNotifications={this.props.removeNotifications}
          {...element.props.inlineEditConfig}>
        </InlineTextarea>);
      default:
        // Input
        return React.cloneElement(element,newProps,<InlineInput
          addNotifications={this.props.addNotifications}
          removeNotifications={this.props.removeNotifications}
          {...element.props.inlineEditConfig}>
        </InlineInput>);
    }
    return element;
  }

  render() {
    const editingAllowed = this.props.editingAllowed && InlineInput;
    const className = Helper.classnames([this.props.className,'inline-editor']);

    return (
      editingAllowed ?
        React.createElement(this.props.component,$.extend(true,{},this.props,{className}),React.Children.map(this.props.children,this.checkChildrenForEditProps)) :
        React.createElement(this.props.component,this.props)
    );
  }
}

InlineEditorWrapper.propTypes = {
  component: React.PropTypes.string,
  addNotifications: React.PropTypes.func,
  removeNotifications: React.PropTypes.func
};

InlineEditorWrapper.defaultProps = {
  component: 'span',
  addNotifications: () => {},
  removeNotifications: () => {}
};
