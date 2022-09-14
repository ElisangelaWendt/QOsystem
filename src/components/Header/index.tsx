import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import { colors } from "../../styles/colors";
import { styles } from "./styles";
import { Feather } from '@expo/vector-icons';
import BackButton from "../BackButton";
import {MenuButton} from "../MenuButton";
import { DrawerActions, useNavigation } from "@react-navigation/native";

interface HeaderProps{
  title: string;
  canGoBack?: boolean;
}


export default function Header({title, canGoBack}: HeaderProps){
  const navigation = useNavigation();
  return(
    <LinearGradient style={styles.container} colors={[colors.lightGradient, colors.darkGradient]}>
      {canGoBack ? <BackButton/> : <View></View>}
      <Text style={styles.title}>{title}</Text>
      <View></View>
    </LinearGradient>

  )
}