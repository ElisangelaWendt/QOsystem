import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Button from "../../components/Button";
import Header from "../../components/Header";
import ErrorModal from "../../components/Modal";
import Input from "../../components/RegisterInput";
import { baseUrl } from "../../config/globalConfig";
import { colors } from "../../styles/colors";
import { empresa } from "../login";
import styles from "./styles";
import * as ImagePicker from 'expo-image-picker';
import { Feather } from "@expo/vector-icons";

interface Category {
  nome: string,
  id: number
}

interface Ingredient {
  nome: string,
  id: number,
  valor: number
}
interface Ingrediente {
  id: number
}

export default function ItemRegister({ navigation }: any) {
  const [name, setName] = useState("")
  const [valor, setValor] = useState("")
  const [categoria, setCategoria] = useState<Category[]>([])
  const [ingrediente, setIngrediente] = useState<Ingredient[]>([])
  const [valueCategory, setValueCategory] = useState(null);
  const [valueIngredient, setValueIngredient] = useState([]);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [ingredientObj, setIngredientObj] = useState([]);
  var totalValue= 0;
  var ingredientValues = [];

  const [image, setImage] = useState('');

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    axios.get(baseUrl + "categoria/listar", {})
      .then(res => {
        setCategoria(res.data)
      }).catch(function (error) {
        console.log(error);
      })


    axios.post(baseUrl + "ingrediente/buscar/empresa", {
      id: empresa
    })
      .then(res => {
        setIngrediente(res.data)
      }).catch(function (error) {
        console.log(error);
      })
  }, [])


  function Register() {

    for (let x = 0; x < valueIngredient.length; x++) {
      setIngredientObj((prev) => {
        return [...prev, { id: valueIngredient[x] }];
      });
      // const newObj = [{...ingredientObj, id: valueIngredient}]
      // console.log("-----------------------")
      // console.log(ingredientObj)
    }

    axios.post(baseUrl + "item/cadastrar", {
      nome: name,
      categoria: {
        id: valueCategory
      },
      valor: valor,
      ingredientes: ingredientObj
      //cadastrar imagem
    })
      .then(res => {
        console.log(res.data)
        setVisible(true)
      }).catch(function (error) {
        console.log(error);
      })
  }

  async function handleSelecionarFoto() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      //caso apareça erro no uri, IGNORAR, o problema é no visual studio (compila normalmente)
      setImage(result.uri);
    }

  }

  function onRequestClose() {
    setVisible(false)
    navigation.navigate("Menu")
  }

  function findArray(array, value) {
    return array.find((element) => {
      return element.id === value;
    })
  }


  function atualiza_tabela() {
    ingredientValues = (valueIngredient.map(Valueingrediente => (findArray(ingrediente, Valueingrediente).valor)))
    
    for(var x = 0; x < ingredientValues.length; x++){
      totalValue = totalValue + ingredientValues[x]
    }

    console.log(totalValue)

    return (valueIngredient.map(Valueingrediente => (findArray(ingrediente, Valueingrediente).nome + '\n')))

  }
// num.toFixed(2).replace(',',','.' ')
  return (
    <>
      <Header title="Cadastrar Item" canGoBack={true} />
      <ErrorModal visible={visible} text="Cadastrado com Sucesso!" functionOnRequestClose={onRequestClose} />
      <View style={styles.content}>
        <Input labelName="Nome do Item" title="Nome" onChangeText={setName} />

        <DropDownPicker
          placeholder="Categoria"
          textStyle={styles.dropdownText}
          labelStyle={styles.dropdownText}
          open={open}
          value={valueCategory}
          items={categoria.map(category => ({ label: category.nome, value: category.id }))}
          setOpen={setOpen}
          setValue={setValueCategory}
          style={styles.dropdown}
          placeholderStyle={{ color: colors.dividor }}
          dropDownContainerStyle={{ borderColor: colors.dividor }}
          zIndex={3000}
          zIndexInverse={1000}
        />
        <Input labelName="Informe o valor do item" title="Valor" onChangeText={setValor} />
        <DropDownPicker
          placeholder="Ingredientes"
          textStyle={styles.dropdownText}
          labelStyle={styles.dropdownText}
          open={open1}
          value={valueIngredient}
          items={ingrediente.map(ingredient => ({ label: ingredient.nome, value: ingredient.id }))}
          setOpen={setOpen1}
          setValue={setValueIngredient}
          style={styles.dropdown}
          placeholderStyle={{ color: colors.dividor }}
          dropDownContainerStyle={{ borderColor: colors.dividor, paddingBottom: 20 }}
          selectedItemContainerStyle={{ height: 35 }}
          multiple={true}
          zIndex={2000}
          zIndexInverse={2000}
        />
        {valueIngredient &&
          <>
            <View style={styles.table}>
              <Text style={styles.tableText}>{atualiza_tabela()}</Text>
            </View>
            <View>
            <Text>Preço de custo: R$ {totalValue}</Text>
            </View>
          </>
        }
        <Text style={styles.title}> Imagem do item</Text>
        {/* se não existe imagem, mostrar o botão */}
        {!image ?
          <View
            style={styles.imageSelector}

          >
            <TouchableOpacity
              onPress={handleSelecionarFoto}
            // disabled={disableButton}
            // style={disableButton ? { display: "none" } : styles.imageSelector}
            >
              <View style={styles.dashedBox}>

                <Feather name="plus" size={60} color={colors.text} />
              </View>
            </TouchableOpacity>
          </View>
          :
          // se existe imagem, mostrar a imagem
          <TouchableOpacity
            onPress={handleSelecionarFoto}
          >
            <Image source={{ uri: image }} style={styles.image} />
          </TouchableOpacity>
        }
      </View>
      <View style={styles.footer}>
        <Button title="Cadastrar" onPress={Register} />
      </View>
    </>
  )
}