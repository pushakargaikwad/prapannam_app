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