import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Toast from '../Toast/Toast';
import FormValidator from '../../Utils/FormValidator';
import PopUp from '../../Utils/PopUp';


class Formulario extends Component {

    constructor(props) {
        super(props);

            this.validador = new FormValidator([
            {
              campo: 'nome',
              metodo: 'isEmpty',
              validoQuando: false,
              mensagem: 'Entre com um nome'
            },
            { 
              campo: 'livro',
              metodo: 'isEmpty',
              validoQuando: false,
              mensagem: 'Entre com um livro'
            },
            { 
                campo: 'preco',
                metodo: 'isInt',
                args: [{min: 0, max: 99999}],
                validoQuando: true,
                mensagem: 'Entre com um valor numérico'
              }
          ]);

          this.stateInicial = {
            nome: '',
            livro: '',
            preco: '',
            validacao: this.validador.valido(),
            mensagem: {
                open: false,
                texto: '',
                tipo:'success'
            }
        }

        this.state = this.stateInicial;
    }

    submitFormulario = () => {
        const validacao = this.validador.valida(this.state);
        if(validacao.isValid){
            this.props.escutadorDeSubmit(this.state);
            this.setState(this.stateInicial);
        }else {
            const { nome, livro, preco } = validacao;
            const campos = [nome, livro, preco];
            const camposInvalidos = campos.filter(elem => {
                return elem.isInvalid
            })
            const erros = camposInvalidos.reduce(
                (erros, campo) =>  erros + campo.message + '. ',  
                ''
            )    
            this.setState({
                mensagem: {
                    open: true,
                    texto: erros,
                    tipo: 'error'
                }
            })            
        }
        
        

    }


    escutadorDeInput = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }


    render() {
        const { nome, livro, preco } = this.state;
        return (
            <>
                <Toast 
                    open={this.state.mensagem.open} 
                    handleClose={() => 
                        this.setState({
                            mensagem: {
                                open: false
                            }
                        })
                    }
                    severity={this.state.mensagem.tipo}    
                >
                    {this.state.mensagem.texto}
                </Toast>
                <form>
                <Grid container spacing={2} alignItems='center'>
                    <Grid item>
                        <TextField 
                            id="nome" 
                            label="Nome" 
                            name="nome"
                            variant="outlined" 
                            value={nome} 
                            onChange={this.escutadorDeInput}/>
                    </Grid>
                    <Grid item>
                        <TextField 
                            id="livro"
                            label = "Livro"
                            name="livro"
                            variant="outlined"
                            value={livro}
                            onChange={this.escutadorDeInput}
                        />
                                               
                    </Grid>
                    <Grid item>
                        <TextField 
                            id="preco"
                            label = "Preço"
                            name="preco"
                            variant="outlined"
                            value={preco}
                            onChange={this.escutadorDeInput}
                        />
                    </Grid>
                    <Grid item>
                        <Button variant='contained' color='primary' onClick={this.submitFormulario} type="button">Salvar</Button>
                    </Grid>
                </Grid>

            </form>
            </>
        );
    }
}
export default Formulario