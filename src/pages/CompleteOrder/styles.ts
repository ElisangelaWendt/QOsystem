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
  }
})
export default styles;
