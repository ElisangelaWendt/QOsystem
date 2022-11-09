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
    marginVertical: 20,
    borderRadius: 4,
    color: colors.dividor,
  },
  dropdownText: {
    fontSize: 20,
    color: colors.text,
  },
  warning:{
    alignSelf:"center",
    marginVertical: 20,
    opacity:0.7
  },
  textWarning:{
    color: colors.red,
    alignSelf:"center",
    margin:5
  }
})
export default styles;
