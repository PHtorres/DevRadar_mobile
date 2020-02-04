import React, { useEffect, useState } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles/MainStyles';

function Main({ navigation }) {

    const [regiaoCorrente, setRegiaoCorrente] = useState(null);

    useEffect(() => {
        async function loadInitialLocation() {
            const { granted } = await requestPermissionsAsync();
            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true
                });

                const { latitude, longitude } = coords;

                setRegiaoCorrente({
                    latitude,
                    longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                });
            }
        }

        loadInitialLocation();
    }, []);

    if (!regiaoCorrente) {
        return null;
    }


    return (
        <>
            <MapView initialRegion={regiaoCorrente} style={styles.map}>
                <Marker coordinate={{ latitude: -22.9654573, longitude: -43.2013027 }}>
                    <Image style={styles.avatar} source={{ uri: 'https://avatars1.githubusercontent.com/u/58959268?s=460&v=4' }} />
                    <Callout onPress={() => {
                        navigation.navigate('Profile', { github_username: 'PHTorres' });
                    }}>
                        <View style={styles.callout}>
                            <Text style={styles.DevName}>Paulo Henrique Torres</Text>
                            <Text style={styles.DevBio}>Analista de Sistemas, Desenvolvedor .Net Core MVC / .Net WebForms / JavaScript / SQLServer / React Native</Text>
                            <Text style={styles.DevTechs}>React Native, ReactJS, NodeJS, .Net Core</Text>
                        </View>
                    </Callout>
                </Marker>
            </MapView>
            <View style={styles.searchForm}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar Devs por tecnologias..."
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                />

                <TouchableOpacity onPress={() => { }} style={styles.searchButton}>
                    <MaterialIcons name="my-location" color="#fff" size={30} />
                </TouchableOpacity>
            </View>
        </>
    );
}

export default Main;