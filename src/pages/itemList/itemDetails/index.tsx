import React from "react";
import { View, Image, ScrollView, Text, TouchableOpacity } from "react-native";
import AddQuantity from "../../../components/AddQuantity";
import Button from "../../../components/Button";
import Header from "../../../components/Header";
import styles from "./styles";

export default function ItemDetails(){
  return(
    <ScrollView>
    <Header title="Nome Lanche"/>
    <View style={styles.content}>
    <Image style={styles.image} source={require("../../../images/lanche2.png")} />
    <View style={styles.properties}>
    <AddQuantity/>
    
    </View>
      <Button title="Adicionar item"/>
    </View>
    </ScrollView>
  )
}