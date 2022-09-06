import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

const styles = StyleSheet.create({
inputGroup:{
  marginBottom: 18,
  backgroundColor: colors.inputBackground,
  flexDirection: "row",
  justifyContent: "space-between",
  borderRadius:4,
  borderWidth: 1,
  elevation:10,
  borderColor: colors.dividor,
},
input: {
  width: 294,
  height: 35,
  paddingLeft: 7,
  fontSize: 20,
},
icon:{
  alignSelf: "center",
  marginRight: 7
},
})

export default styles;
