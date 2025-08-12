import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
} from "react-native";

import deleteImage from "../assets/x.png";
import dragImage from "../assets/drag.png";

export default function InterestCard({
  name,
  deleteInterest,
  id,
  searchInterest,
  notify
}) {
  const [isEnabled, setIsEnabled] = useState(notify);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.interestCardContainer}>
      <View style={styles.leftContainer}>
        <Image source={dragImage} style={styles.dragImage} />
        <TouchableOpacity onPress={() => searchInterest(name)}>
          <Text style={styles.interestText}>{name || "name here"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rightContainer}>
        <Switch
          trackColor={{ false: "#858585ff", true: "#1F7D53" }}
          thumbColor={isEnabled ? "#FAF9EE" : "#FAF9EE"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <TouchableOpacity onPress={() => deleteInterest(id)}>
          <Image source={deleteImage} style={styles.deleteImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  interestCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#222222ff",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    marginVertical: 10,
    alignItems: "center",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  interestText: {
    color: "#FAF9EE",
    fontSize: 18,
    fontWeight: "bold",
  },
  deleteImage: {
    width: 18,
    height: 18,
    marginRight: 0,
    tintColor: "#DC2525",
  },
  dragImage: {
    width: 40,
    height: 40,
    marginRight: 0,
    tintColor: "#858585ff",
  },
});
