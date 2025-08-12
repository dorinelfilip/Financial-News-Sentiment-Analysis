import React from "react";
import { View, Text, StyleSheet, Linking } from "react-native";

export default function NewsCard({ headline, date, source, link, sentiment }) {
  return (
    <View style={styles.newsCardContainer}>
      <Text style={styles.headline} onPress={() => Linking.openURL(link)}>
        {headline || "Headline here"}
      </Text>
      <Text style={styles.date}>{source || "Source here"}</Text>
      <Text style={styles.date}>{date || "Date here"}</Text>
      {sentiment == "Positive" ? (
        <Text style={styles.positive}>{sentiment}</Text>
      ) : sentiment == "Negative" ? (
        <Text style={styles.negative}>{sentiment}</Text>
      ) : (
        <Text style={styles.neutral}>{sentiment}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  newsCardContainer: {
    backgroundColor: "#222222ff",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    marginVertical: 10,
  },
  headline: {
    color: "#FAF9EE",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  date: {
    color: "#FAF9EE",
    fontSize: 14,
  },
  positive: {
    color: "#1F7D53",
    fontSize: 14,
    marginTop: 8,
  },
  negative: {
    color: "#DC2525",
    fontSize: 14,
    marginTop: 8,
  },
  neutral: {
    color: "#FFCC00",
    fontSize: 14,
    marginTop: 8,
  }
});
