import { Text, View, TextInput, StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function FormTextField({ label, errors, ...rest }) {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput style={styles.textInput} autoCapitalize="none" {...rest} />
      <Text style={styles.errors}>{errors}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: "#334155",
    fontWeight: 500,
  },
  errors: {
    color: "red",
    margin: 4,
  },
  textInput: {
    height: 40,
    width: 200,
    alignSelf: "flex-end",
    marginTop: 4,
    borderWidth: 5,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
  },
});
