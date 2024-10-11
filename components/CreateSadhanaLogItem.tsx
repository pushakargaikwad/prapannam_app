import { View, Text, Button } from "react-native-ui-lib";
import React from 'react'
import { useFrappeCreateDoc } from 'frappe-react-sdk'

const CreateSadhanaLogItem = () => {
    const {createDoc, error} = useFrappeCreateDoc()

    function createSadhanaLogItem(){
        createDoc('Sadhana Log Item',{
           sadhana_type: "Reading",
           qty: 5,
           parent: "ibb2vu9sdn",
           parentfield: "log_items",
           parenttype: "Sadhana Log"	
        }
        )
        .then(res=>{
            console.log("Response,",res)
        })
        .catch(err=>{
            console.log("Error",err)
        })
    }
  return (
    <View>
      <Button onPress={createSadhanaLogItem} label="Create Sadhana Log Item"></Button>
    </View>
  )
}

export default CreateSadhanaLogItem