import { AuthContext } from "@/app/FrappeAuthProvider";
import { useFrappeGetCall } from "frappe-react-sdk";
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { Text, Button } from "react-native-ui-lib";

export const UserContext = createContext<any>({});

export const UserProvider = ({ children }: PropsWithChildren) => {
    const {isAuthenticated} =useContext(AuthContext);
    const { data, error, isValidating, mutate } = useFrappeGetCall("prapannam_core.prapannam_core.api.mobile.get_current_user");


    // refetch the user data if authentication state changes
    useEffect(() => {
        if (isAuthenticated) {
            mutate();
        }} , [ isAuthenticated ]);

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
