import { useFrappeGetCall } from "frappe-react-sdk";
import { View, Text, Button, ListItem } from "react-native-ui-lib";
import React from "react";

export const SadhanaLogItems = ({ sadhana_log }) => {
  if (!sadhana_log) {
    return <Text>No Sadhana Log Found for the date</Text>;
  }
  const { data, error, isValidating, mutate } = useFrappeGetCall(
    "prapannam_sadhana.prapannam_sadhana.api.sadhana.get_sadhana_log_items",
    { sadhana_log: sadhana_log }
  );

  if (isValidating) {
    return <Text text30>Loading</Text>;
  }
  if (error) {
    return <Text>{JSON.stringify(error)}</Text>;
  }
  if (data) {
    if (data.message.status != "ok") {
      return (
        <>
          <Text>You dont have any Sadhana Logs recorded for this date</Text>
          <Button label={"Reload Items"} onPress={() => mutate()} />
        </>
      );
    }

    console.log(data);
    return (
      <>
        {/* <Text>{JSON.stringify(data)}</Text> */}
        {data.message.sadhana_log_items.map((sadhana_item) => (
          <React.Fragment key={sadhana_item.name}>
            <ListItem>
              <ListItem.Part left>
                <Text grey10 text60>
                  Type: 
                </Text>
              </ListItem.Part>
              <ListItem.Part middle>
                <Text text70>
                  {sadhana_item.sadhana_type}
                </Text>
              </ListItem.Part>
              <ListItem.Part right>
                <Text>Qty: {sadhana_item.qty}</Text>
              </ListItem.Part>
            </ListItem>
          </React.Fragment>
        ))}

        <Button label={"Reload Log"} onPress={() => mutate()}></Button>
      </>
    );
  }
  return null;
};
