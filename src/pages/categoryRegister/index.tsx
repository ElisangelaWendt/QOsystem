import Header from "../../components/Header";
import React from "react";
import { Text, TouchableOpacity, View} from 'react-native'
import Input from "../../components/textInput";
import RegisterInput from "../../components/RegisterInput";
import { styles } from "./styles";
import { Feather } from '@expo/vector-icons';
import { colors } from "../../styles/colors";


export default function CategoryRegister(){
  return(
    <View>
    <Header title="Cadastrar Categoria" canGoBack={true}/>
    <View style={styles.content}>
    <RegisterInput labelName="Nome" title="Nome"/>
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
    </View>
  )
}