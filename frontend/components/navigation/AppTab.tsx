import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import VeiculoScreen from '../../app/(tabs)/VeiculoScreen';
import AcessorioScreen from '../../app/(tabs)/AcessorioScreen';

const Tab = createBottomTabNavigator();

const AppTab: React.FC = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
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
                <Tab.Screen 
                    name="Veiculo"
                    component={VeiculoScreen}
                    options={{
                        tabBarLabel: "Veículo"
                    }} 
                />
                <Tab.Screen 
                    name="Acessorio" 
                    component={AcessorioScreen}
                    options={{
                        tabBarLabel: "Acessório"
                    }} 
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppTab;
