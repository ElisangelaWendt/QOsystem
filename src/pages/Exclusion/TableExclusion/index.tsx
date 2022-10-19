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

interface Table {
  nome: string,
  id: number
}

export default function TableExclusion(){
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [table, setTable] = useState<Table[]>([]);
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    axios.post(baseUrl + "mesa/buscar/empresa",{
      id: empresa
    })
    .then(res => {
      setTable(res.data)
      // console.log(res.data)
    }).catch(function(error){
      console.log(error)
    })
  }, [table])

  function Delete(){
    axios.delete(baseUrl + "mesa/deletar",{
      data:{
        id: value
      }
    }).then(res => {
      setVisible(true)
    }).catch(function(error){
      console.log(error)
    })
  }

  function OnRequestClose(){
    setVisible(false)
  }

  return(
    <>
    <Header title="Excluir Mesa" canGoBack={true}/>
    <ErrorModal visible={visible} functionOnRequestClose={OnRequestClose} text="Mesa Excluída com Sucesso!" />
      <View style={styles.content}>

      <Text style={styles.text}>Excluir Mesa</Text>
        <DropDownPicker
          placeholder="Selecione a mesa"
          textStyle={styles.dropdownText}
          labelStyle={styles.dropdownText}
          open={open}
          value={value}
          items={table.map(table => ({ label: table.nome, value: table.id }))}
          setOpen={setOpen}
          setValue={setValue}
          style={styles.dropdown}
          placeholderStyle={{ color: colors.dividor }}
          dropDownContainerStyle={{ borderColor: colors.dividor }}
          selectedItemContainerStyle={{ height: 35 }}

        />
        <View style={styles.footer}>
          <Button title="Excluir Mesa" onPress={Delete} />
        </View>
        </View>
    </>
  )
}