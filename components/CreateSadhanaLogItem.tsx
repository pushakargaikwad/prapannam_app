import { View, Text, Button, NumberInput, FloatingButton, FloatingButtonLayouts, Colors, Incubator, Card, Dialog, TextField } from "react-native-ui-lib";
import React, { useContext, useEffect, useState } from "react";
import { useFrappeCreateDoc, useFrappePostCall } from "frappe-react-sdk";
import { Picker } from "react-native-ui-lib/src/components/picker";
import { ScrollView, TextInput, StyleSheet, Modal, Pressable } from "react-native";
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
      <Modal animationType="slide" transparent={true} visible={visible}>
        
          {/* <Dialog
          useSafeArea
          
          
          
          visible={visible}
          onDismiss={onDismiss}
          
          > */}
       
        {/* <Card height={150} padding-20> */}
        <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Add Sadhana Item</Text>
          <Pressable onPress={onDismiss}>
            {/* <MaterialIcons name="close" color="#fff" size={22} /> */}
            <Text style={{color:"white"}} text50H>X</Text>
          </Pressable>
        </View>
      
            <View flex padding-20 style={{ flexDirection: 'column', justifyContent: 'space-between' }} >

      <Picker
        label="Sadhana Type"
        items={sadhana_type_items}
        value={sadhana_type}
        useDialog
        onChange={(item) => setSadhanaType(item)}
        customPickerProps={{
          migrateDialog: true,
          dialogProps: { bottom: true, width: "100%", height: "45%" },
        }}
        showSearch
        searchPlaceholder={"Search Sadhana Type"}
        
        marginB-20
        />
       {/* <TextInput
       
       onChangeText={setQty}
       value={qty}
       placeholder="qty"
       keyboardType="numeric"
       marginB-40
       /> */}
        <TextField
          value={qty}
          placeholder="Enter Qty"
          keyboardType="numeric"
          onChangeText={setQty}
          trailingAccessory={
            <Text text70 $textNeutral>
              Qty
            </Text>
          }
          paddingB-20
        />

      <Button
        onPress={onSubmit}
        label="Create Sadhana Log Item"
        margint-15
        marginB-30
        ></Button>
      {/* <Text text >{JSON.stringify(parent)}</Text> */}
      

        {/* </Card> */}
        {/* </Dialog> */}
        {/* </Incubator.Dialog> */}
  
        </View>
        </View>
  </Modal>
     
  );
};

const styles = StyleSheet.create({
  modalContent: {
    minHeight: '25%',
    width: '100%',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
  },
  titleContainer: {
    height: '20%',
    backgroundColor: '#464C55',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
});


export default CreateSadhanaLogItem;
