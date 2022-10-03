import axios from "axios";
import React, { useState } from "react";
import { View } from "react-native";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Input from "../../components/RegisterInput";
import { baseUrl } from "../../config/globalConfig";
import { empresa } from "../login";
import { styles } from "./styles";

interface User {
  nome: string,
  id: number
}

export default function JobRegister() {
  const [name, setName] = useState("")
  const [value, setValue] = useState(null);
  const [user, setUser] = useState<User[]>([]);

  function Register() {
    //buscar a empresa pela conta que está logada

    // axios.post(baseUrl + "/conta/buscar", {
    //   nome: name
    // })
    //   .then(res => {
    //     console.log(res.data);
    //   }).catch(function (error) {
    //     console.log(error);
    //     //login ou senha incorretos
    //     //abre modal
    //   })

    axios.post(baseUrl + "/cargo/cadastrar", {
      nome: name,
      empresa: {
        id: empresa
      }
    })
      .then(res => {
        console.log(res.data);
      }).catch(function (error) {
        console.log(error);
      })
  }

  return (
    <>
      <Header title="Cadastrar Cargo" canGoBack={true} />
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