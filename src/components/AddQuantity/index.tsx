import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import styles from "./styles";

interface AddQuantityProps {
  title: boolean
}

export var quantity= 0;

export default function AddQuantity({ title }: AddQuantityProps) {

  function handleAddQuantity() {
    quantity = quantity + 1
  }

  function handleRemoveQuantity() {
    if(quantity <= 0){
      quantity = 0

    }else{
      quantity = quantity - 1

    }
  }

  return (
    <View style={styles.container}>
      {title &&
        <Text style={{marginRight:14}}>
          Quantidade
        </Text>
      }
      <TouchableOpacity style={styles.removeButton} onPress={handleRemoveQuantity}>
        <Text style={styles.remove}>-</Text>
      </TouchableOpacity>
      <View style={styles.textQuantity}>

        <Text >{quantity}</Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddQuantity}>
        <Text style={styles.add}>+</Text>
      </TouchableOpacity>
    </View>
  )
}