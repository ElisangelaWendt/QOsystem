import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container:{
    width: Dimensions.get('window').width, 
    height: "100%",
    paddingTop: 70,
    paddingHorizontal: 33,
    alignItems:"center",
    justifyContent:"space-between",
    paddingBottom: 30,
  },
  image:{
    alignSelf:"center",
    marginBottom: 62,
  },
  text:{
    color: colors.text,
    alignSelf:"center",
    marginBottom: 62,
    fontSize: 15
  },
  footer:{
    fontSize:10,
    position: "absolute",
    paddingTop: "240%"
  },
  row:{
    flexDirection: 'row',
    paddingBottom: 10
  }
})