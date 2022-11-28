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
import { empresa } from "../login";

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

interface Categoria {
  nome: string,
}

export default function Item({ navigation }: any) {
  const [item, setItem] = useState<Item[]>([]);
  const [emptyList, setEmptyList] = useState(false)
  var Terminou = 0;
  var json = '';

  function arruma_esse_caralho(Jsonarray) {
    Terminou = (Jsonarray.length)

    Jsonarray.map(async (categoria) => {
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
      setEmptyList(false)
    }
  }

  function handleNavigateToEditItem(id: number) {
    navigation.navigate("EditItem", { id })
  }


  useEffect(() => {

    axios.post(baseUrl + "item/buscar/empresa", {
      id: empresa
    })
      .then(res => {
        //setCategoria(res.data)
        arruma_esse_caralho(res.data)
        setEmptyList(false)
      }).catch(function (error) {
        console.log(error);
        setEmptyList(true)
      })

  }, [])

  function currencyFormat(num) {
    return num.toFixed(2).replace('.', ',', ' ')
  }
  return (
    <>

      <Header title="Itens" canGoBack={true} />
      <View style={styles.container}>
        {emptyList ?
          <View style={{ alignItems: 'center', marginVertical: 20 }}>
            <Text>Sem itens cadastrados</Text>
            <Feather name="alert-circle" size={24} />
          </View>
          :
          <View>
            {item.map((itens) => (
              <TouchableOpacity style={styles.content} onPress={() => handleNavigateToEditItem(itens.id)} key={itens.id} >
                <View style={styles.text}>
                  <Text style={styles.title}>{itens.nome}</Text>

                  <View style={{ flexDirection: 'row' }} >
                    {itens.ingredientes.map(ingredient => (
                      <Text style={styles.ingredients} key={ingredient.nome}>{ingredient.nome};</Text>
                    ))}
                  </View>

                  <Text style={styles.title}>R$: {currencyFormat(itens.valor / 100)}</Text>
                </View>
                <Image style={styles.image} source={{ uri: itens.imagem }} />
              </TouchableOpacity>
            ))}
          </View>
        }
      </View>
    </>
  )
}