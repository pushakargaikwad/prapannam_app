// InlineAd.tsx

import { View } from 'react-native';
import * as Device from 'expo-device';
import React, { useState } from 'react';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const iosAdmobBanner = process.env.EXPO_PUBLIC_iOSAdmobBanner;
const androidAdmobBanner = process.env.EXPO_PUBLIC_androidAdmobBanner;
const productionID = Device.osName === 'Android' ? androidAdmobBanner : iosAdmobBanner;

const InlineAd = () => {
  const [isAdLoaded, setIsAdLoaded] = useState<boolean>(false);
  return (
    <View style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#fff',
      height: isAdLoaded ? 'auto' : 0
    }}>
      <BannerAd
        unitId={__DEV__ ? TestIds.BANNER : productionID}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => {
          setIsAdLoaded(true);
        }}
      />
    </View>
  );
};

export default InlineAd;
