import { useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import AddButton from "../../components/AddButton";
import Header from "../../components/Header";
import { baseUrl } from "../../config/globalConfig";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";

interface Item {
  nome: string,
  ingredientes: string[],
  valor: number,
  id: number
}

interface CategoryId {
  id: number
}

interface Categoria{
nome: string,
}

export default function ItemList({ navigation }: any) {
  const [item, setItem] = useState<Item[]>([]);
  const [nomeCategoria, setNomeCategoria] = useState<Categoria>()
  const route = useRoute();
  const params = route.params as CategoryId;
  const [emptyList, setEmptyList] = useState(true)

  function handleNavigateToItemDetails(id: number) {
    navigation.navigate("ItemDetails",{id})
  }

  useEffect(() => {
    axios.post(baseUrl + "categoria/buscar", {
      id: params.id
    })
      .then(res => {
        setNomeCategoria(res.data)
      }).catch(function (error) {
        console.log(error);
      })

    axios.post(baseUrl + "item/buscar/categoria", {
      id: params.id
    })
      .then(res => {
        setEmptyList(false)
        setItem(res.data)
      }).catch(function (error) {
        console.log(error);
        setEmptyList(true)
      })
  }, [])

  function currencyFormat(num) {
    return num.toFixed(2).replace('.',',',' ')
 }

  return (
    <>
    {nomeCategoria &&
    <>
      <Header title={nomeCategoria.nome} canGoBack={true} />
      <View style={styles.container}>
        <View>
          {emptyList && 
          <View style={styles.emptyList}>
          <Text style={styles.textEmpty}>Nenhum Item Cadastrado para essa Categoria</Text>
          <Feather name="meh" size={40} />
          </View>
          }
          {item.map(itens => (
            <TouchableOpacity style={styles.content} onPress={() => handleNavigateToItemDetails(itens.id)} key={itens.id}>
              <View style={styles.text}>
                <Text style={styles.title}>{itens.nome}</Text>
                <Text style={styles.ingredients}>{itens.ingredientes}</Text>
                <Text style={styles.title}>R$: {currencyFormat(itens.valor)}</Text>
              </View>
              <Image style={styles.image} source={require("../../images/lanche1.png")} />
            </TouchableOpacity>
          ))}
        </View>
        {/* <View style={styles.footer}>
          <AddButton isAdding={false} />
        </View> */}
      </View>
      </>
    }
    </>
  )
}