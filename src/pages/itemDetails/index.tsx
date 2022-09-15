import React from "react";
import { View, Image, ScrollView, Text, TouchableOpacity, Dimensions } from "react-native";
import AddQuantity from "../../components/AddQuantity";
import Button from "../../components/Button";
import DropBox from "../../components/DropBox";
import Header from "../../components/Header";
import styles from "./styles";

export default function ItemDetails({ navigation }: any) {

  function handleNavigateToCloseOrder() {
    navigation.navigate("CloseOrder")
  }
  return (
    <>
      <Header title="Nome Lanche" canGoBack={true} />
      <View style={styles.content}>
          <Image style={styles.image} source={require("../../images/lanche2.png")} />
          <View style={styles.properties}>
            <AddQuantity title={true} />
            <Text style={styles.text}>Remover Algum Item?</Text>
            <DropBox placeholder="Selecione um item" title="" />
            <View style={styles.table}></View>
            <Text style={styles.text}>Deseja Algum Item Adicional?</Text>
            <DropBox placeholder="Selecione um item" title="" />
            <View style={styles.table}></View>

          </View>
          <View style={styles.footer}>
            <Button title="Adicionar item" onPress={handleNavigateToCloseOrder} />
          </View>
      </View>
    </>
  )
}