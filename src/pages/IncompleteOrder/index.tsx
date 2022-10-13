import Header from "../../components/Header";
import { Table, Row, Rows} from 'react-native-table-component';
import styles from "./styles";
import { colors } from "../../styles/colors";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import Button from "../../components/Button";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { baseUrl } from "../../config/globalConfig";
import { ItensPedido } from "../itemDetails";
import DropDownPicker from "react-native-dropdown-picker";

interface PedidoItem{
  id: number
}



export default function IncompleteOrder(){
  const HeadTable = ['Quantidade', 'Item', 'Adicional', 'Remover']
  const [pedido, setPedido] = useState<PedidoItem[]>([])
  const [open, setOpen] = useState(false)
  const [ value, setValue] = useState()


// Trazer dados da API

useEffect(() => {
  axios.post(baseUrl + "pedido/buscar/mesa",{
    //id da mesa
  }).then(res => {
    
  })
})

const DataTable = [
  ['1', 'Nome do lanche', '', ''],
  ['2', 'Nome do lanche', '', ''],
  ['3', 'Nome do lanche', '', ''],
] 

  return(
    <View style={{height:"100%", flex:1, justifyContent:"space-between"}}>

    <Header title="Pedido 01" canGoBack={true}/>
    <DropDownPicker
            placeholder="mesa"
            textStyle={styles.dropdownText}
            labelStyle={styles.dropdownText}
            open={open}
            value={value}
            items={[{label: "mesa 1", value: 1 }]}
            setOpen={setOpen}
            setValue={setValue}
            style={styles.dropdown}
            placeholderStyle={{ color: colors.dividor }}
            dropDownContainerStyle={{ borderColor: colors.dividor }}
            selectedItemContainerStyle={{ height: 35 }}
          />
    <ScrollView>
    <View style={styles.table}>
    <Table borderStyle={{borderWidth: 1, borderColor: colors.dividor}}>
        <Row data={HeadTable} style={styles.headStyle} textStyle={styles.tableText}/>
        <Rows data={DataTable} textStyle={styles.tableText}/>
      </Table>
    </View>
    </ScrollView>
    <View style={styles.footer}>
      <Feather name="arrow-left" size={30} style={{marginRight:30}}/>
      <Button title="Finalizar Venda"/>
      <Feather name="arrow-right" size={30} style={{marginLeft:30}}/>
      </View>
    </View>
  )
}