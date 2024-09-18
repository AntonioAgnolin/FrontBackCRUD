import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AddScreen from '../../screens/VeiculoScreen';
import RemoveScreen from '../../screens/AdesivoScreen';
 
const { Navigator, Screen } = createBottomTabNavigator();
 
function AppTab() {
    return (
        <NavigationContainer>
            <Navigator
                screenOptions={{
                    tabBarActiveTintColor: "#32264d",
                    tabBarInactiveTintColor: "#c1bccc",
                    tabBarActiveBackgroundColor: "#ebebf5",
                    tabBarInactiveBackgroundColor: "#fafafc",
                    tabBarLabelStyle: {
                        fontSize: 13,
                        position: 'absolute',
                        top: 15,
                        bottom: 0,
                        left: 0,
                        right: 0
                    },
                    tabBarIconStyle: { display: "none" }
                }}
            >
                <Screen name="AddScreen" component={AddScreen}
                    options={{
                        tabBarLabel: "Adicionar"
                    }}
                />
                <Screen name="RemoveScreen" component={RemoveScreen}
                    options={{
                        tabBarLabel: "Remover"
                    }}
                />
            </Navigator>
        </NavigationContainer>
    );
}
 
export default AppTab;