import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

const styles = StyleSheet.create({
  container:{
    height: "100%",
    alignItems:'center',
  },
content:{
  minHeight: 80,
  borderBottomWidth:1,
  borderColor: colors.dividor,
  flexDirection:"row",
  justifyContent:'space-between',
  alignItems:"center",
  width:"100%"
},
text:{
  marginLeft:20,
},
title:{
  fontSize: 15
},
add:{
  fontSize: 15,
  color: colors.green
},
remove:{
  fontSize: 15,
  color: colors.red
},
ingredients:{
  fontSize: 13,
  color:colors.role,
  maxWidth: 239
},
image:{
  height:68,
  width:68,
  marginBottom: 10
},
footer:
{
  paddingBottom:20,
  paddingRight: 20,
  justifyContent:"flex-end",
  flex:1
}
})
export default styles;
