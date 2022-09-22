import axios from "axios";
import React, { useState } from "react";
import { View } from "react-native";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Input from "../../components/RegisterInput";
import { baseUrl } from "../../config/globalConfig";
import { styles } from "./styles";


export default function JobRegister(){
  const [name, setName] = useState("")

  function Register(){
    axios.post(baseUrl + "/categoria/cadastrar",{
      nome: name
    })    
    .then(res => {
      console.log(res.data);
    }) .catch(function (error) {
      console.log(error);
      //login ou senha incorretos
      //abre modal
    })
  }
  return(
    <>
    <Header title="Cadastrar Cargo" canGoBack={true}/>
    <View style={styles.content}>
      <View>
    <Input labelName="Informe o cargo" title="Nome" onChangeText={setName}/>
      </View>
    <View style={styles.footer}>
    <Button title="Cadastrar Cargo" onPress={Register}/>
    </View>
    </View>
    </>
  )
}