import { FrappeProvider } from "frappe-react-sdk";
import { createContext, useEffect, useState } from "react";
import * as AuthSession from "expo-auth-session";
import * as SecureStore from "expo-secure-store";

type TokenStorage = {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    timestamp: number;
};

type AuthContextType = {
    isAuthenticated: boolean;
    promptAsync: () => Promise<any>;
    logout: () => Promise<void>;
};

type Props = {
    children: React.ReactNode;
};

const REDIRECT_URL_SCHEME = "com.prapannam";
var BASE_URI: string = 'https://prapannam.com/';
var OAUTH_CLIENT_ID: string = process.env.EXPO_PUBLIC_OAUTH_CLIENT_ID || '';
const SECURE_AUTH_STATE_KEY = "AuthState";

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    promptAsync: async () => {},
    logout: async () => {},
});

const FrappeAuthProvider = ({ children }: Props) => {
        const [localServer] = useState(false);
        const [accessToken, setToken] = useState<string | null>(null);
        const [refreshToken, setRefreshToken] = useState<string | null>(null);
        const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(()=>{
      if(localServer){
        // BASE_URI = BASE_URL
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
const [_, response, promptAsync] = AuthSession.useAuthRequest(
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
                const tokenData = JSON.parse(result) as TokenStorage;
                setToken(tokenData.accessToken);
                setRefreshToken(tokenData.refreshToken);
                setIsAuthenticated(true);
            } else if (response?.type === "success") {
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
                        const storageValue: TokenStorage = {
                            accessToken: res.accessToken,
                            refreshToken: res.refreshToken || '',
                            expiresIn: res.expiresIn || 86400,
                            timestamp: Date.now()
                        };
                        await SecureStore.setItemAsync(
                            SECURE_AUTH_STATE_KEY,
                            JSON.stringify(storageValue)
                        );

                        setToken(res.accessToken);
                        setRefreshToken(res.refreshToken || '');
                        setIsAuthenticated(true);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        })
        .catch((e) => console.error(e));
}, [response]);


    const checkAndRefreshToken = async (): Promise<string | null> => {
      try {
        const tokenData = await SecureStore.getItemAsync(SECURE_AUTH_STATE_KEY);
        if (!tokenData) return null;

        const { accessToken, refreshToken, expiresIn, timestamp } = JSON.parse(tokenData) as TokenStorage;
        const now = Date.now();
        const expiryTime = timestamp + (expiresIn * 1000);
        
        if (now >= expiryTime - 300000) {
          return await refreshAccessToken();
        }
        return accessToken;
      } catch (error) {
        console.error('Error checking token:', error);
        return null;
      }
    };

    const refreshAccessToken = async (): Promise<string | null> => {
      try {
        if (!refreshToken) return null;
        
        const response = await AuthSession.refreshAsync(
          {
            clientId: OAUTH_CLIENT_ID,
            refreshToken: refreshToken,
          },
          {
            tokenEndpoint: `${BASE_URI}/api/method/frappe.integrations.oauth2.get_token`,
          }
        );
        
        const storageValue: TokenStorage = {
          accessToken: response.accessToken,
          refreshToken: response.refreshToken || '',
          expiresIn: response.expiresIn || 86400,
          timestamp: Date.now()
        };
        
        await SecureStore.setItemAsync(SECURE_AUTH_STATE_KEY, JSON.stringify(storageValue));
        
        setToken(response.accessToken);
        if (response.refreshToken) {
          setRefreshToken(response.refreshToken);
        }
        return response.accessToken;
      } catch (error) {
        console.error('Error refreshing token:', error);
        await logout();
        return null;
      }
    };

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
      setRefreshToken(null);

    };

  return (
    <FrappeProvider
      // url={localServer?BASE_URL:BASE_URI}
      url={BASE_URI}
   
      tokenParams={{
        useToken: true,
        token: async () => {
          if (localServer) {
            return accessToken || '';
          }
          const token = await checkAndRefreshToken();
          return token || '';
        },
        type: localServer ? "token" : "Bearer",
      }}
    >
      <AuthContext.Provider value={{ isAuthenticated, promptAsync, logout }}>

 
      
      {children}
  
      
     
      </AuthContext.Provider>
    </FrappeProvider>
  );
};


export default FrappeAuthProvider ;
