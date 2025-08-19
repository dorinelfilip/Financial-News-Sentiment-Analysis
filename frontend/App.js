import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import SearchBar from "./components/searchBar";
import NavBar from "./components/navBar";
import News from "./pages/news";
import Interests from "./pages/interests";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

export default function App() {
  const [currPage, setCurrPage] = useState(0);
  const [topic, setTopic] = useState("");
  const [interests, setInterests] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadInterests();
  }, []);

  const saveInterests = async (interests) => {
    try {
      const jsonValue = JSON.stringify(interests);
      await AsyncStorage.setItem("interests", jsonValue);
    } catch (e) {
      console.error("Error saving interests:", e);
    }
  };

  const loadInterests = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("interests");
      if (jsonValue != null) {
        setInterests(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error("Error loading interests:", e);
    }
  };

  const handleDeleteInterest = (id) => {
    const updated = interests.filter((interest) => interest.id !== id);
    setInterests(updated);
    saveInterests(updated);
  };

  const handleAddInterest = (newTopic) => {
    if (newTopic !== "") {
      const maxId =
        interests.length > 0
          ? Math.max(...interests.map((item) => Number(item.id)))
          : 0;

      const exists = interests.some((item) => item.topic === newTopic);
      if (!exists) {
        const updated = [
          ...interests,
          { id: maxId + 1, topic: newTopic, notify: true },
        ];
        setInterests(updated);
        saveInterests(updated);
      }
    }
  };

  const handleSubmit = async (topic) => {
    setLoading(true);
    fetch(`${API_URL}/search/keyword=${topic}`)
      .then((response) => response.json())
      .then((data) => {
        const parsedNews = [
          ...data.negatives.map((item) => ({
            headline: item.headline,
            source: item.source,
            date: item.date,
            link: item.link,
            sentiment: "Negative",
          })),
          ...data.neutrals.map((item) => ({
            headline: item.headline,
            source: item.source,
            date: item.date,
            link: item.link,
            sentiment: "Neutral",
          })),
          ...data.positives.map((item) => ({
            headline: item.headline,
            source: item.source,
            date: item.date,
            link: item.link,
            sentiment: "Positive",
          })),
        ];
        const sotedNews = [...parsedNews].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setNews(sotedNews);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
    setCurrPage(1);
  };

  return (
    <View style={styles.container}>
      <SearchBar submit={handleSubmit} topic={topic} setTopic={setTopic} />
      <NavBar page={currPage} changePage={setCurrPage} />
      {currPage == 1 ? (
        <View style={{ flex: 1 }}>
          <News
            addInterest={handleAddInterest}
            topic={topic}
            interests={interests}
            news={news}
            loadingState={loading}
          />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Interests
            searchInterest={handleSubmit}
            interests={interests}
            setInterests={setInterests}
            handleDeleteInterest={handleDeleteInterest}
            saveInterests={saveInterests}
          />
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
