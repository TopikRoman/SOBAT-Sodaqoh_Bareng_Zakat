import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Image} from 'react-native';

const LoginScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/Logo_SOBAT.png')} style={{width: 200, height: 200}} />
            <Text style ={{margin:30, fontWeight: 'bold', fontSize: 15}}>Sodaqoh Bareng Zakat</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginAmil')}> 
                <Text>Masuk Sebagai Amil </Text>                
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginMuzakki')}> 
                <Text>Masuk Sebagai Muzakki </Text>                
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button :{
        alignItems: 'center',
        backgroundColor: 'lime',
        padding: 10,
        margin :25,
        width: 270,
        height: 45,
        borderRadius:15
    }
});

export default LoginScreen;