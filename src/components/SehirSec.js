import React, { Component } from 'react';
import { View, Platform, StyleSheet, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { sehirID, sehirIsim, ulkeIsim } from '../redux/actions/index';
import Spinner from './Spinner';


class SehirSec extends Component {
    state = {
        visible: false,
        label: '',
        datail: '',
    };

    componentWillMount = () => {
        axios.get(`https://ezanvakti.herokuapp.com/sehirler?ulke=${this.props.ulkeid}`)
            .then(response => this.setState({ datail: response.data }))
            .catch(error => {
                console.log(error);
                throw error;
            }
            );
        this.state.visible = true; // bu sayfaya girildiğinde Modalfilter görünmesi için
    }
    onCancel = () => {
        this.setState({
            visible: false
        });
        Actions.Ulke({ type: 'reset' });
    }

    onShow = () => {
        this.setState({ visible: true });
    }

    onSelect = async (picked, label) => {
        this.props.sehirID({
            sehirid: picked,
        });
        this.props.sehirIsim({
            sehirisim: label,
        });
        this.setState({
            visible: false,
            label
        });
        await this.componentD();
        Actions.Ilce({ type: 'reset' });
    }

    componentD = async () => { //eslint-disable-line
        console.log('Son Data içinde');
        if (this.props.ulkeisim === '') {
            try {
                const localdata = await AsyncStorage.getItem('localdata');
                const parsed = JSON.parse(localdata);
                 this.props.ulkeIsim({ ulkeisim: parsed.ulke });
          } catch (error) {
                console.log(error);
          }
        }           
  }

    render() {
        console.log(this.state.datail);
        const { visible } = this.state;
        if (this.state.datail === '') {
            return (
                <View style={styles.viewStyle} >
                    <Spinner />
                </View>);
        }
        return (
            <View style={styles.viewStyle} >
                {/* <TouchableOpacity onPress={this.onShow} 
                            style={styles.touchableStyle}>
                                <Text style={styles.textStyle}>Şehir Seçiniz</Text>
                            </TouchableOpacity> */}
                <ModalFilterPicker
                    placeholder='Şehir Seçiniz'
                    visible={visible}
                    onSelect={this.onSelect}
                    onCancel={this.onCancel}
                    options={this.state.datail.map((item) => (
                        { label: item.SehirAdi, key: item.SehirID }
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
    const { ulkeid, ulkeisim } = dataResponse;
    return {
        ulkeid, ulkeisim
    };
};

export default connect(mapStateToProps, { sehirID, sehirIsim, ulkeIsim })(SehirSec);
