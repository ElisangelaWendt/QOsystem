import { DrawerActions, useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, View, Text } from "react-native";
import Button from "../../components/Button";
import DropBox from "../../components/DropBox";
import Header from "../../components/Header";
import { MenuButton } from "../../components/MenuButton";
import { styles } from "./styles";

export default function Orders({navigation}){

  
  return(
    <View>
      <Header title="Pedidos" canGoBack={false}/>
      <View style={styles.container}>
      {/* <MenuButton title="" onPress={() => navigation.dispatch(DrawerActions.openDrawer())}/> */}

      <DropBox title="" placeholder="Mesa" />
      <Button title="Finalizar Venda"/>
      </View>
    </View>
  )
}