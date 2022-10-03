import axios from "axios";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Button from "../../components/Button";
import Header from "../../components/Header";
import ErrorModal from "../../components/Modal";
import Input from "../../components/RegisterInput";
import { baseUrl } from "../../config/globalConfig";
import { colors } from "../../styles/colors";
import styles from "./styles";

interface Category{
  nome: string,
  id: number
}

interface Ingredient{
  nome: string,
  id: number
}

export default function ItemRegister({navigation}: any) {
const [name, setName] = useState("")
const [valor, setValor] = useState("")
const [categoria, setCategoria] = useState<Category[]>([])
const [ingrediente, setIngrediente] = useState<Ingredient[]>([])
const [valueCategory, setValueCategory] = useState(null);
const [valueIngredient, setValueIngredient] = useState([]);
const [open, setOpen] = useState(false);
const [open1, setOpen1] = useState(false);

const [visible, setVisible] = useState(false)

useEffect(() => {
  axios.get(baseUrl + "categoria/listar", {})
  .then(res => {
    setCategoria(res.data)
  }).catch(function (error) {
    console.log(error);
  })

  axios.get(baseUrl + "ingrediente/listar", {})
  .then(res => {
    setIngrediente(res.data)
  }).catch(function (error) {
    console.log(error);
  })
  console.log(valueIngredient)
}, [])




function Register(){
  var categoria ={
    id: valueCategory,
}
  axios.post(baseUrl + "item/cadastrar", {
    nome: name,
    categoria:categoria,
    valor: valor,
    // ingredientes: valueIngredient
  })
  .then(res => {
    setCategoria(res.data)
    setVisible(true)
    navigation.navigate("Menu")
  }).catch(function (error) {
    console.log(error);
  })
}

function onRequestClose(){
  setVisible(false)
  navigation.navigate("Menu")
}

  return (
    <>
      <Header title="Cadastrar Item" canGoBack={true} />
      <ErrorModal visible={visible} text="Cadastrado com Sucesso!" functionOnRequestClose={onRequestClose}/>
      <View style={styles.content}>
        <Input labelName="Nome do Item" title="Nome" onChangeText={setName}/>

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
          selectedItemContainerStyle={{ height: 35 }}
        />
        <Input labelName="Informe o valor do item" title="Valor" onChangeText={setValor}/>
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
          dropDownContainerStyle={{ borderColor: colors.dividor }}
          selectedItemContainerStyle={{ height: 35 }}
          multiple={true}
          min={1}
          max={20}
        />
      </View>
      <View style={styles.footer}>
        <Button title="Cadastrar" onPress={Register}/>
      </View>
    </>
  )
}