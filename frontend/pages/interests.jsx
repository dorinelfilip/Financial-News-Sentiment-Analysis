import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import DragList from "react-native-draglist";
import InterestCard from "../components/interestCard";

export default function Interests({
  searchInterest,
  interests,
  setInterests,
  handleDeleteInterest,
  saveInterests,
}) {
  const keyExtractor = (item) => item.id;

  const renderItem = ({ item, onDragStart, onDragEnd, isActive }) => {
    return (
      <TouchableOpacity
        onLongPress={onDragStart}
        onPressOut={onDragEnd}
        delayLongPress={300}
        activeOpacity={0.95}
        style={[styles.row, isActive && styles.activeRow]}
      >
        <InterestCard
          name={item.topic}
          deleteInterest={handleDeleteInterest}
          id={item.id}
          searchInterest={searchInterest}
          notify={item.notify}
          interests={interests}
          setInterests={setInterests}
          saveInterests={saveInterests}
        />
      </TouchableOpacity>
    );
  };

  const onReordered = async (fromIndex, toIndex) => {
    const copy = [...interests];
    const [removed] = copy.splice(fromIndex, 1);
    copy.splice(toIndex, 0, removed);

    const updated = copy.map((item, index) => ({
      ...item,
      id: index + 1,
    }));

    setInterests(updated);
    saveInterests(updated);
  };

  return (
    <View style={styles.interestsContainer}>
      {interests.length === 0 ? (
        <Text style={styles.emptyText}>No interests added yet</Text>
      ) : (
        <DragList
          data={interests}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          onReordered={onReordered}
          style={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  interestsContainer: {
    flex: 1,
    alignItems: "center",
  },
  row: {
    width: "100%",
    paddingHorizontal: 16,
    marginVertical: 6,
  },
  activeRow: {
    opacity: 0.85,
    transform: [{ scale: 1.05 }],
    elevation: 4,
  },
  emptyText: {
    fontSize: 16,
    color: "#FAF9EE",
    marginTop: 20,
    textAlign: "center",
  },
});
