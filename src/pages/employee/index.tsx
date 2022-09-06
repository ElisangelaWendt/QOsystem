import React from "react";
import { View, Text, Image } from "react-native";
import AddButton from "../../components/AddButton";
import Header from "../../components/Header";
import styles from "./styles";

export default function Employee({navigation}: any) {

  function handleNavigateToNewEmployee(){
    navigation.navigate("EmployeeRegister")
  }

  return (
    <>
    <Header title="Empregados" isHome={true} />
    <View style={styles.container}>
      <View style={styles.content}>
        {/* trazer informações do banco */}
        <View style={styles.text}>
          <Text style={styles.title}>Nome</Text>
          <Text style={styles.role}>Cargo</Text>
        </View>
        <Image style={styles.image} source={require("../../images/user.png")} />
      </View>

      <View style={styles.footer}>
      <AddButton onPress={handleNavigateToNewEmployee} isAdding={true} />
      </View>
    </View>
    </>
  )
}