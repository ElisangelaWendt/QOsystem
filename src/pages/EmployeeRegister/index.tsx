import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DropBox from "../../components/DropBox";
import Header from "../../components/Header";
import RegisterInput from "../../components/RegisterInput";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import Button from "../../components/Button";
import axios from "axios";
import { baseUrl } from "../../config/globalConfig";
import DropDownPicker from "react-native-dropdown-picker";

interface Cargos {
  nome: string,
  id: number
}

export default function EmployeeRegister() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [cargos, setCargos] = useState<Cargos[]>([]);

useEffect(() => {
  axios.get(baseUrl + "cargo/listar", {})
    .then(res => {
      setCargos(res.data)
    }).catch(function (error) {
      console.log(error);
    })
},[])


  return (
    <>
      <Header title="Novo Funcionário" canGoBack={true} />
      <View style={styles.container}>
        <RegisterInput
          labelName="Informe o nome do Funcionário"
          title="Nome"
        />
        <DropDownPicker
          placeholder="Selecione o cargo"
          textStyle={styles.dropdownText}
          labelStyle={styles.dropdownText}
          open={open}
          value={value}
          items={cargos.map(cargo => ({label: cargo.nome, value: cargo.id}))}
          setOpen={setOpen}
          setValue={setValue}
          style={styles.dropdown}
          placeholderStyle={{ color: colors.dividor }}
          dropDownContainerStyle={{ borderColor: colors.dividor }}
          selectedItemContainerStyle={{ height: 35 }}
          
        />
        <RegisterInput
          labelName="Informe o salário do funcionário"
          title="Salário"
        />
        <RegisterInput
          labelName="Informe o email do Funcionário"
          title="Email"
        />
        <RegisterInput
          labelName="Informe a senha do Funcionário"
          title="Senha"
          icon={true}
        />
        <Text style={styles.title}> Imagem do Funcionário</Text>
        <View
          style={styles.imageSelector}>
          <TouchableOpacity
          // onPress={handleSelecionarFoto}
          // disabled={disableButton}
          // style={disableButton ? { display: "none" } : styles.imageSelector}
          >
            <View style={styles.dashedBox}>

              <Feather name="plus" size={60} color={colors.text} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Button title="Cadastrar"/>
        </View>

      </View>
    </>

  )
}