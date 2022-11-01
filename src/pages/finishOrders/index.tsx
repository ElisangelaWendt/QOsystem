import React, { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import Button from "../../components/Button";
import Header from "../../components/Header";
import { styles } from "./styles";
import { Table, Row, Rows } from 'react-native-table-component';
import { colors } from "../../styles/colors";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import { baseUrl, Ordena } from "../../config/globalConfig";
import { empresa } from "../login";
import ErrorModal from "../../components/Modal";

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

export default function FinishOrders({ navigation }) {
  const HeadTable = ['Quantidade', 'Item', 'R$']
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState()
  const [table, setTable] = useState<Table[]>([])

  const [pedido, setPedido] = useState<Pedido[]>([])
  const [empty, setEmpty] = useState(true)
  const [visible, setVisible] = useState(false)
  const [orderNumber, setOrderNumber] = useState([])

  var total = 0;

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
    axios.post(baseUrl + "pedidoItem/buscar/pedido/mesa/status", {
      pedido: {
        mesa: {
          id: value
        },
        status: 2
      }
    }).then(res => {
      setPedido(res.data)
      setEmpty(false)
    setOrderNumber(res.data[0].pedido.id)
    }).catch(function (error) {
      console.log(error)
      setEmpty(true)
    })
  }, [value])



  function SetOrderClosed() {
    //colocar com status de finalizada
    try{
      axios.put(baseUrl + "pedido/editar", {
        id: orderNumber,
        status: 3,
        mesa: {
          id: value
        }
      }).then(res => {
        setVisible(true)
      })
  }catch(error){

  }

  }

  function OnRequestClose(){
    setVisible(false)
  }

  return (
    <View style={{ height: "100%", justifyContent: "space-between" }}>
      <View>
        <Header title="Pedidos em aberto" canGoBack={false} />
        <ErrorModal visible={visible} functionOnRequestClose={OnRequestClose} text="Pedido encerrado!" />
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
        {value &&
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.table}>

                <Table borderStyle={{ borderWidth: 1, borderColor: colors.dividor }}>
                  <Row data={HeadTable} style={styles.headStyle} textStyle={styles.tableText} />
            {empty ? <Text>Nenhum pedido para essa mesa</Text> :

                  <Rows data={pedido.map(pedido => {
                    total = total + +pedido.item.valor;
                    return [pedido.quantidade,
                    pedido.item.nome,
                    pedido.item.valor]
                  })} textStyle={styles.tableText} />
                }
                   <Row data={['Valor Total','','R$ ' + total]} textStyle={styles.totalText} />
                </Table>
              </View>
              <View>
              </View>
              <View style={styles.footer}>
                <Button title="Finalizar Venda" onPress={SetOrderClosed} />
              </View>
            </View>
          </ScrollView>
        }
      </View>

    </View>
  )
}