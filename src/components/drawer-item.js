import React from "react";
import { StyleSheet, Text, View } from "react-native";

const DrawerItem = ({ title, icon }) => {
  return (
    <View style={styles.container}>
      <View style={styles.ProfilePage}>
        <View style={styles.icon}>{icon}</View>
        <Text style={styles.Profile}>{title}</Text>
      </View>
    </View>
  );
};

export default DrawerItem;

const styles = StyleSheet.create({
  container: {backgroundColor:'transparent'},
  ProfilePage: {
    flexDirection: "row",
    justifyContent:'flex-start',
    alignContent:'center'
  },
  icon: {
    marginHorizontal: 8,
    alignSelf:'center'
  },
  Profile: {
    fontSize: 18,
    color: "#000",
    alignSelf:'center'
  },
});
