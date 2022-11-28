import { useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import AddButton from "../../components/AddButton";
import Header from "../../components/Header";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";
import { Buffer } from "buffer";
import { baseUrl, gdrive } from "../../config/globalConfig";


interface Item {
  nome: string,
  ingredientes:
  [{
    nome: string,
    id: number
  }],
  valor: number,
  id: number
  imagem: string;
}

interface CategoryId {
  id: number
}

interface Categoria {
  nome: string,
}

export default function ItemList({ navigation }: any) {
  const [item, setItem] = useState<Item[]>([]);
  const [nomeCategoria, setNomeCategoria] = useState<Categoria>()
  const route = useRoute();
  const params = route.params as CategoryId;
  const [emptyList, setEmptyList] = useState(true)
  var Terminou = 0;
  var json = '';

  function arruma_esse_caralho(Jsonarray) {
    Terminou = (Jsonarray.length)

    Jsonarray.map(async (categoria, idx) => {
      const retorno = await gdrive.files.getBinary(categoria.imagem) // funcao responsavel por Buscar o Item ( OBRIGATORIO ID do item)
      const base64Flag = "data:image/png;base64,";
      const b64Image = base64Flag + Buffer.from(retorno).toString("base64");

      if (json.length > 2) { json += ',' } // so pra arrumar quando é mais de um Item  

      json += `{ "id" : ${categoria.id},"valor" : ${categoria.valor},"nome" : "${categoria.nome}","imagem" : "${b64Image}", "ingredientes" : [${categoria.ingredientes.map(ingrediente => { return '{ "nome":"' + ingrediente.nome + '"}' })}]},`;

      if (await retorno) { setar() }// so pra chamar a funcao quando Terminar // solucao alternativa
    }
    )
  }

  function setar() {
    json = json.substring(0, json.length - 1); // Remover Virgula a Mais
    //console.log('[' + json+ ']')
    if (Terminou == JSON.parse('[' + json + ']').length) {
      setItem(JSON.parse('[' + json + ']'))
    }
  }

  function handleNavigateToItemDetails(id: number) {
    navigation.navigate("ItemDetails", { id })
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
        arruma_esse_caralho(res.data)
        //setItem(res.data)
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
              {item.map((itens) => (
                <TouchableOpacity style={styles.content} onPress={() => handleNavigateToItemDetails(itens.id)} key={itens.id} >
                  <View style={styles.text}>
                    <Text style={styles.title}>{itens.nome}</Text>

                      {itens.ingredientes.map(ingredient => (
                        <Text style={styles.ingredients} key={ingredient.nome}>{ingredient.nome}</Text>
                      ))}

                    <Text style={styles.title}>R$: {currencyFormat(itens.valor / 100)}</Text>
                  </View>
                  <Image style={styles.image} source={{ uri: itens.imagem }} />
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