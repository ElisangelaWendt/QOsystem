import axios from "axios";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import AddQuantity from "../../components/AddQuantity";
import Button from "../../components/Button";
import Header from "../../components/Header";
import { baseUrl, gdrive, Ordena } from "../../config/globalConfig";
import styles from "./styles";
import { empresa, userID } from '../login'
import DropDownPicker from "react-native-dropdown-picker";
import { colors } from "../../styles/colors";
import { ScrollView } from "react-native-gesture-handler";
import { idItemSelected, pedidoItem, quantidadeItem } from "../itemDetails";
import { Buffer } from "buffer";

interface Order {
  id: number,
  mesa: {
    id: number
  }
}

interface Table {
  nome: string,
  id: number
}

interface Pedido {
  id: number,
  quantidade: number,
  item: {
    imagem: string,
    nome: string,
    quantidade: number,
    valor: number,
    observacao: string,
    ingredientes: [{
      id: number,
      nome: string
    }]
  }
}

export default function OpenOrder({ navigation }: any) {
  const [openOrder, setOpenOrder] = useState<Order>()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState()
  const [tables, setTables] = useState<Table[]>([])
  const [quantity, setQuantity] = useState(0)
  const [pedido, setPedido] = useState<Pedido[]>([])
  const [idPedido, setIdPedido] = useState(0)
  const [warning, setWarning] = useState(false)
  var Terminou = 0;
  var json = '';
  var javeio = 0;
  function arruma_esse_caralho(Jsonarray) {
    console.log('veio')
    Terminou = (Jsonarray.length)// Definir quando vai Exibir na tela
    try {
      Jsonarray.map(async (categoria, idx) => {
        
        javeio = javeio + 1;
        const retorno = await gdrive.files.getBinary(categoria.item.imagem) // funcao responsavel por Buscar o Item ( OBRIGATORIO ID do item)
        const base64Flag = "data:image/png;base64,";
        const b64Image = base64Flag + Buffer.from(retorno).toString("base64");
  
        if (json.length > 2) { json += ',' } // so pra arrumar quando é mais de um Item  
  
        json += `{ "id" : ${categoria.id},"quantidade":${categoria.quantidade}, "item":{"observacao" : "${categoria.observacao}","valor" : ${categoria.item.valor},"nome" : "${categoria.item.nome}","imagem" : "${b64Image}", "ingredientes" : [${categoria.item.ingredientes.map(ingrediente => { return '{ "nome":"' + ingrediente.nome + '"}' })}]}},`;
  
        if (await retorno) { setar() }// so pra chamar a funcao quando Terminar // solucao alternativa
      }
      )  
      
    } catch (error) {
      javeio = 0
      console.log('Primeira Tentativa')
      axios.post(baseUrl + "pedido/buscar/status/pessoa", {
        status: 0,
        pessoa: {
          id: userID
        }
      })
        .then(async res => {
          setIdPedido(res.data[0].id)
          axios.post(baseUrl + "pedidoItem/buscar/pedido", {
            pedido: {
              id: await res.data[0].id
            }
          }).then(res => {
            if (javeio == 0){ arruma_esse_caralho(res.data)}
            //setPedido(res.data)
          }).catch(function (error) {
            console.log(error)
          })
          setOpenOrder(res.data)
        }).catch(function (error) {
          console.log(error);
        })
    } 
    
  }

  function setar() {// Salvar no "SET"

    json = json.substring(0, json.length - 1); // Remover Virgula a Mais

    if (Terminou == JSON.parse('[' + json + ']').length) { // Evitar da Tela Ficar Carregando Varias vezes( Delay )

      setPedido(JSON.parse('[' + json + ']'))

    }
  }

  useEffect(() => {
    //buscar todas as mesas daquela empresa
    axios.post(baseUrl + "mesa/buscar/empresa", {
      id: empresa
    }).then(res => {
      setTables(Ordena(res.data))
    }).catch(function (error) {
      console.log(error)
    })

    //verificar se já há um pedido aberto para o usuário que está logado
    axios.post(baseUrl + "pedido/buscar/status/pessoa", {
      status: 0,
      pessoa: {
        id: userID
      }
    })
      .then(async res => {
        setIdPedido(res.data[0].id)
        //salvar(await res.data)
        setOpenOrder(res.data)
      }).catch(function (error) {
        console.log(error);
      })

    //se não tiver nenhum pedido aberto para aquele usuário, criar um novo sem a mesa
    if (pedidoItem != null && idPedido === 0) {
      axios.post(baseUrl + "pedido/cadastrar", {
        status: 0,
        pessoa: {
          id: userID
        }
      }).then(res => {
        //console.log(res.data)
        setOpenOrder(res.data)
        setIdPedido(res.data.id)
        
      }).catch(function (error) {
        console.log(error)
      })

    }

  }, [])
 
  useEffect(() => {
    try {
      if (pedidoItem != null && idPedido) {
        //alterar o pedido item feito para vincular ao pedido
        axios.put(baseUrl + "pedidoItem/editar", {
          id: pedidoItem,
          quantidade: quantidadeItem,
          pedido: {
            id: idPedido
          },
          item: {
            id: idItemSelected
          }
        }).then(res => {
          //setPedido(res.data)
          if (javeio == 0 ){ arruma_esse_caralho(res.data)}
        }).catch(function (error) {
          console.log(error)
        })


      }
    } catch (error) {
      console.log(error)
    }
  }, [idPedido, openOrder])

  useEffect(() => {
    
    try {
      if (idPedido != 0 && openOrder === undefined || openOrder[0].id === undefined) {
        //buscar pedido item depois de alterar
        axios.post(baseUrl + "pedidoItem/buscar/pedido", {
          pedido: {
            id: idPedido
          }
        }).then(res => {
         if (javeio == 0){ arruma_esse_caralho(res.data)}
           //setPedido(res.data)
        }).catch(function (error) {
          console.log(error)
        })
      }
      if (openOrder != undefined && openOrder[0].id != undefined) {
        axios.post(baseUrl + "pedidoItem/buscar/pedido", {
          pedido: {
            id: openOrder[0].id
          }
        }).then(res => {
          if (javeio == 0){ arruma_esse_caralho(res.data)}
          //setPedido(res.data)
        }).catch(function (error) {
          console.log(error)
        })
      } else {
        if (idPedido != 0) {
          axios.post(baseUrl + "pedidoItem/buscar/pedido", {
            pedido: {
              id: idPedido
            }
          }).then(res => {
            if (javeio == 0){ arruma_esse_caralho(res.data)}
            //setPedido(res.data)
          }).catch(function (error) {
            console.log(error)
          })
        }
      }
    } catch (error) {
      // console.log(error)
    }
    console.log(pedido)
  }, [openOrder])

  function handleNavigateToHome() {
    navigation.navigate("Home")
  }

  function handleAddQuantity(idx) {
    const pedidoIndex = pedido.findIndex((task, id) => { //Buscar Index do Item
      return id == idx;
    });

    const Temppedido = [...pedido]; // Recuperar Pedido

    Temppedido[pedidoIndex].quantidade = Temppedido[pedidoIndex].quantidade + 1;// Setar Nova Quantidade

    setPedido(Temppedido)// Salvar Alteraçoes

  }

  function handleRemoveQuantity(idx) {
    const pedidoIndex = pedido.findIndex((task, id) => {//Buscar Index do Item
      return id == idx;
    });

    const Temppedido = [...pedido]; // Recuperar Pedido

    if (Temppedido[pedidoIndex].quantidade <= 0) {
      Temppedido[pedidoIndex].quantidade = 0;
    } else {
      Temppedido[pedidoIndex].quantidade = Temppedido[pedidoIndex].quantidade - 1;
    }

    setPedido(Temppedido)// Salvar Alteraçoes
  }

  function handleSendToKitchen() {
    // altera o status do pedido para 1 (envia para a cozinha)
    try {
      var pedido = (openOrder[0].id)
      if (value && pedido) {
        axios.put(baseUrl + "pedido/editar", {
          id: pedido,
          status: 1,
          mesa: {
            id: value
          }
        }).then(res => {
          setWarning(false)
          navigation.navigate("Home")
        })
      } else {
        setWarning(true)
      }
    } catch (error) {

    }

  }

  return (
    <View style={styles.container}>
      <Header title="Concluir Pedido" canGoBack={true} />
      {pedido.map != undefined &&
        <ScrollView style={styles.scrollview}>
          {pedido.map((order, idx) => (
            <View style={styles.content} key={order.id + idx}>

              <View style={styles.text} >
                <Text style={styles.title}>{order.item.nome}</Text>
                <Text style={styles.ingredients}>{order.item.ingredientes.map(res => <Text key={res.id}>{res.nome}{'\n'}</Text>)}</Text>
               <Text style={styles.add}>Observações: </Text> 
               {/* <Text style={styles.remove}>Remover: ...</Text> */}
              </View>
              <View style={{ alignItems: "center", marginRight: 20, marginBottom: 10 }}>

                <Image style={styles.image} source={{ uri: order.item.imagem }} />
                <AddQuantity quantity={order.quantidade} title={true} functionAdd={() => handleAddQuantity(idx)} functionRemove={() => handleRemoveQuantity(idx)} />
              </View>
            </View>
          ))}
        </ScrollView>
      }

      <DropDownPicker
        placeholder="Selecione a mesa"
        textStyle={styles.dropdownText}
        labelStyle={styles.dropdownText}
        open={open}
        value={value}
        items={tables.map(mesa => ({
          label: mesa.nome,
          value: mesa.id
        }))}
        setOpen={setOpen}
        setValue={setValue}
        style={styles.dropdown}
        placeholderStyle={{ color: colors.dividor }}
        dropDownContainerStyle={{ borderColor: colors.dividor }}
        selectedItemContainerStyle={{ height: 35 }}
      />
      {warning &&
        <Text style={styles.warning}>A mesa deve ser selecionada</Text>
      }
      <View style={styles.footer}>
        <View style={{ marginRight: 15 }}>

          <Button title="Adicionar mais itens" onPress={handleNavigateToHome} />
        </View>
        <Button title="Confirmar pedido" onPress={handleSendToKitchen} />
      </View>

    </View>
  )
}