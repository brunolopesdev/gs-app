import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

interface Props {
  name: string;
  image: string;
  message: string;
}

const Card: React.FC<Props> = ({ name, image, message }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Image
          source={{
            uri: `https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541`,
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.message}>{message}</Text>
        <Image
          source={{
            uri: `${image}`,
          }}
          style={{ width: 200, height: 200 }}
        />
      </View>
    </View>
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
  },
  carousel: {
    flex: 1,
    justifyContent: "center",
  },
  card: {
    display: "flex",
    gap: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    height: 350,
  },
  name: {
    fontWeight: "bold",
  },
  message: {
    width: 200
  },
  cardHeader: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  cardBody: {
    flex: 1,
    alignItems: "center",
    
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
  },
});

export default Card;
