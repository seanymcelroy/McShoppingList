import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';

export default function LandingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>McElroy Family Shopping List</Text>
      <Image
        style={styles.basketIMG}
        source={require('../assets/shoppingBasket.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ede9da',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    width: '100%'
  },
  welcomeText:{
      position: 'absolute',
      top: 40,
      textAlign: 'center',
      fontSize: 24,
      fontWeight: 'bold'
  },
  basketIMG:{
    width: 200,
    height: 200
  }
});