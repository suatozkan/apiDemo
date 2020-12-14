import * as React from 'react';
import { StyleSheet,TouchableOpacity,Image,Dimensions } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { StackActions } from '@react-navigation/native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function TabTwoScreen(props) {

  const popAction = StackActions.pop(1);
  const { route,navigation } = props
  const { details } = route.params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details</Text>

      <TouchableOpacity
             onPress={()=> navigation.dispatch(popAction)
             }>
           <Text style={styles.text}>Geri</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{details.name}</Text>
      <Image
        style={{width:width,height:width}}
        source={{uri: details.image}} />



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
