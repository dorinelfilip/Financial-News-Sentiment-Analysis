import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function NavBar({ page, changePage }) {
  return (
    <View style={styles.navBarContainer}>
      <TouchableOpacity onPress={() => changePage(0)}>
        {page == 0 ? (
          <Text style={styles.textSelected}>Interests</Text>
        ) : (
          <Text style={styles.text}>Interests</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.text}> | </Text>
      <TouchableOpacity onPress={() => changePage(1)}>
        {page == 1 ? (
          <Text style={styles.textSelected}>News</Text>
        ) : (
          <Text style={styles.text}>News</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  navBarContainer: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  textSelected: {
    fontSize: 18,
    color: "white",
    textDecorationLine: "underline",
  }
});
