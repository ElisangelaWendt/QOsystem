import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

const styles = StyleSheet.create({
    dropdown: {
      backgroundColor: colors.inputBackground,
      borderColor: colors.dividor,
      height: 35,
      marginBottom: 20,
      borderRadius:4,
      color: colors.dividor,
      
  },

  dropdownText: {
      fontSize: 20,
      color: colors.text,
  },

});
export default styles;
