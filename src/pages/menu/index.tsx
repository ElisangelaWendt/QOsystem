import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Header from "../../components/Header";
import { MenuButton } from "../../components/MenuButton";
import { colors } from "../../styles/colors";
import { styles } from "./styles";

export default function Menu({navigation}: any) {

  function handleNavigateToCompleteOrder(){
    navigation.navigate("IncompleteOrder")
  }

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
  function handleNavigateToTableRegister(){
    navigation.navigate("TableRegister")
  }
  function handleNavigateToEmployeeExclusion(){
    navigation.navigate("EmployeeExclusion")
  }
  function handleNavigateToJobExclusion(){
    navigation.navigate("JobExclusion")
  }
  function handleNavigateToItemExclusion(){
    navigation.navigate("ItemExclusion")
  }
  function handleNavigateToCategoryExclusion(){
    navigation.navigate("CategoryExclusion")
  }
  function handleNavigateToIngredientExclusion(){
    navigation.navigate("IngredientExclusion")
  }
  function handleNavigateToTableExclusion(){
    navigation.navigate("TableExclusion")
  }
  function handleNavigateToEditIngredient(){
    navigation.navigate("Ingredient")
  }
  function handleNavigateToEditItem(){
    navigation.navigate("Item")
  }

  function LogOut(){
    navigation.navigate("Login")
  }

  return (
    <ScrollView>
      <Header title="Menu"/>
    <View style={styles.container}>
        <MenuButton title="Pedidos" onPress={handleNavigateToCompleteOrder}/>
        <MenuButton title="Lista de Funcionários" onPress={handleNavigateToEmployee}/>
        <Text style={styles.text}>---------------- Cadastros ----------------</Text>
        <MenuButton title="Cadastrar Funcionário" onPress={handleNavigateToEmployeeRegister}/>
        <MenuButton title="Cadastrar Categoria" onPress={handleNavigateToCategoryRegister}/>
        <MenuButton title="Cadastrar Cargo" onPress={handleNavigateToJobRegister}/>
        <MenuButton title="Cadastrar Ingrediente" onPress={handleNavigateToIngredientRegister}/>
        <MenuButton title="Cadastrar Item" onPress={handleNavigateToItemRegister}/>
        <MenuButton title="Cadastrar Mesa" onPress={handleNavigateToTableRegister}/>
        <Text style={styles.text}>---------------- Alterações ----------------</Text>
        <MenuButton title="Alterar item" onPress={handleNavigateToEditItem}/>
        <MenuButton title="Alterar ingrediente" onPress={handleNavigateToEditIngredient}/>
        <Text style={styles.text}>---------------- Exclusões ----------------</Text>
        {/* <MenuButton title="Excluir Funcionário" onPress={handleNavigateToEmployeeExclusion}/> */}
        <MenuButton title="Excluir Categoria" onPress={handleNavigateToCategoryExclusion}/>
        <MenuButton title="Excluir Cargo" onPress={handleNavigateToJobExclusion}/>
        <MenuButton title="Excluir Ingrediente" onPress={handleNavigateToIngredientExclusion}/>
        <MenuButton title="Excluir Item" onPress={handleNavigateToItemExclusion}/>
        <MenuButton title="Excluir Mesa" onPress={handleNavigateToTableExclusion}/>
        <Text style={styles.text}>-------------------------------------------</Text>

        <MenuButton title="Sair" onPress={LogOut}/>
    </View>
    </ScrollView>

  )
}