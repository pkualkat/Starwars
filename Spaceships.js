import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, Button, Animated } from "react-native";
import LazyImage from "./LazyImage";
import { SwipeListView } from "react-native-swipe-list-view";
import Modal from "react-native-modal";
import styles from "./styles";

export default function Spaceships() {
  const [planets, setPlanets] = useState([]);
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetch("https://www.swapi.tech/api/starships")
      .then((resp) => resp.json())
      .then(({ results }) => {
        setPlanets(results);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const handleSwipe = (item) => {
    setSelectedItem(item.name);
    setModalVisible(true);
  };

  const filteredPlanets = planets.filter((planet) =>
    planet.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.searchBox}
          placeholder="Search Spaceships"
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        <LazyImage
          style={styles.image}
          source={require('./assets/Fleet1.jpg')}
        />
        <Text style={styles.title}>Spaceships</Text>
        <Animated.View style={{ ...styles.animatedView, opacity: fadeAnim }}>
          <SwipeListView
            data={filteredPlanets}
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
        </Animated.View>
        <Modal isVisible={modalVisible}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{selectedItem}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </Modal>
      </View>
    </>
  );
}









