import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
} from "react-native";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");

  // Function to add a new note
  const addNote = () => {
    if (input.length > 0) {
      setNotes([...notes, input]);
      setInput(""); // Clear the input field
    }
  };

  // Function to delete a note
  const deleteNote = (index) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
  };

  const deleteAll = () => {
    const newNotes = [];
    setNotes(newNotes);
  };

  return (
    <View style={styles.container}>
      <Text>Note Taking App</Text>
      <View>
        <TextInput
          placeholder="Enter your note..."
          style={styles.input}
          value={input}
          onChangeText={(text) => setInput(text)}
        />
        <Button title="Add" onPress={addNote} />
      </View>
      <FlatList
        data={notes}
        renderItem={({ item, index }) => (
          <View style={styles.noteItem}>
            <Text>{item}</Text>
            <Button title="Delete" onPress={() => deleteNote(index)} />
          </View>
        )}
      />
      <Button title="Delete All" onPress={() => deleteAll()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#000000",
    width: "80%",
    padding: 10,
    marginBottom: 10,
  },
  noteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    marginBottom: 5,
    backgroundColor:"red",
  },
});
