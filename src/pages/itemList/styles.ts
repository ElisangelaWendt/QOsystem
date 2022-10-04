import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

const styles = StyleSheet.create({
  container:{
    height: "100%",
  justifyContent:'space-between',
flex:1
  },
content:{
  minHeight: 80,
  borderBottomWidth:1,
  borderColor: colors.dividor,
  flexDirection:"row",
  justifyContent:'space-between',
  alignItems:"center",
},
text:{
  marginLeft:20,
},
title:{
  fontSize: 15
},
ingredients:{
  fontSize: 13,
  color:colors.role,
  maxWidth: 239
},
image:{
  height:68,
  width:68,
  marginRight:20
},
footer:
{
  alignItems:"flex-end",
  alignSelf:"flex-end",
  paddingBottom:20,
  paddingRight: 20
},
emptyList:{
  alignItems:"center",
  marginVertical: 60,
  opacity:0.5

},
textEmpty:{
  fontSize: 20,
  marginBottom:10
}
})
export default styles;
