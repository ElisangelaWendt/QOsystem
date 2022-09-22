import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    marginHorizontal: 20,
    marginTop: 18,
    flex: 1,
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
  footer: {
    paddingBottom: 40,
    flex: 1,
    alignSelf: "center",
    justifyContent: "flex-end",
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
});
export default styles;
