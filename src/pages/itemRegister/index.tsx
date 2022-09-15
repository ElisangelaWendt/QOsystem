import React from "react";
import { View } from "react-native";
import DropBox from "../../components/DropBox";
import Header from "../../components/Header";
import Input from "../../components/RegisterInput";
import styles from "./styles";

export default function ItemRegister(){
  return(
<>
<Header title="Cadastrar Item" canGoBack={true}/>
<View style={styles.content}>
<Input labelName="Nome do Item" title="Nome"/>
<DropBox placeholder="Selecione uma categoria" title="Categoria"/>
<Input labelName="Informe o valor do item" title="Valor"/>
<DropBox placeholder="Ingredientes" title="Selecione os ingredientes"/>
</View>
</>
  )
}