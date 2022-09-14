import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "./styles";
import { colors } from "../../styles/colors";
import { DrawerActions } from "@react-navigation/native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";


interface MenuButtonProps extends TouchableOpacityProps {
  title: string;
}

export function MenuButton({ title, ...rest }: MenuButtonProps, {navigation}) {
  return (
    <TouchableOpacity style={styles.buttonMenu}  {...rest}>
      <LinearGradient style={styles.container} colors={[colors.lightGradient, colors.darkGradient]}>
      <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

