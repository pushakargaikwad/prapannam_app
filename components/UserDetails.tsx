import { Text, Button } from "react-native-ui-lib";
import React, { useContext } from "react";
import { UserContext } from "@/utils/UserProvider";

export const UserDetails = () => {
  const { userInfo } = useContext(UserContext);

  return (
    <>
      <Text>User is: {userInfo}</Text>
    </>
  );
};
