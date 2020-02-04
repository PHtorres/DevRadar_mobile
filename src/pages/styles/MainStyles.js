
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#7D40E7'
    },
    callout: {
        width: 260,
        borderRadius: 100,
        padding: 5
    },
    DevName: {
        fontWeight: 'bold',
        fontSize: 16
    },
    DevBio: {
        color: '#666',
        marginTop: 5
    },
    DevTechs: {
        marginTop: 5
    },
    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        color: '#333',
        paddingHorizontal: 20,
        borderRadius: 25,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 5
    },
    searchButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8e4df7',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    }
});

export default styles;