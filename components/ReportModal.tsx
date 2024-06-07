import React from "react";
import { Modal, Text, View, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Card from "./ui/Card";
import { FontAwesome } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

interface Report {
  name: string;
  email: string;
  message: string;
  image: string;
  lat: number;
  lng: number;
}

interface ReportModalProps {
  report: Report | null;
  isOpen: boolean;
  onClose: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({
  report,
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      visible={isOpen}
      animationType="fade"
      onRequestClose={onClose}
      style={styles.modal}
      transparent={true}
    >
      <View style={styles.centeredView}>
        <View
          style={{
            alignItems: "center",
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-evenly",
            backgroundColor: "#f5f5f5",
            width: width,
          }}
        >
          <Text style={{ fontWeight: '600', textTransform: 'uppercase'}}>Report Details</Text>
          <TouchableOpacity onPress={onClose}>
            <FontAwesome name="close" size={25} color={"#000"} />
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor: '#fff', width: width}}>
        <Card
          name={report?.name || "User"}
          image={report?.image || ""}
          message={
            report?.message ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          }
        />

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#000",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
    margin: 'auto',
    width: width,
    height: height,
    // backgroundColor: "#fff",
  },
});

export default ReportModal;
