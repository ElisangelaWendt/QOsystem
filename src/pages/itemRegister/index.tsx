import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Button from "../../components/Button";
import Header from "../../components/Header";
import ErrorModal from "../../components/Modal";
import Input from "../../components/RegisterInput";
import { baseUrl, gDriveToken } from "../../config/globalConfig";
import { colors } from "../../styles/colors";
import { empresa } from "../login";
import styles from "./styles";
import * as ImagePicker from 'expo-image-picker';
import { Feather } from "@expo/vector-icons";
import {
  GDrive,
  MimeTypes
} from "@robinbobin/react-native-google-drive-api-wrapper";
import { Buffer } from "buffer";
import { TextInputMask } from "react-native-masked-text";

interface Category {
  nome: string,
  id: number
}

interface Ingredient {
  nome: string,
  id: number,
  valor: number
}

interface Ingrediente{
  id: number
}

export default function ItemRegister({ navigation }: any) {
  const [name, setName] = useState("")
  const [valor, setValor] = useState("")
  const [categoria, setCategoria] = useState<Category[]>([])
  const [ingrediente, setIngrediente] = useState<Ingredient[]>([])
  const [valueCategory, setValueCategory] = useState(null);
  const [valueIngredient, setValueIngredient] = useState([]);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [ingredientObj, setIngredientObj] = useState<Ingrediente[]>([]);
  var totalValue= 0;
  var ingredientValues = [];

  const [image, setImage] = useState('');
const [image64,setImage64] = useState('');

  const [visible, setVisible] = useState(false)

  const gdrive = new GDrive();
// /* ACESSTOKEN dura 2 horas em Media */
gdrive.accessToken = gDriveToken
gdrive.fetchCoercesTypes = true;
gdrive.fetchRejectsOnHttpErrors = true;
gdrive.fetchTimeout = 30000; /* Necessario pra nao dar TimeOut */

  useEffect(() => {
    axios.get(baseUrl + "categoria/listar", {})
      .then(res => {
        setCategoria(res.data)
      }).catch(function (error) {
        console.log(error);
      })


    axios.post(baseUrl + "ingrediente/buscar/empresa", {
      id: empresa
    })
      .then(res => {
        setIngrediente(res.data)
      }).catch(function (error) {
        console.log(error);
      })
  }, [])


  function Register() {

    var json = '['
    for (let x = 0; x < valueIngredient.length; x++) {
      json = json + '{"id" :' + valueIngredient[x] + '},'
    }
    json = json.substring(0, json.length - 1) + ']';

    json = (JSON.parse(json))

  // async function teste(){
  //   //console.log(await gdrive.files.list()); --- Comando Lista os items do Drive
  //   const fileName = image.split('/').pop();
  //   // Responsavel pelo Upload
  //   const id = (await gdrive.files.newMultipartUploader()
  //     .setData(image64, "image/png") // 1° conteudo; 2° Tipo de arquivo 
  //     .setIsBase64(true)// identificando se esta mandando texto ou Base64
  //     .setRequestBody({
  //       //parent:['root'] -- Opcional - Pasta aonde sao salvo os arquivos
  //       name: fileName // nome do arquivo
  //     })
  //     .execute()
  //   ).id;

  // // -- so pra testar puxando a imagem do Google Drive
  //   const retorno = await gdrive.files.getBinary(id) // funcao responsavel por Buscar o Item ( OBRIGATORIO ID do item)
  //   const base64Flag = "data:image/jpeg;base64,";
  //   const b64Image = await base64Flag + Buffer.from(retorno).toString("base64");
  //   setImage(b64Image);
  //  ////////////////////////////////////// 
    
  //  return id
  // }
  // const id = teste();

  var valueFormatted = valor.replace(/[^0-9]/g, '')

    axios.post(baseUrl + "item/cadastrar", {
      nome: name,
      categoria: {
        id: valueCategory
      },
      valor: valueFormatted,
      ingredientes: json,
      // imagem: id
      //cadastrar imagem
    })
      .then(res => {
        console.log(res.data)
        setVisible(true)
      }).catch(function (error) {
        console.log(error);
      })
  }

  async function handleSelecionarFoto() {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64:true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      //caso apareça erro no uri, IGNORAR, o problema é no visual studio (compila normalmente)
      setImage(result.uri);
    setImage64(result.base64);
    }

  }

  function onRequestClose() {
    setVisible(false)
    navigation.navigate("Menu")
  }

  function findArray(array, value) {
    return array.find((element) => {
      return element.id === value;
    })
  }

  function atualiza_tabela() {
    ingredientValues = (valueIngredient.map(Valueingrediente => (findArray(ingrediente, Valueingrediente).valor)))

    for(var x = 0; x < ingredientValues.length; x++){
      totalValue = totalValue + ingredientValues[x]
    }
    totalValue = totalValue/100
    return (valueIngredient.map(Valueingrediente => (findArray(ingrediente, Valueingrediente).nome + '\n')))

  }

  function currencyFormat(num) {
    return 'R$ ' + num.toFixed(2).replace('.', ',', ' ')
  }

  return (
    <>
      <Header title="Cadastrar Item" canGoBack={true} />
      <ErrorModal visible={visible} text="Cadastrado com Sucesso!" functionOnRequestClose={onRequestClose} />
      <View style={styles.content}>
        <Input labelName="Nome do Item" title="Nome" onChangeText={setName} />

        <DropDownPicker
          placeholder="Categoria"
          textStyle={styles.dropdownText}
          labelStyle={styles.dropdownText}
          open={open}
          value={valueCategory}
          items={categoria.map(category => ({ label: category.nome, value: category.id }))}
          setOpen={setOpen}
          setValue={setValueCategory}
          style={styles.dropdown}
          placeholderStyle={{ color: colors.dividor }}
          dropDownContainerStyle={{ borderColor: colors.dividor }}
          zIndex={3000}
          zIndexInverse={1000}
        />
          <View style={styles.inputGroup}>
        <TextInputMask
            type={'money'}
            onChangeText={setValor}
            style={styles.input}
            placeholder="R$ 00,00"
          />
          </View>
        <DropDownPicker
          placeholder="Ingredientes"
          textStyle={styles.dropdownText}
          labelStyle={styles.dropdownText}
          open={open1}
          value={valueIngredient}
          items={ingrediente.map(ingredient => ({ label: ingredient.nome, value: ingredient.id }))}
          setOpen={setOpen1}
          setValue={setValueIngredient}
          style={styles.dropdown}
          placeholderStyle={{ color: colors.dividor }}
          dropDownContainerStyle={{ borderColor: colors.dividor, paddingBottom: 20 }}
          selectedItemContainerStyle={{ height: 35 }}
          multiple={true}
          zIndex={2000}
          zIndexInverse={2000}
        />
        {valueIngredient &&
          <>
            <View style={styles.table}>
              <Text style={styles.tableText}>{atualiza_tabela()}</Text>
            </View>
            <View>
            <Text>Preço de custo:{currencyFormat(totalValue) }</Text>
            </View>
          </>
        }
        <Text style={styles.title}> Imagem do item</Text>
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
        <Button title="Cadastrar" onPress={Register} />
      </View>
    </>
  )
}