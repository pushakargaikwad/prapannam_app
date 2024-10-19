import { AuthContext } from "@/app/FrappeAuthProvider";
import { SadhanaType } from "@/constants/types/SadhanaType";
import { useFrappeGetCall, useFrappeGetDocList } from "frappe-react-sdk";
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
    
      if (isValidating) {
        // return <Text text30>Loading</Text>;
      }
      if (error) {
        // return <Text>{JSON.stringify(error)}</Text>;
      }
      

    return <SadhanaContext.Provider value={{userGroups, defaultGroup, sadhanaDate, sadhanaTypes, setSadhanaDate}}>{children}</SadhanaContext.Provider>;
    
};