import { createStackNavigator } from "@react-navigation/stack"
import { MoveContentNavigator } from "./moveContent.navigator"
import { ShareScreen } from "../../features/share/Share.screen"
import { MainNavigator } from "./main.navigator"
const Stack = createStackNavigator()

export const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, freezeOnBlur: true }}>
      <Stack.Screen name="Main" component={MainNavigator} />
      <Stack.Screen name="Move" component={MoveContentNavigator} />
      <Stack.Screen name="Share" component={ShareScreen} />
    </Stack.Navigator>
  )
}
