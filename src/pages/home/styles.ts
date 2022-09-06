import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

const styles = StyleSheet.create({
  content:{
    paddingHorizontal: 20,
    height:"100%"
  },
  inputGroup:{
    marginVertical:25,
    marginBottom: 14,
    backgroundColor: colors.inputBackground,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius:4,
    borderWidth: 1,
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
text:{
  fontSize: 20,
  paddingBottom:10
},
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



