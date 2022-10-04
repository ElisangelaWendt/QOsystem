import React, { useEffect } from "react";
import { TouchableOpacity, View, Text,Image } from "react-native";
import AddQuantity from "../../components/AddQuantity";
import Button from "../../components/Button";
import Header from "../../components/Header";
import { ItensPedido } from "../itemDetails";
import styles from "./styles";

export default function OpenOrder({navigation}: any){

  useEffect(() => {
    // axios.get(baseUrl + "pedidoItem/listar", {

    // })
    // .then(res => {
    //   setPedido(res.data)
    // }).catch(function (error) {
    //   console.log(error);
    // })

    console.log(ItensPedido)
  },[])

  function handleNavigateToHome(){
    navigation.navigate("Home")
  }
  
  return(
    <View style={styles.container}>
    <Header title="Concluir Pedido" canGoBack={true}/>
    <View style={styles.content}>
        <View style={styles.text}>
          <Text style={styles.title}>Nome do lanche</Text>
          <Text style={styles.ingredients}>Ingredientes</Text>
          <Text style={styles.add}>Adicionar: ...</Text>
          <Text style={styles.remove}>Remover: ...</Text>
        </View>
        <View style={{alignItems:"center", marginRight: 20, marginBottom: 10}}>

        <Image style={styles.image} source={require("../../images/lanche1.png")} />
        <AddQuantity title={false}/>
        </View>
      </View>
      <View style={styles.footer}>
    <Button title="Confirmar pedido" onPress={handleNavigateToHome}/>
      </View>
        
    </View>
  )
}