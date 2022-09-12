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
  isHome?: boolean;
}


export default function Header({title, isHome}: HeaderProps){
  const navigation = useNavigation();
  return(
    <LinearGradient style={styles.container} colors={[colors.lightGradient, colors.darkGradient]}>
      {isHome ? <MenuButton title="" onPress={() => navigation.dispatch(DrawerActions.openDrawer())}/> : <BackButton/>}
      <Text style={styles.title}>{title}</Text>
      <View></View>
    </LinearGradient>

  )
}