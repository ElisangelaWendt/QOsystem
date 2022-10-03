import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import AddButton from "../../components/AddButton";
import Header from "../../components/Header";
import { baseUrl } from "../../config/globalConfig";
import styles from "./styles";

interface Item {
  nome: string,
  ingredientes: string[],
  valor: number,
  id: number
}

export default function ItemList({ navigation }: any) {
  const [item, setItem] = useState<Item[]>([]);

  function handleNavigateToItemDetails(id: number) {
    navigation.navigate("ItemDetails",{id})
  }

  useEffect(() => {
    axios.get(baseUrl + "item/listar", {})
      .then(res => {
        setItem(res.data)
        // console.log(employee)
      }).catch(function (error) {
        console.log(error);
      })
  }, [item])


  return (
    <>
      <Header title="Lanches" canGoBack={true} />
      <View style={styles.container}>
        <View>
          {/* trazer informações do banco */}
          {item.map(itens => (
            <TouchableOpacity style={styles.content} onPress={() => handleNavigateToItemDetails(itens.id)} key={itens.id}>
              <View style={styles.text}>
                <Text style={styles.title}>{itens.nome}</Text>
                <Text style={styles.ingredients}>{itens.ingredientes}</Text>
                <Text style={styles.title}>R$: {itens.valor}</Text>
              </View>
              <Image style={styles.image} source={require("../../images/lanche1.png")} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.footer}>
          <AddButton isAdding={false} />
        </View>
      </View>
    </>
  )
}