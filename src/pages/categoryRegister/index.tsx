import Header from "../../components/Header";
import React, { useState } from "react";
import { Text, TouchableOpacity, View, Image} from 'react-native'
import Input from "../../components/textInput";
import RegisterInput from "../../components/RegisterInput";
import { styles } from "./styles";
import { Feather } from '@expo/vector-icons';
import { colors } from "../../styles/colors";
import axios from "axios";
import { baseUrl } from "../../config/globalConfig";
import Button from "../../components/Button";
import * as ImagePicker from 'expo-image-picker';



export default function CategoryRegister(){
  const [name, setName] = useState("")
  const [image,setImage] = useState('');

  function Register(){

    //ajustar para registrar na empresa do usuário logado

    axios.post(baseUrl + "/categoria/cadastrar", {
      nome: name,
      // imagemUrl: image
      //quando estiver ajustado, cadastrar imagem também
    })
      .then(res => {
        console.log(res.data);
        console.log(image);
      }).catch(function (error) {
        console.log(error);
      })
  }

  async function handleSelecionarFoto(){
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 2],
      quality: 1,
    });
  
    console.log(result);
  
    if (!result.cancelled) {
      //caso apareça erro no uri, IGNORAR, o problema é no visual studio (compila normalmente)
      setImage(result.uri);
    }
  
  }

  return(
    <>
    <Header title="Cadastrar Categoria" canGoBack={true}/>
    <View style={styles.content}>
      <View>
    <RegisterInput labelName="Nome" title="Nome" onChangeText={setName}/>
    <Text style={styles.text}>Imagem da categoria</Text>
    {/* se não existe imagem, mostrar o botão */}
    {!image ?     
        <View
          style={styles.imageSelector}
          
          >
          <TouchableOpacity
          onPress={handleSelecionarFoto}
          // disabled={disableButton}
          // style={disableButton ? { display: "none" } : styles.imageSelector}
          >
            <View style={styles.dashedBox}>

              <Feather name="plus" size={60} color={colors.text} />
            </View>
          </TouchableOpacity>
        </View>
        :
        // se existe imagem, mostrar a imagem
        <TouchableOpacity
          onPress={handleSelecionarFoto}
          >
            <Image source={{uri: image}} style={styles.image}/>
          </TouchableOpacity>
      }
      </View>
        <View style={styles.footer}>
          <Button title="Cadastrar Categoria" onPress={Register} />
        </View>
    </View>
    </>
  )
}