import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Homepage';
import Detail from './Detail';
import Favoris from "./Favoris";
import { StyleSheet } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTab() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: styles.tab,
            }}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Favoris" component={Favoris} />
        </Tab.Navigator>
    );
}

export default function MainNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="ALCOOL"  component={HomeTab} options={{ headerStyle: styles.header }} />
                <Stack.Screen name="Detail" component={Detail} options={{ headerStyle: styles.header }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#f4511e',
    },
    tab: {
        backgroundColor: '#ccc',
    },
});