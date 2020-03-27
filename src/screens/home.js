import React, {Component} from "react";

import {
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
  View, 
  ImageBackground, 
  Modal, 
  Alert, 
  Image, 
  FlatList,
  Button
} from 'react-native';

export default class Covid19 extends Component {
  constructor(props){
    super(props);
    this.state = {
      contaminadosMundo:0,
      mortosMundo:0,
      curadosMundo:0,
      load:false,
      search:"",
      modalVisible:false,
      listaPaises:[
        {key:0, portugues:"Itália", ingles:"Italy"},
        {key:1, portugues:"Espanha", ingles:"Spain"},
        {key:2, portugues:"China", ingles:"China"},
        {key:3, portugues:"Iran", ingles:"Iran"},
        {key:4, portugues:"França", ingles:"France"},
        {key:5, portugues:"Estados Unidos", ingles:"USA"},
        {key:6, portugues:"Holanda", ingles:"Netherlands"},
        {key:7, portugues:"Alemanha", ingles:"Germany"},
        {key:8, portugues:"Bélgica", ingles:"Belgium"},
        {key:9, portugues:"Brasil", ingles:"Brazil"},
      ]
    }

    //Pegando os dados da api
    fetch("https://covid19.mathdro.id/api")
    .then((r)=>r.json())
    .then((json)=>{
      let s = this.state;
      s.contaminadosMundo = json.confirmed.value;
      s.curadosMundo = json.recovered.value;
      s.mortosMundo = json.deaths.value;
      s.load = true;
      this.setState(s);
    })

    this.mostrarPaises = this.mostrarPaises.bind(this);
    this.ocultarPaises = this.ocultarPaises.bind(this);
    this.buscarPais = this.buscarPais.bind(this);
  }

  mostrarPaises(){
    let s = this.state;
    s.modalVisible = true;
    this.setState(s);
  }

  ocultarPaises(){
    let s = this.state;
    s.modalVisible = false;
    this.setState(s);
  }

  buscarPais(){
    let s = this.state.search;
    if(s != ""){
      //Enviando para a tela que faz a requisição para os paises
      this.props.navigation.navigate("DadosPaises", {pais:s});
      s = "";
      this.setState({search:s});
    }else
        Alert.alert("Erro ao buscar!");
  }

  render(){
    if(this.state.load){
      return(
        <ImageBackground source={require("../img/covid.jpg")} style={e.body}>
          <View>
            <Text style={e.titulo}>COVID-19</Text>
            <Text style={e.demaisTextos}>Saiba tudo sobre o a pandemia no mundo</Text>
          </View>
          <View>
            <Text style={e.demaisTextos}>Total de infectados: {this.state.contaminadosMundo}</Text>
            <Text style={e.demaisTextos}>Total de mortos: {this.state.mortosMundo}</Text>
            <Text style={e.demaisTextos}>Total de curados: {this.state.curadosMundo}</Text>
          </View>
          <View>
            <Text style={e.busca}>Digite o nome de um país para buscar suas informações</Text>
            <TextInput value={this.state.search} style={e.input} placeholder="Digite o nome do pais" onChangeText={(t)=>this.setState({search:t})} />
          </View>
          <View>
            <TouchableOpacity onPress={this.buscarPais}>
              <View style={e.button}>
                <Text>Buscar</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{alignItems:"center"}}> 
            <Text style={e.demaisTextos}>Não sabe o nome dos países?</Text>
            <TouchableOpacity onPress={this.mostrarPaises}>
              <View style={e.button}>
                <Text>Lista de países</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <Modal animationType="fade" visible={this.state.modalVisible}>
              <ImageBackground source={require("../img/covid.jpg")} style={e.body}>
                <View style={{alignItems:'center'}}>
                  <Button title="X" onPress={this.ocultarPaises} />
                  <Text style={[e.demaisTextos,  {paddingTop:10}]}>Lista de países, afetados pelo COVID-19, cobridos por nós</Text>
                  <Text style={e.demaisTextos}>Português - Inglês</Text>
                  <FlatList 
                    data={this.state.listaPaises}
                    renderItem={({item})=><Lista data={item} />}
                  />
                </View>
              </ImageBackground>
            </Modal>
          </View>
        </ImageBackground>
      )
    }else{
      return(
        <ImageBackground source={require("../img/covid.jpg")} style={[e.body, {justifyContent:"center"}]}>
          <Text style={e.loading}>Loading...</Text>
          <Image source={require("../img/giphy.gif")} />
        </ImageBackground>
      )
    }
  }
}

class Lista extends Component {
  constructor(props){
    super(props);
    this.state = {
      pt:this.props.data.portugues,
      en:this.props.data.ingles
    }
  }
  render(){
    return(
      <View style={e.lista}>
        <View>
          <Text style={e.demaisTextos}>{this.state.pt} - {this.state.en}</Text>
        </View>
      </View>
    )
  }
}

const e = StyleSheet.create({
  body:{
    flex:1,
    padding:10,
    alignItems:"center",
    width:null,
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
  busca:{
    fontSize:16,
    fontWeight:"600",
    color:"#FFFFFF",
    textAlign:"center",
    paddingBottom:10,
    paddingTop:50,
  },
  input:{
    borderWidth:1,
    borderColor:"#FFFFFF",
    padding:5,
    textAlign:"center",
    backgroundColor:"#FFFFFF",
    fontSize:15,
    height:50,
    marginTop:10,
    marginBottom:10
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
  },
  loading:{
    fontSize:18,
    fontWeight:"bold",
    paddingBottom:20,
    textAlign:"center",
    color:"#FFFFFF"
  },
  lista:{
    alignItems:"center",
    padding:10
  }
})