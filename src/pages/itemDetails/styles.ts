import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

const styles = StyleSheet.create({
content:{
  margin: 20,
  alignItems:"center",
  justifyContent:"space-between",
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
  marginTop: 20,
},
table:{
  backgroundColor: colors.backgroundButtonAdd,
  height:65,
  width: 227,
  alignSelf:"center",
  elevation: 10,
  marginVertical: 15
},
})
export default styles;
