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

interface Item {
  nome: string,
  id: number
}


export default function ItemExclusion() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [Item, setItem] = useState<Item[]>([]);

  useEffect(() => {
    axios.get(baseUrl + "item/listar", {})
      .then(res => {
        setItem(res.data)
      }).catch(function (error) {
        console.log(error);
      })
  }, [Item])


  function Delete(){
    
    axios.delete(baseUrl + "cargo/deletar",{
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
      <Header title="Exclusões" canGoBack={true} />
      <View style={styles.content}>
      <Text style={styles.text}>Excluir Item</Text>
        <DropDownPicker
          placeholder="Selecione o Item"
          textStyle={styles.dropdownText}
          labelStyle={styles.dropdownText}
          open={open}
          value={value}
          items={Item.map(cargo => ({ label: cargo.nome, value: cargo.id }))}
          setOpen={setOpen}
          setValue={setValue}
          style={styles.dropdown}
          placeholderStyle={{ color: colors.dividor }}
          dropDownContainerStyle={{ borderColor: colors.dividor }}
          selectedItemContainerStyle={{ height: 35 }}

        />
        <View style={styles.footer}>
          <Button title="Excluir Item" onPress={Delete} />
        </View>
        </View>
    </>
  )
}