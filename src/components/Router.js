
import React from 'react';
import { Scene, Router, Stack } from 'react-native-router-flux';
import UlkeSec from './UlkeSec';
import SehirSec from './SehirSec';
import IlceSec from './IlceSec';
import Detay from './Detay';


const RouterComponent = () => {
return (
<Router>
    <Stack key="basla" >
    <Scene key="Ulke" component={UlkeSec} title="Naman Vakitleri" initial />
    <Scene key="Sehir" component={SehirSec} title="Ana Ekran" />
    <Scene key="Ilce" component={IlceSec} title="Naman Vakitleri" />
    <Scene key="Detay" component={Detay} title="Naman Vakitleri" />
    </Stack>

</Router>

);
};

export default RouterComponent;
