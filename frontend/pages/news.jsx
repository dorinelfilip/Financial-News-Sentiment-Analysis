import { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import NewsCard from "../components/newsCard";

export default function News({
  addInterest,
  topic,
  interests,
  news,
  loadingState,
}) {
  const isAlreadyAdded = (topic) => {
    return (
      interests.some((interest) => interest.topic === topic) ||
      topic.trim() === ""
    );
  };

  return (
    <View style={styles.newsContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loadingState ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color="#FAF9EE" />
          </View>
        ) : (
          <>
            {news.length === 0 ? (
              <Text style={styles.emptyText}>No news found</Text>
            ) : (
              <>
                {!isAlreadyAdded(topic) && (
                  <TouchableOpacity
                    style={styles.addContainer}
                    onPress={() => addInterest(topic)}
                  >
                    <Text style={styles.addText}>
                      Add topic to interests [+]{" "}
                    </Text>
                  </TouchableOpacity>
                )}
                {news.map((entry) => (
                  <NewsCard
                    key={entry.headline}
                    headline={entry.headline}
                    date={entry.date}
                    source={entry.source}
                    link={entry.link}
                    sentiment={entry.sentiment}
                  />
                ))}
              </>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  newsContainer: {
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  addText: {
    fontSize: 18,
    color: "white",
  },
  addContainer: {
    alignItems: "center",
    padding: 5,
  },
  emptyText: {
    fontSize: 16,
    color: "#FAF9EE",
    marginTop: 20,
    textAlign: "center",
  },
});
