
import React from 'react';
import { } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import UlkeSec from './UlkeSec';
import SehirSec from './SehirSec';
import IlceSec from './IlceSec';
import Detay from './Detay';
import AylikVakitler from './AylikVakitler';
import DrawerContent from './DrawerContent';


const RouterComponent = () => {
    return (
        <Router>
            <Scene key="modal" >
                <Scene key="DrawerContent" component={DrawerContent} hideNavBar initial />
                <Scene key="Detay" component={Detay} hideNavBar initial />
                <Scene key="Aylik" component={AylikVakitler} navTransparent backTitle="Back" />
                <Scene key="Ulke" component={UlkeSec} hideNavBar />
                <Scene key="Sehir" component={SehirSec} hideNavBar />
                <Scene key="Ilce" component={IlceSec} hideNavBar />           
            </Scene>

        </Router>

    );
};

export default RouterComponent;
