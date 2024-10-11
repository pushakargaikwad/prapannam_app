import CreateSadhanaLogItem from "@/components/CreateSadhanaLogItem";
import { SadhanaLogDetails } from "@/components/SadhanaLogDetails";
import { useState } from "react";
import { View, DateTimePicker } from "react-native-ui-lib";

export default function sadhanaLogDetailsScreen() {
  const [sadhanaDate, setSadhanaDate] = useState<Date>(new Date());
  return (<>
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
        {/* <InlineAd/> */}
        </>
  );
}
