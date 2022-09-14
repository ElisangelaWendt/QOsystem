import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View } from "react-native";
import Header from "../../components/Header";
import { MenuButton } from "../../components/MenuButton";
import { colors } from "../../styles/colors";
import { styles } from "./styles";

export default function Menu({navigation}: any) {

  function handleNavigateToEmployeeRegister(){
    navigation.navigate("EmployeeRegister")
  }
  function handleNavigateToCategoryRegister(){
    navigation.navigate("CategoryRegister")
  }

  function handleNavigateToJobRegister(){
    navigation.navigate("JobRegister")
  }

  function handleNavigateToEmployee(){
    navigation.navigate("Employee")
  }

  function handleNavigateToIngredientRegister(){
    navigation.navigate("IngredientRegister")
  }

  function LogOut(){
    navigation.navigate("Login")
  }

  return (
    <>
      <Header title="Menu"/>
    <View style={styles.container}>
        <MenuButton title="Lista de empregados" onPress={handleNavigateToEmployee}/>
        <MenuButton title="Cadastrar Funcionário" onPress={handleNavigateToEmployeeRegister}/>
        <MenuButton title="Cadastrar Categoria" onPress={handleNavigateToCategoryRegister}/>
        <MenuButton title="Cadastrar Cargo" onPress={handleNavigateToJobRegister}/>
        <MenuButton title="Cadastrar Ingrediente" onPress={handleNavigateToIngredientRegister}/>

        <MenuButton title="Sair" onPress={LogOut}/>
    </View>
    </>

  )
}