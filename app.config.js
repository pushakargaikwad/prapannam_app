const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    console.log("Running in DEV mode");
    return "com.prapannam.dev";
  }

  if (IS_PREVIEW) {
    console.log("Running in PREVIEW mode");
    return "com.prapannam.preview";
  }

  return "com.prapannam";
};

const getAppName = () => {
  if (IS_DEV) {
    return "Prapannam (Dev)";
  }

  if (IS_PREVIEW) {
    return "Prapannam (Preview)";
  }

  return "Prapannam";
};

module.exports = ({ config }) => {
  console.log(config.name); // prints 'My App'
  return {
    ...config,
    expo: {
      ...config.expo,
      name: getAppName(),
      slug: "prapannam",
      android: {
        ...(config.android || {}),
        package: getUniqueIdentifier(),
      },
      web: {
        ...(config.web || {}),
        bundler: "metro",
        output: "static",
        favicon: "./assets/images/favicon.png",
        scheme: "com.prapannam",
      },
      scheme: "com.prapannam",
      plugins: [
        ...(config.plugins || []),
        [
          "react-native-google-mobile-ads",
          {
            androidAppId: process.env.EXPO_PUBLIC_ADMOb_APPID,

            facebookMediation: false,
          },
        ],
        ["expo-secure-store"],
        ["expo-build-properties"],
        ["expo-font"],
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
      ],
      extra: {
        eas: {
          projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
        },
      },
      owner: process.env.EXPO_PUBLIC_OWNER,
    },
  };
};
