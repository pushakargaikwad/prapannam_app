import { router, Stack } from "expo-router";
import { useContext, useEffect } from "react";
import { Button, Colors } from "react-native-ui-lib";
import { AuthContext } from "./FrappeAuthProvider";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StatusBar, StyleSheet } from "react-native";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";

export default function SignIn() {
  const { isAuthenticated, promptAsync, logout } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated]);

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <LinearGradient
        className="flex-1"
        colors={[Colors.primary, Colors.secondary]}
      >
        <SafeAreaView
          className="flex-1 "
          style={{ paddingTop: StatusBar.currentHeight || 100 }}
        >
          <Box className="bg-primary-500 p-5 justify-between">
            <Box className="justify-center">
              <Text className="text-center text-whitefont-bold text-5xl mb-3">
                Prapannam
              </Text>
              <Text className="text-center text-white text-lg">
                Begin your Spiritual Journey
              </Text>
            </Box>
            {!isAuthenticated && (
              <Button
                onPress={() => {
                  promptAsync();
                  //redirect only on successful login
                  router.replace("/");
                }}
                label="Login"
                backgroundColor={Colors.secondary}
                className="rounded-full mt-12"
              />
            )}
          </Box>
          {/* <View className="flex-1 justify-between px-6">
            <View className="flex-1 justify-center"></View>
          </View> */}
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}
