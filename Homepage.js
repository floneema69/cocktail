import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function App() {
    const navigation = useNavigation();
    const [errorMsg, setErrorMsg] = useState(null);
    const [cocktails, setCocktails] = useState([]);
    const [favoris, setFavoris] = useState([]);

    useEffect(() => {
        const ids = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
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
        })();
    }, []);

    return (
        <FlatList
            data={cocktails}
            renderItem={({ item: cocktail }) => (
                <View style={styles.container}>
                    <Text>{cocktail.strDrink}</Text>
                    <Image source={{ uri: cocktail.strDrinkThumb }} style={{ width: 50, height: 50 }} />
                    <TouchableOpacity onPress={() => navigation.navigate('Detail', { id: cocktail.idDrink })}>
                        <Text>Plus de detail</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setFavoris(favoris.concat(cocktail));
                        navigation.navigate('Favoris', { favoris: favoris.concat(cocktail) });
                    }}>
                        <Text>Ajouter aux favoris</Text>
                    </TouchableOpacity>
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
});