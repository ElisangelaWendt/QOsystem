import Header from "../../components/Header";
import React, { useState } from "react";
import { Text, TouchableOpacity, View} from 'react-native'
import Input from "../../components/textInput";
import RegisterInput from "../../components/RegisterInput";
import { styles } from "./styles";
import { Feather } from '@expo/vector-icons';
import { colors } from "../../styles/colors";
import axios from "axios";
import { baseUrl } from "../../config/globalConfig";
import Button from "../../components/Button";


export default function CategoryRegister(){
  const [name, setName] = useState("")

  function Register(){

    //ajustar para registrar na empresa do usuário logado

    axios.post(baseUrl + "/categoria/cadastrar", {
      nome: name
      //quando estiver ajustado, cadastrar imagem também
    })
      .then(res => {
        console.log(res.data);
      }).catch(function (error) {
        console.log(error);
      })
  }
  return(
    <>
    <Header title="Cadastrar Categoria" canGoBack={true}/>
    <View style={styles.content}>
      <View>
    <RegisterInput labelName="Nome" title="Nome" onChangeText={setName}/>
    <Text style={styles.text}>Imagem da categoria</Text>
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
      </View>
        <View style={styles.footer}>
          <Button title="Cadastrar Categoria" onPress={Register} />
        </View>
    </View>
    </>
  )
}