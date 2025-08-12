import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import SearchBar from "./components/searchBar";
import NavBar from "./components/navBar";
import News from "./pages/news";
import Interests from "./pages/interests";

export default function App() {
  const [currPage, setCurrPage] = useState(0);

  const handleSubmit = (topic) => {
    // fetch(`http://172.20.10.2:8000/search/keyword=${topic}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //   });
    console.log(topic)
    setCurrPage(1)
  };

  return (
    <View style={styles.container}>
      <SearchBar submit={handleSubmit} />
      <NavBar page={currPage} changePage={setCurrPage} />
      {currPage == 1 ? (
        <View style={{ flex: 1 }}>
          <News />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Interests searchInterest={handleSubmit}/>
        </View>
      )}
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
});
