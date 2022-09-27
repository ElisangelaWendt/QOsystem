import React, { useEffect, useState } from "react";

import { View, Text, ScrollView, Image, TouchableOpacity, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "./styles";
import Header from "../../components/Header";
import axios from "axios";
import { baseUrl } from "../../config/globalConfig";

interface Categoria{
  nome: string,
  imagemUrl: string,
  id:number
}

export default function Home({ navigation }: any) {
  const [search, setSearch] = useState('')
  const [categoria, setCategoria] = useState<Categoria[]>([]);

  useEffect(() => {
    axios.get(baseUrl + "categoria/listar", {})
      .then(res => {
        setCategoria(res.data)
      }).catch(function (error) {
        console.log(error);
      })
  },[categoria])

  function handleNavigateToItemList(){
    navigation.navigate('ItemList');
  }

  return (
    <View >
      <Header title="QO SYSTEM" canGoBack={false} />
      <ScrollView style={styles.content}>
        <View style={styles.inputGroup}>
          <TextInput placeholder="Buscar Categoria" style={styles.input} onChangeText={setSearch}/>
          <Feather name="search" style={styles.icon} size={24} />
        </View>
        <Text style={styles.text}>Categorias</Text>
        {/* Categorias de lanches */}
        {categoria.map(categoria => (
        <TouchableOpacity style={styles.categoryButton} onPress={handleNavigateToItemList} key={categoria.id}>
          <Image source={{uri: categoria.imagemUrl}} style={styles.image} />
          <Text style={styles.categoryText}>{categoria.nome}</Text>
        </TouchableOpacity>
        ))}

      </ScrollView>
    </View>
  )
}
