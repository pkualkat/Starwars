import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, ImageBackground } from "react-native";
import LazyImage from "./LazyImage";
import { SwipeListView } from "react-native-swipe-list-view";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from 'react-native-gesture-handler';
import styles from "./styles";

export default function Planets() {
  const [planets, setPlanets] = useState([]);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    fetch("https://www.swapi.tech/api/planets")
      .then((resp) => resp.json())
      .then(({ results }) => {
        setPlanets(results || []);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const handleSwipe = (item) => {
    navigation.navigate("PlanetDetail", { planet: item });
  };

  const filteredPlanets = planets.filter((planet) =>
    planet.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderHiddenItem = (data, rowMap) => (
    <ImageBackground
      source={require('./assets/saber.png')}
      style={styles.rowBackImage}
    >
      <View style={styles.rowBack}>
        <RectButton
          style={styles.backRightBtn}
          onPress={() => handleSwipe(data.item)}
        >
          <Text style={styles.backTextWhite}>Details</Text>
        </RectButton>
      </View>
    </ImageBackground>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBox}
        placeholder="Search Planets"
        value={search}
        onChangeText={(text) => setSearch(text)}
      />
      <LazyImage
        style={styles.image}
        source={require('./assets/Fleet1.jpg')}
      />
      <Text style={styles.title}>Planets</Text>
      <SwipeListView
        data={filteredPlanets}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
          </View>
        )}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-75}
      />
    </View>
  );
}
