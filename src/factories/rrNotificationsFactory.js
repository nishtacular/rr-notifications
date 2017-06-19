import React, { Component } from 'react';
import { array, func, string } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideNotification } from '../redux/actions';
import Container from '../components/Container';
import NotificationContainer from '../components/NotificationContainer';

export default function rrContainerFactory(WrappedNotification) {
  const propTypes = {
    notifications: array.isRequired,
    hideNotification: func.isRequired,
    position: array,
    stackNextOn: string,
    animationDuration: string,
    animationEasing: string,
    slideFromSide: string,
  };

  const defaultProps = {
    position: ['40px', '40px', 'auto', 'auto'],
    stackNextOn: 'bottom',
    animationDuration: '.4s',
    animationEasing: 'ease',
    slideFromSide: 'right',
  };

  class Notifications extends Component {
    render() {
      return (
        <Container
          position={this.props.position}
          stackNextOn={this.props.stackNextOn}
          animationDuration={this.props.animationDuration}
          animationEasing={this.props.animationEasing}
          slideFromSide={this.props.slideFromSide}
        >
          {this.props.notifications.map(notification => (
            <NotificationContainer
              animatedMargin={this.props.position[0] === 'auto' ? 'bottom' : 'top'}
              key={notification.uid}
              uid={notification.uid}
              animationDuration={this.props.animationDuration}
              animationEasing={this.props.animationEasing}
              slideFromSide={this.props.slideFromSide}
            >
              <WrappedNotification
                notificationHeight={notification.height}
                hideNotification={() => { this.props.hideNotification(notification.uid); }}
                isVisible={notification.isVisible}
                options={notification.options}
                animationDuration={this.props.animationDuration}
              />
            </NotificationContainer>
          ))}
        </Container>
      );
    }
  }

  Notifications.propTypes = propTypes;
  Notifications.defaultProps = defaultProps;

  return connect(
    ({ notifications }) => ({ notifications }),
    dispatch => bindActionCreators({ hideNotification }, dispatch),
  )(Notifications);
}
