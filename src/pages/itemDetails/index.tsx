import React, { useState } from "react";
import { View, Image, ScrollView, Text, TouchableOpacity, Dimensions } from "react-native";
import AddQuantity from "../../components/AddQuantity";
import Button from "../../components/Button";
import DropBox from "../../components/DropBox";
import Header from "../../components/Header";
import styles from "./styles";
import { Checkbox } from "react-native-paper";
import { colors } from "../../styles/colors";


export default function ItemDetails({ navigation }: any) {
  const [isChecked1, setIsChecked1] = useState(false)
  const [isChecked2, setIsChecked2] = useState(false)

  
  function check1() {
    if (isChecked1 === true) {
      setIsChecked1(false)
    } else {
      setIsChecked1(true)
    }
  }
  function check2() {
    if (isChecked2 === true) {
      setIsChecked2(false)
    } else {
      setIsChecked2(true)
    }
  }

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
            <View style={styles.row}>
            <Text style={styles.text}>Remover Algum Item?</Text>
            <Checkbox status={isChecked1 ? 'checked' : 'unchecked'} onPress={check1} color={colors.dividor} />
            </View>
            <DropBox placeholder="Selecione um item" title="" />
            <View style={styles.table}></View>
            <View style={styles.row}>

            <Text style={styles.text}>Deseja Algum Item Adicional?</Text>
            <Checkbox status={isChecked2 ? 'checked' : 'unchecked'} onPress={check2} color={colors.dividor} />
            </View>

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