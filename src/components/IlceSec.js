import React, { Component } from 'react';
import { View, Platform, StyleSheet, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { ilceID, ilceIsim, dataChange, sehirIsim, ulkeIsim } from '../redux/actions/index';
import Spinner from './Spinner';


class IlceSec extends Component {
    state = {
        visible: false,
        datailce: '',
        label: ''
    };
    componentWillMount = () => { 
      axios.get(`https://ezanvakti.herokuapp.com/ilceler?sehir=${this.props.sehirid}`)
            .then(response => this.setState({ datailce: response.data }))
            .catch(error => {
                console.log(error);
                throw error;
            });     
            this.state.visible = true;     
    }


    onCancel = () => {
        this.setState({
            visible: false
        });
        Actions.Sehir({ type: 'reset' });
    }

    onShow = () => {
        this.setState({ visible: true });
    }

    onSelect = async (picked, label) => {
        this.props.ilceIsim({
            ilcead: label
        });
        this.setState({
            visible: false,
            label
        });
      await this.props.ilceID({
            ilceid: picked
        });  
         
        this.component();  
        console.log('ilce sec onselect sonu');    
    }
    component = async () => {
        console.log('ilce sec datavakitler');
        console.log(this.props.ilceid);
        
      await axios.get(`https://ezanvakti.herokuapp.com/vakitler?ilce=${this.props.ilceid}`)
        .then(resp => this.props.dataChange({ datavakitler: resp.data }))
        .catch(error => {
              console.log(error);
              throw error;
        });  
        console.log('ilce sec datavakitler sonu');
        await this.componentD();
        Actions.Detay({ type: 'reset' });
    }

    componentD = async () => { //eslint-disable-line
        console.log('Son Data içinde');
        if (this.props.sehirisim === '') {
            try {
                const localdata = await AsyncStorage.getItem('localdata');
                const parsed = JSON.parse(localdata);
                 this.props.ulkeIsim({ ulkeisim: parsed.ulke });
                 this.props.sehirIsim({ sehirisim: parsed.sehir });
          } catch (error) {
                console.log(error);
          }
        }           
  }
    
    render() {
        console.log(this.state.datailce);
        const { visible } = this.state;
        if (this.state.datailce === '') {
            return (
                <View style={styles.viewStyle} >
                    <Spinner />
                </View>);
        }
        return (
            <View style={styles.viewStyle} >
                <ModalFilterPicker
                    placeholder='İlçe Seçiniz' //kendi placeholder yazı gönderildi
                    visible={visible}
                    onSelect={this.onSelect}
                    onCancel={this.onCancel}
                    options={this.state.datailce.map((item) => (
                        // options da değişiklik 
                        //yaparak key ile birlikte isimde gönderildi
                        { label: item.IlceAdi, key: item.IlceID }
                    ))}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewStyle: {
        marginTop: Platform.OS === 'ios' ? 10 : 0,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    }
}
);

const mapStateToProps = ({ dataResponse }) => {
    const { sehirid, ilceid } = dataResponse;
    return {
        sehirid, ilceid
    };
};

export default connect(mapStateToProps, 
    { ilceID, ilceIsim, dataChange, sehirIsim, ulkeIsim })(IlceSec);
