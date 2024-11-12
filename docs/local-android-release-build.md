# Local Android Release Build

This will generate an apk file that you can share internally with your team, or distribute directly. (It can also be signed and ready to upload to the Google Play Store. )

## Steps to build:

```
npm run preview
```

Note: this is a shortcut for running the following commands:
If you look at the `package.json` file in the root of the project, it will execute the following script:
`"preview": "cross-env NODE_ENV=preview APP_VARIANT=preview expo run android --variant release"`

The Apk will be generated under the `android/app/build/outputs/apk` folder.
