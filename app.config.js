module.exports = ({ config }) => {
  console.log(config.name); // prints 'My App'
  return {
    ...config,
    "expo": {
      ...config.expo,
      slug: "prapannam",
      "android": {
        ...(config.android || {}),
        "package": "com.prapannam"
      },
      "web": {
        ...(config.web || {}),
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png",
      "scheme": "com.prapannam",
    },
    "scheme": "com.prapannam",
    "plugins": [
      ...(config.plugins || []),
      [
        "react-native-google-mobile-ads",
        {
          "androidAppId": process.env.EXPO_PUBLIC_ADMOb_APPID,
          
          "facebookMediation": false
        },
      ],
      [
        "expo-secure-store"
      ]
    ]
  }
  };
};


