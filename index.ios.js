/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  AlertIOS,
  PushNotificationIOS,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

var Button = React.createClass({
  render: function() {
    return (
      <TouchableHighlight
      underlayColor={'white'}
      style={styles.button}
      onPress={this.props.onPress}>
      <Text style={styles.buttonLabel}>
      {this.props.label}
      </Text>
      </TouchableHighlight>
    );
  }
});

class NotificationExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {token: null};
  }
  componentWillMount() {
    PushNotificationIOS.addEventListener('notification', this._onNotification);
    PushNotificationIOS.addEventListener('register', (token) => {
      this.setState({token})
    });
  }

  componentWillUnmount() {
    PushNotificationIOS.removeEventListener('notification', this._onNotification);
  }

  render() {
    PushNotificationIOS.requestPermissions();
    return (
      <View style={styles.container}>
      <Button
      onPress={this._sendNotification}
      label="Send fake notification"
      />
      <Text>
      {JSON.stringify(this.state)}
      </Text>
      </View>
    );
  }

  _sendNotification() {
    require('RCTDeviceEventEmitter').emit('remoteNotificationReceived', {
      aps: {
        alert: 'Sample notification',
        badge: '+1',
        sound: 'default',
        category: 'REACT_NATIVE'
      },
    });
  }

  _onNotification(notification) {
    AlertIOS.alert(
      'Notification Received',
      'Alert message: ' + notification.getMessage(),
      [{
        text: 'Dismiss',
        onPress: null,
      }]
    );
  }
}

class NotificationPermissionExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {permissions: null};
  }

  render() {
    PushNotificationIOS.requestPermissions();
    return (
      <View style={styles.container}>
      <Button
      onPress={this._showPermissions.bind(this)}
      label="Show enabled permissions"
      />
      <Text>
      {JSON.stringify(this.state.permissions)}
      </Text>
      </View>
    );
  }

  _showPermissions() {
    PushNotificationIOS.checkPermissions((permissions) => {
      this.setState({permissions});
    });
  }
}

class BadgeExample extends React.Component {
  render() {
    PushNotificationIOS.requestPermissions();
    return (
      <View style={styles.container}>
      <Button
      onPress={() => PushNotificationIOS.setApplicationIconBadgeNumber(42)}
      label="Set app's icon badge to 42"
      />
      <Button
      onPress={() => PushNotificationIOS.setApplicationIconBadgeNumber(0)}
      label="Clear app's icon badge"
      />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    color: 'blue',
  },
});

AppRegistry.registerComponent('awesome_project', () =>
  NotificationExample
  // NotificationPermissionExample
  // BadgeExample
);
