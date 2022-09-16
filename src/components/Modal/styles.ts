import {  StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
    padding: 35,
    alignItems: "center",
    elevation:20,
    width: 270,
    height:160
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "SairaStencilOne_400Regular",
    fontSize:20
  }
});

export default styles;