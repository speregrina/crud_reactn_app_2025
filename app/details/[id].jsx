import { Lato_400Regular_Italic, useFonts } from "@expo-google-fonts/lato";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from '../ThemeContext';


const Details = () => {
  const { id } = useLocalSearchParams();
  const [todos, setTodos] = useState(null);
  const [loaded, error] = useFonts({ Lato_400Regular_Italic }); 
  const { background, colorText, toggleTheme, isDark } = useContext(ThemeContext);
  const router = useRouter();

  useEffect(() => {
    // Fetch or load the item details based on the id
    const fetchData = async (id) => {
      try {
        const jsonValue = await AsyncStorage.getItem('TodoApp');
        const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null;
        //console.log(storageTodos);
        if (storageTodos && storageTodos.length) {
            //console.log('id : '+id);
          const myTodos = storageTodos.find( t  => t.id == id);
          //console.log(myTodos);
          setTodos(myTodos);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchData(id);
  }, [id]);

  if(!loaded && !error){ 
    return null;
  }

  const handleSave = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem("TodoApp");
        const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null;
        if (storageTodos && storageTodos.length) {
            const updatedTodos = storageTodos.map(todo =>
              todo.id === id ? { ...todo, ...todos } : todo
            );
            await AsyncStorage.setItem("TodoApp", JSON.stringify(updatedTodos));
        }
    } catch (e) {
      console.error(e);
    }
  }

  const styles = createStyles(background, colorText, isDark);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.title2}>Details for item {id}</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Update title"
          placeholderTextColor={colorText}
          value={todos?.name || ''}
          onChangeText={val => setTodos({ ...todos, name: val })}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Update description"
          placeholderTextColor={colorText}
          value={todos?.description || ''}
          onChangeText={val => setTodos({ ...todos, description: val })}
        />
        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};


function createStyles(background, colorText, isDark) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: background,
    },
    containerHeader: {
      padding: 16,
      backgroundColor: background,
      borderBottomWidth: 1,
      borderBottomColor: colorText,
      alignContent: 'center',
    },
    title2: {
      fontSize: 32,
      fontWeight: "bold",
      color: colorText,
      fontFamily: 'Lato_400Regular_Italic',
    },
    formContainer: {
      padding: 16,
    },
    textInput: {
      color: colorText,
      borderWidth: 1,
      borderColor: colorText,
      borderRadius: 5,
      padding: 10,
      marginVertical: 8,
      fontFamily: 'Lato_400Regular_Italic',
    },
    saveButton: {
      backgroundColor: isDark ? '#333' : '#eee',
      padding: 12,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 12,
    },
    saveButtonText: {
      color: isDark ? '#eee' : '#333',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
}

export default Details;
