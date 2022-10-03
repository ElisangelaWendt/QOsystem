import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container:{
    // marginHorizontal: 20,
    marginBottom:130,
    height:"100%"
    // alignItems:"center",
  },
  table:{
    width:Dimensions.get("screen").width,
    marginVertical: 20

  },
  headStyle: { 
    height: 50,
    alignContent: "center",
    // borderWidth: 1,
  },
  tableText: { 
    textAlign:"center",
    margin:10,
  },
  totalText: { 
    textAlign:"center",
    margin:10,
  },
  footer:{
    alignSelf:"center",
    marginBottom: 40
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

})
export default styles;
