import { FrappeProvider } from "frappe-react-sdk";
import { API_TOKEN, BASE_URL, SITE_NAME} from "../constants/dev/dev";
import { createContext, useState } from "react";
import { UserProvider } from "@/utils/UserProvider";
const FrappeAuthProvider = (props) => {

    const [localServer, setLocalServer] = useState(true);
    const [accessToken, setToken] = useState(null);

    
  return (
    <FrappeProvider
      url={BASE_URL}
      siteName={SITE_NAME}
      tokenParams={{
        useToken: true,
        token: () => {
          if (localServer) {
            return API_TOKEN;
          }
          return accessToken;
        },
        type: localServer ? "token" : "Bearer",
      }}
    >
      <UserProvider>

      {props.children}
      </UserProvider>
    </FrappeProvider>
  );
};


export default FrappeAuthProvider ;
