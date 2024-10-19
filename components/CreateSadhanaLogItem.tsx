import { View, Text, Button, NumberInput, FloatingButton, FloatingButtonLayouts, Colors, Incubator, Card, Dialog } from "react-native-ui-lib";
import React, { useContext, useEffect, useState } from "react";
import { useFrappeCreateDoc, useFrappePostCall } from "frappe-react-sdk";
import { Picker } from "react-native-ui-lib/src/components/picker";
import { ScrollView, TextInput, StyleSheet } from "react-native";
import { getBackgroundColor } from "react-native-ui-lib/src/helpers/AvatarHelper";
import { SadhanaContext } from "@/utils/SadhanaProvider";
import * as Haptics from 'expo-haptics';

const CreateSadhanaLogItem = ({parent=null,mutate, visible,setVisible}) => {
  const { createDoc, error } = useFrappeCreateDoc();
  // Use the Frappe Post call hook
  const { call, result, loading, error: createSadhanaError, isCompleted, reset } = useFrappePostCall('prapannam_sadhana.prapannam_sadhana.api.sadhana.create_sadhana_log_and_items');

  
  const {sadhanaLog, setSadhanaLog} = useContext(SadhanaContext);
  const { sadhanaDate, setSadhanaDate } = useContext(SadhanaContext);
  const [sadhana_type, setSadhanaType] = useState("Chanting");
  const [qty, setQty] = useState(0.0);
  // const [visible, setVisible] = useState(false);
  const sadhana_type_items = [
    { label: "Chanting", value: "Chanting" },
    { label: "Reading", value: "Reading" },
];

useEffect(() => {
  console.log(JSON.stringify(result));
} , [result]);

const handleCreateSadhanaLog = async () => {
  const params = {
      date: sadhanaDate.toISOString().split("T")[0],
      group: "ISKCON Karwadi",
      sadhana_type: sadhana_type,
      qty: qty
  };
  setVisible(false); 
  await call(params); 
  Haptics.notificationAsync(
    Haptics.NotificationFeedbackType.Success
  )
  mutate();
};

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
        mutate();
        Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Success
        )
        setVisible(false);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }

  function onSubmit() {
    if (parent) {
      // If parent exists, create only the Sadhana Log Item
      console.log("Parent exists");
      createSadhanaLogItem();
    } else {
      // If parent doesn't exist, create Sadhana Log and then the item
      handleCreateSadhanaLog();
    }
  }

  function onDismiss()  {
    setVisible(false);
  }
  return (
   
      // <Incubator.Dialog
      //   //  useSafeArea
      //   visible={visible}
      //    onDismiss={onDismiss}
      //    bottom
      //    centerH
         
        

      //    //  modalProps={this.modalProps}
      //    //  headerProps={this.headerProps}
      //    >
          <Dialog
          useSafeArea
          
          
          
          visible={visible}
          onDismiss={onDismiss}
          
          >
       
        <Card height={150} padding-20>

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
        onPress={onSubmit}
        label="Create Sadhana Log Item"
        
        ></Button>
      <Text text >{JSON.stringify(parent)}</Text>
      

        </Card>
        </Dialog>
        // </Incubator.Dialog>
  
     
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingBottom: 0,
    flex: 1,
    backgroundColor: Colors.$backgroundDefault
  }
});


export default CreateSadhanaLogItem;
