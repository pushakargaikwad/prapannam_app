import CreateSadhanaLogItem from "@/components/CreateSadhanaLogItem";
import InlineAd from "@/components/InlineAd";
import { SadhanaLogDetails } from "@/components/SadhanaLogDetails";
import { SadhanaContext } from "@/utils/SadhanaProvider";
import { Link, Stack } from "expo-router";
import { useContext, useState } from "react";
import { Pressable, ScrollView, View, StyleSheet, Text } from "react-native";
import { DateTimePicker, Incubator, Button, Dialog } from "react-native-ui-lib";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function sadhanaLogDetailsScreen() {
  // const [sadhanaDate, setSadhanaDate] = useState<Date>(new Date());
  const { sadhanaDate, setSadhanaDate } = useContext(SadhanaContext);
  const [visible, setVisible] = useState(false);
  function onDismiss() {
    setVisible(false);
  }

  return (
    <>
      <View className="flex flex-1  justify-between" style={{ elevation: 0 }}>
        <Stack.Screen
          options={{
            headerTitle: "Sadhana Log",
            headerRight: () => <></>,
          }}
        />
        <View className="flex px-3 py-2" style={{ elevation: 5, zIndex: 100 }}>
          <View className="flex justify-start">
            <DateTimePicker
              placeholder={"Placeholder"}
              value={sadhanaDate}
              onChange={(e) => {
                if (e instanceof Date) {
                  setSadhanaDate(e);
                }
              }}
              mode="date"
              display="default"
              label="Select Date"
            />
          </View>

          {/* <UserGroupsComp /> */}
          <SadhanaLogDetails date={sadhanaDate.toISOString().split("T")[0]} />
        </View>
        {/* <InlineAd /> */}
      </View>
    </>
  );
}

function UserGroupsComp() {
  const { userGroups } = useContext(SadhanaContext);
  return (
    <>
      <Text text>Sadhana Groups: {JSON.stringify(userGroups)}</Text>
    </>
  );
}
