import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import styles from "./styles";

interface AddQuantityProps {
  title: boolean,
  functionRemove: any;
  functionAdd: any;
  quantity: number
}

export default function AddQuantity({ title, functionRemove,functionAdd, quantity }: AddQuantityProps) {


  return (
    <View style={styles.container}>
      {title &&
        <Text style={{marginRight:14}}>
          Quantidade
        </Text>
      }
      <TouchableOpacity style={styles.removeButton} onPress={functionRemove}>
        <Text style={styles.remove}>-</Text>
      </TouchableOpacity>
      <View style={styles.textQuantity}>

        <Text >{quantity}</Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={functionAdd}>
        <Text style={styles.add}>+</Text>
      </TouchableOpacity>
    </View>
  )
}