import React, { useEffect, useState, useRef } from "react";
import { View, Button, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import ReportModal from "./ReportModal";
// import ReportModal from "../Modal/ReportModal";
// import { Report } from "@/app/report/page";

const { width, height } = Dimensions.get("window");

interface Report {
  name: string;
  email: string;
  message: string;
  image: string;
  lat: number;
  lng: number;
}

interface Props {
  data: Report[];
}

const Maps: React.FC<Props> = ({ data }) => {
  const mapRef = useRef<MapView>(null);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (report: Report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedReport(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Additional logic you want to perform on mount or when data changes
  }, [data]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 0,
          longitude: 0,
          latitudeDelta: 6,
          longitudeDelta: 6,
        }}
      >
        {data.map((report, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: report.lat, longitude: report.lng }}
            onPress={() => openModal(report)}
          />
        ))}
      </MapView>

      <ReportModal
        report={selectedReport}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 40,
  },
  map: {
    flex: 1,
    height: height,
    width: width - 40,
    // ...StyleSheet.absoluteFillObject,
  },
});

export default Maps;
