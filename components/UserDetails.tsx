import { Text, Button } from "react-native-ui-lib";
import React from "react";
import { useFrappeGetCall } from "frappe-react-sdk";

export const UserDetails = () => {
  const { data, error, isValidating, mutate } = useFrappeGetCall(
    "prapannam_core.prapannam_core.api.mobile.get_current_user"
  );

  // we are expecting response {"status": "ok"}
  if (isValidating) {
    return <Text text30>Loading</Text>;
  }
  if (error) {
    return <Text text30>{JSON.stringify(error)}</Text>;
  }
  if (data) {
    return (
      <>
        <Text text50>User: {data.message.user}</Text>
        <Button label={"Reload"} onPress={() => mutate()}></Button>
      </>
    );
  }

  return null;
};
