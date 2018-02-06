import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Platform, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { sehirID, sehirIsim } from '../redux/actions/index';

class SehirSec extends Component {
    state = {
        visible: false,
        label: '',
        datail: [],        
    };

    componentWillMount = () => { 
            axios.get(`https://ezanvakti.herokuapp.com/sehirler?ulke=${this.props.ulkeid}`)
            .then(response => this.setState({ datail: response.data }))
            .catch(error => {
                console.log(error);
                throw error;
            });
        }
    onCancel = () => {
        this.setState({
            visible: false
        });
    }

    onShow = () => {
        this.setState({ visible: true });
    }

    onSelect = (picked, label) => {
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
        Actions.Ilce();
    }
  
    render() {
        console.log('ŞEHİRSec component');
        const { visible, label } = this.state;
        return (
            <View style={styles.viewStyle} >
                <TouchableOpacity onPress={this.onShow}>
                    <Text style={styles.ilcesecStyle}>Şehir Seçmek İçin Tıklayınız</Text>
                </TouchableOpacity>
                <Text style={styles.secilenStyle} >{label}</Text>
                <ModalFilterPicker
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
    },
    ilcesecStyle: {
        textAlign: 'center',
        fontSize: Platform.OS === 'ios' ? 10 : 10,
        padding: 10

    },
    secilenStyle: {
        textAlign: 'center',
        fontSize: Platform.OS === 'ios' ? 10 : 10,
    }
}
);

const mapStateToProps = ({ dataResponse }) => {
    const { ulkeid } = dataResponse;
    return {
        ulkeid
    };
};

export default connect(mapStateToProps, { sehirID, sehirIsim })(SehirSec);
