import React, { useEffect, useLayoutEffect, useState } from "react";

import { View, Text, ScrollView, Image, TouchableOpacity, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "./styles";
import Header from "../../components/Header";
import axios from "axios";
import { baseUrl,gdrive } from "../../config/globalConfig";
import { empresa } from "../login";
import {  Buffer} from "buffer";


interface Categoria{
  nome: string,
  imagemUrl: string,
  imagem : string,
  id:number
}

export default function Home({ navigation }: any) {
  const [categoria, setCategoria] = useState<Categoria[]>([]);
  const [empty, setEmpty] = useState(false)
  var Terminou = 0;
  var json = '' ;

 function  arruma_esse_caralho(Jsonarray){       
  Terminou = (Jsonarray.length)// Define quando vai atualizar a Tela

  Jsonarray.map(async categoria => {
    const retorno = await gdrive.files.getBinary(categoria.imagem) // funcao responsavel por Buscar o Item ( OBRIGATORIO ID do item)
    const base64Flag = "data:image/png;base64,";
    const b64Image =  base64Flag + Buffer.from(retorno).toString("base64");
    
    if (json.length > 2 ){ json += ','} // so pra arrumar quando é mais de um Item  

      json +=   `{ "id" : ${categoria.id},"imagem" : "${b64Image}","nome" : "${categoria.nome }"},`;

      if (await  retorno){ setar()}// so pra chamar a funcao quando Terminar // solucao alternativa
    }
  )
} 

function setar(){
  json =  json.substring(0, json.length - 1) ; // Remover Virgula a Mais
  if (Terminou == JSON.parse('[' + json+ ']').length){
    setCategoria(JSON.parse('[' + json+ ']'))
    setEmpty(false)
  }
}

useLayoutEffect(() => {
    axios.post(baseUrl + "categoria/buscar/empresa", {
      id: empresa
    })
      .then(res => {
        setCategoria(res.data)
        arruma_esse_caralho(res.data)
        setEmpty(false)
      }).catch(function (error) {
        console.log(error);
        setEmpty(true)
      })
  },[])

  function handleNavigateToItemList(id: number){
    navigation.navigate('ItemList', {id});
  }

  return (
    <View >
      <Header title="QO SYSTEM" canGoBack={false} />
      <ScrollView style={styles.content}>

        <Text style={styles.text}>Categorias</Text>
        {empty && 
        <View style={{alignItems:'center'}}>
        <Text>Sem categoria Cadastrada</Text> 
        <Feather name="alert-circle" style={styles.icon} size={24} />
        </View>
        }
        {/* Categorias de lanches */}
        
        {categoria.map(categoria => (
        
        <TouchableOpacity style={styles.categoryButton} onPress={() => handleNavigateToItemList(categoria.id)} key={categoria.id}>
           <Image source={{uri: categoria.imagem}} style={styles.image} />
          <Text style={styles.categoryText}>{categoria.nome}</Text>
        </TouchableOpacity>
        ))}
        
      </ScrollView>
    </View>
  )
}
