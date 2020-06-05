import React, { useState, useEffect, ChangeEvent } from 'react';
import { Feather as Icon} from '@expo/vector-icons';
import { View, ImageBackground, Text, Image, StyleSheet, TextInput, KeyboardAvoidingView, Platform} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';

interface IBGEUFResponse{
    sigla:string;
}

interface IBGECityResponse{
    nome:string;
}


const Home = () => {
    const [uf, setUf] = useState('');
    const [city, setCity] = useState('');

    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [selectedUf, setSelectedUf] = useState('0');

    const navigation = useNavigation();

    function handleNavigateToPoints() {
        navigation.navigate('Points', {
            uf,
            city
        });
    }

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response =>{
            const ufInitials = response.data.map(uf => uf.sigla);
            setUfs(ufInitials);
           
        });
    },[])

    useEffect(() => { 
        if(selectedUf === '0'){
            return;
        }
        
        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response =>{
            const cityNames = response.data.map(city => city.nome);
            console.log(response)
            setCities(cityNames);
        });
    },[selectedUf])



    return(
        <KeyboardAvoidingView  style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ImageBackground 
                source={require('../../assets/home-background.png')}  
                style={styles.container}
                imageStyle={{ width:274, height: 368 }}
            >
                <View style={styles.main}>
                    <Image source={require('../../assets/logo.png')} />
                    <View>
                        <Text style={styles.title}> Seu marketplace de coletas de resíduos</Text>
                        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    {/* <TextInput
                        style={styles.input}
                        placeholder="Digite a UF"
                        value={uf}
                        maxLength={2}
                        autoCapitalize="characters"
                        autoCorrect={false}
                        onChangeText={setUf}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Digite a cidade"
                        value={city}
                        autoCorrect={false}
                        onChangeText={setCity}
                    />  */}

                    <RNPickerSelect
                        placeholder={{
                            label: "Selecione uma UF",
                            value: null,
                            color: "#9EA0A4",
                        }}
                        style={{
                            inputIOS: {
                            fontSize: 16,
                            color: "black",
                            height: 56,
                            backgroundColor: "#FFF",
                            borderRadius: 10,
                            marginBottom: 8,
                            paddingHorizontal: 24,
                            },
                            iconContainer: {
                                top: 15,
                                right: 15,
                            },
                        }}
                        onValueChange={(value) => {
                            setSelectedUf(value);
                          }}
                        items={ufs.map((uf) => {
                            return {
                            label: uf,
                            value: uf,
                            };
                        })}
                        Icon={() => {
                            return <Icon size={20} color="gray" name="arrow-down" />;
                        }}
                        
                    />

                    <RNPickerSelect
                        placeholder={{
                            label: "Selecione uma cidade",
                            value: null,
                            color: "#9EA0A4",
                        }}
                        style={{
                            inputIOS: {
                            fontSize: 16,
                            color: "black",
                            height: 56,
                            backgroundColor: "#FFF",
                            borderRadius: 10,
                            marginBottom: 8,
                            paddingHorizontal: 24,
                            },
                            iconContainer: {
                                top: 15,
                                right: 15,
                            },
                        }}
                        onValueChange={(value) => {
                            setCity(value);
                          }}
                        items={cities.map((city) => {
                            return {
                            label: city,
                            value: city,
                            };
                        })}
                        Icon={() => {
                            return <Icon size={20} color="gray" name="arrow-down" />;
                        }}
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
        </KeyboardAvoidingView>
    );
};

export default Home;

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