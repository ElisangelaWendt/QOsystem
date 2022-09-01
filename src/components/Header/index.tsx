import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import { colors } from "../../styles/colors";
import { styles } from "./styles";

export default function Header(){
  return(
    <LinearGradient style={styles.container} colors={[colors.lightGradient, colors.darkGradient]}>

    </LinearGradient>

  )
}