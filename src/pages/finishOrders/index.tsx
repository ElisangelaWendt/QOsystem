import React, { useState } from "react";
import { ScrollView, View, Text } from "react-native";
import Button from "../../components/Button";
import Header from "../../components/Header";
import { styles } from "./styles";
import { Table, Row, Rows } from 'react-native-table-component';
import { colors } from "../../styles/colors";
import DropDownPicker from "react-native-dropdown-picker";

export default function FinishOrders({ navigation }) {
  const HeadTable = ['Quantidade', 'Item', 'R$']
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState()


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
    ['7', 'Exemplo maior de nome de lanche', '16,50'],
    ['7', 'Exemplo maior de nome de lanche', '16,50'],
    ['8', 'Exemplo maior de nome de lanche', '16,50']
  ]
  const Total = [
    ['', 'Total', '27,30'],
  ]

  return (
    <View style={{ height: "100%", justifyContent: "space-between" }}>
      <View>
        <Header title="Pedidos em aberto" canGoBack={false} />

        <DropDownPicker
          placeholder="mesa"
          textStyle={styles.dropdownText}
          labelStyle={styles.dropdownText}
          open={open}
          value={value}
          items={[{ label: "mesa 1", value: 1 }]}
          setOpen={setOpen}
          setValue={setValue}
          style={styles.dropdown}
          placeholderStyle={{ color: colors.dividor }}
          dropDownContainerStyle={{ borderColor: colors.dividor }}
          selectedItemContainerStyle={{ height: 35 }}
        />
        <ScrollView>
        <View style={styles.container}>
          <View style={styles.table}>
            <Table borderStyle={{ borderWidth: 1, borderColor: colors.dividor }}>
              <Row data={HeadTable} style={styles.headStyle} textStyle={styles.tableText} />
              <Rows data={DataTable} textStyle={styles.tableText} />
              <Rows data={Total} textStyle={styles.totalText} />
            </Table>
          </View>
          <View style={styles.footer}>
            <Button title="Finalizar Venda" />
          </View>
          </View>
        </ScrollView>
      </View>

    </View>
  )
}