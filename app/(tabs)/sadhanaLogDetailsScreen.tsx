import CreateSadhanaLogItem from "@/components/CreateSadhanaLogItem";
import InlineAd from "@/components/InlineAd";
import { SadhanaLogDetails } from "@/components/SadhanaLogDetails";
import { SadhanaContext } from "@/utils/SadhanaProvider";
import { Link, Stack } from "expo-router";
import { useContext, useState } from "react";
import { Pressable, ScrollView } from "react-native";
import { View, DateTimePicker, Text, Incubator, Button, Dialog } from "react-native-ui-lib";

export default function sadhanaLogDetailsScreen() {
  // const [sadhanaDate, setSadhanaDate] = useState<Date>(new Date());
  const { sadhanaDate, setSadhanaDate } = useContext(SadhanaContext);
  const [visible, setVisible] = useState(false);
  function onDismiss()  {
    setVisible(false);
  }

  return (
 <>

      <View g-$backgroundNeutralLight flex padding-20>
        <Stack.Screen
          options={{
            headerTitle: "Sadhana Log",
            headerRight: () => (
              <DateTimePicker
              placeholder={"Placeholder"}
                value={sadhanaDate}
                onChange={(e) => {
                  if (e instanceof Date) {
                    setSadhanaDate(e);
                    }
                    }}
              />
            ),
          }}
        />

        <UserGroupsComp />
        <SadhanaLogDetails date={sadhanaDate.toISOString().split("T")[0]} />
        <Button label={"Another Addd New Sadhana Log"} onPress={()  => setVisible(true)} />
        
      <InlineAd />
      </View>
        <Dialog
          useSafeArea
          
          bottom
          
          visible={visible}
          onDismiss={onDismiss}
          
          >
         <Text>Hello</Text>
        {/* <CreateSadhanaLogItem />   */}
      </Dialog>
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
