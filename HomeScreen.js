import React, { useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = ({ navigation, route }) => {
  const [notes, setNotes] = useState(["Note 1", "Note 2", "Note 3"]);

  const addNote = () => {
    navigation.navigate("AddNote", { notes, updateNotes: updateNotes });
  };

  const editNote = (note) => {
    navigation.navigate("EditNote", { note, notes, updateNotes: updateNotes });
  };

  const deleteNote = (index) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
  };

  const deleteAll = () => {
    const newNotes = [];
    setNotes(newNotes);
  };

  const updateNotes = (newNotes) => {
    setNotes(newNotes);
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to the Home Screen!</Text>
      <Button title="Add Note" onPress={addNote} />
      <FlatList
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.noteItem}>
            <Text onPress={() => editNote(item)}>{item}</Text>
            <Button title="Delete" onPress={() => deleteNote(index)} />
          </View>
        )}
      />
      <Button title="Delete All" onPress={() => deleteAll()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    marginBottom: 5,
  },
});

export default HomeScreen;
