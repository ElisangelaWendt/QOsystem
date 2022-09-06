import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

const styles = StyleSheet.create({
categoryButton:{
  height: 120,
  backgroundColor:"black",
},
image:{
  width: Dimensions.get('window').width,
  height: 120,
  opacity: 0.6,
},
categoryText:{
  fontSize: 30,
  marginTop: "-20%",
  paddingLeft: 40,
  color: colors.buttonText,
  fontWeight: "bold",
}
})

export default styles;
