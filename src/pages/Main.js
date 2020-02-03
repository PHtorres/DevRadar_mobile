import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

function Main() {

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

    if(!regiaoCorrente){
        return null;
    }


    return (
        <MapView initialRegion={regiaoCorrente} style={styles.map} />
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
});

export default Main;