import React, {Component} from "react";

import {Text, TextInput, StyleSheet, TouchableOpacity, View, ImageBackground, Modal, Alert} from 'react-native';

export default class DadosPaises extends Component {
    constructor(props){
        super(props);
        this.state = {
            pais:this.props.route.params.pais,
            load:false,
            infectados:0,
            mortos:0,
            curados:0,
            paisExiste:false,
            listaPaisesValidos:[
                {id:0, nome:"Brazil"},
                {id:1, nome:"Italy"},
                {id:2, nome:"Spain"},
                {id:3, nome:"China"},
                {id:4, nome:"Iran"},
                {id:5, nome:"France"},
                {id:6, nome:"USA"},
                {id:7, nome:"Netherlands"},
                {id:8, nome:"Germany"},
                {id:9, nome:"Belgium"},
            ]
        }

        //Pegando os dados da api
        this.requisicao();
    }

    requisicao(){
        //Verifico se o nome do pais que recebi está na lista dos paises monitorados pelo App
        let s = this.state;
        let tam = s.listaPaisesValidos.length;
        for(let i = 0; i < tam; i++){
            if(s.listaPaisesValidos[i].nome == s.pais){
                s.paisExiste = true;
                this.setState(s);
                break;
            }
        }
        
        //Fazendo a requisição
        if(s.paisExiste){
            fetch("https://covid19.mathdro.id/api/countries/"+this.state.pais)
            .then((r)=>r.json())
            .then((json)=>{
                let s = this.state;
                s.infectados = json.confirmed.value;
                s.curados = json.recovered.value;
                s.mortos = json.deaths.value;
                s.load = true;
                this.setState(s);
            })
            .catch((error)=>{
                Alert.alert(error.code);
            })
        }else{
            Alert.alert("Erro ao pegar os dados!");
            this.props.navigation.navigate("Home");
        }
    }


    render(){
        if(this.state.load){
            return(
                <ImageBackground source={require("../img/covid.jpg")} style={e.body}>
                    <View>
                        <Text style={e.titulo}>COVID-19</Text>
                        <Text style={e.pais}>{this.state.pais}</Text>
                    </View>
                    <View>
                        <Text style={e.demaisTextos}>Infectados: {this.state.infectados}</Text>
                        <Text style={e.demaisTextos}>Mortos: {this.state.mortos}</Text>
                        <Text style={e.demaisTextos}>Curados: {this.state.curados}</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={()=>{
                            this.props.navigation.goBack();
                        }}>
                            <View style={e.button}>
                                <Text>Voltar</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            )
        }else{
            return(
                <ImageBackground source={require("../img/covid.jpg")} style={e.body}>
                    <Text>Loading...</Text>
                </ImageBackground>
            )
        }
    }
}

const e = StyleSheet.create({
    body:{
        flex:1,
        alignItems:"center",
        padding:10,
        width:null
    },
    pais:{
        fontSize:25,
        fontWeight:"bold",
        color:"#FFFFFF",
        textAlign:"center",
        paddingBottom:20
    },
    titulo:{
        fontSize:25,
        color:"#FFFFFF",
        textAlign:"center",
        fontWeight:"bold",
        paddingBottom:20
      },
    demaisTextos:{
        fontSize:16,
        fontWeight:"600",
        color:"#FFFFFF",
        textAlign:"center",
        paddingBottom:10
    },
    button:{
        width:100,
        height:40,
        backgroundColor:"#FFFFFF",
        borderWidth:1,
        borderColor:"#000000",
        alignItems:"center",
        justifyContent:"center",
        marginTop:20,
        marginBottom:20
    }
})