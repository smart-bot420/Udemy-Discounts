import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{headerShown:false}} >
      <Tabs.Screen
        name='index'
        options={{
          title:'Home',
          tabBarActiveBackgroundColor:'#1e1e2e',
          tabBarInactiveBackgroundColor:'#cdd6f4'
        }}/>

      <Tabs.Screen
        name='search'
        options={{
          title: 'Search',
          tabBarActiveBackgroundColor:'#1e1e2e',
          tabBarInactiveBackgroundColor:'#cdd6f4',
        }}/>
    </Tabs>
  )
}