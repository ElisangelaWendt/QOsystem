import Header from "../../components/Header";
import { Table, Row, Rows} from 'react-native-table-component';
import styles from "./styles";
import { colors } from "../../styles/colors";
import React from "react";
import { ScrollView, View } from "react-native";
import Button from "../../components/Button";
import { Feather } from "@expo/vector-icons";

export default function CompleteOrder(){
  const HeadTable = ['Quantidade', 'Item', 'Adicional', 'Remover']
// Trazer dados da API
const DataTable = [
  ['1', 'Nome do lanche', '', ''],
  ['2', 'Nome do lanche', '', ''],
  ['3', 'Nome do lanche', '', ''],
] 

  return(
    <View style={{height:"100%", flex:1, justifyContent:"space-between"}}>

    <Header title="Pedido 01" canGoBack={true}/>
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