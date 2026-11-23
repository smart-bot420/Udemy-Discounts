import { Stack, usePathname, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { setParam } from '../../param';

export default function RootLayout() {
  const [srch, setSrch] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const enter = () => {


    setParam(srch);

    if (pathname !== '/search') {
      router.push('/search');
    }
  };

  return (
    <SafeAreaView style={styles.out} edges={['top']}>
      <View style={styles.contain}>
        <TextInput
          style={styles.bar}
          placeholder="Search"
          placeholderTextColor="#898ea1"
          value={srch}
          onChangeText={setSrch}
          onSubmitEditing={enter}
          returnKeyType="search"
          autoCapitalize='none'
        />
      </View>

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="search" />
      </Stack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  out: {
    flex: 1,
    backgroundColor: '#1e1e2e', 
  },
  contain: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#1e1e2e',
  },
  bar: {
    backgroundColor: '#313244',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    color: '#898ea1',
  },
});