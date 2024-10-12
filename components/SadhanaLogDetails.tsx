import { useFrappeGetCall } from "frappe-react-sdk";
import React from "react";
import { Text, Button } from "react-native-ui-lib";
import { SadhanaLogItems } from "./SadhanaLogItems";
import { FlatList } from "react-native";

export const SadhanaLogDetails = ({
  date = new Date().toISOString().split("T")[0],
}) => {
  const { data, error, isValidating, mutate } = useFrappeGetCall(
    "prapannam_sadhana.prapannam_sadhana.api.sadhana.get_sadhana_by_date",
    { date: date }
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
          <Button label={"Reload Log"} onPress={() => mutate()} />
        </>
      );
    }

    console.log(data);
    return (
      <>
        <Text text50>Sadhana Details: </Text>
        <FlatList 
          data={data.message.sadhana_list}
          renderItem={({item}) => <SadhanaLogItems sadhana_log={item.name}/>}
          keyExtractor={item => item.name}
        >

        </FlatList>

        <Button label={"Reload Log"} onPress={() => mutate()}></Button>
      </>
    );
  }
  return null;
};