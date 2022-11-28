import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import Header from "../../components/Header";
import RegisterInput from "../../components/RegisterInput";
import styles from "./styles";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { baseUrl, gdrive } from "../../config/globalConfig";
import ErrorModal from "../../components/Modal";
import { TextInputMask } from "react-native-masked-text";
import {  Buffer} from "buffer";

interface ItemID {
  id: number
}

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

export default function EditItem({ navigation }: any) {
  const route = useRoute();
  const params = route.params as ItemID;
  const [item, setItem] = useState<Item>();

  const [name, setName] = useState('')
  const [salary, setSalary] = useState('')
  const [visible, setVisible] = useState(false)
  var json;

  useEffect(() => {
   //buscar item
   axios.post(baseUrl + "item/buscar", {
    id: params.id
  })
    .then(res => {
      setItem(res.data)
      busca_imagem(res.data) 
    }).catch(function (error) {
      console.log(error);
    })
  }, [])

  async function busca_imagem(categoria){

    const retorno = await gdrive.files.getBinary(categoria.imagem) // funcao responsavel por Buscar o Item ( OBRIGATORIO ID do item)
    const base64Flag = "data:image/png;base64,";
    const b64Image =  base64Flag + Buffer.from(retorno).toString("base64");

    json =   `{ "id" : ${categoria.id},"imagem" : "${b64Image}","nome" : "${categoria.nome }","ingredientes" : [${categoria.ingredientes.map(ingrediente =>{ return '{ "nome":"'+ingrediente.nome+'","id":"'+ingrediente.id+'"}'}) }]}`;

    setItem( JSON.parse(`${json}`) ) 
}
  // caso o usuário não tenha alterado algum campo, irá setar com o valor encontrado no bd
  useEffect(() => {
    if (item) {
      //setar o valor e nome caso esteja vazio
      // if (!name) {
      //   setName(item.pessoa.nome)
      // }
      // if (!email) {
      //   setEmail(item.conta)
      // }
      // if (password === '') {
      //   setPassword(item.senha)
      // }
      // if (image64 === '') {
      //   setImage64(item.pessoa.imagem)
      // }
    }
  })

  function Save() {
    //converter a string salario para inteiro
    const valorConverted = parseFloat(salary)

    //está setando todas 
    axios.put(baseUrl + "item/editar", {
      id: params.id,
      nome: name,
      valor: valorConverted
    }).then(res => {
      setVisible(true)
    }).catch(function (error) {
      console.log(error);
    })

    // navigation.navigate("item")
  }

  function OnRequestClose() {
    setVisible(false)
    navigation.navigate("item")
  }


  return (
    <>
      {!item ? <Text>Erro</Text> :
        <><Header title="Editar Item" canGoBack={true} />
           <Image style={styles.image} source={{uri : item.imagem}} />
          <ErrorModal visible={visible} functionOnRequestClose={OnRequestClose} text="Alterado com sucesso!" />
          <View style={styles.container}>
            <RegisterInput
              labelName=""
              title="Nome"
              onChangeText={setName}
            ><Text>{item.nome}</Text></RegisterInput>
            <Text>Valor</Text>
            <View style={styles.inputGroup}>
          <TextInputMask
            type={'money'}
            onChangeText={setSalary}
            style={styles.input}
            placeholder={"R$ 00,00"}
          />
        </View>
          </View></>}
    </>
  )
}