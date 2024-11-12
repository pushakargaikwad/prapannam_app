# Local Android Build

Building the app locally is straightforward. Follow these steps:

## Steps to Build

1. Run the dev build:

   ```bash
   npm run dev
   ```

2. If the build fails with an SDK not found error:

   Create a file `android/local.properties` with the following content:

   ```
   sdk.dir = c:\path\to\sdk
   ```

Ensure all manual build steps for components like React Native DateTime Picker are completed.

Notes
Ensure that you have the Android SDK installed and properly configured.
