import { ExternalLink } from "@/components/ExternalLink"
import { UserDetails } from "@/components/UserDetails"
import { UserContext } from "@/utils/UserProvider"
import { Stack } from "expo-router"
import { useContext } from "react"
import { Button, Card, Colors, View } from "react-native-ui-lib"
import { StyleSheet,Text } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

export default function AboutScreen(){
    
    return(
        <>
            <LinearGradient 
            className="flex-1"
                colors={[Colors.primary, Colors.secondary]}
            >
        <View flex padding-20>
            <Stack.Screen 
            options={{
                title:"About Prapannam",
            }}/>


            <Text className="text-center text-5xl text-white">Prapannam</Text>
            <Text className="text-center text-white">Prappanam is a Libre Software!</Text>
            
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <ExternalLink href="https://github.com/pushakargaikwad/prapannam_app" >Github</ExternalLink>
    

           
            
           
            
        </View>
            </LinearGradient>
    </>)
}

const styles = StyleSheet.create({
    
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });
  