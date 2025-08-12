import { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text
} from "react-native";
import NewsCard from "../components/newsCard";

export default function News() {
  const [news, setNews] = useState([
    {
      headline: "What Lobsters and Chickens Reveal About Europe Trade Strategy",
      source: "NY-Times",
      date: "Sat, 09 Aug 2025 04:01:07 +0000",
      link: "https://www.nytimes.com/2025/08/09/world/europe/trump-tariffs-europe-trade-lobster-beef.html",
      sentiment: 'Positive'
    },
    {
      headline: "China Automakers Are Taking a Shortcut to European Markets",
      source: "NY-Times",
      date: "Mon, 11 Aug 2025 15:48:26 +0000",
      link: "https://www.nytimes.com/2025/08/11/business/china-electric-vehicles-red-sea.html",
      sentiment: 'Neutral'
    },
    {
      headline:
        "Europe to Trump: Stand up for Ukraine when you talk to Putin - politico.eu",
      source: "Google-News",
      date: "Tue, 12 Aug 2025 02:05:19 GMT",
      link: "https://news.google.com/rss/articles/CBMirwFBVV95cUxNWDlFeEt3VVVLOXVUTTBSU1Vrbjg3Mi1RWGRDendrRFJGLTlrQWdpQTNIRE5iN3U1c1dFNmJPM0o2VG1kdHZzbWdLRk0wbzR5WFRMUGhleDVrcGxMN1RLbTZObVM1RjFlX2U4TWx5T3A2VlFFQUlqTFhWOHBkZWc1ZTBCdExiRk9aSnJCSXh1ZlJLNWRBYjVEZnkyVXFLYXpUbExRak1UOUR3VlhhTG1r?oc=5",
      sentiment: 'Negative'
    },
    {
      headline: "test",
      source: "Google-News",
      date: "Tue, 12 Aug 2025 02:05:19 GMT",
      link: "https://news.google.com/rss/articles/CBMirwFBVV95cUxNWDlFeEt3VVVLOXVUTTBSU1Vrbjg3Mi1RWGRDendrRFJGLTlrQWdpQTNIRE5iN3U1c1dFNmJPM0o2VG1kdHZzbWdLRk0wbzR5WFRMUGhleDVrcGxMN1RLbTZObVM1RjFlX2U4TWx5T3A2VlFFQUlqTFhWOHBkZWc1ZTBCdExiRk9aSnJCSXh1ZlJLNWRBYjVEZnkyVXFLYXpUbExRak1UOUR3VlhhTG1r?oc=5",
      sentiment: 'Negative'
    },
    {
      headline: "Europe to Trump: Stand up for Ukraine when you talk to Putin",
      source: "Google-News",
      date: "Tue, 12 Aug 2025 02:05:19 GMT",
      link: "https://news.google.com/rss/articles/CBMirwFBVV95cUxNWDlFeEt3VVVLOXVUTTBSU1Vrbjg3Mi1RWGRDendrRFJGLTlrQWdpQTNIRE5iN3U1c1dFNmJPM0o2VG1kdHZzbWdLRk0wbzR5WFRMUGhleDVrcGxMN1RLbTZObVM1RjFlX2U4TWx5T3A2VlFFQUlqTFhWOHBkZWc1ZTBCdExiRk9aSnJCSXh1ZlJLNWRBYjVEZnkyVXFLYXpUbExRak1UOUR3VlhhTG1r?oc=5",
      sentiment: 'Neutral'
    },
    {
      headline: "Europe to Trump: Stand for Ukraine when you talk to Putin",
      source: "Google-News",
      date: "Tue, 12 Aug 2025 02:05:19 GMT",
      link: "https://news.google.com/rss/articles/CBMirwFBVV95cUxNWDlFeEt3VVVLOXVUTTBSU1Vrbjg3Mi1RWGRDendrRFJGLTlrQWdpQTNIRE5iN3U1c1dFNmJPM0o2VG1kdHZzbWdLRk0wbzR5WFRMUGhleDVrcGxMN1RLbTZObVM1RjFlX2U4TWx5T3A2VlFFQUlqTFhWOHBkZWc1ZTBCdExiRk9aSnJCSXh1ZlJLNWRBYjVEZnkyVXFLYXpUbExRak1UOUR3VlhhTG1r?oc=5",
      sentiment: 'Positive'
    },
  ]);

  return (
    <View style={styles.newsContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.addContainer}>
          <Text style={styles.addText}>Add topic to interests [+] </Text>
        </TouchableOpacity>
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
    padding: 5
  }
});
