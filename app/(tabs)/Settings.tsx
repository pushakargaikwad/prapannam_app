import { UserDetails } from "@/components/UserDetails"
import { UserContext } from "@/utils/UserProvider"
import { router, Stack } from "expo-router"
import { useContext } from "react"
import { Button, Card, Colors, View,Text } from "react-native-ui-lib"
import { AuthContext } from "../FrappeAuthProvider"

export default function SettingsScreen(){
    const {isAuthenticated, promptAsync,logout} = useContext(AuthContext)
    return(
    <>
        <View flex padding-20>
            <Stack.Screen 
            options={{
                title:"Settings",
            }}/>

            <UserDetails/>
            <Button outline label="About" onPress={() => {router.push("/About")}}/>
            <Card 
                row
                height={160}
                style={{marginBottom: 15}}
                onPress={() => {}}
                borderRadius={20}
                bg-$backgroundElevated
                activeOpacity={1}
                activeScale={1.04}
            >
                <Text >{process.env.EXPO_PUBLIC_OAUTH_CLIENT_ID}</Text>
            </Card>
            {!isAuthenticated && <Button onPress={()=>{promptAsync()}} label="login"></Button>}
            {isAuthenticated && <Button
              label={'Logout'}
              backgroundColor={Colors.$backgroundDangerHeavy}
              style={{marginBottom: 20}}
              onPress={() => {logout()}} 
            />}
            
        </View>
    </>)
}