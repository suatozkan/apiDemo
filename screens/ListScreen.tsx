import React, {Component} from 'react';
import { StyleSheet,TouchableOpacity, FlatList,Image,Dimensions,SafeAreaView} from 'react-native';
import { StackActions } from '@react-navigation/native';
import { Text, View } from '../components/Themed';
import { useEffect, useState } from 'react'
import { SearchBar } from 'react-native-elements';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function TabOneScreen(props) {
  const { navigation } = props

  const [data, setData] = useState(null)
  const [state, setState] = useState(3)
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const fetchURL = "https://rickandmortyapi.com/api/character"
  const getData = () =>
    fetch(`${fetchURL}`).then((res) => res.json())

  useEffect(() => {
    getData().then((data) => {setData(data.results)
      setFilteredDataSource(data.results)})
  }, [])



  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text!==null) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = data.filter(function (item) {
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>

      <SearchBar
         round
         searchIcon={{ size: 24 }}
         onChangeText={(text) => searchFilterFunction(text)}
         onClear={(text) => searchFilterFunction('')}
         placeholder="Type Here..."
         value={search}
         containerStyle={{width:width-2, borderBottomColor: 'transparent',borderTopColor: 'transparent',backgroundColor:'whitesmoke',borderWidth:0}}
         inputContainerStyle={{backgroundColor:'white'}}


       />

        <FlatList

            data={filteredDataSource.slice(0,state)}
            nestedScrollEnabled={true}
            keyExtractor= {(item, index) => item.id}
            onEndReached={()=>setState(state+3)}
            onEndReachedThreshold={0.5}
            renderItem={({item,index}) =>
                <TouchableOpacity
                underlayColor='transparent'
                onPress={() =>navigation.dispatch(StackActions.push('Detail', {details: item}))}>
                  <View>
                  <Text style={styles.title}>{item.name}</Text>
                  <Image
                    style={{width:width-30,height:width-30,borderRadius:10}}
                    source={{uri: item.image}} />
                  </View>
                </TouchableOpacity>
            }

        />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  title: {
    marginTop:20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
