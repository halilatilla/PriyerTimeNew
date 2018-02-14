import React, { Component } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { ilceID, ilceIsim } from '../redux/actions/index';


class IlceSec extends Component {
    state = {
        visible: false,
        datailce: [],
        label: ''
    };
    componentWillMount() {
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
        Actions.Detay({ type: 'reset' });
    }

    onShow = () => {
        this.setState({ visible: true });
    }

    onSelect = (picked, label) => {
        this.props.ilceID({
            ilceid: picked
        });
        this.props.ilceIsim({
            ilcead: label
        });
        this.setState({
            visible: false,
            label
        });
        Actions.Detay({ type: 'reset' });
    }


    render() {
        console.log('İLÇESec component');
        const { visible } = this.state;
        return (
            <View style={styles.viewStyle} >
                <ModalFilterPicker
                    placeholder='İlçe Seçiniz' //kendi placeholder yazımı gönderiyorum
                    visible={visible}
                    onSelect={this.onSelect}
                    onCancel={this.onCancel}
                    options={this.state.datailce.map((item) => (
                        // options da değişiklik 
                        //yaparak key ile birlikte isimde gönderdim
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
    },
    textStyle: {
        fontSize: 30,
        padding: 10,
        fontWeight: 'bold',
        alignItems: 'center',
        color: 'black',
    },
    touchableStyle: {
        backgroundColor: '#e5e4e4',
        borderWidth: Platform.OS === 'ios' ? 1 : 0,
        borderRadius: 10,
    }
}
);

const mapStateToProps = ({ dataResponse }) => {
    const { sehirid, ulkeisim, sehirisim } = dataResponse;
    return {
        sehirid, ulkeisim, sehirisim
    };
};

export default connect(mapStateToProps, { ilceID, ilceIsim })(IlceSec);
