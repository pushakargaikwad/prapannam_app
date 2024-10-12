import CreateSadhanaLogItem from "@/components/CreateSadhanaLogItem";
import InlineAd from "@/components/InlineAd";
import { SadhanaLogDetails } from "@/components/SadhanaLogDetails";
import { Stack } from "expo-router";
import { useState } from "react";
import { ScrollView } from "react-native";
import { View, DateTimePicker } from "react-native-ui-lib";

export default function sadhanaLogDetailsScreen() {
  const [sadhanaDate, setSadhanaDate] = useState<Date>(new Date());
  return (<>
  {/* <ScrollView> */}
    <View flex padding-20>
        <Stack.Screen 
        options={{
            headerRight: () =>  <DateTimePicker
            placeholder={"Placeholder"}
            value={sadhanaDate}
            onChange={(e) => {
                if (e instanceof Date) {
                    setSadhanaDate(e);
                }
            }}
            />
        }}
        />

     
      <SadhanaLogDetails date={sadhanaDate.toISOString().split("T")[0]} />

     
      
    </View>
        {/* </ScrollView> */}
        <InlineAd/>
        </>
  );
}
