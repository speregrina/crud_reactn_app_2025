import { data } from '@/data/todos';
import { Lato_400Regular_Italic, useFonts } from "@expo-google-fonts/lato";
import Octicons from '@expo/vector-icons/Octicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useState } from 'react';
import { Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from './ThemeContext';



export default function Index() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [loaded, error] = useFonts({ Lato_400Regular_Italic });
  const { background, colorText, toggleTheme, isDark } = useContext(ThemeContext);
  const router = useRouter();

  // Load todos from AsyncStorage on mount
  useEffect(() => {
      const fetchData =  async () => {
          try{
          const jsonValue = await AsyncStorage.getItem('TodoApp'); 
          if (jsonValue ) {
            setTodos(JSON.parse(jsonValue));
          } else {
            // If not in AsyncStorage, initialize from data and persist
            const sortedData = data.sort((a, b) => b.id - a.id);
            setTodos(sortedData);
            AsyncStorage.setItem('TodoApp', JSON.stringify(sortedData));
          }
        }
        catch(e){
          console.error(e);
        }
      }
      fetchData();
  }, []);

  // Persist todos to AsyncStorage whenever they change
  useEffect(() => {
    if (todos.length > 0) {
      AsyncStorage.setItem('TodoApp', JSON.stringify(todos));
    }
  }, [todos]);

  if (!loaded && !error) {
    return null;
  }

  const addTodo = () => {
    if (text.trim()) {
      const newId = todos.length > 0 ? todos[0].id + 1 : 1;
      const newTodo = { id: newId, name: text, description: description };
      setTodos([newTodo, ...todos]);
      setText('');
      setDescription('');
    }
  };



  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const styles = createStyles(background, colorText, isDark);

  return (
    <SafeAreaView>
      <View style={styles.containerHeader}>
        <Text style={styles.title2}>Catalog of Tools</Text>
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={setText}
          placeholder="Add a new todo"
          placeholderTextColor={styles.textInput.color}
        />
        <TextInput
          style={styles.textInput}
          value={description}
          onChangeText={setDescription}
          placeholder="Add a description"
          placeholderTextColor={styles.textInput.color}
        />
        <Button styles={styles.addButtonText} title="Add new Item" onPress={addTodo} />
        <Pressable
          onPress={toggleTheme}
          style={{ marginLeft: 10 }}
        >
          {isDark === 'dark' ? (
            <Octicons name="sun" size={24} color={styles.description.color} />
          ) : (
            <Octicons name="moon" size={24} color={styles.description.color} />
          )}
        </Pressable>
      </View>
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Pressable
              onPress={() => router.push(`/details/${item.id}`)}
            >
                <Text style={styles.title}>{item.name}</Text>
            </Pressable>
            <Text style={styles.description}>{item.description}</Text>
            <Button title="Remove" onPress={() => removeTodo(item.id)} />
          </View>
        )}
        keyExtractor={item => item.id}
      />
      <StatusBar style={'inverted'} />
    </SafeAreaView>
  );
}


function createStyles( background, colorText, isDark){
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: background,
    },
    item: {
      backgroundColor: background,
      padding: 20,
      marginVertical: 8,
      borderRadius: 10,
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      fontFamily: 'Lato_400Regular_Italic',
      color: colorText,
    },
    description: {
      color: colorText,
    },
    title2:{
      fontSize: 32,
      fontWeight: "bold",
      color: colorText,
      fontFamily: 'Lato_400Regular_Italic',
    },
    containerHeader: {
      padding: 16,
      backgroundColor: background,
      borderBottomWidth: 1,
      borderBottomColor: colorText,
      alignContent: 'center',
      color: colorText,
    },
    textInput:{
      color: colorText,
      borderWidth: 1,
      borderColor: colorText,
      borderRadius: 5,
      padding: 10,
      marginVertical: 8,
      fontFamily: 'Lato_400Regular_Italic',
    },
    addButtonText:{
      fontSize: 18,
      color: isDark ? '#eee' : '#333',
    }
  });
} 