import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { TextInputMask } from "react-native-masked-text";
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
  const [quantity, setQuantity] = useState('')
  const [medida, setMedida] = useState('')
  const [open, setOpen] = useState(false)

  const [visible, setVisible] = useState(false)

  const [items] = useState([
    { label: 'Unidade', value: 'UN' },
    { label: 'Gramas', value: 'G' }
  ]);

  function check() {
    if (isChecked === true) {
      setIsChecked(false)
    } else {
      setIsChecked(true)
    }
  }

  function Register() {
    var valueFormatted = value.replace(/[^0-9]/g, '')
    axios.post(baseUrl + "/ingrediente/cadastrar", {
      nome: name,
      valor: valueFormatted,
      empresa: {
        id: empresa
      },
      adicional: isChecked,
      medida: medida,
      quantidade: quantity
    }).then(res => {
      setVisible(true)
    })
  }

  function onRequestClose() {
    setVisible(false)
    navigation.navigate("Menu")
  }

  return (
    <>
      <Header title="Cadastrar Ingrediente" canGoBack={true} />
      <ErrorModal visible={visible} text="Cadastrado com Sucesso!" functionOnRequestClose={onRequestClose} />
      <View style={styles.content}>
        <View>
          <Input labelName="Nome do Ingrediente" title="Nome" onChangeText={setName} />
          <Input labelName="Descrição do Ingrediente" title="Descrição" style={{ height: 70, fontSize: 20 }} multiline={true} />
          <View style={{flexDirection: 'row', justifyContent:"space-between", alignContent:'center'}}>
          
        <View>
          <DropDownPicker
            placeholder="Unidade de medida"
            textStyle={styles.dropdownText}
            labelStyle={styles.dropdownText}
            open={open}
            value={medida}
            items={items}
            setOpen={setOpen}
            style={styles.dropdown}
            setValue={setMedida}
            placeholderStyle={{ color: colors.dividor}}
            dropDownContainerStyle={{ borderColor: colors.dividor, width:150 }}
          />
        </View>
        {medida === 'G' &&
          <Input labelName="Quantidade de gramas" onChangeText={setQuantity} style={{width:130,height:45}}/>
        }
          {/* {medida === 'G' &&
          <Input labelName="5g" onChangeText={setValue} style={{width:80}}/>
          } */}
          </View>
          <View style={styles.inputGroup}>
          <TextInputMask
            type={'money'}
            onChangeText={setValue}
            style={styles.input}
            placeholder="R$ 00,00"

          />
        </View>
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