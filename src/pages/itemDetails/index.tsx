import React, { useEffect, useState } from "react";
import { View, Image, ScrollView, Text, TouchableOpacity, Dimensions } from "react-native";
import AddQuantity, { quantity } from "../../components/AddQuantity";
import Button from "../../components/Button";
import Header from "../../components/Header";
import styles from "./styles";
import { Checkbox } from "react-native-paper";
import { colors } from "../../styles/colors";
import axios from "axios";
import { baseUrl } from "../../config/globalConfig";
import { useRoute } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import { userID } from "../login";

interface Item {
  nome: string,
  ingredientes:
  [{
    nome: string,
    id: number
  }],
  valor: number,
  id: number
}
interface ItemId {
  id: number
}

export var ItensPedido = [ '' ,'' , '',''];
export var pedido = null;

export default function ItemDetails({ navigation }: any) {
  const [isChecked1, setIsChecked1] = useState(false)
  const [isChecked2, setIsChecked2] = useState(false)
  const [item, setItem] = useState<Item>();
  const route = useRoute();
  const params = route.params as ItemId;

  const [openRemove, setOpenRemove] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [value, setValue] = useState();

  const [removedItem, setRemovedItem] = useState([])

  
  useEffect(() => {
    axios.post(baseUrl + "item/buscar", {
      id: params.id
    })
      .then(res => {
        setItem(res.data)
        // console.log(employee)
      }).catch(function (error) {
        console.log(error);
      })
  }, [item])


  function check1() {
    if (isChecked1 === true) {
      setIsChecked1(false)
    } else {
      setIsChecked1(true)
    }
  }
  function check2() {
    if (isChecked2 === true) {
      setIsChecked2(false)
    } else {
      setIsChecked2(true)
    }
  }

  function handleNavigateToOpenOrder() {
    navigation.navigate("OpenOrder")
    if(pedido == null){
      axios.post(baseUrl + "pedido/cadastrar",{
        pessoa:{
          id: userID
        },
        status: 0
      }).then(res => {
        console.log(res.data)
        console.log(pedido)
      }).catch(function (error){
        console.log(error)
      })
    }
  }


  function findArray(array, value) {
    return array.find((element) => {
      return element.id === value;
    })
  }

  function atualiza_tabela(){
    return (removedItem.map(removed => (findArray(removedItem,removed).nome + '\n')))
    }

  return (
    <>
    {item && 
    <>
      <Header title={item.nome} canGoBack={true} key={item.id}/>
      <View style={styles.content}>
          <Image style={styles.image} source={require("../../images/lanche2.png")} />
          <View style={styles.properties}>
            <AddQuantity title={true} />
            <View style={styles.row}>
            <Text style={styles.text}>Remover Algum Item?</Text>
            <Checkbox status={isChecked1 ? 'checked' : 'unchecked'} onPress={check1} color={colors.dividor} />
            </View>
            <DropDownPicker
          placeholder="Selecione os itens"
          textStyle={styles.dropdownText}
          labelStyle={styles.dropdownText}
          open={openRemove}
          value={removedItem}
          items={item.ingredientes.map(ingredient => ({
            label: ingredient.nome,
            value: ingredient.id
          }))}
          setOpen={setOpenRemove}
          setValue={setRemovedItem}
          style={styles.dropdown}
          placeholderStyle={{ color: colors.dividor }}
          dropDownContainerStyle={{ borderColor: colors.dividor }}
          selectedItemContainerStyle={{ height: 35 }}
          multiple={true}
        />
            <View style={styles.table}></View>
            <View style={styles.row}>

            <Text style={styles.text}>Deseja Algum Item Adicional?</Text>
            <Checkbox status={isChecked2 ? 'checked' : 'unchecked'} onPress={check2} color={colors.dividor} />
            </View>

            <DropDownPicker
          placeholder="Selecione os itens"
          textStyle={styles.dropdownText}
          labelStyle={styles.dropdownText}
          open={openAdd}
          value={value}
          items={item.ingredientes.map(ingredient => ({
            label: ingredient.nome,
            value: ingredient.id
          }))}
          setOpen={setOpenAdd}
          setValue={setValue}
          style={styles.dropdown}
          placeholderStyle={{ color: colors.dividor }}
          dropDownContainerStyle={{ borderColor: colors.dividor }}
          selectedItemContainerStyle={{ height: 35 }}
          
        />
            <View style={styles.table}><Text style={styles.tableText}>{atualiza_tabela()}</Text></View>

          </View>
          <View style={styles.footer}>
            <Button title="Adicionar item" onPress={handleNavigateToOpenOrder} />
          </View>
      </View>
    </>
    }
    </>
  )
}