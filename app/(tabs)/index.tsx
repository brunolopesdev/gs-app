import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Linking,
  Dimensions,
} from "react-native";
import { Icon } from "react-native-elements";
import Bubbles from "@/components/Bubbles";
import { LinearGradient } from "expo-linear-gradient";
import SeaIceChart from "@/components/SeaIceChart";
import OceanWarmingChart from "@/components/OceanWarmingChart";

const { width, height } = Dimensions.get("window");

export default function TabOneScreen() {
  const scrollViewRef = useRef<ScrollView>(null);

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

  return (
    <ScrollView
      style={styles.main}
      ref={scrollViewRef}
      contentContainerStyle={styles.scrollViewContent}
    >
      <View
        style={styles.hero}
        id="hero"
        ref={sectionRefs[0]}
        onLayout={handleSectionLayout(0)}
      >
        <LinearGradient
          colors={["#19b3f1", "#fff"]}
          style={styles.heroLinearGradient}
        />
        <View>
          {/* <Image
            style={styles.image}
            source="https://picsum.photos/seed/696/3000/2000"
            // placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          /> */}
        </View>
        <View style={styles.oceanHero}>
          <Text style={styles.heroTitle}>
            <Text style={styles.span1}>Watch</Text> {"\n"}
            <Text style={styles.span2}>our World's</Text> {"\n"}
            <Text style={styles.span3}>environmental challenges</Text>
          </Text>
          <View style={styles.icon}>
            <Icon
              name="chevron-down"
              type="font-awesome"
              color="#1176ab"
              size={50}
              onPress={() => scrollToSection(1)}
            />
          </View>
        </View>
      </View>

      <View
        style={styles.section}
        id="section1"
        ref={sectionRefs[1]}
        onLayout={handleSectionLayout(1)}
      >
        <View style={styles.oceanSection}>
          <Bubbles />
          <View style={styles.title}>
            <Text style={styles.titleText}>
              <Text style={styles.bold}>69,982,000</Text> tons of sea food
              produced so far in <Text style={styles.bold}>2024</Text>
            </Text>
          </View>
          <View>
            <Text style={styles.text}>
              Global seafood production includes fish caught in the wild and
              those produced in fish farms.{"\n"}
              <Text style={styles.source}>
                source:{" "}
                <Text
                  style={styles.link}
                  onPress={() =>
                    Linking.openURL(
                      "http://www.fao.org/docrep/016/i2727e/i2727e00.htm"
                    )
                  }
                >
                  The State of World Fisheries and Aquaculture 2012
                </Text>
              </Text>
            </Text>
          </View>
          <View style={styles.icon}>
            <Icon
              name="chevron-down"
              type="font-awesome"
              color="#fff"
              size={50}
              onPress={() => scrollToSection(2)}
            />
          </View>
        </View>
      </View>

      <View
        style={styles.section}
        id="section2"
        ref={sectionRefs[2]}
        onLayout={handleSectionLayout(2)}
      >
        <View style={styles.oceanSection}>
          <Bubbles />
          <View style={styles.title}>
            <Text style={styles.titleText}>
              <Text style={styles.bold}>43 percent</Text> coral reefs left{" "}
            </Text>
          </View>
          <View>
            <Text style={styles.text}>
              Experts estimate that there is now just half the amount of coral
              that was in the oceans 40 years ago. Scientists on the
              Intergovernmental Panel on Climate Change (IPCC) warned that if
              warming reached 2 degrees C in the next 50 years, there would be a
              more than 99% chance that tropical corals would be eradicated.
              {"\n"}
              <Text style={styles.source}>
                source:{" "}
                <Text
                  style={styles.link}
                  onPress={() =>
                    Linking.openURL(
                      "https://www.theguardian.com/environment/2018/nov/11/next-generation-may-never-see-coral-reefshttp://www.fao.org/docrep/016/i2727e/i2727e00.htm"
                    )
                  }
                >
                  Next generation ‘may never see the glory of coral reefs’
                </Text>
              </Text>
            </Text>
          </View>
          <View style={styles.icon}>
            <Icon
              name="chevron-down"
              type="font-awesome"
              color="#fff"
              size={50}
              onPress={() => scrollToSection(3)}
            />
          </View>
        </View>
      </View>

      <View
        style={styles.section}
        id="section3"
        ref={sectionRefs[3]}
        onLayout={handleSectionLayout(3)}
      >
        <View style={styles.oceanSection}>
          <Bubbles />
          <View style={styles.title}>
            <Text style={styles.titleText}>
              +<Text style={styles.bold}>4m</Text> tons of discarded fish in{" "}
              <Text style={styles.bold}>2024</Text>{" "}
            </Text>
          </View>
          <View>
            <Text style={styles.text}>
              The 2017 paper "Global marine fisheries discards: A synthesis of
              reconstructed data" concludes that commercial fishing has thrown
              away (discarded) about 10% of catch over the past decade meaning
              that around 10 million tons of fish are discarded at sea per year.
              The number is down from a high of 18 million tons in the 1990s.
              {"\n"}
              <Text style={styles.source}>
                source:{" "}
                <Text
                  style={styles.link}
                  onPress={() =>
                    Linking.openURL(
                      "https://sustainablefisheries-uw.org/wasted-fish-what-to-make-of-recent-data-showing-10-of-fish-are-discarded-at-sea/"
                    )
                  }
                >
                  Wasted Fish – What to Make of Recent Data Showing 10% of Fish
                  are Discarded at Sea?
                </Text>
                <Text
                  style={styles.link}
                  onPress={() =>
                    Linking.openURL(
                      "https://onlinelibrary.wiley.com/doi/full/10.1111/faf.12233"
                    )
                  }
                >
                  Global marine fisheries discards: A synthesis of reconstructed
                  data
                </Text>
              </Text>
            </Text>
          </View>
          <View style={styles.icon}>
            <Icon
              name="chevron-down"
              type="font-awesome"
              color="#fff"
              size={50}
              onPress={() => scrollToSection(4)}
            />
          </View>
        </View>
      </View>

      <View
        style={styles.section}
        id="section4"
        ref={sectionRefs[4]}
        onLayout={handleSectionLayout(4)}
      >
        <View style={styles.oceanSection}>
          <Bubbles />
          <View style={styles.title}>
            <Text style={styles.titleText}>
              +<Text style={styles.bold}>4,5m</Text> tons of plastic waste
              dumped in oceans in <Text style={styles.bold}>2024</Text>{" "}
            </Text>
          </View>
          <View>
            <Text style={styles.text}>
              There are quite a few estimates on how much plastic end up in our
              oceans each year, ranging from 4.8 mmt to as much as 23 mmt. Of
              course, the exact number is impossible to know but many experts
              points towards the study by PEW, that estimates that around 11
              million metric tonnes of plastic end up in oceans each year.
              {"\n"}
              <Text style={styles.source}>
                source:{" "}
                <Text
                  style={styles.link}
                  onPress={() =>
                    Linking.openURL(
                      "https://www.pewtrusts.org/en/research-and-analysis/articles/2020/07/23/breaking-the-plastic-wave-top-findings"
                    )
                  }
                >
                  PEW report is here
                </Text>
                <Text
                  style={styles.link}
                  onPress={() =>
                    Linking.openURL(
                      "https://www.greenpeace.org.uk/what-we-do/oceans/plastics/"
                    )
                  }
                >
                  Greenpeace: Plastics
                </Text>
              </Text>
            </Text>
          </View>
          <View style={styles.icon}>
            <Icon
              name="chevron-down"
              type="font-awesome"
              color="#fff"
              size={50}
              onPress={() => scrollToSection(5)}
            />
          </View>
        </View>
      </View>

      <View style={styles.section} id="section5" ref={sectionRefs[6]}>
        <View style={styles.oceanSection}>
          <Bubbles />
          <View style={styles.title}>
            <Text style={styles.titleText}>Sea Ice Extent</Text>
          </View>
          <View>
            <SeaIceChart />
            <Text style={styles.text}>
              The arctic is warming around twice as fast as global average. Some
              of the reasons for this are: The arctic amplification, the albedo
              effect, and black carbon. From 1979 to 1996, we lost 2.2 – 3% of
              the arctic ice cover. From 2010 to present we are losing 12.85%
              per decade!
            </Text>
          </View>
          <View style={styles.icon}>
            <Icon
              name="chevron-down"
              type="font-awesome"
              color="#fff"
              size={50}
              onPress={() => scrollToSection(6)}
            />
          </View>
        </View>
      </View>

      <View style={styles.section} id="section6" ref={sectionRefs[6]}>
        <View style={styles.oceanSection}>
          <Bubbles />
          <View style={styles.title}>
            <Text style={styles.titleText}>
              Global Ocean Temperature Anomalies
            </Text>
          </View>
          <View>
            <OceanWarmingChart />
            <Text style={styles.text}>
              The CO2 we produce is absorbed and dissolved into the ocean,
              making it more acidic. The ocean is also suffering from
              deoxygenation, due to contamination and global warming, making it
              less habitable for marine organism.
            </Text>
          </View>
        </View>
        <View style={styles.iconLast}>
          <Icon
            name="chevron-up"
            type="font-awesome"
            color="#fff"
            size={50}
            onPress={() =>
              scrollViewRef.current?.scrollTo({ y: 0, animated: true })
            }
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  heroLinearGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  hero: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: width,
    height: height - 200,
  },
  section: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: width,
    height: height,
    backgroundColor: "#1176ab",
  },
  oceanHero: {
    alignItems: "center",
    justifyContent: "center",
  },
  heroTitle: {
    fontSize: 46,
    textAlign: "center",
  },
  span1: {
    color: "#fff",
    fontWeight: "900",
  },
  span2: {
    color: "#1176ab",
    fontWeight: "900",
  },
  span3: {
    color: "#000000",
    fontWeight: "900",
  },
  icon: {
    position: "absolute",
    zIndex: 1,
    bottom: -30,
  },
  iconLast: {
    position: "absolute",
    zIndex: 1,
    bottom: 0,
  },
  oceanSection: {
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    position: "relative",
  },
  title: {
    color: "#fff",
    marginBottom: 20,
    borderBottomWidth: 3,
    borderBottomColor: "#fff",
    borderStyle: "dotted",
    width: "100%",
  },
  titleText: {
    fontSize: 24,
    textAlign: "center",
    color: "#fff",
  },
  bold: {
    fontWeight: "bold",
  },
  image: {
    flex: 1,
    width: "100%",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
    fontWeight: "500",
    lineHeight: 24,
    padding: 20,
  },
  source: {
    fontSize: 12,
  },
  link: {
    fontSize: 12,
    color: "#fff",
    marginTop: 10,
    textDecorationLine: "underline",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});
