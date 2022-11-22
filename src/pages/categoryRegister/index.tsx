import Header from "../../components/Header";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Image } from 'react-native'
import RegisterInput from "../../components/RegisterInput";
import { styles } from "./styles";
import { Feather } from '@expo/vector-icons';
import { colors } from "../../styles/colors";
import axios from "axios";
import { baseUrl, gdrive } from "../../config/globalConfig";
import Button from "../../components/Button";
import * as ImagePicker from 'expo-image-picker';
import { empresa } from "../login";
import ErrorModal from "../../components/Modal";


export default function CategoryRegister({navigation}: any) {
  const [name, setName] = useState("")
  const [image, setImage] = useState('')
  const [visible, setVisible] = useState(false)
  const [image64, setImage64] = useState('');

  
  function Register() {
    async function teste() {

      // Responsavel pelo Upload
      const id = (await gdrive.files.newMultipartUploader()
        .setData(image64, "image/png") // 1° conteudo; 2° Tipo de arquivo 
        .setIsBase64(true) // identificando se esta mandando texto ou Base64
        .setRequestBody({
          //parent:['root'] -- Opcional - Pasta aonde sao salvo os arquivos
          name: name + '_' + '.png'// nome do arquivo
        })
        .execute()
      ).id;

      /*/ -- so pra testar puxando a imagem do Google Drive
      const retorno = await gdrive.files.getBinary(id) // funcao responsavel por Buscar o Item ( OBRIGATORIO ID do item)
      const base64Flag = "data:image/jpeg;base64,";
      const b64Image = await base64Flag + Buffer.from(retorno).toString("base64");
      setImage(b64Image);
      *////////////////////////////////////// 

      var fileName = '';// so pra fins de NADA kkk
      fileName = id;

      axios.post(baseUrl + "categoria/cadastrar",{
    nome: name,
    empresa:{
      id: empresa
    },
    imagem: id
  }).then(res => {
    setVisible(true)
  }).catch(function (error){
    console.log(error)
  })
      return id
    }

    teste();


  }

  async function handleSelecionarFoto() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: true,
      aspect: [4, 2],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      //caso apareça erro no uri, IGNORAR, o problema é no visual studio (compila normalmente)
      setImage(result.uri);
      setImage64(result.base64);
    }

  }

  function OnRequestClose(){
    setVisible(false)
    navigation.navigate("Menu")
  }

  return (
    <>
      <Header title="Cadastrar Categoria" canGoBack={true} />
      <ErrorModal visible={visible} text="Categoria Cadastrada com Sucesso!" functionOnRequestClose={OnRequestClose} />
      <View style={styles.content}>
        <View>
          <RegisterInput labelName="Nome" title="Nome" onChangeText={setName} />
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
              <Image source={{ uri: image }} style={styles.image} />
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