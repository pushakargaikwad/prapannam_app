import { UserDetails } from "@/components/UserDetails"
import { UserContext } from "@/utils/UserProvider"
import { Stack } from "expo-router"
import { useContext } from "react"
import { Button, Card, Colors, View } from "react-native-ui-lib"

export default function SettingsScreen(){
    const {logout} = useContext(UserContext)
    return(
    <>
        <View flex padding-20>
            <Stack.Screen 
            options={{
                title:"Settings",
            }}/>

            <UserDetails/>
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
                
            </Card>
            <Button
              label={'Logout'}
              backgroundColor={Colors.$backgroundDangerHeavy}
              style={{marginBottom: 20}}
              onPress={() => {logout()}} 
            />
        </View>
    </>)
}