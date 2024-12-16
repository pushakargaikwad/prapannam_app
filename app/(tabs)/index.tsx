import { ImageBackground, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
// import {  View } from '@/components/Themed';
import {
  Button,
  Card,
  Colors,
  Text,
  Typography,
  View,
} from "react-native-ui-lib";
import { UserDetails } from "@/components/UserDetails";
import { useContext } from "react";
import { UserContext } from "@/utils/UserProvider";
import { AuthContext } from "../FrappeAuthProvider";
import { Feather } from "@expo/vector-icons";
import { QuoteCard } from "@/components/QuoteCard";
import { router } from "expo-router";

Colors.loadColors({
  primary: "#D4AF37",
  secondary: "#8B4513",
  background: "#FFF8DC",
  text: "#4A4A4A",
});

Typography.loadTypographies({
  h1: { fontSize: 28, fontWeight: "600", color: Colors.secondary },
  h2: { fontSize: 22, fontWeight: "500", color: Colors.secondary },
  body: { fontSize: 16, color: Colors.text },
});

export default function TabOneScreen() {
  const { isAuthenticated, promptAsync, logout } = useContext(AuthContext);

  const handleLogSadhana = () => {
    router.push("/sadhanaLogDetailsScreen");
  };
  return (
    <ImageBackground
      source={{ uri: "https://example.com/path-to-your-background-image.jpg" }}
      style={styles.background}
    >
      <View flex padding-20 style={styles.container}>
        <Text h1 style={styles.title}>
          Prapannam
        </Text>
        <Text body style={styles.subtitle}>
          Your Spiritual Journey Companion
        </Text>

        {isAuthenticated && <UserDetails />}

        {/* <UserDetails /> */}
        <QuoteCard
          transliteration="kārpaṇya-doṣopahata-svabhāvaḥ
pṛcchāmi tvāṁ dharma-sammūḍha-cetāḥ
yac chreyaḥ syān niścitaṁ brūhi tan me
śiṣyas te ’haṁ śādhi māṁ tvāṁ prapannam"
          translation="Now I am confused about my duty and have lost all composure because of miserly weakness. In this condition I am asking You to tell me for certain what is best for me. Now I am Your disciple, and a soul surrendered unto You. Please instruct me"
          source="Bhagavad Gita, Chapter 2, Verse 7"
        />
        <Card style={styles.card}>
          <Text h2 style={styles.cardTitle}>
            Daily Sadhana
          </Text>
          <Button
            label="Log Sadhana"
            iconSource={() => (
              <Feather name="edit-3" size={20} color={Colors.primary} />
            )}
            backgroundColor={Colors.background}
            color={Colors.secondary}
            outlineColor={Colors.primary}
            outline
            onPress={handleLogSadhana}
          />
        </Card>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(255, 248, 220, 0.8)",
  },
  title: {
    textAlign: "center",
    marginTop: 40,
    marginBottom: 10,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  subtitle: {
    textAlign: "center",
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
    flexDirection: "row",
    justifyContent: "space-between",
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
    fontStyle: "italic",
    marginBottom: 10,
    textAlign: "center",
  },
  quoteSource: {
    ...Typography.body,
    textAlign: "right",
  },
});
