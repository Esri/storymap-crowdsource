import React from 'react';
import { connect } from 'reactRedux';
import Header from 'babel/components/header/Header';
// import IntroSplash from 'babel/components/intro/IntroSplash';

class Viewer extends React.Component {

  render() {
    return (
      <div>
        <style>{this.props.layout.font + this.props.layout.styles + this.props.layout.theme}</style>
        <Header {...this.props.components.header} {...this.props.components.common}></Header>
        {/*<IntroSplash {...this.props.components.intro} {...this.props.components.common}></IntroSplash>*/}
      </div>
    );
  }

}

Viewer.propTypes = {
  layout: React.PropTypes.shape({
    font: React.PropTypes.string,
    styles: React.PropTypes.string,
    theme: React.PropTypes.string
  }).isRequired,
  components: React.PropTypes.shape({
    common: React.PropTypes.shape({
      exploreText: React.PropTypes.string,
      participateLong: React.PropTypes.string,
      participateShort: React.PropTypes.string,
      social: React.PropTypes.shape({
        facebook: React.PropTypes.bool,
        twitter: React.PropTypes.bool,
        link: React.PropTypes.bool
      })
    }),
    header: React.PropTypes.shape({
      logo: React.PropTypes.shape({
        link: React.PropTypes.string,
        source: React.PropTypes.string
      }),
      title: React.PropTypes.string
    }),
    intro: React.PropTypes.shape({
      background: React.PropTypes.shape({
        type: React.PropTypes.string,
        source: React.PropTypes.string
      }),
      title: React.PropTypes.string,
      subtitle: React.PropTypes.string
    }),
    map: React.PropTypes.shape({
      crowdsourceLayer: React.PropTypes.shape({
        id: React.PropTypes.string
      }),
      webmap: React.PropTypes.string,
      webmapOptions: React.PropTypes.shape({})
    })
  }).isRequired
};

const mapStateToProps = (state) => {
  return {
    layout: state.items.app.data.settings.layout,
    components: state.items.app.data.settings.components
  };
};

export default connect(mapStateToProps)(Viewer);
