import axios from "axios";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import AddQuantity from "../../components/AddQuantity";
import Button from "../../components/Button";
import Header from "../../components/Header";
import { baseUrl } from "../../config/globalConfig";
import styles from "./styles";
import { empresa, userID } from '../login'
import DropDownPicker from "react-native-dropdown-picker";
import { colors } from "../../styles/colors";
import pedidoItem from '../itemDetails'

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

export default function OpenOrder({ navigation }: any) {
  const [openOrder, setOpenOrder] = useState<Order>()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState()
  const [tables, setTables] = useState<Table[]>([])
  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    //buscar todas as mesas daquela empresa
    axios.post(baseUrl + "mesa/buscar/empresa", {
      id: empresa
    }).then(res => {
      setTables(res.data)
    }).catch(function (error) {
      // console.log(error)
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
        // console.log(res.data)
      }).catch(function (error) {
        console.log(error);
      })

    // console.log(openOrder)
    //se não tiver nenhum pedido aberto para aquele usuário, criar um novo
    
  }, [])

  useEffect(() => {
    if (!openOrder || !openOrder[0].id) {
      console.log("criou novo pedido")
      // axios.post(baseUrl + "pedido/cadastrar",{
      //   status: 0,
      //   mesa:{
      //     id: table
      //   },
      //   pessoa:{
      //     id: userID
      //   }
      // }).then(res =>{
      //   console.log(res.data)
      //   setOpenOrder(res.data)
      // }).catch(function (error) {
      //   console.log(error)
      // })
      if (openOrder && openOrder[0].id && pedidoItem != null) {
        console
      }
    }else{
    console.log("não criou pedido")

    }
  },[])
  
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

  function handleSendToKitchen(){
    // altera o status do pedido para 1 (envia para a cozinha)
    console.log("enviou para a cozinha")
    // axios.put(baseUrl + "pedido/editar",{
    //   id: openOrder[0].id,
    //   status: 1
    // }).then(res => {
    //   console.log(res.data)
    //   navigation.navigate("Home")
    // })
  }

  return (
    <View style={styles.container}>
      <Header title="Concluir Pedido" canGoBack={true} />
      <View style={styles.content}>
        <View style={styles.text}>
          <Text style={styles.title}>Nome do lanche</Text>
          <Text style={styles.ingredients}>Ingredientes</Text>
          <Text style={styles.add}>Adicionar: ...</Text>
          <Text style={styles.remove}>Remover: ...</Text>
        </View>
        <View style={{ alignItems: "center", marginRight: 20, marginBottom: 10 }}>

          <Image style={styles.image} source={require("../../images/lanche1.png")} />
          <AddQuantity quantity={quantity} title={true} functionAdd={handleAddQuantity} functionRemove={handleRemoveQuantity} />
        </View>
      </View>
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
      <View style={styles.footer}>
        <View style={{marginRight:15}}>

        <Button title="Adicionar mais itens" onPress={handleNavigateToHome}/>
        </View>
        <Button title="Confirmar pedido" onPress={handleSendToKitchen} />
      </View>

    </View>
  )
}