// import $ from 'jquery';
import React from 'react';
// import ReactDOM from 'reactDom';
import Helper from 'babel/utils/helper/Helper';
import Input from 'babel/components/forms/input/Input';
import Textarea from 'babel/components/forms/textarea/Textarea';
import Location from 'babel/components/forms/location/Location';
import FormActions from 'babel/actions/FormActions';
import 'bootstrap/modal';
import 'bootstrap/transition';

export default class ContributePanel extends React.Component {

  constructor(props) {
    super(props);

    this._formId = 'VIEWER_CONTRIBUTE_MAIN';
  }

  componentDidMount() {
    FormActions.formCreated(this._formId);
  }

  componentWillUnmount() {
    FormActions.formCompleted(this._formId);
  }

  render() {

    const contributeClasses = Helper.classnames([this.props.className,this.props.classNames,
      'contribute-panel',
      'container-fluid'
    ]);

    return (
      <div className={contributeClasses}>
        <div className="row">
          <div className="col-xs-12">
            <h3>
                {this.props.title}
            </h3>
            <form>
              {this.props.fields.map((field,index) => {
                if (field.type === 'text' || field.type === 'textarea' || field.type === 'location') {
                  const maxLength = this.getFieldDefinitionValue(field.fieldID,'length');
                  const options = {
                    formId: this._formId,
                    id: field.fieldID,
                    key: index,
                    label: field.label,
                    inputAttr: {
                      type: field.type,
                      placeholder: field.placeholder,
                      maxLength
                    },
                    validations: field.validations
                  };

                  switch (field.type) {
                    case 'textarea':
                      return <Textarea {...options}></Textarea>;
                    case 'location':
                      return <Location map={this.props.map} {...options}></Location>;
                    default:
                      return <Input {...options}></Input>;
                  }
                }
              })}
            </form>
          </div>
        </div>
      </div>
    );
  }

  getFieldDefinitionValue(name,key) {
    let value;

    this.props.fieldDefinitions.map((current) => {
      if (current.name === name && current[key]) {
        value = current[key];
      }
    });

    return value;
  }

}

ContributePanel.propTypes = {
  title: React.PropTypes.string,
  fields: React.PropTypes.array,
  fieldDefinitions: React.PropTypes.array,
  map: React.PropTypes.shape({})
};

ContributePanel.defaultProps = {
  title: '',
  fields: [],
  fieldDefinitions: [],
  map: {}
};
