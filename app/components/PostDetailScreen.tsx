import {View, Text, Modal, Alert, StyleSheet, Pressable} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {PostResponseInterace} from '../utils/response.interface';

interface PostDetailInterface {
  id: number | undefined;
  callback: () => void;
}
export default function PostDetailScreen({id, callback}: PostDetailInterface) {
  const [postDetails, setDetails] = useState<PostResponseInterace>({});
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    console.log('id prop changed to - ', id);

    id && fetchPostDetails(id);
  }, [id]);

  const fetchPostDetails2 = useCallback(
    async (id: number) => {
      const start = performance.now();
      const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
      const response = await fetch(url);
      const data = await response.json();
      setModalVisible(true);
      setDetails(data);
      const end = performance.now();
      console.log(
        'time taken to get details from api ----',
        end - start + ' ms',
      );
    },
    [setDetails],
  );

  const fetchPostDetails = async (id: number) => {
    const start = performance.now();
    const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    setModalVisible(true);
    setDetails(data);
    const end = performance.now();
    console.log('time taken to get details from api ----', end - start + ' ms');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Title: {postDetails?.title}</Text>
          <Text style={styles.modalText}>Id: {postDetails?.id}</Text>
          <Text style={styles.modalText}>Body: {postDetails?.body}</Text>

          <Pressable
            style={[
              styles.button,
              styles.buttonClose,
              {backgroundColor: 'teal'},
            ]}
            onPress={callback}>
            <Text style={styles.textStyle}>Callback</Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    zIndex: 2,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: '#f9f9f9',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
  },
});
