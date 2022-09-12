import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import styles from "./styles";

export default function AddQuantity(){
  const [quantity, setQuantity] = useState(0)

  function handleAddQuantity(){
    setQuantity(quantity + 1)
  }

  function handleRemoveQuantity(){
    setQuantity(quantity - 1)
  }

  return(
    <View style={styles.container}>
    <Text>
      Quantidade
    </Text>
    <TouchableOpacity style={styles.removeButton} onPress={handleRemoveQuantity}>
      <Text style={styles.remove}>-</Text>
    </TouchableOpacity>
    <View style={styles.textQuantity}>

    <Text>{quantity}</Text>
    </View>
    <TouchableOpacity style={styles.addButton} onPress={handleAddQuantity}>
      <Text style={styles.add}>+</Text>
    </TouchableOpacity>
    </View>
  )
}