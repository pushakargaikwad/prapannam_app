import { AuthContext } from "@/app/FrappeAuthProvider";
import { useFrappeGetCall } from "frappe-react-sdk";
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { Text, Button } from "react-native-ui-lib";

export const SadhanaContext = createContext({});

export const SadhanaProvider = ({ children }: PropsWithChildren) => {
  const {isAuthenticated} =useContext(AuthContext);
    const [sadhanaDate, setSadhanaDate] = useState(new Date());
    const [sadhanaLog, setSadhanaLog] = useState({});
    const { data, error, isValidating, mutate } = useFrappeGetCall(
        "prapannam_sadhana.prapannam_sadhana.api.sadhana.get_sadhana_groups"
      );

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
      }} , [ isAuthenticated ]);
    
      if (isValidating) {
        // return <Text text30>Loading</Text>;
      }
      if (error) {
        // return <Text>{JSON.stringify(error)}</Text>;
      }
      

    return <SadhanaContext.Provider value={{userGroups, defaultGroup, sadhanaDate, setSadhanaDate}}>{children}</SadhanaContext.Provider>;
    
};