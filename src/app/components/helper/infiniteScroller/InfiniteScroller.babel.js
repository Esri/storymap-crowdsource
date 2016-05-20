import $ from 'jquery';
import React from 'react';
import ReactDOM from 'reactDom';
import Helper from 'babel/utils/helper/Helper';

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default class InfiniteScroller extends React.Component {

  constructor(props) {
    super(props);

    // Autobind methods
    this.onScroll = this.onScroll.bind(this);
    this.updateGrid = this.updateGrid.bind(this);

    // Default state
    this.state = {
      total: 0,
      visibleStart: 0,
      visibleEnd: 0,
      paddingTop: 0,
      fullHeight: 0
    };
  }

  componentDidMount() {
    this.node = ReactDOM.findDOMNode(this);
    this.onScroll();

    window.node = this.node;
  }

  componentDidUpdate() {
    if (this.props.children.length !== this.state.total) {
      this.onScroll();
    }
  }

  onScroll(fromScroll) {
    switch (this.props.type) {
      case 'grid':
        this.updateGrid();
        break;
    }
    if (!fromScroll) {
      setTimeout(() => {
        $(this.node).trigger('scroll');
      },0);
    }
  }

  render() {

    const scrollerClasses = Helper.classnames([this.props.className,this.props.classNames,'infinite-scroller']);
    const transitionProps = $.extend(true,{},InfiniteScroller.defaultProps.transitionProps,this.props.transitionProps);

    return (
      <div className={scrollerClasses} onScroll={this.onScroll.bind(this,true)}>
        <ReactCSSTransitionGroup
          className="scrollable"
          {...transitionProps}
          style={{paddingTop: this.state.paddingTop}}>

          {/* Spacer to add scrollHeight to container */}
          <div className="spacer" style={{height: this.state.fullHeight}}></div>
          {/* Render only visible children */}
          {this.props.itemRenderMethod ?
            //
            this.props.children.slice(this.state.visibleStart,this.state.visibleEnd).map(this.props.itemRenderMethod) :
            this.props.children.slice(this.state.visibleStart,this.state.visibleEnd)}

        </ReactCSSTransitionGroup>
      </div>
    );
  }

  updateGrid() {
    const adjustedScrollTop = Math.max(this.node.scrollTop - this.props.threshold,0);
    const visibleStart = Math.floor(adjustedScrollTop / this.props.elementHeight) * this.props.elementsPerRow;
    const paddingTop = Math.ceil(visibleStart / this.props.elementsPerRow) * this.props.elementHeight;
    const visibleArea = this.node.scrollTop - paddingTop + this.node.parentNode.clientHeight + this.props.threshold;
    const visibleCount = (Math.ceil(visibleArea / this.props.elementHeight) * this.props.elementsPerRow);
    const visibleEnd = visibleStart + visibleCount;

    if (visibleStart !== this.state.visibleStart || visibleEnd !== this.state.visibleEnd || this.props.children.length !== this.state.total){
      const fullHeight = Math.ceil(this.props.children.length / this.props.elementsPerRow) * this.props.elementHeight;

      this.setState({
        total: this.props.children.length,
        visibleStart,
        visibleEnd,
        paddingTop,
        fullHeight
      });
    }
  }

}

InfiniteScroller.propTypes = {
  type: React.PropTypes.oneOf(['grid']),
  tolerance: React.PropTypes.number,
  elementHeight: React.PropTypes.number,
  elementsPerRow: React.PropTypes.number,
  transitionProps: React.PropTypes.shape({}),
  itemRenderMethod: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.func
  ])
};

InfiniteScroller.defaultProps = {
  type: 'grid',
  threshold: 500,
  elementHeight: 200,
  elementsPerRow: 1,
  transitionProps: {
    transitionName: 'infinite-scroller',
    transitionEnter: false,
    transitionLeave: false
  },
  itemRenderMethod: false
};
