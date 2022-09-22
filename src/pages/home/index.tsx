import React, { useState } from "react";

import { View, Text, ScrollView, Image, TouchableOpacity, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "./styles";
import Header from "../../components/Header";
import axios from "axios";
import { baseUrl } from "../../config/globalConfig";


export default function Home({ navigation }: any) {
  const [search, setSearch] = useState('')

  

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
        <TouchableOpacity style={styles.categoryButton} onPress={handleNavigateToItemList}>
          <Image source={require('../../images/lanches.png')} style={styles.image} />
          <Text style={styles.categoryText}>Lanches</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  )
}
