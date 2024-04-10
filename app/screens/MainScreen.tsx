import {View, Text, FlatList, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {PostResponseInterace} from '../utils/response.interface';
import PostDetailScreen from '../components/PostDetailScreen';

export default function MainScreen() {
  const [list, setList] = useState<PostResponseInterace[]>([]);
  const [selectedItem, setSelectedItem] = useState<PostResponseInterace>();
  useEffect(() => {
    APICall();
  }, []);

  const APICall = useCallback(async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts/',
      );
      const data = await response.json();
      console.log('data==>', data);
      setList(data);
    } catch (error) {}
  }, [setList]);

  const onPress = (item: PostResponseInterace) => {
    console.log('selected', item?.id)
    setSelectedItem(item);
  };

  const memoizedData = useMemo(() => {
    let startTime = performance.now();
    let temp = [...list];
    // heavy computation or transformation here //
    let endTime = performance.now();
    console.log('time taken ---', endTime - startTime);
    return temp;
  }, [list]);

  const cbfn = useCallback(() => {
    Alert.alert('parent callback function');
  }, []);

  return (
    <View style={styles.parent}>
      <Text style={styles.header}>Posts</Text>
      <FlatList
        data={memoizedData}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => onPress(item)}
              style={styles.container}>
              <Text>ID : {item.id}</Text>
              <Text>Title : {item.title}</Text>
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={() => <View style={{marginVertical: 5}} />}
      />

      <PostDetailScreen id={selectedItem?.id} callback={cbfn} />
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    gap: 10,
    padding: 10,
  },
  header: {
    fontWeight: '500',
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 5,
  },
});
