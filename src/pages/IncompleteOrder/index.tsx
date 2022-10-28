import Header from "../../components/Header";
import { Table, Row, Rows } from 'react-native-table-component';
import styles from "./styles";
import { colors } from "../../styles/colors";
import React, { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import Button from "../../components/Button";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { baseUrl, Ordena } from "../../config/globalConfig";
import DropDownPicker from "react-native-dropdown-picker";
import { empresa } from "../login";

interface Pedido {
  id: number,
  quantidade: number,
  pedido: {
    id: number,
    status: number
  },
  mesa: {
    id: number,
    nome: string
  },
  item: {
    id: number,
    nome: string,
    valor: number
  }
}

interface Table {
  nome: string,
  id: number
}


export default function IncompleteOrder() {
  const HeadTable = ['Quantidade', 'Item']
  const [pedido, setPedido] = useState<Pedido[]>([])
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState()
  const [table, setTable] = useState<Table[]>([])
  const [empty, setEmpty] = useState(true)

  // Trazer dados da API

  useEffect(() => {
    // axios.get(baseUrl + "/pedido/listar")
    axios.post(baseUrl + "mesa/buscar/empresa", {
      id: empresa
    }).then(res => {
      setTable(Ordena(res.data))
    }).catch(function (error) {
      console.log(error)
    })
  }, [])

  useEffect(() => {
    console.log(value)
    axios.post(baseUrl + "pedidoItem/buscar/pedido/mesa", {
      pedido: {
        mesa: {
          id: value
        }
      }
    }).then(res => {
      setPedido(res.data)
      setEmpty(false)
    }).catch(function (error) {
      console.log(error)
      setEmpty(true)
    })
  }, [value])

  return (
    <View style={{ height: "100%", flex: 1, justifyContent: "space-between" }}>

      <Header title="Pedido 01" canGoBack={true} />
      <DropDownPicker
        placeholder="Selecione a mesa"
        textStyle={styles.dropdownText}
        labelStyle={styles.dropdownText}
        open={open}
        value={value}
        items={table.map(table => ({
          label: table.nome,
          value: table.id
        }))}
        setOpen={setOpen}
        setValue={setValue}
        style={styles.dropdown}
        placeholderStyle={{ color: colors.dividor }}
        dropDownContainerStyle={{ borderColor: colors.dividor, marginVertical: 20, }}
      />
      <ScrollView>
        <View style={styles.table}>
          <Table borderStyle={{ borderWidth: 1, borderColor: colors.dividor }}>
            <Row data={HeadTable} style={styles.headStyle} textStyle={styles.tableText} />
            {/* estilizar */}
            {empty ? <Text>Nenhum pedido para essa mesa</Text> :
              <Rows data={pedido.map(pedido => {
                return [pedido.quantidade,
                pedido.item.nome]
              })} textStyle={styles.tableText} />
            }
          </Table>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Feather name="arrow-left" size={30} style={{ marginRight: 30 }} />
        <Button title="Finalizar Venda" />
        <Feather name="arrow-right" size={30} style={{ marginLeft: 30 }} />
      </View>
    </View>
  )
}