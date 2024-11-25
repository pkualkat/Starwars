import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Button } from "react-native";
import LazyImage from "./LazyImage";
import { SwipeListView } from "react-native-swipe-list-view";
import Modal from "react-native-modal";
import styles from "./styles";

export default function Films() {
  const [planets, setPlanets] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    fetch("https://www.swapi.tech/api/films")
      .then((resp) => resp.json())
      .then(({ results }) => {
        setPlanets(results);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const handleSwipe = (item) => {
    setSelectedItem(item.name);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
         <LazyImage
        style={styles.image}
        source={{
          uri: 'https://pixabay.com/illustrations/space-spaceship-science-fiction-7690400/',
        }}
      />
      <Text style={styles.title}>Films</Text>
      <SwipeListView
        data={planets}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
          </View>
        )}
        renderHiddenItem={({ item }) => (
          <View style={styles.hiddenItem}>
            <Button title="Show" onPress={() => handleSwipe(item)} />
          </View>
        )}
        rightOpenValue={-75}
      />
      <Modal isVisible={modalVisible}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{selectedItem}</Text>
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}