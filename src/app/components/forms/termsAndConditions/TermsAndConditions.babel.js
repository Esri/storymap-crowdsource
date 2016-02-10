import $ from 'jquery';
import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import ViewerText from 'i18n!translations/viewer/nls/template';
import 'bootstrap/collapse';
import 'bootstrap/transition';

export default class TermsAndCondtions extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      termsToggleText: ViewerText.contribute.form.termsAndConditions.buttonShow
    };

    this.toggleTerms = this.toggleTerms.bind(this);
  }

  render() {

    const inputClasses = Helper.classnames([this.props.className,'terms-and-conditions']);

    return (
      <div className={inputClasses}>
        <p id={this.props.formId + '-terms-and-conditions'} className="legal collapse" ref={(ref) => this.legal = ref}>
          <small>{this.props.terms}</small>
        </p>
        <button type="button" ref={(ref) => this.legalToggle = ref} className="btn btn-link btn-xs" aria-expanded="false" aria-controls={this.props.formId + '-terms-and-conditions'} onClick={this.toggleTerms}>
          {this.state.termsToggleText}
        </button>
      </div>
    );
  }

  toggleTerms() {
    const expanded = !$(this.legal).hasClass('collapse in');

    $(this.legalToggle).attr('aria-expanded',expanded);
    $(this.legal).collapse('toggle');
    this.setState({
      termsToggleText: expanded ? ViewerText.contribute.form.termsAndConditions.buttonHide : ViewerText.contribute.form.termsAndConditions.buttonShow
    });
  }
}

TermsAndCondtions.propTypes = {
  formId: React.PropTypes.string,
  terms: React.PropTypes.string
};

TermsAndCondtions.defaultProps = {
  formId: '',
  terms: ViewerText.contribute.form.termsAndConditions.legal
};
