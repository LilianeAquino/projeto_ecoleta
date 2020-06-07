import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Image, StyleSheet, Text } from 'react-native';
import { AppLoading } from 'expo';
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu';

interface IBGEUFResponse {
    sigla: string;
}

interface IBGECityResponse {
    nome: string;
}

interface PickerSelectItem {
    label: string;
    value: string;
}

const Home = () => {
    const [ufs, setUfs] = useState<PickerSelectItem[]>([]);
    const [cities, setCities] = useState<PickerSelectItem[]>([]);
    const [selectedUf, setSelectedUf] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    const navigation = useNavigation();

    function handleNavigateToPoints() {
        navigation.navigate('Points', {
            uf: selectedUf,
            city: selectedCity
        });
    }

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
            .then(response => {
                const ufInitials = response.data.map(uf => ({
                    label: uf.sigla,
                    value: uf.sigla,
                }));
                setUfs(ufInitials);
            });
    }, []);

    useEffect(() => {
        if (selectedUf === null) {
            return;
        }

        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
            .then(response => {
                const cityNames = response.data.map(city => ({
                    label: city.nome,
                    value: city.nome,
                }));
                setCities(cityNames);
            });
    }, [selectedUf]);

    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium,
        Ubuntu_700Bold,
    });

    if (!fontsLoaded) {
        return <AppLoading />
    }

    return (
        <ImageBackground source={require('../../assets/home-background.png')}
            style={styles.container}
            imageStyle={{ width: 274, height: 268 }}
        >
            <View style={styles.main}>
                <Image source={require('../../assets/logo.png')} />
                <Text style={styles.title}>Seu marketplace de coleta de resíduos.</Text>
                <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
            </View>

            <View style={styles.footer}>
                <RNPickerSelect
                    style={pickerSelectStyles}
                    onValueChange={(value) => setSelectedUf(value)}
                    placeholder={{ label: "Selecione um Estado", value: null }}
                    items={ufs}
                    Icon={() => <Icon name="chevron-down" size={20} color="#A0A0B2" />}
                />

                <RNPickerSelect
                    style={pickerSelectStyles}
                    onValueChange={(value) => setSelectedCity(value)}
                    placeholder={{ label: "Selecione uma Cidade", value: null }}
                    items={cities}
                    disabled={cities.length === 0}
                    Icon={() => <Icon name="chevron-down" size={20} color="#A0A0B2" />}
                />
                <RectButton style={styles.button} onPress={handleNavigateToPoints}>
                    <View style={styles.buttonIcon}>
                        <Text>
                            <Icon name="arrow-right" color="#FFF" size={24} />
                        </Text>
                    </View>
                    <Text style={styles.buttonText}>
                        Entrar
                    </Text>
                </RectButton>
            </View>
        </ImageBackground>

    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
    },

    main: {
        flex: 1,
        justifyContent: 'center',
    },

    title: {
        color: '#322153',
        fontSize: 32,
        fontFamily: 'Ubuntu_700Bold',
        maxWidth: 260,
        marginTop: 64,
    },

    description: {
        color: '#6C6C80',
        fontSize: 16,
        marginTop: 16,
        fontFamily: 'Roboto_400Regular',
        maxWidth: 260,
        lineHeight: 24,
    },

    footer: {},

    select: {},

    input: {
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
    },

    button: {
        backgroundColor: '#34CB79',
        height: 60,
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 8,
    },

    buttonIcon: {
        height: 60,
        width: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF',
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
    }
});

const pickerSelectStyles = StyleSheet.create({
    viewContainer: {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 8,
        marginBottom: 8,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 2,
        height: 56,
    },
    iconContainer: {
        top: 18,
        right: 12,
        color: '#A0A0B2',
        opacity: 0.5
    },
});

export default Home;