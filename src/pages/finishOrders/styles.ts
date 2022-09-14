import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  container:{
    marginHorizontal: 20,
    marginBottom:20,
    alignItems:"center",
  },
  table:{
    borderWidth:1,
    minHeight: 400,
    width:"100%",
    // width:Dimensions.get("screen").width,
    flexDirection:"row",
    overflow: "scroll",
    marginVertical:20,
    justifyContent:"space-between"
  },
  title:{
    margin:15,
    alignSelf:"center"
  },
  column:{
    borderRightWidth: 1,
    minHeight: 400,
    width:"33.33%"
  },
  middleColumn:{
    borderTopWidth: 1,
    width:"100%"
  }
})
export default styles;
