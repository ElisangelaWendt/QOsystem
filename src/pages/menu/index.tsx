import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
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
  function handleNavigateToItemRegister(){
    navigation.navigate("ItemRegister")
  }

  function LogOut(){
    navigation.navigate("Login")
  }

  return (
    <ScrollView>
      <Header title="Menu"/>
    <View style={styles.container}>
        <MenuButton title="Lista de empregados" onPress={handleNavigateToEmployee}/>
        <Text style={styles.text}>---------------- Cadastros ----------------</Text>
        <MenuButton title="Cadastrar Funcionário" onPress={handleNavigateToEmployeeRegister}/>
        <MenuButton title="Cadastrar Categoria" onPress={handleNavigateToCategoryRegister}/>
        <MenuButton title="Cadastrar Cargo" onPress={handleNavigateToJobRegister}/>
        <MenuButton title="Cadastrar Ingrediente" onPress={handleNavigateToIngredientRegister}/>
        <MenuButton title="Cadastrar Item" onPress={handleNavigateToItemRegister}/>
        <Text style={styles.text}>-------------------------------------------</Text>

        <MenuButton title="Sair" onPress={LogOut}/>
    </View>
    </ScrollView>

  )
}