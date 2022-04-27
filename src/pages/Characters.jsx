import React from "react";
import {
    View,
    SafeAreaView,
    Button,
    FlatList,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
} from "react-native";
import axios from "axios";

const Characters = () => {
    const [charactersList, setCharactersList] = React.useState();

    React.useEffect(() => {
        axios
            .get("https://www.breakingbadapi.com/api/characters")
            .then((res) => setCharactersList(res.data));
    }, []);

    return (
        <SafeAreaView>
            <FlatList
                keyExtractor={(item) => item.char_id}
                numColumns={3}
                data={charactersList}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => console.log(item.name)}
                        style={{ flex: 1, alignItems: "center" }}
                    >
                        <ImageBackground
                            source={{ uri: item.img }}
                            style={{
                                minHeight: Dimensions.get("window").height * 0.15,
                                minWidth: Dimensions.get("window").width * 0.25,
                                margin: 10,
                                borderRadius: 20,
                            }}
                        >
                            <View
                                style={{ flexDirection: "column-reverse", alignItems: "center", flex: 1 }}
                            >
                                <View style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
                                    <Text style={{ color: "white" }}>{item.name}</Text>

                                </View>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
};

export default Characters;
