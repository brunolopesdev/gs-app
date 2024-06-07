import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import axios from "axios";
import { LineChart } from "react-native-chart-kit";

interface Description {
  title: string;
  basePeriod: string;
  units: string;
  mean: number;
  decadalTrend: number;
  missing: number;
}

interface YearData {
  value: number;
  anom: number;
}

interface Data {
  description: Description;
  data: {
    [year: string]: YearData;
  };
}

interface OceanData {
  title: string;
  units: string;
  base_period: string;
  missing: string;
  year: number;
  value: number;
  anom: number;
}

interface SeaIceData {
  title: string;
  basePeriod: string;
  units: string;
  mean: number;
  decadalTrend: number;
  missing: number;
  year: number;
  value: number;
  anom: number;
}

export default function SeaIceChart() {
  const [seaIceData, setSeaIceData] = useState<SeaIceData[] | undefined>();

  const transformSeaIceData = (data: Data | null): SeaIceData[] => {
    if (!data || !data.data) return [];

    const { description, data: yearData } = data;

    const transformedArray: SeaIceData[] = Object.keys(yearData).map(
      (year: string) => ({
        title: description.title,
        basePeriod: description.basePeriod,
        units: description.units,
        mean: description.mean,
        decadalTrend: description.decadalTrend,
        missing: description.missing,
        year: parseInt(year),
        value: yearData[year].value,
        anom: yearData[year].anom,
      })
    );

    return transformedArray;
  };

  const fetchSeaIceData = async () => {
    try {
      const response = await axios.get(
        "https://www.ncei.noaa.gov/access/monitoring/snow-and-ice-extent/sea-ice/G/5/data.json"
      );
      const data = response.data;

      if (!data || data.error) {
        console.error("Failed to fetch sea ice data", data?.error);
        return;
      }

      const transformedData = transformSeaIceData(data);
      setSeaIceData(transformedData);
    } catch (err) {
      console.error("Error fetching sea ice data", err);
    }
  };

  useEffect(() => {
    fetchSeaIceData();
  }, []);

  if (!seaIceData) return <Text>Loading...</Text>;

  const dataLimit = 10;
  const limitedSeaIceData = seaIceData.slice(-dataLimit);

  return (
    <View>
      <View style={styles.chartLegends}>
        <Text style={styles.legendText}>units: {seaIceData[0]?.units}</Text>
        <Text style={styles.legendText}>
          decadal trend: {seaIceData[0]?.decadalTrend}
        </Text>
        <Text style={styles.legendText}>
          base period: {seaIceData[0]?.basePeriod}
        </Text>
      </View>
      <LineChart
        style={styles.chart}
        data={{
          labels: limitedSeaIceData.map((item) => item.year.toString()),
          datasets: [
            {
              data: limitedSeaIceData.map((item) => item.value),
              color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            },
            {
              data: limitedSeaIceData.map((item) => item.anom),
              color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
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
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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
        bezier
      />
      <View style={styles.chartLegends}>
        <Text style={[styles.legendText, { color: "rgba(134, 65, 244, 1)" }]}>
          value
        </Text>
        <Text style={[styles.legendText, { color: "rgb(255, 0, 0)" }]}>
          anomaly
        </Text>
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
    fontSize: 10,
    color: "#fff",
  },
  dataSource: {
    fontSize: 12,
    textAlign: "center",
    color: "#fff",
  },
});
