import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Checkbox } from "react-native-paper";
import Button from "../../components/Button";
import Header from "../../components/Header";
import ErrorModal from "../../components/Modal";
import Input from "../../components/RegisterInput";
import { baseUrl } from "../../config/globalConfig";
import { colors } from "../../styles/colors";
import { empresa } from "../login";
import { styles } from "./styles";

export default function IngredientRegister({ navigation }: any) {
  const [isChecked, setIsChecked] = useState(false)
  const [name, setName] = useState('')
  const [value, setValue] = useState('')
  const [ open, setOpen] = useState(false)
  const [item, setItem] = useState([''])

  const [visible, setVisible] = useState(false)

  const [items] = useState([
    {label: 'Unidade', value: 'UN'},
    {label: 'Gramas', value: 'G'}
  ]);

  function check() {
    if (isChecked === true) {
      setIsChecked(false)
    } else {
      setIsChecked(true)
    }
  }

  function Register() {

    axios.post(baseUrl + "/ingrediente/cadastrar", {
      nome: name,
      valor: value,
      empresa: {
        id: empresa
      }
    }).then(res => {
      setVisible(true)
    })
  }

  function onRequestClose() {
    setVisible(false)
    navigation.navigate("Menu")
  }

  function currencyFormat(num) {
    return num.toFixed(2).replace(',','.',' ')
 }
// num.toFixed(2).replace(',',','.' ')
  return (
    <>
      <Header title="Cadastrar Ingrediente" canGoBack={true} />
      <ErrorModal visible={visible} text="Cadastrado com Sucesso!" functionOnRequestClose={onRequestClose} />
      <View style={styles.content}>
        <View>
          <Input labelName="Nome do Ingrediente" title="Nome" onChangeText={setName} />
          <Input labelName="Descrição do Ingrediente" title="Descrição" style={{ height: 70, fontSize: 20 }} multiline={true} />
          <DropDownPicker
            placeholder="Selecione os itens"
            textStyle={styles.dropdownText}
            labelStyle={styles.dropdownText}
            open={open}
            value={item}
            items={items}

          setOpen={setOpen}
          setValue={setItem}
          style={styles.dropdown}
          placeholderStyle={{ color: colors.dividor }}
          dropDownContainerStyle={{ borderColor: colors.dividor }}
          selectedItemContainerStyle={{ height: 35 }}
          multiple={true}
              />
          <Input labelName="Valor do Ingrediente" title="Valor" onChangeText={setValue} />
          <View style={styles.row}>
            <Text style={styles.text}>Pode ser Adicional?</Text>
            <Checkbox status={isChecked ? 'checked' : 'unchecked'} onPress={check} color={colors.dividor} />
          </View>
        </View>
        <View style={styles.footer}>
          <Button title="Cadastrar Ingrediente" onPress={Register} />
        </View>
      </View>
    </>
  )
}