import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container:{
    width: Dimensions.get('window').width, 
    height: 90,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection:'row',
    alignContent: 'center',
    paddingTop: 20,
    paddingHorizontal:30
    
  },
  title:{
    fontSize: 25,
    color: colors.titleText,
    fontFamily: "SairaStencilOne_400Regular",
  }
});