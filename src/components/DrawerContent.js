import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

class DrawerContent extends React.Component {

  buttonAylık = () => {
    Actions.Aylik();
}
  render() {
    return (
      <View style={styles.container} >
        <TouchableOpacity onPress={this.buttonAylık} style={styles.touchableStyle} >
          <Text > Aylık </Text>
        </TouchableOpacity>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgba(166, 201, 242, 0.6)',
    borderRadius: 5
  },
});

export default DrawerContent;
