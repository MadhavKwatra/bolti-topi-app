import { View, Text, Modal, StyleSheet, Pressable } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const NameModal = ({ isVisible, onClose,children }) => {
  return (
    <Modal animationType="slide" visible={isVisible} transparent={true}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Enter Your Name</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#fff" size={22} />
          </Pressable>
        </View>
        {children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalContent: {
      height: "50%",
      width: "100%",
      backgroundColor: "#25292e",
      borderTopRightRadius: 18,
      borderTopLeftRadius: 18,
      position: "absolute",
      bottom: 0,
    },
    titleContainer: {
      height: "16%",
      backgroundColor: "#464C55",
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      paddingHorizontal: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    title: {
      color: "#fff",
      fontSize: 16,
    },
    pickerContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 50,
      paddingVertical: 20,
    },
  });

export default NameModal;
