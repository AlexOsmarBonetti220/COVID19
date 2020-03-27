import React from "react";

import {createStackNavigator} from "@react-navigation/stack";

//Criando a navegação
const Stack = createStackNavigator();

//Importando as rotas
import Home from "../src/screens/home";
import DadosPaises from "../src/screens/dadosPaises";

export default function myStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
            <Stack.Screen name="DadosPaises" component={DadosPaises} />
        </Stack.Navigator>
    )
}