import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

const styles = StyleSheet.create({
content:{
  margin: 20,
  alignItems:"center",
  justifyContent:"space-between",
  flex:1,
},
image:{
  width:"100%",
  height: 100,
  borderRadius:6
},
properties:
{
  alignSelf:"flex-start",
  marginTop: 40,
},
text:{
  // marginTop: 20,
},
table:{
  backgroundColor: colors.backgroundButtonAdd,
  height:65,
  width: 227,
  alignSelf:"center",
  elevation: 10,
  marginVertical: 15
},
footer:{
  paddingBottom:20,
  justifyContent:"flex-end",
  flex:1,
},
row:{
  flexDirection: 'row',
  alignItems:"center",
  marginTop: 10,
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
tableText:{
  color:colors.green,
  margin:10
},
warning:{
  color: colors.red
},
// observacao:{
//   minHeight: 80,
//   alignSelf:'flex-start',

// }
})
export default styles;
