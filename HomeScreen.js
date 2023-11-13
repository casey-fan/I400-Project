import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const screenWidth = Dimensions.get("window").width;

export default HomeScreen = ({ navigation, route }) => {
  const [notes, setNotes] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const getUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("id");
        if (storedUserId) {
          setUserId(storedUserId);

          const storedNotes = await AsyncStorage.getItem(
            `notes_${storedUserId}`
          );
          if (storedNotes) {
            setNotes(JSON.parse(storedNotes) ?? []);
          }
        }
      } catch (error) {
        console.error("Error loading user ID or notes:", error);
      }
    };
    getUserId();
  }, []);

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem(`notes_${userId}`);
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.error("Error loading notes:", error);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const saveNotes = async (newNotes) => {
    try {
      await AsyncStorage.setItem(`notes_${userId}`, JSON.stringify(newNotes));
    } catch (error) {
      console.error("Error saving notes:", error);
    }
  };

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
    saveNotes(newNotes);
  };

  const deleteAll = () => {
    const newNotes = [];
    setNotes(newNotes);
    saveNotes(newNotes);
    AsyncStorage.removeItem(`notes_${userId}`);
  };

  const updateNotes = (newNotes) => {
    setNotes(newNotes);
    saveNotes(newNotes);
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to the Home Screen, {userId}!</Text>
      <View style={styles.header}>
        <Button color="#70b58d" title="Add Note" onPress={addNote} />
        <Button
          color="#70b58d"
          title="Delete All"
          onPress={() => deleteAll()}
        />
      </View>
      {notes.length > 0 && <Text>Click on the note to edit!</Text>}
      <FlatList
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.noteContainer}>
            <View style={[styles.noteItem, { width: screenWidth * 0.9 }]}>
              <Text
                style={{ color: "white", width: "75%" }}
                onPress={() => editNote(item)}
              >
                {item}
              </Text>
              <View style={{ backgroundColor: "red" }}>
                <Button
                  color="#70b58d"
                  title="Delete"
                  onPress={() => deleteNote(index)}
                />
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#c2d3d8",
  },
  header: {
    flexDirection: "row",
    gap: 20,
    padding: 10,
  },
  noteContainer: {
    padding: 5,
    flexDirection: "column",
    width: "100%",
  },
  noteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#16444c",
    padding: 10,
    marginBottom: 5,
  },
});
