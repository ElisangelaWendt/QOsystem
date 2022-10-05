import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

const styles = StyleSheet.create({
  content:{
    margin: 20,
    flex:1,
    height: "100%"
  },
  footer:{
    justifyContent: 'flex-end',
    alignItems:"center",
    marginBottom: 40
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
  table:{
    backgroundColor: colors.backgroundButtonAdd,
    height:100,
    width: 227,
    alignSelf:"center",
    elevation: 10,
    marginVertical: 15
  },
  tableText:{
    color:colors.green,
    margin:10
  }
})

export default styles;
