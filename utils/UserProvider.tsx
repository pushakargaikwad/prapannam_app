import { useFrappeGetCall } from "frappe-react-sdk";
import { createContext, PropsWithChildren, useMemo, useState } from "react";
import { Text, Button } from "react-native-ui-lib";

export const UserContext = createContext<any>({});

export const UserProvider = ({ children }: PropsWithChildren) => {
    
    const { data, error, isValidating, mutate } = useFrappeGetCall("prapannam_core.prapannam_core.api.mobile.get_current_user");


    if (isValidating) {
        // return <Text>Loading</Text>
    }
    if(error){
        // return <Text>{JSON.stringify(error)}</Text>
    }

    const {userInfo} = useMemo(() => {
        if(!data){
            return {
                userInfo: ''
            }
        }
        return {
            userInfo: data?.message?.user
        }
    }, [data]);

    return <UserContext.Provider value={{userInfo}}>
        {children}
</UserContext.Provider>;
}
