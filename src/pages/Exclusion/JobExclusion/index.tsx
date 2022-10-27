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

interface Cargos {
  nome: string,
  id: number
}


export default function JobExclusion() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [cargos, setCargos] = useState<Cargos[]>([]);
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    axios.post(baseUrl + "cargo/buscar/empresa", {
      id: empresa
    })
      .then(res => {
        setCargos(res.data)
      }).catch(function (error) {
        console.log(error);
      })
  }, [cargos])


  function DeleteCargo(){
    
    axios.delete(baseUrl + "cargo/deletar",{
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
      <Header title="Excluir cargo" canGoBack={true} />
      <ErrorModal visible={visible} functionOnRequestClose={OnRequestClose} text="Cargo excluído com sucesso!" />
      <View style={styles.content}>

      <Text style={styles.text}>Excluir Cargo</Text>
        <DropDownPicker
          placeholder="Selecione o cargo"
          textStyle={styles.dropdownText}
          labelStyle={styles.dropdownText}
          open={open}
          value={value}
          items={cargos.map(cargo => ({ label: cargo.nome, value: cargo.id }))}
          setOpen={setOpen}
          setValue={setValue}
          style={styles.dropdown}
          placeholderStyle={{ color: colors.dividor }}
          dropDownContainerStyle={{ borderColor: colors.dividor }}
          selectedItemContainerStyle={{ height: 35 }}

        />
        <View style={styles.footer}>
          <Button title="Excluir Cargo" onPress={DeleteCargo} />
        </View>
        </View>
    </>
  )
}