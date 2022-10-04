import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Divider } from "react-native-paper";
import Button from "../../../components/Button";
import Header from "../../../components/Header";
import ErrorModal from "../../../components/Modal";
import Input from "../../../components/RegisterInput";
import { baseUrl } from "../../../config/globalConfig";
import { colors } from "../../../styles/colors";
import { empresa } from "../../login";
import { styles } from "./styles";

interface Ingredient {
  nome: string,
  id: number
}


export default function IngredientExclusion({navigation}: any) {
  const [visible, setVisible] = useState(false);
  const [openIngredient, setOpenIngredient] = useState(false);
  const [value, setValue] = useState(null);
  const [ingredient, setIngredient] = useState<Ingredient[]>([]);

  useEffect(() => {
    axios.post(baseUrl + "ingrediente/buscar/empresa", {
      id: empresa
    })
      .then(res => {
        setIngredient(res.data)
      }).catch(function (error) {
        console.log(error);
      })
  }, [ingredient])


  function Delete(){
    
    axios.delete(baseUrl + "ingrediente/deletar",{
      data:{
        id: value
      }
    }).then(res => {
      setVisible(true)
    }
    ).catch(function (error){
      console.log(error);
    })
  }

  function OnRequestClose(){
    setVisible(false)
  }

  return (
    <>
      <Header title="Excluir Ingrediente" canGoBack={true} />
      <ErrorModal visible={visible} text="Ingrediente excluído com sucesso!" functionOnRequestClose={OnRequestClose} />
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