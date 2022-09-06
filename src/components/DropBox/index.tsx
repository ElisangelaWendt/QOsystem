import React, { useState } from "react";
import { Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { colors } from "../../styles/colors";
import styles from "./styles";

interface DropBoxProps{
  title: string;
}

export default function DropBox({title}: DropBoxProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Cargo', value: 'apple'},
    {label: 'Cargo', value: 'banana'}
  ]);

  return (
    <>
    <Text>{title}</Text>
    <DropDownPicker
      placeholder="Selecione um cargo"
      textStyle={styles.dropdownText}
      labelStyle={styles.dropdownText}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      style={styles.dropdown}
      placeholderStyle={{color: colors.dividor}}
      dropDownContainerStyle={{borderColor: colors.dividor}}
      selectedItemContainerStyle={{height:35}}
    />
    </>

  );
}