import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import AddButton from "../../components/AddButton";
import Header from "../../components/Header";
import { baseUrl } from "../../config/globalConfig";
import styles from "./styles";

interface Employee{
  nome: string,
  id: number,
  pessoa:{
    nome: string,
    id: number,
    cargo: {
      nome: string
    }
  }
}

export default function Employee({navigation}: any) {
  const [employee, setEmployee] = useState<Employee[]>([]);

  
  useEffect(() => {
    axios.get(baseUrl + "conta/listar", {})
      .then(res => {
        setEmployee(res.data)
  // console.log(res.data)

      }).catch(function (error) {
        console.log(error);
      })
  },[employee])

  function handleNavigateToNewEmployee(){
    navigation.navigate("EmployeeRegister")
  }
  function handleNavigateToEditEmployee(id: number){
    navigation.navigate("EditEmployee", {id})
  }
  // console.log("------------")
  // console.log(employee.map(teste => ( console.log(teste.cargo.nome))))

  return (
    <ScrollView>
    <Header title="Empregados" canGoBack={true} />
    <View style={styles.container}>

    {employee.map(employee => (
      
        <TouchableOpacity style={styles.content} onPress={() => handleNavigateToEditEmployee(employee.id)} key={employee.id}>
        {/* trazer informações do banco */}
        <View style={styles.text}>
          <Text style={styles.title}>
            {employee.pessoa.nome}
          </Text>
          <Text style={styles.role}>{employee.pessoa.cargo.nome}</Text>
        </View>
        <Image style={styles.image} source={require("../../images/user.png")} />
      </TouchableOpacity>
        ))}

      

      <View style={styles.footer}>
      <AddButton onPress={handleNavigateToNewEmployee} isAdding={true} />
      </View>
    </View>
    </ScrollView>
  )
}