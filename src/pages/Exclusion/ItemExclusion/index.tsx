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

interface Item {
  nome: string,
  id: number
}

interface Category {
  nome: string,
  id: number
}

export default function ItemExclusion() {
  const [open, setOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [value, setValue] = useState(null);
  const [valueCategory, setValueCategory] = useState(null);
  const [Item, setItem] = useState<Item[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    axios.post(baseUrl + "categoria/buscar/empresa", {
      id: empresa
    })
      .then(res => {
        setCategory(res.data)
      }).catch(function (error) {
        console.log(error);
      })

    axios.post(baseUrl + "item/buscar/categoria", {
        id: valueCategory
    })
      .then(res => {
        setItem(res.data)
      }).catch(function (error) {
        console.log(error);
      })
  }, [valueCategory, value])


  function Delete(){
    console.log(value)
    axios.delete(baseUrl + "item/deletar",{
      data:{
        id: value
      }
    }).then(res => {
      setVisible(true)
    }).catch(function (error){
      console.log(error);
    })
  }

  function OnRequestClose(){
    setVisible(false)
  }

  return (
    <>
      <Header title="Excluir Item" canGoBack={true} />
      <ErrorModal visible={visible} text="Item Excluído com Sucesso!" functionOnRequestClose={OnRequestClose}/>
      <View style={styles.content}>
      <Text style={styles.text}>De qual categoria deseja excluir o item?</Text>
      <DropDownPicker
          placeholder="Selecione o Categoria"
          textStyle={styles.dropdownText}
          labelStyle={styles.dropdownText}
          open={openCategory}
          value={valueCategory}
          items={category.map(category => ({ label: category.nome, value: category.id }))}
          setOpen={setOpenCategory}
          setValue={setValueCategory}
          style={styles.dropdown}
          placeholderStyle={{ color: colors.dividor }}
          dropDownContainerStyle={{ borderColor: colors.dividor }}
          selectedItemContainerStyle={{ height: 35 }}
          zIndex={3000}
          zIndexInverse={1000}
        />
        {valueCategory && <>
        <Text style={styles.text}>Excluir Item</Text>
        <DropDownPicker
          placeholder="Selecione o Item"
          textStyle={styles.dropdownText}
          labelStyle={styles.dropdownText}
          open={open}
          value={value}
          items={Item.map(item => ({ label: item.nome, value: item.id }))}
          setOpen={setOpen}
          setValue={setValue}
          style={styles.dropdown}
          placeholderStyle={{ color: colors.dividor }}
          dropDownContainerStyle={{ borderColor: colors.dividor }}
          selectedItemContainerStyle={{ height: 35 }}
          zIndex={2000}
          zIndexInverse={2000}
        />
        </>
        }
      
        <View style={styles.footer}>
          <Button title="Excluir Item" onPress={Delete} />
        </View>
        </View>
    </>
  )
}