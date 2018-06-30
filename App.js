import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { createStackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
  render() {
    const data = this.props.navigation.getParam("data")
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{JSON.stringify(data)}</Text>
        <Button title="Change username" onPress={() => {
          const changeUserName = this.props.navigation.getParam("changeUserName");
          changeUserName("thachnguyenit");
        }} />
      </View>
    );
  }
}

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }

  thayDoiUserName = (username) => {
    this.setState({ username: username })
  }

  onRegisterPress = async () => {
    const response = await fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .catch((error) => {
        console.error(error);
      });
    this.props.navigation.navigate('HomePage', { data: response, changeUserName: this.thayDoiUserName });
  }
  render() {
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <View style={{ flex: 1 }} />
        <View style={{ fllex: 1, marginHorizontal: 15 }}>
          <Text>Register Screen</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10 }}
            placeholder="Enter your username"
            onChangeText={(text) => this.setState({ username: text })}
            value={this.state.username}
          />
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10, marginBottom: 10 }}
            onChangeText={(text) => this.setState({ username: text })}
            placeholder="Enter your password"
            secureTextEntry={true}
            value={this.state.password}
          />
          <Button title="Dang Nhap" onPress={this.onRegisterPress} />
        </View>
        <View style={{ flex: 1 }} />
      </View>
    );
  }
}


export default createStackNavigator({
  Register: {
    screen: RegisterScreen
  },
  HomePage: {
    screen: HomeScreen
  }
});