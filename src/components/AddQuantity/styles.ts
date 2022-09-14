import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

const styles = StyleSheet.create({
  container:{
    flexDirection:"row"
  },
removeButton:{
 backgroundColor: colors.backgroundButtonAdd,
 width: 37,
 height: 27,
 justifyContent: "center",
},
addButton:{
 backgroundColor: colors.backgroundButtonAdd,
 width: 37,
 height: 27,
 justifyContent: "center",
},
remove:{
  textAlign:"center",
  color: colors.red,
  fontSize: 16
},
add:{
  textAlign:"center",
  color: colors.green
},
textQuantity:{
  borderWidth:1,
  borderColor: colors.backgroundButtonAdd,
  width: 45,
  alignItems:'center',
  justifyContent:"center",
}
})
export default styles;
