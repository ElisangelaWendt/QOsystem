import React from "react";
import { ScrollView, View, Text } from "react-native";
import Button from "../../components/Button";
import DropBox from "../../components/DropBox";
import Header from "../../components/Header";
import { MenuButton } from "../../components/MenuButton";
import { styles } from "./styles";
import { Table, Row, Rows} from 'react-native-table-component';
import { colors } from "../../styles/colors";

export default function Orders({navigation}){
const HeadTable = ['Quantidade', 'Item', 'R$']
// Trazer dados da API
const DataTable = [
  ['1', 'Nome do lanche', '10,80'],
  ['2', 'Exemplo maior de nome de lanche', '16,50'],
  ['3', 'Exemplo maior de nome de lanche', '16,50'],
  ['4', 'Exemplo maior de nome de lanche', '16,50'],
  ['5', 'Exemplo maior de nome de lanche', '16,50'],
  ['6', 'Exemplo maior de nome de lanche', '16,50'],
  ['7', 'Exemplo maior de nome de lanche', '16,50'],
  ['7', 'Exemplo maior de nome de lanche', '16,50'],
  ['7', 'Exemplo maior de nome de lanche', '16,50'],
  ['8', 'Exemplo maior de nome de lanche', '16,50']
]  
const Total = [
  ['', 'Total', '27,30'],
]  

  return(
    <View style={{height:"100%", flex:1, justifyContent:"space-between"}}>
      <ScrollView>
      <View>
      <Header title="Pedidos em aberto" canGoBack={false}/>
      <View style={styles.container}>
      {/* <MenuButton title="" onPress={() => navigation.dispatch(DrawerActions.openDrawer())}/> */}

      <DropBox title="" placeholder="Mesa" />
      <View style={styles.table}>
      <Table borderStyle={{borderWidth: 1, borderColor: colors.dividor}}>
        <Row data={HeadTable} style={styles.headStyle} textStyle={styles.tableText}/>
        <Rows data={DataTable} textStyle={styles.tableText}/>
        <Rows data={Total} textStyle={styles.totalText}/>
      </Table>
      </View>
    </View>
      </View>
    <View style={styles.footer}>
      <Button title="Finalizar Venda"/>
      </View>
      </ScrollView>

    </View>
  )
}