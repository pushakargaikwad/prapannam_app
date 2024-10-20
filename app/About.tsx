import { ExternalLink } from "@/components/ExternalLink"
import { UserDetails } from "@/components/UserDetails"
import { UserContext } from "@/utils/UserProvider"
import { Stack } from "expo-router"
import { useContext } from "react"
import { Button, Card, Colors, View,Text } from "react-native-ui-lib"
import { StyleSheet } from "react-native"

export default function AboutScreen(){
    
    return(
    <>
        <View flex padding-20>
            <Stack.Screen 
            options={{
                title:"About Prapannam",
            }}/>
            <Text h2>Prapannam</Text>
            <Text >Prappanam is a Libre Software</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <ExternalLink href="https://github.com/pushakargaikwad/prapannam_app" >Github</ExternalLink>

           
            
           
            
        </View>
    </>)
}

const styles = StyleSheet.create({
    
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });
  