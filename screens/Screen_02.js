import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useContext } from 'react'; // Thêm useContext

import { CartContext } from './CartContext';
export default function App({ navigation }) {
    const [data, setData] = useState([

        { key: '1', type: 'Vegetable', name: 'Apple', description: 'Apple Italian Piada', price: "28.00", image: require('../assets/Data/Image_101.png') },

        { key: '2', type: 'Vegetable', name: 'Pear', description: 'Pear American', price: '28.00', image: require('../assets/Data/Image_107.png') },
        { key: '3', type: 'Vegetable', name: 'Avocado', description: 'Avocado Vietnam', price: "28.00", image: require('../assets/Data/Image_103.png') },
        { key: '4', type: 'Vegetable', name: 'Coconut', description: 'Coconut Vietnam', price: '28.00', image: require('../assets/Data/Image_105.png') },
        { key: '5', type: 'Vegetable', name: 'Orange', description: 'Orange Thailand', price: "28.00", image: require('../assets/Data/Image_106.png') },
        { key: '6', type: 'Vegetable', name: 'Apricot', description: 'Apricot China', price: '28.00', image: require('../assets/Data/Image_102.png') },

        { key: '8', type: 'Seafood', name: 'Seafood 1', price: "28.00", image: require('../assets/Data/Image_95.png') },
        { key: '9', type: 'Seafood', name: 'Seafood 2', price: "28.00", image: require('../assets/Data/Image_95.png') },
        { key: '10', type: 'Seafood', name: 'Seafood 3', price: '28.00', image: require('../assets/Data/Image_95.png') },
        { key: '11', type: 'Seafood', name: 'Seafood 4', price: '28.00', image: require('../assets/Data/Image_95.png') },
        { key: '12', type: 'Seafood', name: 'Seafood 5', price: '28.00', image: require('../assets/Data/Image_95.png') },
        { key: '13', type: 'Drink', name: 'Drink 1', price: "28.00", image: require('../assets/Data/Image_96.png') },
        { key: '14', type: 'Drink', name: 'Drink 2', price: "28.00", image: require('../assets/Data/Image_96.png') },
        { key: '15', type: 'Drink', name: 'Drink 3', price: "28.00", image: require('../assets/Data/Image_96.png') },
        { key: '16', type: 'Drink', name: 'Drink 4', price: "28.00", image: require('../assets/Data/Image_96.png') },
        { key: '17', type: 'Drink', name: 'Drink 5', price: "28.00", image: require('../assets/Data/Image_96.png') },
        { key: '18', type: 'Drink', name: 'Drink 6', price: "28.00", image: require('../assets/Data/Image_96.png') }

    ]);
    const { cart, addToCart } = useContext(CartContext);

    const [type, setType] = useState("Vegetable");
    const [initialItemCount, setInitialItemCount] = useState(6);

    // State save search input
    const [searchTerm, setSearchTerm] = useState("");
    //Search by  name
    const filterDataByType = () => {
        if (type === null) {
            return data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .slice(0, initialItemCount);
        }
        return data.filter(item =>
            item.type === type && item.name.toLowerCase().includes(searchTerm.toLowerCase())
        ).slice(0, initialItemCount);
    };

    return (
        <ScrollView >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("Screen_01")}>

                    <Image source={require('../assets/Data/Image_183.png')} style={styles.icon} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Screen_03", { cart })}>
                <Image source={require('../assets/Data/Image_182.png')} style={{marginLeft:280}} />

                </TouchableOpacity>
            </View>

            <TextInput
                style={styles.searchInput}
                placeholder='Search'
                value={searchTerm}
                onChangeText={text => setSearchTerm(text)} //update search text
            />

            <View style={styles.categoryButtons}>
                {["Vegetable", "Seafood", "Drink"].map((category) => (
                    <TouchableOpacity
                        key={category}
                        style={[
                            styles.categoryButton,
                            { backgroundColor: type === category ? 'green' : 'white' } // Chỉ tô màu nếu type trùng với category
                        ]}
                        onPress={() => {
                            setType(category);
                            setInitialItemCount(6);
                            setSearchTerm('');
                        }}
                    >
                        <Text style={styles.categoryButtonText}>{category}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.listHeader}>
                <Text style={styles.headerText}>Order your favorite</Text>
                <TouchableOpacity onPress={() => {
                    setType(null); // Đặt type thành null để hiển thị tất cả sản phẩm
                    setInitialItemCount(data.length); // Hiển thị toàn bộ sản phẩm
                }}>
                    <Text style={styles.seeAllText}>See all</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={filterDataByType()}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <TouchableOpacity onPress={() => {
                            addToCart(item)
                                ; navigation.navigate('Screen_03');
                        }}>
                            <Image source={item.image} style={styles.itemImage} resizeMode='contain' />
                        </TouchableOpacity>
                        <Text style={styles.itemName}>{item.name}</Text>
                    </View>
                )}
                numColumns={2}
                keyExtractor={item => item.key}
            />
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'white'
    },
    icon: {
        width: 25,
        height: 25
    },
    searchInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        width: '90%',
        height: 50,
        alignSelf: 'center',
        marginTop: 20,
        paddingLeft: 20,
        fontSize: 18
    },
    categoryButtons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 20
    },
    categoryButton: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 40
    },
    categoryButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'blue'
    },
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 20
    },
    headerText: {
        fontSize: 25,
        color: 'green'
    },
    seeAllText: {
        fontSize: 25,
        color: 'pink'
    },
    listItem: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '45%',
        marginHorizontal: '2.5%',
        marginVertical: 10,
        padding: 15
    },
    itemImage: {
        width: 150,
        height: 150
    },
    itemName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10
    },
    addToCartButton: {
        color: 'blue',
        marginLeft: 'auto',
    }
});
