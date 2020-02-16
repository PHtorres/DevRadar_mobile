import React, { useEffect, useState } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles/MainStyles';
import api from '../services/api';
import { connect, disconnect } from '../services/socket';

function Main({ navigation }) {

    const [devs, setDevs] = useState([]);
    const [regiaoCorrente, setRegiaoCorrente] = useState(null);
    const [techs, setTechs] = useState('');

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
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                });
            }
        }

        loadInitialLocation();
    }, []);

    function handleRegionChanged(region) {
        setRegiaoCorrente(region);
    }

    function setupWebsocket() {
        const parametros_socket = {
            latitude: regiaoCorrente.latitude,
            longitude: regiaoCorrente.longitude,
            techs: techs
        }
        connect(parametros_socket);
    }

    async function loadDevs() {
        const { latitude, longitude } = regiaoCorrente;

        await console.log('regiao');
        await console.log(regiaoCorrente);

        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs
            }
        });
        await console.log('response');
        await console.log(response);
        setDevs(response.data);
        setupWebsocket();
    }

    if (!regiaoCorrente) {
        return null;
    }

    return (
        <>
            <MapView onRegionChangeComplete={handleRegionChanged} initialRegion={regiaoCorrente} style={styles.map}>
                {devs.map(dev => (
                    <Marker key={dev._id} coordinate={{ latitude: dev.location.coordinates[1], longitude: dev.location.coordinates[0] }}>
                        <Image style={styles.avatar} source={{ uri: dev.avatar_url }} />
                        <Callout onPress={() => {
                            navigation.navigate('Profile', { github_username: dev.github_username });
                        }}>
                            <View style={styles.callout}>
                                <Text style={styles.DevName}>{dev.name}</Text>
                                <Text style={styles.DevBio}>{dev.bio}</Text>
                                <Text style={styles.DevTechs}>{dev.techs.join(', ')}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <View style={styles.searchForm}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar Devs por tecnologias..."
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={texto => setTechs(texto)}
                />

                <TouchableOpacity onPress={loadDevs} style={styles.searchButton}>
                    <MaterialIcons name="my-location" color="#fff" size={30} />
                </TouchableOpacity>
            </View>
        </>
    );
}

export default Main;