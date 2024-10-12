import { View, Text, Button, NumberInput } from "react-native-ui-lib";
import React, { useState } from "react";
import { useFrappeCreateDoc } from "frappe-react-sdk";
import { Picker } from "react-native-ui-lib/src/components/picker";
import { ScrollView, TextInput } from "react-native";

const CreateSadhanaLogItem = ({parent}) => {
  const { createDoc, error } = useFrappeCreateDoc();
  const [sadhana_type, setSadhanaType] = useState("Chanting");
  const [qty, setQty] = useState(0.0);
  const sadhana_type_items = [
    { label: "Chanting", value: "Chanting" },
    { label: "Reading", value: "Reading" },
];

  function createSadhanaLogItem() {
    createDoc("Sadhana Log Item", {
      sadhana_type: sadhana_type,
      qty: qty,
      parent: parent,
      parentfield: "log_items",
      parenttype: "Sadhana Log",
    })
      .then((res) => {
        console.log("Response,", res);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }
  return (
    <View>
      <Picker
        label="Sadhana Type"
        items={sadhana_type_items}
        value={sadhana_type}
        useDialog
        onChange={(item) => setSadhanaType(item)}
        customPickerProps={{
          migrateDialog: true,
          dialogProps: { bottom: true, width: "100%", height: "30%" },
        }}
        showSearch
        searchPlaceholder={"Search Sadhana Type"}
        enableModalBlur
      />
       <TextInput
       
        onChangeText={setQty}
        value={qty}
        placeholder="qty"
        keyboardType="numeric"
      />

      <Button
        onPress={createSadhanaLogItem}
        label="Create Sadhana Log Item"
      ></Button>
    </View>
  );
};

export default CreateSadhanaLogItem;
