import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PlanetDetail({ route }) {
  const { planet } = route.params;
  const [planetDetails, setPlanetDetails] = useState(null);

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/planets/${planet.uid}`)
      .then((resp) => resp.json())
      .then((data) => {
        setPlanetDetails(data.result.properties);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [planet.uid]);

  if (!planetDetails) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{planetDetails.name}</Text>
      <Text>Climate: {planetDetails.climate}</Text>
      <Text>Diameter: {planetDetails.diameter}</Text>
      <Text>Gravity: {planetDetails.gravity}</Text>
      <Text>Orbital Period: {planetDetails.orbital_period}</Text>
      <Text>Population: {planetDetails.population}</Text>
      <Text>Rotation Period: {planetDetails.rotation_period}</Text>
      <Text>Surface Water: {planetDetails.surface_water}</Text>
      <Text>Terrain: {planetDetails.terrain}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center", // Center the text
  },
});

