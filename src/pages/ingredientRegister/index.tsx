import React, { useState } from "react";
import { View, Text } from "react-native";
import { Checkbox } from "react-native-paper";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Input from "../../components/RegisterInput";
import { colors } from "../../styles/colors";
import { styles } from "./styles";

interface IngredientRegisterProps {
  checked: "checked" | "unchecked"
}

export default function IngredientRegister({ checked }: IngredientRegisterProps) {
  const [isChecked, setIsChecked] = useState(false)

  function check() {
    if (isChecked === true) {
      setIsChecked(false)
    } else {
      setIsChecked(true)
    }
  }

  return (
    <>
      <Header title="Cadastrar Ingrediente" canGoBack={true} />
      <View style={styles.content}>
        <View>
          <Input labelName="Nome do Ingrediente" title="Nome" />
          <Input labelName="Descrição do Ingrediente" title="Descrição" style={{ height: 70, fontSize: 20 }} multiline={true} />
          <Input labelName="Valor do Ingrediente" title="Valor" />
          <View style={styles.row}>
            <Text style={styles.text}>Pode ser Adicional?</Text>
            <Checkbox status={isChecked ? 'checked' : 'unchecked'} onPress={check} color={colors.dividor} />
          </View>
        </View>
        <View style={styles.footer}>
        <Button title="Cadastrar Ingrediente"/>
        </View>
      </View>
    </>
  )
}