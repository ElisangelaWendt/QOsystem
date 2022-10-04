import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

const styles = StyleSheet.create({
  container:{
    height:"100%",
    borderRadius:5,
    alignItems:"center",
    justifyContent:"center",
  },
buttonMenu: {
  height: 45,
  width: "100%",
  alignSelf: "center",
  borderRadius:5,
  marginBottom:20
},
text:{
  fontFamily: "SairaStencilOne_400Regular",
  color: colors.buttonText,
  fontSize:18,
}
})
export default styles;