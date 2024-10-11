# Prapannam App

This App is WIP

# Development

The app is bootstrapped using command `npx create-expo-app prapannam --template tabs`


## Initial Setup

Clone the repo and cd into the directory

```bash	
npm install
```

## Run

```bash
npx expo
```



## Building

Certain Components require manual build steps like [date-time picker](https://github.com/react-native-datetimepicker/datetimepicker/blob/HEAD/docs/manual-installation.md). 

### Local Dev Build

Android
```bash
npx expo run android
```

If build fails for sdk not found, create a file `android\local.properties` and add the following

`sdk.dir = c:\path\to\sdk`

### Ads

Developing Prapannam requires significant time and effort, and we are committed to providing a high-quality app that respects user freedoms under the AGPLv3 license. To ensure the app's sustainability and profitability, we generate revenue through advertisements and are actively exploring additional monetization strategies such as in-app purchases, subscriptions, and one-time purchases. Our goal is to offer an exceptional user experience while building a successful and profitable platform.


#### Ads Build additional steps

Makes use of [React Native Google Mobile Ads plugin](https://docs.page/invertase/react-native-google-mobile-ads) to show ads using Google AdMob in the app. You can follow the steps from [this tutorial](https://dev.to/josie/adding-google-admob-to-expo-apps-2din) to install plugin, configure Google AdMob and build the app.
- `npx expo config` to check if config is correct
- `npx expo prebuild` to copy the config to the android folder
    - `npx expo prebuild --clear` to recreate the android folder fresh
- `npx expo run android` to build the app

### Local Release Build

```bash	
npx expo run android --variant release
```

## License

AGPL-3.0 or later

## Credits

- [Doppio Mobile](https://github.com/NagariaHussain/doppio_mobile) for the tutorial and GitHub repository that helped with the Authentication component.

## Copyright

2024, Pushakar Gaikwad and contributors
Prapannam App is a part of [Prapannam](https://www.prapannam.com) project.