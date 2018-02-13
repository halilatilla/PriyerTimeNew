
import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import UlkeSec from './UlkeSec';
import SehirSec from './SehirSec';
import IlceSec from './IlceSec';
import Detay from './Detay';


const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root" >

                <Scene key="Ulke" component={UlkeSec} title="Ulke Seç" initial hideNavBar />
                <Scene key="Sehir" component={SehirSec} hideNavBar />
                <Scene key="Ilce" component={IlceSec} hideNavBar />
                <Scene key="Detay" component={Detay} hideNavBar /> 
                
            </Scene>
            
        </Router>

    );
};

export default RouterComponent;
