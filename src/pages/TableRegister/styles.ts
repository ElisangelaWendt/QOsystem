import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  content:{
    margin:20,
    height: "100%",
    justifyContent:'space-between',
    flex:1
  },
  footer:{
    alignItems:"center",
    alignContent:'flex-end',
    marginBottom: 40
  },
  warning:{
    color: colors.red
  }
 
});