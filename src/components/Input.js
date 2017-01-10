import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput
} from 'react-native';


const styles = StyleSheet.create({
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 40,
    marginBottom: 49
  }
});

export default class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.postMessage = this.postMessage.bind(this);
  }

  postMessage(text) {
    // Clear the text input field
    let userAuth = this.props.userAuth;
    let username = this.props.username;
    if(userAuth && username) {
      console.log(username);
      this._textInput.setNativeProps({ text: '' });
      // Post the message to the database
      fetch('http://127.0.0.1:8000/messages', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: text,
          latitude: this.props.location.latitude,
          longitude: this.props.location.longitude,
          userAuth: userAuth,
          displayName: username
        })
      })
      .then(() => { this.props.getMessages(); });
    } else if (!userAuth) {
      this.props.login();
    }
  }

  render() {
    return (
      <TextInput
        ref={(component) => { this._textInput = component; }}
        style={styles.input}
        onSubmitEditing={(text) => { this.postMessage(text.nativeEvent.text); }}
        placeholder="Type a message"
      />
    );
  }
}
