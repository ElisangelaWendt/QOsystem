import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
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

interface category {
  nome: string,
  id: number
}


export default function CategoryExclusion() {
  const [openItem, setOpenItem] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [category, setCategory] = useState<category[]>([]);
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
  }, [])


  function Delete(){
    
    axios.delete(baseUrl + "categoria/deletar",{
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

  
  function CloseModal(){
    setVisible(false)
  }

  return (
    <>
      <Header title="Excluir Categoria" canGoBack={true} />
      <ErrorModal visible={visible} text={"Categoria excluída com Sucesso"} functionOnRequestClose={CloseModal}/>
      <View style={styles.content}>
      <Text style={styles.text}>Excluir Categoria</Text>
        <DropDownPicker
          placeholder="Selecione o Categoria"
          textStyle={styles.dropdownText}
          labelStyle={styles.dropdownText}
          open={open}
          value={value}
          items={category.map(category => ({ label: category.nome, value: category.id }))}
          setOpen={setOpen}
          setValue={setValue}
          style={styles.dropdown}
          placeholderStyle={{ color: colors.dividor }}
          dropDownContainerStyle={{ borderColor: colors.dividor }}
          selectedItemContainerStyle={{ height: 35 }}

        />
        <View style={styles.footer}>
          <Button title="Excluir Categoria" onPress={Delete} />
        </View>

        </View>
    </>
  )
}