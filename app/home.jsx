import Octicons from '@expo/vector-icons/Octicons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text } from 'react-native';
import { ThemeContext } from './ThemeContext';

const Home = () => {
  const navigation = useNavigation();
  const { background, colorText, toggleTheme, isDark } = useContext(ThemeContext);
const styles = createStyles(background, colorText, isDark);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>This is home</Text>
      <Pressable onPress={() => navigation.navigate('index')}>
        <Text style={styles.button}>Go to Tools</Text>
      </Pressable>
      <Pressable onPress={toggleTheme} style={{ marginTop: 20, color: colorText, flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: colorText }}>Switch Theme : </Text>
        {isDark === 'dark' ? (
            <Octicons name="sun" size={32} color={styles.item.backgroundColor} />
          ) : (
            <Octicons name="moon" size={32} color={styles.item.backgroundColor} />
          )}
      </Pressable>
      <StatusBar style={'inverted'} />
    </SafeAreaView>
  );
}



function createStyles( background, colorText, isDark){
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: background,
            textAlign: 'center',
            alignItems: 'center',
            padding: 16,
        },
        title: {
            fontSize: 32,
            fontWeight: 'bold',
            color: colorText,
            paddingVertical: 12,
        },
        button:{
            backgroundColor: isDark ? '#0d0947ff' : '#d7dbc0ff',
            padding: 12,
            borderRadius: 5,
            marginVertical: 8,
            borderWidth: 1,
            borderColor: colorText,
            color: colorText,
        },
        item: {
            backgroundColor: isDark ? '#eee' : '#333',
            padding: 12,
            borderRadius: 5,
            marginVertical: 8,
        },
    });
}

export default Home