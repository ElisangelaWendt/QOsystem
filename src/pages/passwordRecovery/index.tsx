import { LinearGradient } from "expo-linear-gradient";
import { Text, Image, View, TouchableOpacity } from "react-native";
import { styles } from './styles'
import { colors } from '../../styles/colors'
import NumberInput from "../../components/numberInput";
import { useEffect, useRef, useState } from "react";
import { Feather } from '@expo/vector-icons';
import BackButton from "../../components/BackButton";

export default function PasswordRecovery({navigation}: any) {
  const [count, setCount] = useState('')
  const [code, setCode] = useState([ '', '', '','' , '']);
  const secondInput = useRef(null);

  useEffect(() => {
    console.log('teste')

  },[code])
  function handleNavigateToHome(){
    
    // navigation.navigate('');
  }

  return (
    <LinearGradient style={styles.container} colors={[colors.lightGradient, colors.darkGradient]}>
      <View>
      <View style={{alignSelf: "flex-start"}}>
        <BackButton />
      </View>
        <Image source={require('../../images/logo.png')} style={styles.image} />
        <Text style={styles.text}>
          Verifique seu e-mail e informe o {'\n'}código de verificação enviado.
        </Text>
        <View style={styles.row}>
          <NumberInput labelName="*" tipoTeclado={"numeric"} 
          maxLength={1}
          onChangeText={setCode[0]}
          onSubmitEditing={() => {secondInput.current.focus()}}
          />
          <NumberInput 
          labelName="*" tipoTeclado={"numeric"} 
          reference={secondInput} 
          maxLength={1}
          />
          <NumberInput 
          labelName="*" 
          tipoTeclado={"numeric"}
          maxLength={1}
          />
          <NumberInput 
          labelName="*" 
          maxLength={1}
          tipoTeclado={"numeric"}/>
          <NumberInput 
          labelName="*" 
          maxLength={1}
          tipoTeclado={"numeric"}/>
        </View>
        <Text>
          Enviar o código novamente
        </Text>
      <View style={{ alignItems: 'center', paddingTop: 60 }}>
        <TouchableOpacity onPress={handleNavigateToHome}>
            <Feather  name="arrow-right-circle" size={60} color={colors.text} />
        </TouchableOpacity>
      </View>
      </View>
      <Text style={styles.footer}>
        Version 1.0.0 powered by APLTDA
      </Text>
    </LinearGradient>
  )
}