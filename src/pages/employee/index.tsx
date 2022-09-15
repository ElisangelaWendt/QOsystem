import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import AddButton from "../../components/AddButton";
import Header from "../../components/Header";
import styles from "./styles";

export default function Employee({navigation}: any) {

  function handleNavigateToNewEmployee(){
    navigation.navigate("EmployeeRegister")
  }
  function handleNavigateToEditEmployee(){
    navigation.navigate("EditEmployee")
  }

  return (
    <>
    <Header title="Empregados" canGoBack={true} />
    <View style={styles.container}>
      <TouchableOpacity style={styles.content} onPress={handleNavigateToEditEmployee}>
        {/* trazer informações do banco */}
        <View style={styles.text}>
          <Text style={styles.title}>Nome</Text>
          <Text style={styles.role}>Cargo</Text>
        </View>
        <Image style={styles.image} source={require("../../images/user.png")} />
      </TouchableOpacity>

      <View style={styles.footer}>
      <AddButton onPress={handleNavigateToNewEmployee} isAdding={true} />
      </View>
    </View>
    </>
  )
}