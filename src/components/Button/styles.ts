import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container:{
    backgroundColor: colors.bottomBar,
    width:156,
    height: 30,
    borderRadius: 8,
    justifyContent:"center",
    alignItems:"center",
    elevation:10
  },
  text:{
    color: colors.buttonText,
    fontWeight: 'bold'
  }
})

export default styles;
