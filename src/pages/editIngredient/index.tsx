import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import Header from "../../components/Header";
import RegisterInput from "../../components/RegisterInput";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import Button from "../../components/Button";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { baseUrl, gdrive } from "../../config/globalConfig";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from 'expo-image-picker';
import { empresa } from "../login";
import ErrorModal from "../../components/Modal";
import { TextInputMask } from "react-native-masked-text";

interface ingredientId {
  id: number
}

interface ingredient {
  nome: string,
  id: number,
  adicional: boolean,
  medida: string,
  quantidade: number,
  valor: number
}


export default function EditIngredient({ navigation }: any) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [valor, setValor] = useState('');
  const route = useRoute();
  const params = route.params as ingredientId;
  const [ingredient, setIngredient] = useState<ingredient>();

  const [name, setName] = useState('')
  const [visible, setVisible] = useState(false)
  const [items] = useState([
    { label: 'Unidade', value: 'UN' },
    { label: 'Gramas', value: 'G' }
  ]);
  var valorConverted;


  useEffect(() => {
    axios.post(baseUrl + "ingrediente/buscar", {
      id: params.id
    })
      .then(res => {
        setIngredient(res.data)
      }).catch(function (error) {
        console.log(error);
        console.log(params.id)
      })

  }, [ingredient])

  // caso o usuário não tenha alterado algum campo, irá setar com o valor encontrado no bd
  useEffect(() => {
    if (ingredient) {
      if (!name) {
        setName(ingredient.nome)
      }
      if(!valor){
        valorConverted = ingredient.valor;
        
      }
    }
  })

  function Save() {
    //converter a string salario para inteiro
    valorConverted = parseFloat(valor)

    //está setando todas 
    axios.put(baseUrl + "ingrediente/editar", {
      id: params.id,
      nome: name,
      valor: valorConverted
    }).then(res => {
      setVisible(true)
    }).catch(function (error) {
      console.log(error);
    })

  }


  function OnRequestClose() {
    setVisible(false)
    navigation.navigate("ingredient")
  }


  return (
    <>
      {!ingredient ? <Text>Erro</Text> :
        <>
        <Header title="Editar Ingrediente" canGoBack={true} />
          <ErrorModal visible={visible} functionOnRequestClose={OnRequestClose} text="Alterado com sucesso!" />
          <View style={styles.container}>
            <RegisterInput
              labelName=""
              title="Nome"
              onChangeText={setName}
            ><Text>{ingredient.nome}</Text></RegisterInput>

            <Text>Valor</Text>
            <View style={styles.inputGroup}>
          <TextInputMask
            type={'money'}
            onChangeText={setValor}
            style={styles.input}
            placeholder={"R$ 00,00"}
          />
        
          </View>
          <View style={styles.footer}>
                  <Button title="Salvar Informações" onPress={Save} />
          </View>
          </View>
          </>}
    </>
  )
}