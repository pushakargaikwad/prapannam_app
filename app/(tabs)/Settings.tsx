import React from "react";

import { UserDetails } from "@/components/UserDetails";
import { UserContext } from "@/utils/UserProvider";
import { router, Stack } from "expo-router";
import { useContext } from "react";
import { Button, Card, Colors } from "react-native-ui-lib";
import { AuthContext } from "../FrappeAuthProvider";
import { View } from "@/components/Themed";
import { Text } from "@/components/ui/text";
export default function SettingsScreen() {
  const { isAuthenticated, promptAsync, logout } = useContext(AuthContext);
  return (
    <>
      {/* <View className="flex flex-1"> */}
      <Stack.Screen
        options={{
          title: "Settings",
        }}
      />

      <UserDetails />
      <Button
        outline
        label="About"
        onPress={() => {
          router.push("/About");
        }}
      />

      <Text className="text-center">
        {process.env.EXPO_PUBLIC_OAUTH_CLIENT_ID}
      </Text>
      <Text className="text-center">This is the OAuth Client ID</Text>
      <Text size="4xl" className="text-primary-0 text-center" bold>
        Hello
      </Text>

      {!isAuthenticated && (
        <Button
          onPress={() => {
            promptAsync();
          }}
          label="login"
        ></Button>
      )}
      {isAuthenticated && (
        <Button
          label={"Logout"}
          backgroundColor={Colors.$backgroundDangerHeavy}
          style={{
            marginBottom: 20,
          }}
          onPress={() => {
            logout();
          }}
        />
      )}
      {/* </View> */}
    </>
  );
}
