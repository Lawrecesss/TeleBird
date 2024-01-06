import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import {useDimensions, useDeviceOrientation} from "@react-native-community/hooks"

export default function App() {
  const o = useDeviceOrientation()
  return (
    <SafeAreaView style={styles.container}>
      <View style={{
        backgroundColor: "blue",
        width:"100%",
        height: o==='landscape'? "100%": "30%",
      }}>
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: "top",
    
  },
});
