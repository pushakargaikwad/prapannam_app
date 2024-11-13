import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Button, Colors } from 'react-native-ui-lib';

export default function HomeScreen2() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Prapannam</Text>
        <Text style={styles.subtitle}>Your Spiritual Journey Companion</Text>
      </View>

      <View style={styles.sadhanaSection}>
        <Text style={styles.sectionTitle}>Daily Sadhana</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Log Sadhana"
            placeholderTextColor="#8B4513"
            style={styles.input}
          />
          <Button label="Log Sadhana" style={styles.logButton} />
        </View>
      </View>

      <View style={styles.buttonsRow}>
        <Button label="Meditate" style={styles.meditateButton} />
        <Button label="Scriptures" style={styles.scriptureButton} />
      </View>

      <View style={styles.quoteSection}>
        <Text style={styles.quote}>
          "The self is the friend of a man who masters himself through the self, 
          but for a man without self-mastery, the self stays in the role of the enemy."
        </Text>
        <Text style={styles.quoteSource}>- Bhagavad Gita, Chapter 6, Verse 6</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8DC', // Soft yellowish background
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8B4513', // Earthy brown
    fontFamily: 'serif',
  },
  subtitle: {
    fontSize: 16,
    color: '#A0522D',
    marginTop: 5,
  },
  sadhanaSection: {
    backgroundColor: '#FAE3B2', // Light yellowish for input section
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#8B4513',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#FFF8DC',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#A0522D',
    marginRight: 10,
  },
  logButton: {
    backgroundColor: '#FFD700',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  meditateButton: {
    backgroundColor: '#FFA500',
    flex: 1,
    marginRight: 10,
  },
  scriptureButton: {
    backgroundColor: '#8B4513',
    flex: 1,
  },
  quoteSection: {
    backgroundColor: '#FAE3B2',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  quote: {
    fontStyle: 'italic',
    color: '#6B4226',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  quoteSource: {
    color: '#8B4513',
    fontSize: 14,
  },
});
