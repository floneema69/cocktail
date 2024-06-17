import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';

export default function Homepage({ navigation }) {
    const [cocktails, setCocktails] = useState([]);
    const [favoris, setFavoris] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);
    const ids = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    useEffect(() => {
        (async () => {
            for (let i = 0; i < ids.length; i++) {
                await axios.get(`http://www.thecocktaildb.com/api/json/v1/1/search.php?f=${ids[i]}`)
                    .then(function (response) {
                        setCocktails(prevCocktails => prevCocktails.concat(response.data.drinks || []));
                    })
                    .catch((error) => {
                        setErrorMsg('pas de data');
                    });
            }
            setIsLoading(false);
        })();
    }, []);

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <FlatList
            data={cocktails}
            renderItem={({ item: cocktail }) => (
                <View style={styles.container}>
                    <Text style={styles.text}>{cocktail.strDrink}</Text>
                    <Image source={{ uri: cocktail.strDrinkThumb }} style={styles.image} />
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Detail', { id: cocktail.idDrink })}>
                        <Text style={styles.buttonText}>Plus de detail</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        setFavoris(favoris.concat(cocktail));
                        navigation.navigate('Favoris', { favoris: favoris.concat(cocktail) });
                    }}>
                        <Text style={styles.buttonText}>Ajouter aux favoris</Text>
                    </TouchableOpacity>
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        loaderContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 'auto',
            marginVertical: 'auto',
        },
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    text: {
        fontSize: 18,
        color: '#333',
        marginBottom: 10,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#f4511e',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});