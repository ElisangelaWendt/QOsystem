import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Divider } from "react-native-paper";
import Button from "../../../components/Button";
import Header from "../../../components/Header";
import ErrorModal from "../../../components/Modal";
import Input from "../../../components/RegisterInput";
import { baseUrl } from "../../../config/globalConfig";
import { colors } from "../../../styles/colors";
import { styles } from "./styles";

interface Employee {
  conta: string,
  id: number
}


export default function EmployeeExclusion() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [employee, setEmployee] = useState<Employee[]>([]);
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    axios.get(baseUrl + "conta/listar", {})
      .then(res => {
        setEmployee(res.data)
        // console.log(employee)
      }).catch(function (error) {
        console.log(error);
      })
  }, [employee])


  function Delete(){
    axios.delete(baseUrl + "conta/deletar",{
      data:{
        id: value
      }
    }).then(res => {
      console.log(res)
      setVisible(true)
    }).catch(function (error){
      console.log(error);
    })
  }

  function OnRequestClose(){
    setVisible(false)
  }

  return (
    <>
      <Header title="Excluir Funcionário" canGoBack={true} />
      <ErrorModal visible={visible} functionOnRequestClose={OnRequestClose} text="Funcionário excluído com sucesso!" />
      <View style={styles.content}>
      <Text style={styles.text}>Excluir funcionário</Text>
        <DropDownPicker
          
          placeholder="Selecione o Funcionário"
          textStyle={styles.dropdownText}
          labelStyle={styles.dropdownText}
          open={open}
          value={value}
          items={employee.map(employee => ({ label: employee.conta, value: employee.id }))}
          setOpen={setOpen}
          setValue={setValue}
          style={styles.dropdown}
          placeholderStyle={{ color: colors.dividor }}
          dropDownContainerStyle={{ borderColor: colors.dividor }}
          selectedItemContainerStyle={{ height: 35 }}

        />
        <View style={styles.footer}>
          <Button title="Excluir Funcionário" onPress={Delete} />
        </View>
        </View>
    </>
  )
}