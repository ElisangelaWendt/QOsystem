import { LinearGradient } from "expo-linear-gradient";
import { Text, Dimensions, Image, View } from "react-native";
import { styles } from './styles'
import { colors } from '../../styles/colors'
import NumberInput from "../../components/numberInput";
import { useState } from "react";
import { Feather } from '@expo/vector-icons';

export default function PasswordRecovery() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <LinearGradient style={styles.container} colors={[colors.lightGradient, colors.darkGradient]}>
        <View>
        <Image source={require('../../images/logo.png')} style={styles.image} />
        <Text style={styles.text}>
          Verifique seu e-mail e informe o {'\n'}código de verificação enviado.
        </Text>
        <View style={styles.row}>
          <NumberInput labelName="*" tipoTeclado={"numeric"}/>
          <NumberInput labelName="*" tipoTeclado={"numeric"}/>
          <NumberInput labelName="*" tipoTeclado={"numeric"}/>
          <NumberInput labelName="*" tipoTeclado={"numeric"}/>
          <NumberInput labelName="*" tipoTeclado={"numeric"}/>
        </View>
        <Text>
          Enviar o código novamente
        </Text>
      <Feather name="arrow-right-circle" size={61} style={{paddingTop:60, alignSelf:"center"}}/>
        </View>
      <Text style={styles.footer}>
        Version 1.0.0 powered by APLTDA
      </Text>
    </LinearGradient>
  )
}