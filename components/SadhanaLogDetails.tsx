import { useFrappeGetCall } from "frappe-react-sdk";
import React, { useCallback, useState } from "react";
import { Text, Button, View } from "react-native-ui-lib";
import { SadhanaLogItems } from "./SadhanaLogItems";
import { FlatList, RefreshControl } from "react-native";
import CreateSadhanaLogItem from "./CreateSadhanaLogItem";
import { SadhanaLog } from "@/constants/types/SadhanaLog";
import { useFocusEffect } from "expo-router";

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

  useFocusEffect(
    useCallback(() => {
      mutate();
    },[])
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
          <Text>No Sadhana Log Found for the date</Text>
          <CreateSadhanaLogItem  mutate={mutate} visible={visible} setVisible={setVisible}  />
          <Button label={"Add New Sadhana Log"} onPress={()  => setVisible(true)} />
          {/* <Button label={"Reload Log"} onPress={() => mutate()} /> */}
        </>
      );
    }

    console.log("Sadhana LOG!!!!!!!!!!!!!!",data);
    return (
      <>
        {/* There can be multiple sadhana logs for given date, we are receiving a list. therefore iterating over those logs */}
        <FlatList
          data={data.message.sadhana_list}
          renderItem={({ item }: {item: SadhanaLog}) => (
            <>
              <Text text50>Sadhana Details: </Text>
              <Text>Points: {item.total_points}</Text>
              <Text>Date: {item.date}</Text>
              
              {/** Sadhana log items are the individual log items  */}
              <SadhanaLogItems sadhana_log={item.name} />
         

              <CreateSadhanaLogItem parent={item.name} mutate={mutate} visible={visible} setVisible={setVisible}  />
              <Button label={"Add New Sadhana Log"} onPress={()  => setVisible(true)} />
           
            </>
          )}
          keyExtractor={(item) => item.name}
          refreshControl={ <RefreshControl refreshing={isValidating} onRefresh={mutate} /> }
        ></FlatList>

        {/* <Button label={"Reload Log"} onPress={() => mutate()}></Button> */}
      </>
    );
  }
  return null;
};
