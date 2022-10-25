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
  width:"100%",
  paddingTop:10
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
  paddingBottom:40,
  justifyContent:"flex-end",
  flexDirection:"row"
},
dropdown: {
  backgroundColor: colors.inputBackground,
  borderColor: colors.dividor,
  height: 35,
  marginBottom: 20,
  borderRadius: 4,
  color: colors.dividor,
},
dropdownText: {
  fontSize: 20,
  color: colors.text,
},
})
export default styles;
