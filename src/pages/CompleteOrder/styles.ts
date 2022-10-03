import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

const styles = StyleSheet.create({
  headStyle: { 
    height: 50,
    alignContent: "center",
    // borderWidth: 1,
  },
  tableText: { 
    textAlign:"center",
    margin:10,
  },
  table:{
    marginVertical: 20
  },
  footer:{
    alignSelf:"center",
    marginBottom: 40,
    flexDirection: 'row'
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
})
export default styles;
