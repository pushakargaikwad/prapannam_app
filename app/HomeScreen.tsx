import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { View, Text, Card, Button, Colors, Typography, Assets } from 'react-native-ui-lib';
import { Feather } from '@expo/vector-icons';
import { SadhanaOverview } from '@/components/SadhanaOverview';
import { QuoteCard } from '@/components/QuoteCard';

Colors.loadColors({
  primary: '#D4AF37',
  secondary: '#8B4513',
  background: '#FFF8DC',
  text: '#4A4A4A',
});

Typography.loadTypographies({
  h1: { fontSize: 28, fontWeight: '600', color: Colors.secondary },
  h2: { fontSize: 22, fontWeight: '500', color: Colors.secondary },
  body: { fontSize: 16, color: Colors.text },
});

const HomeScreen = () => {
  const handleSadhanaLog = () => {
    // Implement Sadhana logging functionality
    console.log('Logging Sadhana');
  };

  const handleMeditation = () => {
    // Implement meditation timer or guide
    console.log('Starting meditation');
  };

  const handleScriptures = () => {
    // Navigate to scriptures section
    console.log('Opening scriptures');
  };

  return (
    <ImageBackground
      source={{ uri: 'https://example.com/path-to-your-background-image.jpg' }}
      style={styles.background}
    >
        
      <View style={styles.container}>
        <Text h1 style={styles.title}>Prapannam</Text>
        <Text body style={styles.subtitle}>Your Spiritual Journey Companion</Text>
     
        <Card style={styles.card}>
          <Text h2 style={styles.cardTitle}>Daily Sadhana</Text>
          <Button
            label="Log Sadhana"
            iconSource={() => <Feather name="edit-3" size={20} color={Colors.primary} />}
            backgroundColor={Colors.background}
            color={Colors.secondary}
            outlineColor={Colors.primary}
            outline
            onPress={handleSadhanaLog}
          />
        </Card>

        <View style={styles.quickActions}>
          <Button
            label="Meditate"
            iconSource={() => <Feather name="sun" size={24} color={Colors.background} />}
            backgroundColor={Colors.primary}
            color={Colors.background}
            onPress={handleMeditation}
            style={styles.actionButton}
          />
          <Button
            label="Scriptures"
            iconSource={() => <Feather name="book-open" size={24} color={Colors.background} />}
            backgroundColor={Colors.secondary}
            color={Colors.background}
            onPress={handleScriptures}
            style={styles.actionButton}
          />
        </View>

        <Card style={styles.quoteCard}>
          <Text style={styles.quote}>"The self is the friend of a man who masters himself through the self, but for a man without self-mastery, the self stays in the role of the enemy."</Text>
          <Text style={styles.quoteSource}>- Bhagavad Gita, Chapter 6, Verse 6</Text>
        </Card>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 248, 220, 0.8)',
  },
  title: {
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    padding: 20,
    marginBottom: 20,
    backgroundColor: Colors.background,
  },
  cardTitle: {
    marginBottom: 15,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  quoteCard: {
    padding: 20,
    backgroundColor: Colors.background,
  },
  quote: {
    ...Typography.body,
    fontStyle: 'italic',
    marginBottom: 10,
    textAlign: 'center',
  },
  quoteSource: {
    ...Typography.body,
    textAlign: 'right',
  },
});

export default HomeScreen;