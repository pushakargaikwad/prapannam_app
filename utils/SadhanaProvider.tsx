import { AuthContext } from "@/app/FrappeAuthProvider";
import { SadhanaType } from "@/constants/types/SadhanaType";
import { SadhanaGroup } from "@/constants/types/SadhanaGroup";
import { useFrappeGetCall, useFrappeGetDocList } from "frappe-react-sdk";
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { AppState, AppStateStatus } from "react-native";
import { Text, Button } from "react-native-ui-lib";

interface SadhanaGroupsResponse {
  message: {
    message: string;
    sadhana_groups_list: string[];
    status: string;
  }
}

interface SadhanaContextValue {
  userGroups: string[];
  defaultGroup: string | null;
  sadhanaDate: Date;
  sadhanaTypes: SadhanaType[];
  setSadhanaDate: (date: Date) => void;
}

export const SadhanaContext = createContext<SadhanaContextValue>({} as SadhanaContextValue);

export const SadhanaProvider = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [sadhanaDate, setSadhanaDate] = useState(new Date());
  const [sadhanaLog, setSadhanaLog] = useState({});

  const { data, error, isValidating, mutate } = useFrappeGetCall<SadhanaGroupsResponse>(
    "prapannam_sadhana.prapannam_sadhana.api.sadhana.get_sadhana_groups"
  );

  const { data: sadhana_type_data } = useFrappeGetDocList<SadhanaType>("Sadhana Type", {
    fields: ["*"],
    orderBy: {
      field: "creation",
      order: 'desc'
    }
  });

  useEffect(() => {
    if (isAuthenticated) {
      console.log('Authenticated, fetching data...');
      mutate();
    }
  }, [isAuthenticated, mutate]);

  const sadhanaTypes = useMemo<SadhanaType[]>(() => {
    return sadhana_type_data ?? [];
  }, [sadhana_type_data]);

  const { userGroups, defaultGroup } = useMemo(() => {
    if (!isAuthenticated || !data?.message?.sadhana_groups_list) {
      console.log('No data available:', { isAuthenticated, hasData: !!data });
      return { userGroups: [], defaultGroup: null };
    }
    const groups = data.message.sadhana_groups_list;
    console.log('Processing groups:', groups);
    const uniqueGroups = Array.from(new Set(groups));
    console.log('Unique groups:', uniqueGroups);
    return {
      userGroups: uniqueGroups,
      defaultGroup: null
    }
  }, [data, isAuthenticated]);

  // Refetch data when the app comes into the foreground
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === "active" && isAuthenticated) {
        mutate();
      }
    };

    const subscription = AppState.addEventListener("change", handleAppStateChange);
    return () => subscription.remove();
  }, [isAuthenticated, mutate]);

  return (
    <SadhanaContext.Provider value={{ userGroups, defaultGroup, sadhanaDate, sadhanaTypes, setSadhanaDate }}>
      {children}
    </SadhanaContext.Provider>
  );
};

