import { useFrappeGetCall } from "frappe-react-sdk";
import { View, Text, Button, ListItem } from "react-native-ui-lib";
import React from "react";

interface SadhanaLogItem {
  name: string;
  sadhana_type: string;
  qty: number;
}

interface SadhanaLogItemsProps {
  sadhana_log: string;
}

export const SadhanaLogItems = ({ sadhana_log }: SadhanaLogItemsProps) => {
  if (!sadhana_log) {
    return <Text text70 marginB-10>No Sadhana Log Found for the date</Text>;
  }
  const { data, error, isValidating, mutate } = useFrappeGetCall(
    "prapannam_sadhana.prapannam_sadhana.api.sadhana.get_sadhana_log_items",
    { sadhana_log: sadhana_log }
  );

  if (isValidating) {
    return <Text text70>Loading...</Text>;
  }
  if (error) {
    return <Text text70 color="#ff0000">{JSON.stringify(error)}</Text>;
  }
  if (data) {
    if (data.message.status != "ok") {
      return (
        <View marginB-10>
          <Text text70>You dont have any Sadhana Logs recorded for this date</Text>
        </View>
      );
    }

    return (
      <View marginT-10>
        {data.message.sadhana_log_items.map((sadhana_item: SadhanaLogItem) => (
          <ListItem
            key={sadhana_item.name}
            backgroundColor="#f8f8f8"
            marginB-8
            br20
          >
            <ListItem.Part left>
              <Text grey10 text70 marginR-10>Type:</Text>
            </ListItem.Part>
            <ListItem.Part middle>
              <Text text70>{sadhana_item.sadhana_type}</Text>
            </ListItem.Part>
            <ListItem.Part right>
              <Text text70>Qty: {sadhana_item.qty}</Text>
            </ListItem.Part>
          </ListItem>
        ))}
      </View>
    );
  }
  return null;
};
