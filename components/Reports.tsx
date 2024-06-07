import React, { useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";

import axios from "axios";
import { Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import Maps from "./Map";
import Card from "./ui/Card";

const { width, height } = Dimensions.get("window");

export interface Report {
  name: string;
  email: string;
  message: string;
  image: string;
  lat: number;
  lng: number;
}

const Reports: React.FC = () => {
    const scrollViewRef = useRef<ScrollView>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const sectionRefs = [
    useRef<View>(null),
    useRef<View>(null),
    useRef<View>(null),
    useRef<View>(null),
    useRef<View>(null),
    useRef<View>(null),
  ];

  const [sectionOffsets, setSectionOffsets] = useState<number[]>([]);

  const scrollToSection = (index: number) => {
    if (scrollViewRef.current && sectionOffsets[index] !== undefined) {
      scrollViewRef.current.scrollTo({
        y: sectionOffsets[index],
        animated: true,
      });
    }
  };

  const handleSectionLayout = (index: number) => (event: any) => {
    const { y } = event.nativeEvent.layout;
    setSectionOffsets((prevOffsets) => {
      const updatedOffsets = [...prevOffsets];
      updatedOffsets[index] = y;
      return updatedOffsets;
    });
  };

  const fetchReports = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://gs-backend-one.vercel.app/reports"
      );

      setReports(data);
    } catch (err) {
      console.error("Failed to fetch reports:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <ScrollView
      style={styles.reportsContainer}
      ref={scrollViewRef}
      contentContainerStyle={styles.scrollViewContent}
    >
      <View
        style={styles.carouselContainer}
        ref={sectionRefs[0]}
        onLayout={handleSectionLayout(0)}
      >
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <Carousel
            loop
            width={300}
            height={350}
            autoPlay={true}
            data={reports}
            scrollAnimationDuration={2000}
            style={styles.carousel}
            // onSnapToItem={(index) => console.log("current index:", index)}
            renderItem={({ item }) => (
              <Card
                name={item.name}
                image={item.image}
                message={item.message}
              />
            )}
          />
        )}
        <View style={styles.icon}>
          <Icon
            name="chevron-down"
            type="font-awesome"
            color="#fff"
            size={80}
            onPress={() => scrollToSection(1)}
          />
        </View>
      </View>

      <View ref={sectionRefs[1]} onLayout={handleSectionLayout(1)} style={styles.mapContainer}>
        <Maps data={reports} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  reportsContainer: {},
  carouselContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1176ab",
    width: width,
    height: height,
  },
  carousel: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#fff",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  icon: {
    position: "absolute",
    bottom: 200,
  },
  mapContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1176ab",
    width: width,
    height: height,
  }
});

export default Reports;
