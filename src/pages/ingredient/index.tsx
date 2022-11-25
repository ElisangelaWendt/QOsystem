import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import AddButton from "../../components/AddButton";
import Header from "../../components/Header";
import { baseUrl, gdrive } from "../../config/globalConfig";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";
import { Buffer} from "buffer";
import { empresa } from "../login";

interface Ingrediente{
  nome: string,
  id: number,
  valor: number
}

export default function Ingredient({navigation}: any) {
  const [ingredient, setIngredient] = useState<Ingrediente[]>([]);

useEffect(() => {
  axios.post(baseUrl + "ingrediente/buscar/empresa",{
    id: empresa
  }).then(res => {
    setIngredient(res.data)
  }).catch(function (error){

  })
})

  function handleNavigateToEditingredient(id: number){
    navigation.navigate("EditIngredient", {id})
  }
  // console.log("------------")
  // console.log(ingredient.map(teste => ( console.log(teste.cargo.nome))))

  return (
    <ScrollView>
    <Header title="Funcionários" canGoBack={true} />
    <View style={styles.container}>

    {ingredient.map(ingredient => (
      
        <TouchableOpacity style={styles.content} onPress={() => handleNavigateToEditingredient(ingredient.id)} key={ingredient.id}>
        {/* trazer informações do banco */}
        <View style={styles.text}>
          <Text style={styles.title}>
            {ingredient.nome}
          </Text>
          <Text style={styles.role}>{ingredient.valor}</Text>
        </View>
      </TouchableOpacity>
        ))}
    </View>
    </ScrollView>
  )
}