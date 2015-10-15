import React from 'react';
import HeaderController from 'babel/ui/header/HeaderController';

var internals = {};

export default internals.HeaderView = class HeaderView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
    this._controller = new HeaderController();

  }

  render() {
    return (
      <header className="navbar header">
        <div className="region-center">
          <a href="" className="logo">
            <img src="" alt="" />
          </a>
          <h3 className="title">{this.state.title}</h3>
        </div>
      </header>
    );
  }

};
