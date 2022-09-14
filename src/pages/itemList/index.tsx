import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import AddButton from "../../components/AddButton";
import Header from "../../components/Header";
import styles from "./styles";

export default function ItemList({navigation}: any){

  function handleNavigateToItemDetails(){
    navigation.navigate("ItemDetails")
  }

  return(
    <>
      <Header title="Lanches" canGoBack={true}/>
      <View style={styles.container}>
        <View> 
        {/* trazer informações do banco */}
      <TouchableOpacity style={styles.content} onPress={handleNavigateToItemDetails}>
        <View style={styles.text}>
          <Text style={styles.title}>Nome do lanche</Text>
          <Text style={styles.ingredients}>Ingredientes</Text>
          <Text style={styles.title}>R$: Valor</Text>
        </View>
        <Image style={styles.image} source={require("../../images/lanche1.png")} />
      </TouchableOpacity>
      </View>
      <View style={styles.footer}>
      <AddButton isAdding={false} />
      </View>
    </View>
    </>
  )
}