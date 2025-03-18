const validateEnvVariables = () => {
  const requiredVars = [
    'EXPO_PUBLIC_ADMOb_APPID',
    'EXPO_PUBLIC_OAUTH_CLIENT_ID',
    'EXPO_PUBLIC_BASE_URL'
  ];

  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      throw new Error(`Missing required environment variable: ${varName}`);
    }
  }
};

const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const getUniqueIdentifier = () => {
  if (IS_DEV) return "com.prapannam.dev";
  if (IS_PREVIEW) return "com.prapannam.preview";
  return "com.prapannam";
};

const getAppName = () => {
  if (IS_DEV) return "Prapannam (Dev)";
  if (IS_PREVIEW) return "Prapannam (Preview)";
  return "Prapannam";
};

// Organize plugins by functionality
const getPlugins = (config) => [
  // Ads
  [
    "react-native-google-mobile-ads",
    {
      androidAppId: process.env.EXPO_PUBLIC_ADMOb_APPID,
      iosAppId: process.env.EXPO_PUBLIC_ADMOb_APPID, // Added iOS App ID
      facebookMediation: false,
    },
  ],
  // Core functionality
  ["expo-secure-store"],
  ["expo-build-properties"],
  ["expo-font"],
  // UI/UX
  [
    "expo-splash-screen",
    {
      backgroundColor: "#232323",
      image: "./assets/images/splash.png",
      dark: {
        image: "./assets/images/splash.png",
        backgroundColor: "#000000",
      },
      imageWidth: 200,
    },
  ],
  ...(config.plugins || []),
];

module.exports = ({ config }) => {
  try {
    validateEnvVariables();
    
    const configData = {
      name: getAppName(),
      slug: "prapannam",
      newArchEnabled: true,
      version: "1.0.0",
      runtimeVersion: {
        policy: "sdkVersion"
      },
      updates: {
        url: "https://u.expo.dev/" + (process.env.EXPO_PUBLIC_PROJECT_ID || ''),
        enabled: true,
        checkAutomatically: "ON_LOAD",
        fallbackToCacheTimeout: 0
      },
      android: {
        package: getUniqueIdentifier(),
        adaptiveIcon: {
          foregroundImage: "./assets/images/adaptive-icon.png",
          backgroundColor: "#232323"
        }
      },
      web: {
        bundler: "metro",
        output: "static",
        favicon: "./assets/images/favicon.png",
      },
      scheme: "com.prapannam",
      plugins: getPlugins(config),
      extra: {
        eas: {
          projectId: process.env.EXPO_PUBLIC_PROJECT_ID || '',
        },
      },
      owner: process.env.EXPO_PUBLIC_OWNER || '',
    };

    return {
      ...config,
      ...configData,
    };
  } catch (error) {
    console.error('Configuration Error:', error.message);
    process.exit(1);
  }
};

