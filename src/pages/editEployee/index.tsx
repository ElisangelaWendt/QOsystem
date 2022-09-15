import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import DropBox from "../../components/DropBox";
import Header from "../../components/Header";
import RegisterInput from "../../components/RegisterInput";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import Button from "../../components/Button";

export default function EditEmployee() {
  return (
    <>
      <Header title="Editar Funcionário" canGoBack={true} />
      <View style={styles.container}>
        <RegisterInput
          labelName="Informe o nome do Funcionário"
          title="Nome"
        />
        <DropBox title="Cargo" placeholder="Selecione um Cargo" />
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
          {/* botão excluir */}
          <TouchableOpacity style={styles.buttonContainer} >
            <Text style={styles.text}>Excluir Funcionário</Text>
          </TouchableOpacity>
          {/* botão cadastrar */}
          <Button title="Cadastrar" />
        </View>

      </View>
    </>
  )
}