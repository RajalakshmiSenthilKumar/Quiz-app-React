import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

const Flatlist = () => {
  const [fromFetch, setFromFetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [axiosData, setAxiosData] = useState(null);

  useEffect(() => {
    
    goForFetch();
  }, []);

  const goForFetch = () => {
    setFromFetch(true);
    setLoading(true);

    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(responseJson => {
        console.log('getting data from fetch', responseJson);
        setDataSource(responseJson);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };

  const goForAxios = () => {
    setFromFetch(false);
    setLoading(true);

    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        console.log('getting data from axios', response.data);
        setAxiosData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={{ padding: 10, borderBottomWidth: 0.5, borderColor: 'gray' }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
      <Text>{item.email}</Text>
      <Text>{item.company.name}</Text>
    </TouchableOpacity>
  );

  const FlatListItemSeparator = () => (
    <View
      style={{
        height: 0.5,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}
    />
  );

  return (
    <View style={{ flex: 1, margin: 18 }}>
      {loading && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0c9" />
        </View>
      )}
      
      {fromFetch ? (
        <FlatList
          data={dataSource}
          ItemSeparatorComponent={FlatListItemSeparator}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      ) : (
        <FlatList
          data={axiosData}
          ItemSeparatorComponent={FlatListItemSeparator}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
};

export default Flatlist;
