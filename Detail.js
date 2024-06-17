import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

export default function Detail({ route, navigation }) {
    const { id } = route.params;
    const [errorMsg, setErrorMsg] = useState(null);
    const [cocktail, setCocktail] = useState(null);

    useEffect(() => {
        axios.get(`http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then(response => {
                console.log(response.data);
                setCocktail(response.data.drinks[0]);
            })
            .catch(error => {
                setErrorMsg('Pas de data');
            });
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar style="auto" />
            {cocktail ? (
                <>
                    <Text style={styles.title}>{cocktail.strDrink}</Text>
                    <Image source={{ uri: cocktail.strDrinkThumb }} style={styles.image} />
                    <Text style={styles.subtitle}>Instructions</Text>
                    <Text style={styles.text}>{cocktail.strInstructions}</Text>
                    <Text style={styles.subtitle}>Details</Text>
                    <Text style={styles.text}>Alcoholic: {cocktail.strAlcoholic}</Text>
                    <Text style={styles.text}>Category: {cocktail.strCategory}</Text>
                    <Text style={styles.text}>Glass: {cocktail.strGlass}</Text>
                    <Text style={styles.subtitle}>Ingredients</Text>
                    {Array.from({ length: 10 }, (_, i) => cocktail[`strIngredient${i + 1}`] && (
                        <Text key={i} style={styles.text}>{cocktail[`strIngredient${i + 1}`]}</Text>
                    ))}
                </>
            ) : (
                <Text style={styles.error}>{errorMsg}</Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#666',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    error: {
        fontSize: 18,
        color: 'red',
        marginTop: 20,
    },
});
