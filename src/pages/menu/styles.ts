import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  container:{
    width: Dimensions.get('window').width, 
    height: "100%",
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  text:{
    fontSize: 18,
    fontFamily: "SairaStencilOne_400Regular",
    alignSelf:"center",
    marginVertical: 20
  }
})
