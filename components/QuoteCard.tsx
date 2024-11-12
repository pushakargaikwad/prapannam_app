import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, Colors, Typography } from 'react-native-ui-lib';

interface QuoteProps {
  sanskrit?: string;
  transliteration?: string;
  translation?: string;
  source?: string;
}

export const QuoteCard: React.FC<QuoteProps> = ({ sanskrit, transliteration, translation, source }) => {
  return (
    <Card style={styles.quoteCard}>
      {sanskrit && <Text style={styles.sanskritQuote}>{sanskrit}</Text>}
      {transliteration && <Text style={styles.transliteration}>{transliteration}</Text>}
      {translation && <Text style={styles.translation}>{translation}</Text>}
      {source && <Text style={styles.quoteSource}>{source}</Text>}
    </Card>
  );
};

const styles = StyleSheet.create({
  quoteCard: {
    padding: 20,
    backgroundColor: Colors.background,
    marginTop: 20,
  },
  sanskritQuote: {
    ...Typography.text60,
    fontFamily: 'Noto Sans Devanagari', // Make sure to include this font in your project
    textAlign: 'center',
    marginBottom: 10,
  },
  transliteration: {
    ...Typography.text70,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 10,
  },
  translation: {
    ...Typography.text70,
    marginBottom: 10,
    textAlign: 'center',
  },
  quoteSource: {
    ...Typography.text80,
    textAlign: 'right',
  },
});