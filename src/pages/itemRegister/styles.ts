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
    // minHeight:100,
    width: 227,
    alignSelf:"center",
    elevation: 10,
    marginVertical: 20
  },
  tableText:{
    color:colors.green,
    margin:10
  },
  title: {
    fontSize: 13,
    marginTop: 40,
    alignSelf: "center",
  },
  imageSelector: {
    borderWidth: 1,
    borderRadius: 15,
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
  },
  dashedBox: {
    borderWidth: 1,
    width: 86,
    height: 86,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    borderStyle: "dashed",
  },
  image:{
    alignSelf:'center',
    height: 120,
    width: 120,
    borderRadius:15,
    marginTop:20
  },
  input: {
    width: 294,
    height: 35,
    paddingLeft: 7,
    fontSize: 20,
  },
  inputGroup:{
    marginBottom: 18,
    backgroundColor: colors.inputBackground,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius:4,
    borderWidth: 1,
    elevation:10,
    borderColor: colors.dividor,
    marginTop:10
  },
})

export default styles;
