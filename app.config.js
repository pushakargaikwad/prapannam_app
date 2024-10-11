module.exports = ({ config }) => {
  console.log(config.name); // prints 'My App'
  return {
    ...config,
    "expo": {
      ...config.expo,
      "android": {
        ...(config.android || {}),
        "package": "com.prapannam"
      },
      "web": {
        ...(config.web || {}),
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      ...(config.plugins || []),
      [
        "react-native-google-mobile-ads",
        {
          "androidAppId": process.env.EXPO_PUBLIC_ADMOb_APPID,
          
          "facebookMediation": false
        }
      ]
    ]
  }
  };
};


