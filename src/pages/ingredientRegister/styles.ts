import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  content:{
    margin:20,
    height: "100%",
    justifyContent:'space-between',
    flex:1,
  },
  row:{
    flexDirection: "row",
    alignItems:'center'
  },
  text:{
    fontSize: 18,
    marginRight: 30
  },
  footer:{
    alignItems:'center',
    marginVertical: 40
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
 
});