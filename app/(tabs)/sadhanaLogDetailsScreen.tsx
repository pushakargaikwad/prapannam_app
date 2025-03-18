import React from 'react';
import { Stack } from "expo-router";
import { ScrollView } from 'react-native';
import { View, DateTimePicker, Text } from "react-native-ui-lib";
import { SadhanaContext } from "@/utils/SadhanaProvider";
import { useContext } from "react";
import { SadhanaLogDetails } from "@/components/SadhanaLogDetails";
import InlineAd from "@/components/InlineAd";
import { SadhanaType } from "@/constants/types/SadhanaType";
import { SadhanaGroup } from "@/constants/types/SadhanaGroup";

interface SadhanaContextType {
  sadhanaDate: Date;
  setSadhanaDate: (date: Date) => void;
  userGroups: string[];
  defaultGroup: string | null;
  sadhanaTypes: SadhanaType[];
}

export default function SadhanaLogDetailsScreen() {
  const { sadhanaDate, setSadhanaDate, userGroups } = useContext(SadhanaContext) as SadhanaContextType;

  return (
    <View flex>
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
      <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        <View padding-16>
          <View
            style={{
              backgroundColor: '#fff',
              padding: 16,
              borderRadius: 8,
              marginBottom: 16,
              elevation: 2,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 2,
              zIndex: 1
            }}
          >
            <Text text60 marginB-16>Sadhana Groups</Text>
            <UserGroupsComp />
          </View>
          <View style={{ marginTop: 16 }}>
            <SadhanaLogDetails date={sadhanaDate.toISOString().split("T")[0]} />
          </View>
        </View>
      </ScrollView>
      <InlineAd />
    </View>
  );
}


function UserGroupsComp() {
  const { userGroups } = useContext(SadhanaContext) as SadhanaContextType;

  if (!userGroups || userGroups.length === 0) {
    return <Text text70 color="#666">No groups available</Text>;
  }

  return (
    <View>
      <Text text60 marginB-12>Your Groups</Text>
      {userGroups.map((group: string) => (
        <View
          key={group}
          marginB-8
          padding-12
          backgroundColor="#f8f8f8"
          style={{
            borderRadius: 6,
            borderLeftWidth: 4,
            borderLeftColor: '#4a90e2'
          }}
        >
          <Text text70>{group}</Text>
        </View>
      ))}
    </View>
  );
}



