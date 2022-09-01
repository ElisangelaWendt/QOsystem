import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container:{
    flex: 1,
    width: Dimensions.get('window').width, 
    height: 56,
    paddingTop: 70,
    paddingHorizontal: 33,
    alignItems:"center",
    justifyContent:"space-between",
    paddingBottom: 30,
  },
});