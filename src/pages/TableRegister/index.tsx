import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Button from "../../components/Button";
import Header from "../../components/Header";
import ErrorModal from "../../components/Modal";
import Input from "../../components/RegisterInput";
import { baseUrl } from "../../config/globalConfig";
import { empresa } from "../login";
import { styles } from "./styles";

interface Tables {
  id: number,
  nome: string
}

export default function TableRegister({ navigation }: any) {
  const [quantity, setQuantity] = useState('')
  const [visible, setVisible] = useState(false)
  const [tables, setTables] = useState<Tables[]>([])
  const [warning, setWarning] = useState(false)

  var quantityConverted;

  useEffect(() => {
    axios.post(baseUrl + "mesa/buscar/empresa", {
      id: empresa
    }).then(res => {
      setTables(res.data)
    }).catch(function (error) {
      console.log(error)
    })
  }, [quantity])


  function Register() {
    quantityConverted = parseInt(quantity);
    console.log(quantityConverted)
    for (var x = 1; x <= quantityConverted; x++) {
      let exist = false;
      for (var y = 0; y < tables.length; y++) {
        if (("Mesa " + x) === (tables[y].nome)) {
          exist=true;
        } 
      }
      if (exist){
        console.log('Tem a ' + "Mesa " + x)
        setWarning(true)
      } else {
        console.log(x)
         axios.post(baseUrl + "mesa/cadastrar", {
            nome: "Mesa " + x,
            empresa: {
              id: empresa
            }
          }).then(res => {
            setVisible(true)
          }).catch(function (error) {
            console.log(error)
          })
        }
    }
  }

  function OnRequestClose() {
    setVisible(false)
    navigation.navigate("Menu")
  }

  return (
    <>
      <Header title="Cadastrar Mesas" canGoBack={true} />
      <ErrorModal visible={visible} text="Mesa cadastrada com Sucesso!" functionOnRequestClose={OnRequestClose} />
      <View style={styles.content}>
        <View>
          <Input keyboardType="numeric" labelName="Informe a quantidade de mesas" title="Quantidade de mesas" onChangeText={setQuantity} />
          {warning &&
            <Text style={styles.warning}>Mesas já cadastradas</Text>}
        </View>
        <View style={styles.footer}>
          <Button title="Cadastrar Mesa" onPress={Register} />
        </View>
      </View>
    </>
  )
}