import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import axios from "axios";
import { LineChart } from "react-native-chart-kit";

interface OceanData {
  title: string;
  units: string;
  base_period: string;
  missing: string;
  year: number;
  value: number;
  anom: number;
}

export default function OceanWarmingChart() {
  const [oceanWarmingData, setOceanWarmingData] = useState<
    OceanData[] | undefined
  >();

  const transformOceanWarmData = (data: any): OceanData[] => {
    const { description, data: result } = data;
    const transformedArray = Object.keys(result).map((year) => ({
      title: description.title,
      units: description.units,
      base_period: description.base_period,
      missing: "",
      year: parseInt(year),
      value: parseFloat(result[year]),
      anom: parseFloat(result[year]),
    }));
    return transformedArray;
  };

  const fetchOceanWarmingData = async () => {
    try {
      const { data } = await axios.get(
        "https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/global/time-series/globe/ocean/12/1/1850-2024.json?trend=true&trend_base=10&begtrendyear=1880&endtrendyear=2024"
      );

      const transformedData = transformOceanWarmData(data);
      setOceanWarmingData(transformedData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOceanWarmingData();
  }, []);

  if (!oceanWarmingData) return <Text>Loading...</Text>;

  const dataLimit = 10;
  const limitedOceanWarmingData = oceanWarmingData.slice(-dataLimit);

  return (
    <View>
      <View style={styles.chartLegends}>
        <Text style={styles.legendText}>
          units: {oceanWarmingData[0]?.units}
        </Text>
        <Text style={styles.legendText}>
          base period: {oceanWarmingData[0]?.base_period}
        </Text>
      </View>
      <LineChart
        data={{
          labels: limitedOceanWarmingData.map((item) => item.year.toString()),
          datasets: [
            {
              data: limitedOceanWarmingData.map((item) => item.value),
              color: (opacity = 1) => `rgba(0, 119, 190, ${opacity})`,
            },
          ],
        }}
        width={Dimensions.get("window").width - 16}
        height={200}
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 119, 190, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
          display: "flex",
          alignItems: "center",
        }}
        bezier
      />
      <View style={styles.chartLegends}>
        <Text style={styles.legendText}>value (ºC)</Text>
      </View>
      <Text style={styles.dataSource}>
        Data source: National Centers for Environmental Information: NOAA
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    display: "flex",
    alignItems: "center",
  },
  chartLegends: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  legendText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
  },
  dataSource: {
    fontSize: 12,
    textAlign: "center",
    color: "#fff",
  },
});
