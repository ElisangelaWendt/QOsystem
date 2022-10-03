import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import Header from "../../components/Header";
import RegisterInput from "../../components/RegisterInput";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import Button from "../../components/Button";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { baseUrl } from "../../config/globalConfig";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from 'expo-image-picker';
import { empresa } from "../login";

interface EmployeeId {
  id: number
}

interface Employee {
  conta: string,
  id: number,
  pessoa: {
    nome: string,
    id: number,
    salario: number,
    cpf: number,
    genero: string,
    telefone: number,
    cargo: {
      nome: string,
      id: number,
      empresa:{
        id: number,
        razaoSocial: string,
        telefone: number,
        cnpj: number,
        endereco:{
          id: number,
          rua: string,
          bairro: string,
          numero: number,
          uf: string,
          pais: string,
          observacao: string
        }
      }
    }
  }
}

interface Cargos {
  nome: string,
  id: number
}
interface Cargo {
  nome: string,
  id: number
}

export default function EditEmployee({ navigation }: any) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const route = useRoute();
  const params = route.params as EmployeeId;
  const [employee, setEmployee] = useState<Employee>();
  const [cargos, setCargos] = useState<Cargos[]>([]);

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [salary, setSalary] = useState(0)
  const [password, setPassword] = useState('')
  const [selectedCargo, setSelectedCargo] = useState<Cargo>()
  const [image, setImage] = useState('');

  useEffect(() => {
    axios.post(baseUrl + "conta/buscarID", {
      id: params.id
    })
      .then(res => {
        setEmployee(res.data)

      }).catch(function (error) {
        console.log(error);
      })

    axios.post(baseUrl + "cargo/buscar/empresa", {
      id: empresa
    })
      .then(res => {
        setCargos(res.data)
      }).catch(function (error) {
        console.log(error);
      })

  }, [employee])

  // caso o usuário não tenha alterado algum campo, irá setar com o valor encontrado no bd
  useEffect(() => {
    if(employee){
      if(!name){
        setName(employee.pessoa.nome)
      }
      if(!email){
        setEmail(employee.conta)
      }

    }
  })

  function Delete() {
    axios.delete(baseUrl + "conta/deletar", {
      data: {
        id: params.id
      }
    }).then(res => {
      console.log(res)
    }).catch(function (error) {
      console.log(error);
    })
    navigation.navigate("Employee")
  }

  function Save() {
    // if(email === ''){
    //   setEmail(employee.conta)
    // }
    // if(name === ''){
    //   setName(employee.pessoa.nome)
    // }
    console.log("--------------")
    console.log(name)
    console.log(email)
    // console.log(employee.conta)

    axios.put(baseUrl + "conta/editar", {
      id: params.id,
      conta: email, 
      senha: password,
      pessoa:{
        nome: name,
        
      }
    }).catch(function (error) {
      console.log(error);
    })

    // navigation.navigate("Employee")
  }

  async function handleSelecionarFoto() {
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

  return (
    <>
      {!employee ? <Text>Erro</Text> :
        <><Header title="Editar Funcionário" canGoBack={true} /><View style={styles.container}>
          <RegisterInput
            labelName=""
            title="Nome"
            onChangeText={setName}
            ><Text>{employee.pessoa.nome}</Text></RegisterInput>
          <DropDownPicker
            placeholder={employee.pessoa.cargo.nome}
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
          <RegisterInput
            labelName="Informe o salário do funcionário"
            title="Salário" ><Text>{employee.pessoa.salario}</Text></RegisterInput>
          <RegisterInput
            labelName="Informe o email do Funcionário"
            title="Email" onChangeText={setEmail} ><Text>{employee.conta}</Text></RegisterInput>
          <RegisterInput
            labelName="Informe a nova senha"
            title="Senha"
            icon={true} 
            onChangeText={setPassword}/>

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
            {/* botão excluir */}
            <TouchableOpacity style={styles.buttonContainer} onPress={Delete}>
              <Text style={styles.text}>Excluir Funcionário</Text>
            </TouchableOpacity>
            <Button title="Salvar Informações" onPress={Save} />
          </View>
        </View></>}
    </>
  )
}