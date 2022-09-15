import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  container:{
    marginHorizontal: 20,
    marginBottom:20,
    alignItems:"center",
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
  }

})
export default styles;
