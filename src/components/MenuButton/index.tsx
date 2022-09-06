import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "./styles";
import { colors } from "../../styles/colors";
import { DrawerActions } from "@react-navigation/native";


interface MenuButtonProps extends TouchableOpacityProps {
  title: string;
}

export function MenuButton({ title, ...rest }: MenuButtonProps, {navigation}) {
  return (
    <TouchableOpacity style={styles.buttonMenu}  {...rest}>
      <Text><Feather name="menu" size={35} color={colors.text}/>{title}</Text>
    </TouchableOpacity>
  );
}

