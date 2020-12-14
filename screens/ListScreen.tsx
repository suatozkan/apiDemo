import React, {Component} from 'react';
import { StyleSheet,TouchableOpacity, FlatList,Image,Dimensions} from 'react-native';
import { StackActions } from '@react-navigation/native';
import { Text, View } from '../components/Themed';
import { useEffect, useState } from 'react'
import { SearchBar } from 'react-native-elements';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function TabOneScreen(props) {
  const { navigation } = props

  const [data, setData] = useState(null)
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const fetchURL = "https://rickandmortyapi.com/api/character"
  const getData = () =>
    fetch(`${fetchURL}`).then((res) => res.json())

  useEffect(() => {
    getData().then((data) => setData(data.results))
  }, [])
  console.log(data)


  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = data.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
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
    <View style={styles.container}>

    <SearchBar
       round
       searchIcon={{ size: 24 }}
       onChangeText={(text) => searchFilterFunction(text)}
       onClear={(text) => searchFilterFunction('')}
       placeholder="Type Here..."
       value={search}
     />

      <FlatList

          data={data}
          nestedScrollEnabled={true}
          keyExtractor= {(item, index) => item.id}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:20,
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
