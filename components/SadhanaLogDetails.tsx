import { useFrappeGetCall } from "frappe-react-sdk";
import React, { useState } from "react";
import { Text, Button, View } from "react-native-ui-lib";
import { SadhanaLogItems } from "./SadhanaLogItems";
import { FlatList, RefreshControl } from "react-native";
import CreateSadhanaLogItem from "./CreateSadhanaLogItem";
import { SadhanaLog } from "@/constants/types/SadhanaLog";

// Define the structure for the inner message object
interface SadhanaMessage {
  message: string;
  status: string;
  sadhana_list?: SadhanaLog[]; // Optional since it might not be present in the failure case
}

// Define the overall response structure
interface SadhanaResponse {
  message: SadhanaMessage;
}
export const SadhanaLogDetails = ({
  date = new Date().toISOString().split("T")[0],
}) => {
  const [visible, setVisible] = useState(false);
  const { data, error, isValidating, mutate } = useFrappeGetCall<SadhanaResponse>(
    "prapannam_sadhana.prapannam_sadhana.api.sadhana.get_sadhana_by_date",
    { date: date }
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
        <View backgroundColor="#fff" padding-16 br20>
          <Text text70 marginB-10>No Sadhana Log Found for the date</Text>
          <CreateSadhanaLogItem mutate={mutate} visible={visible} setVisible={setVisible} />
          <Button label={"Add New Sadhana Log"} onPress={() => setVisible(true)} marginB-10 />
          <Button label={"Reload Log"} onPress={() => mutate()} />
        </View>
      );
    }

    return (
      <View backgroundColor="#fff" padding-16 br20>
        <FlatList
          data={data.message.sadhana_list}
          renderItem={({ item }: { item: SadhanaLog }) => (
            <View marginB-20>
              <Text text50 marginB-10>Sadhana Details:</Text>
              <Text text70 marginB-5>Points: {item.total_points}</Text>
              <Text text70 marginB-10>Date: {item.date}</Text>

              <SadhanaLogItems sadhana_log={item.name} />

              <View marginT-10>
                <CreateSadhanaLogItem parent={item.name} mutate={mutate} visible={visible} setVisible={setVisible} />
                <Button label={"Add New Sadhana Log"} onPress={() => setVisible(true)} />
              </View>
            </View>
          )}
          keyExtractor={(item) => item.name}
          refreshControl={<RefreshControl refreshing={isValidating} onRefresh={mutate} />}
        />
      </View>
    );
  }
  return null;
};

