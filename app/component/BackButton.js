import React from 'react';
import PropTypes from 'prop-types';
import { routerShape, matchShape } from 'found';
import { intlShape } from 'react-intl';
import Icon from './Icon';

export default class BackButton extends React.Component {
  static contextTypes = {
    intl: intlShape.isRequired,
    router: routerShape,
    match: matchShape,
  };

  static propTypes = {
    icon: PropTypes.string,
    color: PropTypes.string,
    iconClassName: PropTypes.string,
    title: PropTypes.node,
    titleClassName: PropTypes.string, // DT-3472
    customStyle: PropTypes.object, // DT-3472
    titleCustomStyle: PropTypes.object,
    urlToBack: PropTypes.string,
  };

  static defaultProps = {
    icon: 'icon-icon_arrow-left',
    color: 'white',
    iconClassName: '',
    title: undefined,
    titleClassName: undefined, // DT-3472
    customStyle: undefined, // DT-3472
    titleCustomStyle: undefined,
    urlToBack: undefined,
  };

  goBack = urlToGo => {
    if (urlToGo) {
      this.context.router.push(urlToGo);
    } else if (this.context.match.location.index > 0) {
      this.context.router.go(-1);
    } else {
      this.context.router.push('/');
    }
  };

  render() {
    const customStyle = this.props.customStyle
      ? this.props.customStyle
      : { paddingTop: '7px' };
    return (
      <div className="back-button" style={{ display: 'flex' }}>
        <button
          className="icon-holder noborder cursor-pointer"
          style={customStyle}
          onClick={() => this.goBack(this.props.urlToBack)}
          aria-label={this.context.intl.formatMessage({
            id: 'back-button-title',
            defaultMessage: 'Go back to previous page',
          })}
        >
          <Icon
            img={this.props.icon}
            color={this.props.color}
            className={`${this.props.iconClassName} cursor-pointer`}
          />
        </button>
        {this.props.title &&
          !this.props.titleClassName &&
          !this.props.titleCustomStyle && (
            <h2 className="h2">{this.props.title}</h2>
          )}
        {this.props.title &&
          this.props.titleClassName &&
          !this.props.titleCustomStyle && (
            <span className={this.props.titleClassName}>
              {this.props.title}
            </span>
          )}
        {this.props.title &&
          this.props.titleCustomStyle && (
            <span style={this.props.titleCustomStyle}>{this.props.title}</span>
          )}
      </div>
    );
  }
}
