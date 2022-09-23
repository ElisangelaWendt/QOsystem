import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Divider } from "react-native-paper";
import Button from "../../../components/Button";
import Header from "../../../components/Header";
import Input from "../../../components/RegisterInput";
import { baseUrl } from "../../../config/globalConfig";
import { colors } from "../../../styles/colors";
import { styles } from "./styles";

interface Ingredient {
  nome: string,
  id: number
}


export default function IngredientExclusion() {
  const [open, setOpen] = useState(false);
  const [openEmployee, setOpenEmployee] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openCargo, setOpenCargo] = useState(false);
  const [openIngredient, setOpenIngredient] = useState(false);
  const [value, setValue] = useState(null);
  const [ingredient, setIngredient] = useState<Ingredient[]>([]);

  useEffect(() => {
    axios.get(baseUrl + "ingrediente/listar", {})
      .then(res => {
        setIngredient(res.data)
      }).catch(function (error) {
        console.log(error);
      })
  }, [ingredient])


  function Delete(){
    
    axios.delete(baseUrl + "ingredient/deletar",{
      data:{
        id: value
      }
    }).then(
    ).catch(function (error){
      console.log(error);
    })
  }


  return (
    <>
      <Header title="Excluir Ingrediente" canGoBack={true} />
      <View style={styles.content}>

      <Text style={styles.text}>Excluir Ingrediente</Text>
        <DropDownPicker
          placeholder="Selecione o Ingrediente"
          textStyle={styles.dropdownText}
          labelStyle={styles.dropdownText}
          open={openIngredient}
          value={value}
          items={ingredient.map(ingredient => ({ label: ingredient.nome, value: ingredient.id }))}
          setOpen={setOpenIngredient}
          setValue={setValue}
          style={styles.dropdown}
          placeholderStyle={{ color: colors.dividor }}
          dropDownContainerStyle={{ borderColor: colors.dividor }}
          selectedItemContainerStyle={{ height: 35 }}

        />
        <View style={styles.footer}>
          <Button title="Excluir Ingrediente" onPress={Delete} />
        </View>
        </View>
    </>
  )
}