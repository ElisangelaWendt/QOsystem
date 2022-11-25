import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import AddButton from "../../components/AddButton";
import Header from "../../components/Header";
import { baseUrl, gdrive } from "../../config/globalConfig";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";
import { Buffer} from "buffer";

interface Employee{
  nome: string,
  id: number,
  pessoa:{
    nome: string,
    id: number,
    imagem: string,
    cargo: {
      nome: string
    }
  }
}

export default function Employee({navigation}: any) {
  const [employee, setEmployee] = useState<Employee[]>([]);
  var Terminou = 0;
  var json = '' ;
  const [imageEmpty, setImageEmpty] = useState(false)
  
  useEffect(() => {
    axios.get(baseUrl + "conta/listar", {})
      .then(res => {
        //setEmployee(res.data)
        //console.log(res.data)
        arruma_esse_caralho(res.data);
        {employee.map(employee => {
          if(!employee.pessoa.imagem){
          //  setImageEmpty(true)
          }else{
            // arruma_esse_caralho(res.data)
          }
        })}
  // console.log(res.data)

      }).catch(function (error) {
        console.log(error);
      })
  },[])

  function  arruma_esse_caralho(Jsonarray){       
    Terminou = (Jsonarray.length)// Define quando vai atualizar a Tela
  
    Jsonarray.map(async categoria => {
      var imagem
    try {
      if ( categoria.pessoa.imagem != null){
        imagem = categoria.pessoa.imagem 
       }else {
        imagem  = '1xeD1PCQfpqp-1jvcpMAEtypPBc5GBOKn';
       }
    } catch (error) {
      imagem  = '1xeD1PCQfpqp-1jvcpMAEtypPBc5GBOKn'
    }
    console.log(imagem)
     
      const retorno = await gdrive.files.getBinary(imagem) // funcao responsavel por Buscar o Item ( OBRIGATORIO ID do item)
    
      const base64Flag = "data:image/png;base64,";
      const b64Image =  base64Flag + Buffer.from(retorno).toString("base64");
    

      if (json.length > 2 ){ json += ','} // so pra arrumar quando é mais de um Item  
  
        json +=   `{ "id" : ${categoria.id}, "pessoa" :{ "cargo" : {"nome": "${categoria.pessoa.cargo.nome}"},"imagem" : "${b64Image}","nome" : "${categoria.pessoa.nome }"}},`;
  
        if (await  retorno){ setar()}// so pra chamar a funcao quando Terminar // solucao alternativa
      }
    )
  } 
  
  function setar(){
    json =  json.substring(0, json.length - 1) ; // Remover Virgula a Mais
    if (Terminou == JSON.parse('[' + json+ ']').length){
     //console.log('[' + json+ ']');
      setEmployee(JSON.parse('[' + json+ ']'))
    }
  }

  function handleNavigateToNewEmployee(){
    navigation.navigate("EmployeeRegister")
  }
  function handleNavigateToEditEmployee(id: number){
    navigation.navigate("EditEmployee", {id})
  }
  // console.log("------------")
  // console.log(employee.map(teste => ( console.log(teste.cargo.nome))))

  return (
    <ScrollView>
    <Header title="Funcionários" canGoBack={true} />
    <View style={styles.container}>

    {employee.map(employee => (
      
        <TouchableOpacity style={styles.content} onPress={() => handleNavigateToEditEmployee(employee.id)} key={employee.id}>
        {/* trazer informações do banco */}
        <View style={styles.text}>
          <Text style={styles.title}>
            {employee.pessoa.nome}
          </Text>
          <Text style={styles.role}>{employee.pessoa.cargo.nome}</Text>
        </View>
        {imageEmpty ?
      <Feather name="image" /> :
        <Image style={styles.image} source={{uri: employee.pessoa.imagem}} />
      }
      </TouchableOpacity>
        ))}

      

      <View style={styles.footer}>
      <AddButton onPress={handleNavigateToNewEmployee} isAdding={true} />
      </View>
    </View>
    </ScrollView>
  )
}