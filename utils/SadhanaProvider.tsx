import { AuthContext } from "@/app/FrappeAuthProvider";
import { SadhanaType } from "@/constants/types/SadhanaType";
import { useFrappeGetCall, useFrappeGetDocList } from "frappe-react-sdk";
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { AppState, AppStateStatus } from "react-native";
import { Text, Button } from "react-native-ui-lib";

export const SadhanaContext = createContext({});

export const SadhanaProvider = ({ children }: PropsWithChildren) => {
  const {isAuthenticated} =useContext(AuthContext);
    const [sadhanaDate, setSadhanaDate] = useState(new Date());
    const [sadhanaLog, setSadhanaLog] = useState({});
    const { data, error, isValidating, mutate } = useFrappeGetCall(
        "prapannam_sadhana.prapannam_sadhana.api.sadhana.get_sadhana_groups"
      );

      const { data: sadhana_type_data , error : sadhana_type_error, isValidating: sadhana_type_validating, mutate: sadhana_type_mutate } = useFrappeGetDocList<SadhanaType>("Sadhana Type" , {
        fields: ["*"],
       
        /** Sort results by field and order  */
        orderBy: {
            field: "creation",
            order: 'desc'
        }
    });
    
    const sadhanaTypes  = useMemo<SadhanaType[]>(()  => {
       return  sadhana_type_data ?? [];
       }, [sadhana_type_data]);

      const { userGroups, defaultGroup} = useMemo(() => {
        return {
            userGroups: data?.message?.sadhana_groups_list,
            defaultGroup: null
        }
    }, [data]);

    // refetch the  data if authentication state changes
    useEffect(() => {
      if (isAuthenticated) {
          mutate();
          sadhana_type_mutate();
      }} , [ isAuthenticated ]);


      // Refetch data when the app comes into the foreground or restarts
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === "active" && isAuthenticated) {
        // Refetch the data when the app is brought to the foreground
        mutate();
        sadhana_type_mutate();
      }
    };

    // Add event listener for app state changes
    const subscription = AppState.addEventListener("change", handleAppStateChange);

    // Cleanup the event listener on unmount
    return () => {
      subscription.remove();
    };
  }, [isAuthenticated, mutate, sadhana_type_mutate]);
    
      if (isValidating) {
        // return <Text text30>Loading</Text>;
      }
      if (error) {
        // return <Text>{JSON.stringify(error)}</Text>;
      }
      

    return <SadhanaContext.Provider value={{userGroups, defaultGroup, sadhanaDate, sadhanaTypes, setSadhanaDate}}>{children}</SadhanaContext.Provider>;
    
};