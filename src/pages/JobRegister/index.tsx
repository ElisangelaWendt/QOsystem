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

interface User {
  nome: string,
  id: number
}

export default function JobRegister({navigation}: any) {
  const [name, setName] = useState("")
  const [visible, setVisible] = useState(false);

  function Register() {

    axios.post(baseUrl + "/cargo/cadastrar", {
      nome: name,
      empresa: {
        id: empresa
      }
    })
      .then(res => {
        console.log(res.data);
        setVisible(true)
      }).catch(function (error) {
        console.log(error);
      })
  }

  function onRequestClose(){
    setVisible(false)
    navigation.navigate("Menu")
  }

  return (
    <>
      <Header title="Cadastrar Cargo" canGoBack={true} />
      <ErrorModal visible={visible} functionOnRequestClose={onRequestClose} text="Cargo cadastrado com sucesso!" />
      <View style={styles.content}>
        <View>
          <Input labelName="Informe o cargo" title="Nome" onChangeText={setName} />
        </View>
        <View style={styles.footer}>
          <Button title="Cadastrar Cargo" onPress={Register} />
        </View>
      </View>
    </>
  )
}