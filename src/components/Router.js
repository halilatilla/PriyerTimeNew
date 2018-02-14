
import React from 'react';
import { Scene, Router, Lightbox } from 'react-native-router-flux';
import UlkeSec from './UlkeSec';
import SehirSec from './SehirSec';
import IlceSec from './IlceSec';
import Detay from './Detay';


const RouterComponent = () => {
    return (
        <Router>
            <Lightbox>
            <Scene key="root" >

                <Scene key="Ulke" component={UlkeSec} hideNavBar />
                <Scene key="Sehir" component={SehirSec} hideNavBar />
                <Scene key="Ilce" component={IlceSec} hideNavBar />
                <Scene key="Detay" component={Detay} hideNavBar /> 
                
            </Scene>
            </Lightbox>

        </Router>

    );
};

export default RouterComponent;
