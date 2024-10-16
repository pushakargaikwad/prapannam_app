import { FrappeProvider } from "frappe-react-sdk";
import { API_TOKEN, BASE_URL, SITE_NAME} from "../constants/dev/dev";
import { createContext, useEffect, useState } from "react";

import * as AuthSession from "expo-auth-session";
import * as SecureStore from "expo-secure-store";

const REDIRECT_URL_SCHEME = "com.prapannam";
var BASE_URI = 'https://prapannam.com/';
var OAUTH_CLIENT_ID = process.env.EXPO_PUBLIC_OAUTH_CLIENT_ID;
const SECURE_AUTH_STATE_KEY = "AuthState";

export const AuthContext = createContext<any>({});
const FrappeAuthProvider = (props) => {

    const [localServer, setLocalServer] = useState(false);
    const [accessToken, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(()=>{
      if(localServer){
        BASE_URI = BASE_URL
      }
      else{

        // BASE_URI = 'https://prapannam.com/'
        // OAUTH_CLIENT_ID = process.env.OAUTH_CLIENT_ID
        BASE_URI = process.env.EXPO_PUBLIC_BASE_URL;
        OAUTH_CLIENT_ID = process.env.EXPO_PUBLIC_OAUTH_CLIENT_ID
      }
      
      },[localServer])

    const redirectUri = AuthSession.makeRedirectUri({
      scheme: REDIRECT_URL_SCHEME,
      path: "auth",
    });
  

    //  AuthSession configuration...
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: OAUTH_CLIENT_ID,
      redirectUri,
      responseType: "code",
      scopes: ["all"],
      usePKCE: false,
    },
    {
      authorizationEndpoint: `${BASE_URI}/api/method/frappe.integrations.oauth2.authorize`,
      tokenEndpoint: `${BASE_URI}/api/method/frappe.integrations.oauth2.get_token`,
    }
  );

    
  useEffect(() => {
    SecureStore.getItemAsync(SECURE_AUTH_STATE_KEY)
      .then((result) => {
        if (result) {
          const { accessToken, refreshToken } = JSON.parse(result);
          setToken(accessToken);
          // setRefreshToken(refreshToken);
          setIsAuthenticated(true);
        } else {
          if (response?.type === "success") {
            const { code } = response.params;
            AuthSession.exchangeCodeAsync(
              {
                redirectUri,
                code,
                extraParams: {
                  grant_type: "authorization_code",
                  client_id: OAUTH_CLIENT_ID,
                },
                clientId: OAUTH_CLIENT_ID,
              },
              {
                tokenEndpoint: `${BASE_URI}/api/method/frappe.integrations.oauth2.get_token`,
              }
            )
              .then(async (res) => {
                const authResponse = res;
                const storageValue = JSON.stringify(authResponse);
                await SecureStore.setItemAsync(
                  SECURE_AUTH_STATE_KEY,
                  storageValue
                );

                setToken(authResponse.accessToken);
                // frappe = new FrappeApp(BASE_URI, {
                //   useToken: true,
                //   type: "Bearer",
                //   token: () => accessToken,
                // });
                // setRefreshToken(authResponse.refreshToken);
                setIsAuthenticated(true);
              })
              .catch((err) => {
                console.error(err);
              });
          } else {
            console.log("Not authenticated");
            console.log('isAuthenticated state', isAuthenticated)
          }
        }
      })
      .catch((e) => console.error(e));
  }, [response]);

    // Rest of your authentication logic...
    const logout = async () => {
      await AuthSession.revokeAsync(
        {
          token: accessToken,
        },
        {
          revocationEndpoint: `${BASE_URI}/api/method/frappe.integrations.oauth2.revoke_token`,
        }
      );
      await SecureStore.deleteItemAsync(SECURE_AUTH_STATE_KEY);
      setIsAuthenticated(false);
      setToken(null);
      // setRefreshToken(null);
      // setUserInfo(null);
    };

  return (
    <FrappeProvider
      url={localServer?BASE_URL:BASE_URI}
   
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
      <AuthContext.Provider value={{ isAuthenticated, promptAsync, logout }}>

 
      
      {props.children}
  
      
     
      </AuthContext.Provider>
    </FrappeProvider>
  );
};


export default FrappeAuthProvider ;
