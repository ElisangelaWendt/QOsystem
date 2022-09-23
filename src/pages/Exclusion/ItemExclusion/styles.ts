import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../styles/colors";

export const styles = StyleSheet.create({
  content:{
    margin:20,
    height: "100%",
  },
  footer:{
    alignItems:"center",
    alignContent:'flex-end',
    marginVertical: 20
  },
  dropdown: {
    backgroundColor: colors.inputBackground,
    borderColor: colors.dividor,
    height: 35,
    marginBottom: 20,
    borderRadius: 4,
    color: colors.dividor,
  },
  dropdownText: {
    fontSize: 20,
    color: colors.text,
  },
  text:{
    fontSize: 20,
    alignSelf:"center",
    marginBottom:20
  },
  divider:{
    backgroundColor: "black",
    marginBottom: 40
  }
 
});