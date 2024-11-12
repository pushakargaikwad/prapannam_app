import { router } from "expo-router";
import { useContext, useEffect } from "react";
import { Button, Colors, Text, View } from "react-native-ui-lib";
import { AuthContext } from "./FrappeAuthProvider";

export default function SignIn() {
  const { isAuthenticated, promptAsync, logout } = useContext(AuthContext);

useEffect(()=>{
    if(isAuthenticated){
        router.replace("/")
    }
},[isAuthenticated])

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {!isAuthenticated && (
        <Button
          onPress={() => {
            promptAsync();
            //redirect only on successfull login

            router.replace("/");

          }}
          label="login"
        ></Button>
      )}

    </View>
  );
}
