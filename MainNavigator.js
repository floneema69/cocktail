import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Homepage';
import Detail from './Detail';
import Favoris from "./Favoris";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTab() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Favoris" component={Favoris} />
        </Tab.Navigator>
    );
}

export default function MainNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Liste"  component={HomeTab} />
                <Stack.Screen name="Detail" component={Detail}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}