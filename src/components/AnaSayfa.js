import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import Detay from './Detay';
import IlceSec from './IlceSec';
import UlkeSec from './UlkeSec';
import SehirSec from './SehirSec';

class Anasayfa extends Component {

    render() {
        console.log('Anasayfa component');

        return (
            <ScrollView style={{ backgroundColor: 'white', flex: 1, marginTop: 22 }} >
           <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center' }}>
            <UlkeSec style={{ flex: 1 }} />
            <SehirSec style={{ flex: 1 }} />
            <IlceSec style={{ flex: 1 }} />
            </View>

            <View style={{ flex: 3 }}> 
            <Detay />
            </View>
            </ScrollView >
        );
    }
}


export default Anasayfa;
