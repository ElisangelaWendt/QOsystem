import React from "react";
import { View } from "react-native";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Input from "../../components/RegisterInput";
import { styles } from "./styles";


export default function JobRegister(){
  return(
    <>
    <Header title="Cadastrar Cargo" canGoBack={true}/>
    <View style={styles.content}>
      <View>
    <Input labelName="Informe o cargo" title="Nome"/>
      </View>
    <View style={styles.footer}>
    <Button title="Cadastrar Cargo"/>
    </View>
    </View>
    </>
  )
}