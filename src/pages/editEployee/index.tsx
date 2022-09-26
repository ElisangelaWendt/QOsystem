import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import Header from "../../components/Header";
import RegisterInput from "../../components/RegisterInput";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import Button from "../../components/Button";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { baseUrl } from "../../config/globalConfig";
import DropDownPicker from "react-native-dropdown-picker";

interface EmployeeId {
  id: number
}

interface Employee {
  nome: string,
  cargo: {
    nome: string
  }
  id: number
}

interface Cargos {
  nome: string,
  id: number
}

export default function EditEmployee() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const route = useRoute();
  const params = route.params as EmployeeId;
  const [employee, setEmployee] = useState<Employee>();
  const [cargos, setCargos] = useState<Cargos[]>([]);


  useEffect(() => {
    axios.post(baseUrl + "pessoa/buscar", {
      id: params.id
    })
      .then(res => {
        setEmployee(res.data)

        // console.log("----------------------")
        // console.log(employee)

      }).catch(function (error) {
        console.log(error);
      })


    axios.get(baseUrl + "cargo/listar", {})
      .then(res => {
        setCargos(res.data)
      }).catch(function (error) {
        console.log(error);
      })

  },[employee])

  return (
    <>
    {!employee ? <Text>Erro</Text> :
      <><Header title="Editar Funcionário" canGoBack={true} /><View style={styles.container}>
          <RegisterInput
            labelName=""
            title="Nome"><Text>{employee.nome}</Text></RegisterInput>
           <DropDownPicker
          placeholder={employee.cargo.nome}
          textStyle={styles.dropdownText}
          labelStyle={styles.dropdownText}
          open={open}
          value={value}
          items={cargos.map(cargo => ({ label: cargo.nome, value: cargo.id }))}
          setOpen={setOpen}
          setValue={setValue}
          style={styles.dropdown}
          placeholderStyle={{ color: colors.dividor }}
          dropDownContainerStyle={{ borderColor: colors.dividor }}
          selectedItemContainerStyle={{ height: 35 }}

        />
          <RegisterInput
            labelName="Informe o salário do funcionário"
            title="Salário" />
          <RegisterInput
            labelName="Informe o email do Funcionário"
            title="Email" />
          <RegisterInput
            labelName="Informe a senha do Funcionário"
            title="Senha"
            icon={true} />

          <Text style={styles.title}> Imagem do Funcionário</Text>
          <View
            style={styles.imageSelector}>
            <TouchableOpacity
            >
              <View style={styles.dashedBox}>

                <Feather name="plus" size={60} color={colors.text} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.footer}>
            {/* botão excluir */}
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.text}>Excluir Funcionário</Text>
            </TouchableOpacity>
            <Button title="Salvar Informações" />
          </View>
        </View></>}
    </>
  )
}