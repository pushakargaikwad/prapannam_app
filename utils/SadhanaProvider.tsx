import { useFrappeGetCall } from "frappe-react-sdk";
import { createContext, PropsWithChildren, useMemo } from "react";
import { Text, Button } from "react-native-ui-lib";

export const SadhanaContext = createContext({});

export const SadhanaProvider = ({ children }: PropsWithChildren) => {
    
    const { data, error, isValidating, mutate } = useFrappeGetCall(
        "prapannam_sadhana.prapannam_sadhana.api.sadhana.get_sadhana_groups"
      );

      const { userGroups, defaultGroup} = useMemo(() => {
        return {
            userGroups: data?.message?.sadhana_groups_list,
            defaultGroup: null
        }
    }, [data]);
    
      if (isValidating) {
        // return <Text text30>Loading</Text>;
      }
      if (error) {
        // return <Text>{JSON.stringify(error)}</Text>;
      }
      

    return <SadhanaContext.Provider value={{userGroups, defaultGroup}}>{children}</SadhanaContext.Provider>;
    
};