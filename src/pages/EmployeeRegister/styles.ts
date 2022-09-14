import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    marginHorizontal:20,
    marginTop: 18
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
  }
});
export default styles;
