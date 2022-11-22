import React, { useEffect, useState } from "react";
import { View, Image, ScrollView, Text, TouchableOpacity, Dimensions } from "react-native";
import AddQuantity from "../../components/AddQuantity";
import Button from "../../components/Button";
import Header from "../../components/Header";
import styles from "./styles";
import { Checkbox } from "react-native-paper";
import { colors } from "../../styles/colors";
import axios from "axios";
import { baseUrl,gdrive } from "../../config/globalConfig";
import { useRoute } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import { userID } from "../login";
import {  Buffer} from "buffer";

interface Item {
  imagem : string
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

interface Order {
  id: number,
  mesa: {
    id: number
  }
}

export var pedidoItem = null;
export var quantidadeItem = null;
export var idItemSelected = null;

export default function ItemDetails({ navigation }: any) {
  const [isChecked1, setIsChecked1] = useState(false)
  const [isChecked2, setIsChecked2] = useState(false)
  const [item, setItem] = useState<Item>();
  const route = useRoute();
  const params = route.params as ItemId;
  const [observacao, setObservacao] = useState()
  const [openRemove, setOpenRemove] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [value, setValue] = useState([]);

  const [removedItem, setRemovedItem] = useState([])
  const [openOrder, setOpenOrder] = useState<Order>()
  const [quantity, setQuantity] = useState(0)
  var itemId = false;
  var json;
  const [warning, setWarning] = useState(false)

  useEffect(() => {
    axios.post(baseUrl + "item/buscar", {
      id: params.id
    })
      .then(res => {
        setItem(res.data)
        busca_imagem(res.data) 
      }).catch(function (error) {
        console.log(error);
      })
      
       
    //verificar se já há um pedido aberto para o usuário que está logado
    axios.post(baseUrl + "pedido/buscar/status/pessoa", {
      status: 0,
      pessoa: {
        id: userID
      }
    })
      .then(res => {
        setOpenOrder(res.data)
        pedidoItem = null;
        quantidadeItem = null;
        idItemSelected = null;
      }).catch(function (error) {
        console.log(error);
      })
     
      
  }, [])

async function busca_imagem(categoria){

    const retorno = await gdrive.files.getBinary(categoria.imagem) // funcao responsavel por Buscar o Item ( OBRIGATORIO ID do item)
    const base64Flag = "data:image/png;base64,";
    const b64Image =  base64Flag + Buffer.from(retorno).toString("base64");

    json =   `{ "id" : ${categoria.id},"imagem" : "${b64Image}","nome" : "${categoria.nome }","ingredientes" : [${categoria.ingredientes.map(ingrediente =>{ return '{ "nome":"'+ingrediente.nome+'","id":"'+ingrediente.id+'"}'}) }]}`;

    setItem( JSON.parse(`${json}`) ) 
}


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
   
    try {
      if (openOrder[0].id) {
        itemId = true;
      }

    } catch (error) {
      // console.log(error)
      itemId = false;

    }
    //se a quantidade não estiver zerada, prossegue para o cadastro
    if (quantity != 0 && quantity != null) {
      setWarning(false)
      if (!itemId) {
        axios.post(baseUrl + "pedidoItem/cadastrar", {
          item: {
            id: params.id
          },
          quantidade: quantity
        }).then(res => {
          pedidoItem = (res.data.id)
          quantidadeItem = (res.data.quantidade)
          idItemSelected = (res.data.item.id)
          navigation.navigate("OpenOrder")
        }).catch(function (error) {
          console.log(error)
        })
      } else {
        axios.post(baseUrl + "pedidoItem/cadastrar", {
          item: {
            id: params.id
          },
          quantidade: quantity,
          pedido: {
            id: openOrder[0].id
          }
        }).then(res => {
          pedidoItem = null;
          quantidadeItem = null;
          idItemSelected = null;
          navigation.navigate("OpenOrder")
        }).catch(function (error) {
          console.log(error)
        })
    }
   }else{
    setWarning(true)
   }
  }
  function findArray(array, value) {
    return array.find((element) => {
      return element.id === value;
    })
  }

  function atualiza_tabela_removido() {
    return (removedItem.map(RemovedItem => (findArray(item.ingredientes, RemovedItem).nome + '\n')))
  }
  function atualiza_tabela_adicionado() {
    return (value.map(Value => (findArray(item.ingredientes, Value).nome + '\n')))
  }

  function handleAddQuantity() {
    setQuantity(quantity + 1)
  }

  function handleRemoveQuantity() {
    if (quantity <= 0) {
      setQuantity(0)
    } else {
      setQuantity(quantity - 1)
    }
  }


  return (
    <>
      {item &&
        <>
          <Header title={item.nome} canGoBack={true} key={item.id} />
          <View style={styles.content}>
           <Image style={styles.image} source={{uri : item.imagem}} />
            <View style={styles.properties}>
            <View style={{ flexDirection: 'row', marginVertical: 20 }}>
              <Text style={{opacity:0.5}}>Ingredientes: </Text>
                {item.ingredientes.map(ingredients => (
                  <Text key={ingredients.id} style={{opacity:0.5}}>{ingredients.nome};</Text>
                ))}
              </View>
              <AddQuantity quantity={quantity} title={true} functionAdd={handleAddQuantity} functionRemove={handleRemoveQuantity} />
              {warning &&
              <Text style={styles.warning}>A quantidade deve ser maior que zero</Text>}
              <View style={styles.row}>
                <Text style={styles.text}>Remover Algum Item?</Text>
                {/* <Checkbox status={isChecked1 ? 'checked' : 'unchecked'} onPress={check1} color={colors.dividor} /> */}
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
              <View style={styles.table}><Text style={styles.tableText}>{atualiza_tabela_removido()}</Text></View>
              <View style={styles.row}>

                <Text style={styles.text}>Deseja Algum Item Adicional?</Text>
                {/* <Checkbox status={isChecked2 ? 'checked' : 'unchecked'} onPress={check2} color={colors.dividor} /> */}
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
                multiple={true}
                
              />
              <View style={styles.table}><Text style={styles.tableText}>{atualiza_tabela_adicionado()}</Text></View>

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