import React from "react";
import {
    View,
    SafeAreaView,
    Button,
    FlatList,
    Text,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    Image
} from "react-native";
import axios from "axios";
import Modal from "react-native-modal";

const Characters = () => {
    const [charactersList, setCharactersList] = React.useState();
    const [isModalVisible, setModalVisible] = React.useState(false);

    const [deneme, setDeneme] = React.useState("");





    React.useEffect(() => {
        axios
            .get("https://www.breakingbadapi.com/api/characters")
            .then((res) => setCharactersList(res.data));
    }, []);




    return (
        <SafeAreaView>
            <View style={{ flex: 1 }}>
                <Button title="Show modal" onPress={() => { setModalVisible(!isModalVisible) }} />

                <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
                    <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center", backgroundColor: "white", borderTopRightRadius: 50, borderTopLeftRadius: 50, borderBottomRightRadius: 50 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 20 }}>
                            <Image style={{ width: Dimensions.get("window").width * 0.3, height: Dimensions.get("window").height * 0.3, marginEnd: 10 }} source={{ uri: deneme.img }} />
                            <View>
                                <Text style={{ marginTop: 20, fontSize: 16 }}>Name:{deneme.name}</Text>
                                <Text style={{ marginTop: 20, fontSize: 16 }}>Occupation:{deneme.occupation}</Text>
                                <TouchableOpacity style={{ marginTop: 50 }}>
                                    <Text>Favorite</Text>
                                </TouchableOpacity>
                            </View>



                        </View>

                    </View>
                </Modal>
            </View>

            <FlatList
                keyExtractor={(item) => item.char_id}
                numColumns={3}
                data={charactersList}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => { setDeneme(item), setModalVisible(!isModalVisible) }}
                        style={{ flex: 1, alignItems: "center", borderRadius: 10 }}
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
