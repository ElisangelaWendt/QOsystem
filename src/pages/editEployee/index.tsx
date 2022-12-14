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
import { baseUrl, gdrive } from "../../config/globalConfig";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from 'expo-image-picker';
import { empresa } from "../login";
import ErrorModal from "../../components/Modal";
import { TextInputMask } from "react-native-masked-text";

interface EmployeeId {
  id: number
}

interface Employee {
  conta: string,
  ativo: boolean,
  id: number,
  senha: string,
  pessoa: {
    nome: string,
    imagem: string,
    id: number,
    salario: number,
    cpf: number,
    genero: string,
    telefone: number,
    cargo: {
      nome: string,
      id: number,
      empresa: {
        id: number,
        razaoSocial: string,
        telefone: number,
        cnpj: number,
        endereco: {
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
  const [salary, setSalary] = useState('')
  const [password, setPassword] = useState('')
  const [image, setImage] = useState('');
  const [image64, setImage64] = useState('');
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    axios.post(baseUrl + "conta/buscarID", {
      id: params.id
    })
      .then(res => {
        console.log(res.data)
        setEmployee(res.data)
      }).catch(function (error) {
        console.log(error);
        console.log(params.id)
      })

    axios.post(baseUrl + "cargo/buscar/empresa", {
      id: empresa
    })
      .then(res => {
        
        setCargos(res.data)
      }).catch(function (error) {
        console.log(error);
      })

  }, [])

  // caso o usu??rio n??o tenha alterado algum campo, ir?? setar com o valor encontrado no bd
  useEffect(() => {
    if (employee) {
      if (!name) {
        setName(employee.pessoa.nome)
      }
      if (!email) {
        setEmail(employee.conta)
      }
      if (password === '') {
        setPassword(employee.senha)
      }
      if (image64 === '') {
        setImage64(employee.pessoa.imagem)
      }
      if(!value ){
        setValue(employee.pessoa.cargo.id)
      }
      if(!salary){
        setSalary(''+ employee.pessoa.salario)
      }

    }
  })

  function Unactive() {
    const salaryConverted = parseFloat(salary)

    axios.put(baseUrl + "conta/editar", {
      id: params.id,
      conta: email,
      senha: password,
      pessoa: {
        nome: name,
        salario: salaryConverted,
        imagem: employee.pessoa.imagem,
        cargo: {
          id: value
        }

      },
      ativo: false
    }).then(res => {
      setVisible(true)
    }).catch(function (error) {
      console.log(error);
    })
  }

  function Active() {
    
    const salaryConverted = parseFloat(salary)

    axios.put(baseUrl + "conta/editar", {
      id: params.id,
      conta: email,
      senha: password,
      pessoa: {
        nome: name,
        salario: salaryConverted,
        imagem: employee.pessoa.imagem,
        cargo: {
          id: value
        },
      },
      ativo: true
    }).then(res => {
      setVisible(true)
    }).catch(function (error) {
      console.log(error);
    })
  }

  function Save() {
       async function teste() {

      // Responsavel pelo Upload
      const id = (await gdrive.files.newMultipartUploader()
        .setData(image64, "image/png") // 1?? conteudo; 2?? Tipo de arquivo 
        .setIsBase64(true) // identificando se esta mandando texto ou Base64
        .setRequestBody({
          name: name + '_' + email + '.png'// nome do arquivo
        })
        .execute()
      ).id;

     
     
     var salaryFormatted = parseFloat(salary.replace(/[^0-9]/g, ''))
      // cadastrar informa????es da conta
     axios.put(baseUrl + "conta/editar", {
        id: params.id,
        conta: email,
        senha: password,
        pessoa: {
          id: employee.pessoa.id ,
          nome: name,
          salario: salaryFormatted,
          imagem: await id,
          cargo: {
            id: value,
          }
        },
        ativo: employee.ativo
      }).then((res => {
        setVisible(true)
      }))
        .catch(function (error) {
          console.log(error);
        })
      return id
    }
    teste();
  }

  async function handleSelecionarFoto() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      base64: true
    });

    //console.log(result);

    if (!result.cancelled) {
      //caso apare??a erro no uri, IGNORAR, o problema ?? no visual studio (compila normalmente)
      setImage(result.uri);
      setImage64(result.base64)
    }

  }

  function OnRequestClose() {
    setVisible(false)
    navigation.navigate("Menu")
  }


  return (
    <>
      {!employee ? <Text>Erro</Text> :
        <><Header title="Editar Funcion??rio" canGoBack={true} />
          <ErrorModal visible={visible} functionOnRequestClose={OnRequestClose} text="Alterado com sucesso!" />
          <View style={styles.container}>
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
            <Text>Sal??rio</Text>
            <View style={styles.inputGroup}>
          <TextInputMask
            type={'money'}
            onChangeText={setSalary}
            style={styles.input}
            placeholder={"R$ 00,00"}
          />
        </View>
            <RegisterInput
              labelName="Informe o email do Funcion??rio"
              title="Email" onChangeText={setEmail} ><Text>{employee.conta}</Text></RegisterInput>
            <RegisterInput
              labelName="Informe a nova senha"
              title="Senha"
              icon={true}
              onChangeText={setPassword} />

            <Text style={styles.title}> Imagem do Funcion??rio</Text>
            {/* se n??o existe imagem, mostrar o bot??o */}
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
            {employee.ativo === false ?
              <>
                <Text style={{ color: colors.red, marginVertical: 20 }}>Esse usu??rio est?? inativo</Text>
                <View style={styles.footer}>
                  {/* bot??o excluir */}
                  <TouchableOpacity style={styles.buttonContainer} onPress={Active}>
                    <Text style={styles.text}>Ativar Funcion??rio</Text>
                  </TouchableOpacity>
                  <Button title="Salvar Informa????es" onPress={Save} />
                </View>
              </>
              :
              <>
                <Text style={{ color: colors.green, marginVertical: 20 }}>Usu??rio ativo</Text>
                <View style={styles.footer}>
                  {/* bot??o excluir */}
                  <TouchableOpacity style={styles.buttonContainer} onPress={Unactive}>
                    <Text style={styles.text}>Inativar Funcion??rio</Text>
                  </TouchableOpacity>
                  <Button title="Salvar Informa????es" onPress={Save} />
                </View>
              </>
            }
          </View></>}
    </>
  )
}