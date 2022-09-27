import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  text:{
    alignSelf:"center"
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
  content:{
    marginHorizontal:20,
    marginTop: 20,
    justifyContent:"space-between",
    height:"100%",
    flex:1
  },
  footer:{
    alignItems:"center",
    alignContent:'flex-end',
    marginBottom: 40
  },
  image:{
    alignSelf:'center',
    height: 120,
    width: "100%",
    borderRadius:15,
    marginTop:20
  }

})
