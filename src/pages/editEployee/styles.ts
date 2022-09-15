import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    marginHorizontal:20,
    marginTop: 18,
    flex:1
  },
  title:{
    fontSize:13,
    marginTop:40,
    alignSelf:'center',
  },
  imageSelector:{
    borderWidth:1,
    borderRadius:15,
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: "center",
    alignSelf:"center",
    marginTop: 10,
    
  },
  dashedBox:{
    borderWidth:1,
    width:86,
    height:86,
    alignItems: 'center',
    justifyContent: "center",
    borderRadius:15,
    borderStyle: 'dashed',
  },
  footer:{
    paddingBottom:40,
    flex:1,
    alignSelf: 'center',
    flexDirection:"row",
    alignItems:"flex-end"
  },
  buttonContainer:{
    backgroundColor: colors.buttonText,
    width:156,
    height: 30,
    borderRadius: 8,
    justifyContent:"center",
    alignItems:"center",
    elevation:10,
    marginRight: 20,
    borderColor: colors.bottomBar,
    borderWidth:1
  },
  text:{
    color: colors.bottomBar,
    fontWeight: 'bold'
  }
});
export default styles;
