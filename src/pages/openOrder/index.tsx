import axios from "axios";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import AddQuantity from "../../components/AddQuantity";
import Button from "../../components/Button";
import Header from "../../components/Header";
import { baseUrl, Ordena } from "../../config/globalConfig";
import styles from "./styles";
import { empresa, userID } from '../login'
import DropDownPicker from "react-native-dropdown-picker";
import { colors } from "../../styles/colors";
import { ScrollView } from "react-native-gesture-handler";
import { idItemSelected, pedidoItem, quantidadeItem } from "../itemDetails";

interface Order {
  id: number,
  mesa: {
    id: number
  }
}

interface Table {
  nome: string,
  id: number
}

interface Pedido {
  id: number,
  quantidade: number,
  item: {
    nome: string,
    ingredientes: {
      id: number,
      nome: string
    }
  }
}

export default function OpenOrder({ navigation }: any) {
  const [openOrder, setOpenOrder] = useState<Order>()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState()
  const [tables, setTables] = useState<Table[]>([])
  const [quantity, setQuantity] = useState(0)
  const [pedido, setPedido] = useState<Pedido[]>([])
  const [idPedido, setIdPedido] = useState(0)
  const [warning, setWarning] = useState(false)
  const [procurar, setProcurar] = useState(0)

  useEffect(() => {
    //buscar todas as mesas daquela empresa
    axios.post(baseUrl + "mesa/buscar/empresa", {
      id: empresa
    }).then(res => {
      setTables(Ordena(res.data))
    }).catch(function (error) {
      console.log(error)
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
      }).catch(function (error) {
        console.log(error);
      })

    //se não tiver nenhum pedido aberto para aquele usuário, criar um novo sem a mesa
    if (pedidoItem != null && idPedido === 0) {
      console.log("criou novo pedido")
      axios.post(baseUrl + "pedido/cadastrar", {
        status: 0,
        pessoa: {
          id: userID
        }
      }).then(res => {
        setOpenOrder(res.data)
        setIdPedido(res.data.id)
      }).catch(function (error) {
        console.log(error)
      })
            
    }

  }, [])

  useEffect(() => {
    try{
    if(pedidoItem != null && idPedido){
      //alterar o pedido item feito para vincular ao pedido
      axios.put(baseUrl + "pedidoItem/editar", {
        id: pedidoItem,
        quantidade: quantidadeItem,
        pedido: {
          id: idPedido
        },
        item:{
          id: idItemSelected
        }
      }).then(res => {
        setPedido(res.data)
      }).catch(function (error) {
        console.log(error)
      })
    }
  }catch(error){
    console.log(error)
  }
  },[idPedido])

  useEffect(() => {
    try{
    if (openOrder != undefined && openOrder[0].id != undefined) {
      axios.post(baseUrl + "pedidoItem/buscar/pedido", {
        pedido: {
          id: openOrder[0].id
        }
      }).then(res => {
        setPedido(res.data)
      }).catch(function (error) {
        console.log(error)
      })
    }else{
      if(idPedido != 0){
        axios.post(baseUrl + "pedidoItem/buscar/pedido", {
          pedido: {
            id: idPedido
          }
        }).then(res => {
          setPedido(res.data)
        }).catch(function (error) {
          console.log(error)
        })
      }
    }
  }catch(error){
    // console.log(error)
  }
},[pedido])

  function handleNavigateToHome() {
    navigation.navigate("Home")
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

  function handleSendToKitchen() {
    // altera o status do pedido para 1 (envia para a cozinha)
    try{
    var pedido = (openOrder[0].id)
    console.log(pedido)
    if (value && pedido) {
      axios.put(baseUrl + "pedido/editar", {
        id: pedido,
        status: 1,
        mesa: {
          id: value
        }
      }).then(res => {
        setWarning(false)
        navigation.navigate("Home")
      })
    } else {
      setWarning(true)
    }
  }catch(error){

  }

  }

  return (
    <View style={styles.container}>
      <Header title="Concluir Pedido" canGoBack={true} />
      {pedido.map != undefined && 
      <ScrollView style={styles.scrollview}>
        {pedido.map(order => (
          <View style={styles.content} key={order.id}>

            <View style={styles.text} >
              <Text style={styles.title}>{order.item.nome}</Text>
              <Text style={styles.ingredients}>{order.item.ingredientes.nome}</Text>
              {/* <Text style={styles.add}>Adicionar: ...</Text> */}
              {/* <Text style={styles.remove}>Remover: ...</Text> */}
            </View>
            <View style={{ alignItems: "center", marginRight: 20, marginBottom: 10 }}>

              <Image style={styles.image} source={require("../../images/lanche1.png")} />
              <AddQuantity quantity={order.quantidade} title={true} functionAdd={handleAddQuantity} functionRemove={handleRemoveQuantity} />
            </View>
          </View>
        ))}
      </ScrollView>
      }

      <DropDownPicker
        placeholder="Selecione a mesa"
        textStyle={styles.dropdownText}
        labelStyle={styles.dropdownText}
        open={open}
        value={value}
        items={tables.map(mesa => ({
          label: mesa.nome,
          value: mesa.id
        }))}
        setOpen={setOpen}
        setValue={setValue}
        style={styles.dropdown}
        placeholderStyle={{ color: colors.dividor }}
        dropDownContainerStyle={{ borderColor: colors.dividor }}
        selectedItemContainerStyle={{ height: 35 }}
      />
      {warning &&
      <Text style={styles.warning}>A mesa deve ser selecionada</Text>
      }
      <View style={styles.footer}>
        <View style={{ marginRight: 15 }}>

          <Button title="Adicionar mais itens" onPress={handleNavigateToHome} />
        </View>
        <Button title="Confirmar pedido" onPress={handleSendToKitchen} />
      </View>

    </View>
  )
}