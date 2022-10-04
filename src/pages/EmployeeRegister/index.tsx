import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity,Image } from "react-native";
import Header from "../../components/Header";
import RegisterInput from "../../components/RegisterInput";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import Button from "../../components/Button";
import axios from "axios";
import { baseUrl } from "../../config/globalConfig";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from 'expo-image-picker';
import ErrorModal from "../../components/Modal";
import { empresa } from "../login";


interface Cargos {
  nome: string,
  id: number
}

export default function EmployeeRegister() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [cargos, setCargos] = useState<Cargos[]>([]);

  const [name,setName] = useState("")
  const [salary,setSalary] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [image,setImage] = useState('');
  const [visibleError, setVisibleError] = useState(false)
  const [visibleSuccess, setVisibleSuccess] = useState(false)


useEffect(() => {
  axios.post(baseUrl + "cargo/buscar/empresa", {
      id: empresa
  })
    .then(res => {
      setCargos(res.data)
      console.log(res.data)
    }).catch(function (error) {
      console.log(error);
    })
},[])

async function Register(){
  var conta  = {
    conta: email,
    senha: password
  }

  // cadastrar informações da conta
  await axios.post(baseUrl + "pessoa/cadastrar", {
    nome: name,
    conta: conta,
    cargo: value,
    salario: salary
  }).then((res => {
    console.log(res)
    setVisibleSuccess(true)
  }))
.catch(function (error) {
    console.log(error);
    setVisibleError(true)
  })

//   axios.post(baseUrl + "pessoa/cadastrar", {
//     nome: name,
//     salario: salary,
    
//   })
// .catch(function (error) {
//     console.log(error);
//   })


}

async function handleSelecionarFoto(){
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 4],
    quality: 1,
  });

  console.log(result);

  if (!result.cancelled) {
    //caso apareça erro no uri, IGNORAR, o problema é no visual studio (compila normalmente)
    setImage(result.uri);
  }

}

function CloseModal(){
  setVisibleError(false)
  setVisibleSuccess(false)
}

  return (
    <>
      <Header title="Novo Funcionário" canGoBack={true} />
      <ErrorModal visible={visibleError} text={"Erro ao Cadastrar"} functionOnRequestClose={CloseModal}/>
      <ErrorModal visible={visibleSuccess} text={"Cadastrado com Sucesso!"} functionOnRequestClose={CloseModal}/>
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
          items={cargos.map(cargo => ({label: cargo.nome, value: cargo.id}))}
          setOpen={setOpen}
          setValue={setValue}
          style={styles.dropdown}
          placeholderStyle={{ color: colors.dividor }}
          dropDownContainerStyle={{ borderColor: colors.dividor }}
          selectedItemContainerStyle={{ height: 35 }}
          
        />
        <RegisterInput
          labelName="Informe o salário do funcionário"
          title="Salário"
          onChangeText={setSalary}
          keyboardType="numeric"
        />
        <RegisterInput
          labelName="Informe o email do Funcionário"
          title="Email"
          onChangeText={setEmail}
          keyboardType="email-address"
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
            <Image source={{uri: image}} style={styles.image}/>
          </TouchableOpacity>
      }
        <View style={styles.footer}>
          <Button title="Cadastrar" onPress={Register}/>
        </View>

      </View>
    </>

  )
}