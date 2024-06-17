import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';

export default function Favoris({ route }) {
    const favoris = route.params ? route.params.favoris : [];

    if (!favoris || favoris.length === 0) {
        return (
            <View style={styles.container}>
                <Text>Il n'y a pas de favoris</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={favoris}
            renderItem={({ item: cocktail }) => (
                <View style={styles.container}>
                    <Text>{cocktail.strDrink}</Text>
                    <Image source={{ uri: cocktail.strDrinkThumb }} style={{ width: 50, height: 50 }} />
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 50,
        height: 50,
    },
    text: {
        fontSize: 16,
        color: '#333',
    },
});