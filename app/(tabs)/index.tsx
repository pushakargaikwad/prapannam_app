import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
// import {  View } from '@/components/Themed';
import {  Text, View } from "react-native-ui-lib";
import { UserDetails } from "@/components/UserDetails";

export default function TabOneScreen() {
  return (
    <View flex padding-20>
      <Text text30>Some Text</Text>
      <UserDetails />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
