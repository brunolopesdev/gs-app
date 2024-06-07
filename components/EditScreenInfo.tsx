import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import Checkbox from "expo-checkbox";
import axios from "axios";

const ReportForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    image: null as string | null,
    acceptLocalization: false,
    lat: 0,
    lng: 0,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (name: string, value: string | boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setFormData((prevData) => ({
        ...prevData,
        image: result.assets[0].uri, // Use the first asset's URI
      }));
    }
  };

  const requestLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setFormData((prevData) => ({
      ...prevData,
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    }));
  };

  const handleCheckboxChange = async (value: boolean) => {
    handleChange("acceptLocalization", value);
    if (value) {
      await requestLocation();
    } else {
      setFormData((prevData) => ({
        ...prevData,
        lat: 0,
        lng: 0,
      }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      console.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("message", formData.message);
      formDataToSend.append("lat", formData.lat.toString());
      formDataToSend.append("lng", formData.lng.toString());

      if (formData.image !== null) {
        const imgurResponse = await fetch("https://api.imgur.com/3/image", {
          method: "POST",
          headers: {
            Authorization: "Client-ID c07474c64c85cd6",
          },
          body: formData.image,
        });

        const imgurData = await imgurResponse.json();
        if (imgurData.success) {
          formDataToSend.append("image", imgurData.data.link);
        } else {
          console.error(
            "Failed to upload image to Imgur:",
            imgurData.data.error
          );
        }
      }

      const response = await axios.post(
        "https://gs-backend-one.vercel.app/reports",
        formDataToSend
      );

      console.log("Report submitted successfully");

      setFormData({
        name: "",
        email: "",
        message: "",
        image: null,
        acceptLocalization: false,
        lat: 0,
        lng: 0,
      });
    } catch (err) {
      console.error("Error submitting report:", err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.form}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={formData.name}
        onChangeText={(value) => handleChange("name", value)}
        placeholder="Enter your name"
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={formData.email}
        onChangeText={(value) => handleChange("email", value)}
        placeholder="Enter your email"
        keyboardType="email-address"
      />
      <Text style={styles.label}>Message</Text>
      <TextInput
        style={styles.textarea}
        value={formData.message}
        onChangeText={(value) => handleChange("message", value)}
        placeholder="Enter your message"
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity onPress={handleFileChange} style={styles.button}>
        <Text style={styles.buttonText}>Upload Photo</Text>
      </TouchableOpacity>
      {formData.image && (
        <Image source={{ uri: formData.image }} style={styles.image} />
      )}
      <View style={styles.checkboxContainer}>
        <Checkbox
          value={formData.acceptLocalization}
          onValueChange={(value: boolean) => handleCheckboxChange(value)}
          color={"#f5f5f5"}
        />
        <Text style={styles.checkboxLabel}>Accept sharing localization</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#1E90FF" />
      ) : (
        <Button title="Submit" onPress={handleSubmit} color="#1E90FF" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 20,
    backgroundColor: "#1176ab",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#fff",
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
  },
  textarea: {
    height: 80,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#1E90FF",
    padding: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    marginLeft: 8,
    color: "#fff",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

export default ReportForm;
