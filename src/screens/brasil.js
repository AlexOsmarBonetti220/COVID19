import React, {Component} from "react";

import {View, Text, StyleSheet, } from "react-native";

export default class Brasil extends Component {
    constructor(props){
        super(props);
        this.state = {
            mortos:0,
            curados:0,
            infectados:0,
            load:false
        }

        //Puxando dados da api
        fetch("https://covid19.mathdro.id/api/countries/Brazil")
        .then((r)=>r.json())
        .then((json)=>{
            let s = this.state;
            s.infectados = json.confirmed.value;
            s.mortos = json.deaths.value;
            s.curados = json.recovered.value;
            s.load = true;
            this.setState(s);
        })
    }
    render(){
        if(this.state.load){
            return(
                <View>
                    <View>
                        <Text>Brasil(imagem)</Text>
                    </View>
                    <View>
                        <Text>Infectados: {this.state.infectados}</Text>
                        <Text>Mortos: {this.state.mortos}</Text>
                        <Text>Curados: {this.state.curados}</Text>
                    </View>
                </View>
            )
        }else{
            return(
                <View>
                    <Text>Loading...</Text>
                </View>
            )
        }
    }
}