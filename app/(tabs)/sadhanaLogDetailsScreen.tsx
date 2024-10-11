import CreateSadhanaLogItem from "@/components/CreateSadhanaLogItem";
import InlineAd from "@/components/InlineAd";
import { SadhanaLogDetails } from "@/components/SadhanaLogDetails";
import { useState } from "react";
import { ScrollView } from "react-native";
import { View, DateTimePicker } from "react-native-ui-lib";

export default function sadhanaLogDetailsScreen() {
  const [sadhanaDate, setSadhanaDate] = useState<Date>(new Date());
  return (<>
  <ScrollView>
    <View flex padding-20>
      <DateTimePicker
        placeholder={"Placeholder"}
        value={sadhanaDate}
        onChange={(e) => {
            if (e instanceof Date) {
                setSadhanaDate(e);
            }
        }}
        />
      <SadhanaLogDetails date={sadhanaDate.toISOString().split("T")[0]} />

      <CreateSadhanaLogItem/>
    </View>
        </ScrollView>
        <InlineAd/>
        </>
  );
}
