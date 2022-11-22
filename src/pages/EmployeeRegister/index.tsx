import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Header from "../../components/Header";
import RegisterInput from "../../components/RegisterInput";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import Button from "../../components/Button";
import axios from "axios";
import { baseUrl, gdrive } from "../../config/globalConfig";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from 'expo-image-picker';
import ErrorModal from "../../components/Modal";
import { empresa } from "../login";
import { TextInputMask } from "react-native-masked-text";


interface Cargos {
  nome: string,
  id: number
}

export default function EmployeeRegister({navigation}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [cargos, setCargos] = useState<Cargos[]>([]);

  const [name, setName] = useState("")
  const [salary, setSalary] = useState("")
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [image, setImage] = useState('');
  const [visibleError, setVisibleError] = useState(false)
  const [visibleSuccess, setVisibleSuccess] = useState(false)
  const [image64, setImage64] = useState('');


  useEffect(() => {
    axios.post(baseUrl + "cargo/buscar/empresa", {
      id: empresa
    })
      .then(res => {
        setCargos(res.data)
      }).catch(function (error) {
        console.log(error);
      })
  }, [])

  function Register() {
    async function teste() {

      // Responsavel pelo Upload
      const id = (await gdrive.files.newMultipartUploader()
        .setData(image64, "image/png") // 1° conteudo; 2° Tipo de arquivo 
        .setIsBase64(true) // identificando se esta mandando texto ou Base64
        .setRequestBody({
          //parent:['root'] -- Opcional - Pasta aonde sao salvo os arquivos
          name: name + '_' + value + '.png'// nome do arquivo
        })
        .execute()
      ).id;

      /*/ -- so pra testar puxando a imagem do Google Drive
      const retorno = await gdrive.files.getBinary(id) // funcao responsavel por Buscar o Item ( OBRIGATORIO ID do item)
      const base64Flag = "data:image/jpeg;base64,";
      const b64Image = await base64Flag + Buffer.from(retorno).toString("base64");
      setImage(b64Image);
      *////////////////////////////////////// 

      var salaryFormatted = salary.replace(/[^0-9]/g, '')
      var fileName = '';// so pra fins de NADA kkk
      fileName = id;

      // cadastrar informações da conta
      await axios.post(baseUrl + "conta/cadastrar", {
        conta: user,
        senha: password,
        pessoa: {
          nome: name,
          salario: salaryFormatted,
          imagem: await id,
          cargo: {
            id: value,
          }
        },
        ativo: true
      }).then((res => {
        setVisibleSuccess(true)
      }))
        .catch(function (error) {
          console.log(error);
          setVisibleError(true)
        })
      return id
    }
    teste();
  }


  async function handleSelecionarFoto() {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
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

  function CloseModal() {
    setVisibleError(false)
    setVisibleSuccess(false)
    navigation.navigate("Menu")
  }

  return (
    <>
      <Header title="Novo Funcionário" canGoBack={true} />
      <ErrorModal visible={visibleError} text={"Erro ao Cadastrar"} functionOnRequestClose={CloseModal} />
      <ErrorModal visible={visibleSuccess} text={"Cadastrado com Sucesso!"} functionOnRequestClose={CloseModal} />
      <View style={styles.container}>
        <RegisterInput
          labelName="Informe o nome do Funcionário"
          title="Nome"
          onChangeText={setName}
        />
        <DropDownPicker
          placeholder="Selecione o cargo"
          textStyle={styles.dropdownText}
          labelStyle={styles.dropdownText}
          open={open}
          value={value}
          items={cargos.map(cargo => ({ label: cargo.nome, value: cargo.id }))}
          setOpen={setOpen}
          setValue={setValue}
          style={styles.dropdown}
          placeholderStyle={{ color: colors.dividor }}
          dropDownContainerStyle={{ borderColor: colors.dividor }}
          selectedItemContainerStyle={{ height: 35 }}

        />
        <Text>Salário</Text>
        <View style={styles.inputGroup}>
          <TextInputMask
            type={'money'}
            onChangeText={setSalary}
            style={styles.input}
            placeholder="R$ 00,00"

          />
        </View>

        <RegisterInput
          labelName="Informe o usuário do Funcionário"
          title="Usuário"
          onChangeText={setUser}
        />
        <RegisterInput
          labelName="Informe a senha do Funcionário"
          title="Senha"
          icon={true}
          onChangeText={setPassword}
        />
        <Text style={styles.title}> Imagem do Funcionário</Text>
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
        <View style={styles.footer}>
          <Button title="Cadastrar" onPress={Register} />
        </View>

      </View>
    </>

  )
}