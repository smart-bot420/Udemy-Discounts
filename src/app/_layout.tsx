import { Stack } from "expo-router";

export default function Layout(){
  return(
    <Stack screenOptions={{
      headerShown:false, 
      contentStyle: {flex:1, color:'#1e1e2e'}
    }
      }>
    </Stack>
  )
}