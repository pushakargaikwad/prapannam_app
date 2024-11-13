import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import * as Haptics from 'expo-haptics';
import { Button } from 'react-native-ui-lib';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button
          label="Success"
          onPress={
            () =>
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              )
          }
        />
        <Button
          label="Error"
          onPress={
            () =>
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
              )
          }
        />
        <Button
          label="Warning"
          onPress={
            () =>
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Warning
              )
          }
        />
        <Button
          label="Light"
          onPress={
            () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
          }
        />
        <Button
          label="Medium"
          onPress={
            () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
          }
        />
        <Button
          label="Heavy"
          onPress={
            () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
          }
        />
        <Button
          label="Rigid"
          onPress={
            () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)
          }
        />
        <Button
          label="Soft"
          onPress={
            () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
          }
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
