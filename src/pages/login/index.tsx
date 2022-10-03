import { LinearGradient } from "expo-linear-gradient";
import { Text, Dimensions, Image, View, TouchableOpacity } from "react-native";
import { styles } from './styles'
import { colors } from '../../styles/colors'
import Input from "../../components/textInput";
import { useEffect, useRef, useState } from "react";
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import { baseUrl } from '../../config/globalConfig';
import ErrorModal from "../../components/Modal";

//pode ser acessado por qualquer função de qualquer arquivo
export var empresa;

export default function Login({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const secondInput = useRef(null);
  const [visible, setVisible] = useState(false)

  function handleNavigateToPasswordRecovery() {
    navigation.navigate('PasswordRecovery');
  }


  function logar() {
    axios.post(baseUrl + "conta/buscar", {
      conta: email,
      senha: password
    }
    )
      .then(res => {
        // console.log(res.data);
        empresa = (res.data[0].pessoa.cargo.empresa.id);
        navigation.navigate('BottomTab');
    console.log(empresa)
      }).catch(function (error) {
        console.log(error);
        //login ou senha incorretos
        //abre modal
        setVisible(true)
      })
  }

  function CloseModal() {
    setVisible(false)
  }

  return (
    <LinearGradient style={styles.container} colors={[colors.lightGradient, colors.darkGradient]}>
      <ErrorModal visible={visible} text={"Credenciais inválidas"} functionOnRequestClose={CloseModal} />
      <View>
        <Image source={require('../../images/logo.png')} style={styles.image} />
        <Text style={styles.text}>
          Bem-vindo ao QO SYSTEM
        </Text>
        <Input
          labelName="Email"
          tipoTeclado={"email-address"}
          onChangeText={setEmail}
          onSubmitEditing={() => { secondInput.current.focus() }}
        />
        <Input
          icon={true}
          labelName="Senha"
          tipoTeclado={"password"}
          onChangeText={setPassword}
          reference={secondInput}

        />
        <Text onPress={handleNavigateToPasswordRecovery}>
          Esqueceu sua senha?
        </Text>
        <View style={{ alignItems: 'center', paddingTop: 60 }}>
          <TouchableOpacity onPress={logar}>
            <Feather name="arrow-right-circle" size={60} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.footer}>
        Version 1.0.0 powered by APLTDA
      </Text>
    </LinearGradient>
  )
}