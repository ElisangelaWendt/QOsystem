import React from "react";
import { View } from "react-native";
import Header from "../../../components/Header";
import RegisterInput from "../../../components/RegisterInput";
import styles from "./styles";

export default function EmployeeRegister(){
  return(
    <>
    <Header title="Novo Funcionário" isHome={true}/>
    <View style={styles.container}> 
      <RegisterInput 
      labelName="Informe o nome do Funcionário"
      title="Nome"
      />
      <RegisterInput 
      labelName="Informe o salário do funcionário"
      title="Salário"
      />
      <RegisterInput 
      labelName="Informe o email do Funcionário"
      title="Email"
      />
      <RegisterInput 
      labelName="Informe a senha do Funcionário"
      title="Senha"
      icon={true}
      />
    </View>
    </>

  )
}