import React from "react";
import { View } from "react-native";
import Header from "../../components/Header";

export default function Orders(){
  return(
    <View>
      <Header title="Pedidos" isHome={true}/>
    </View>
  )
}