// app/auth.tsx

import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

const AuthScreen = () => {
  const router = useRouter();

  useEffect(() => {
    // After handling authentication, navigate to the desired screen
    router.replace('/'); // Replace '/' with the route you want to navigate to after auth
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default AuthScreen;
