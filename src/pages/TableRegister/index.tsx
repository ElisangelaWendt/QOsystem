import axios from "axios";
import React, { useState } from "react";
import { View } from "react-native";
import Button from "../../components/Button";
import Header from "../../components/Header";
import ErrorModal from "../../components/Modal";
import Input from "../../components/RegisterInput";
import { baseUrl } from "../../config/globalConfig";
import { empresa } from "../login";
import { styles } from "./styles";


export default function TableRegister({navigation}: any){
const [name, setName] = useState('')
const [visible, setVisible] = useState(false)

function Register(){
  axios.post(baseUrl + "mesa/cadastrar",{
    nome: name,
    empresa:{
      id: empresa
    }
  }).then(res => {
    setVisible(true)
  }).catch(function(error){
    console.log(error)
  })
}

function OnRequestClose(){
  setVisible(false)
  navigation.navigate("Menu")
}

  return(
    <>
    <Header title="Cadastrar Mesa" canGoBack={true}/>
    <ErrorModal visible={visible} text="Mesa cadastrada com Sucesso!" functionOnRequestClose={OnRequestClose} />
    <View style={styles.content}>
        <View>
          <Input labelName="Informe a mesa" title="Nome" onChangeText={setName} />
        </View>
        <View style={styles.footer}>
          <Button title="Cadastrar Mesa" onPress={Register} />
        </View>
      </View>
    </>
  )
}