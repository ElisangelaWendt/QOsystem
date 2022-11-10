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
    width: 150,

  },
  dropdownText: {
    fontSize: 20,
    color: colors.text,
    width:150
  },
  inputGroup:{
    marginBottom: 18,
    backgroundColor: colors.inputBackground,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius:4,
    borderWidth: 1,
    elevation:10,
    borderColor: colors.dividor,
  },
  input: {
    width: 294,
    height: 35,
    paddingLeft: 7,
    fontSize: 20,
  },
 
});