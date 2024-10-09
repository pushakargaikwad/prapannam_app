import { FrappeProvider } from "frappe-react-sdk";
import { API_TOKEN, BASE_URL, SITE_NAME} from "../constants/dev/dev";
import { useState } from "react";
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
      {props.children}
    </FrappeProvider>
  );
};

export default FrappeAuthProvider ;
