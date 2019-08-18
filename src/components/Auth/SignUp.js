import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {signUpWithFirebase, checkCurrentUser } from '../../services/AuthService'

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp(props) {

    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    })

    function handleSignUp(event) {

        event.preventDefault()
        
        signUpWithFirebase(state.email, state.password)



        // event.preventDefault()
        // if (state.email.includes('@') && state.email.includes('.') && state.name !== '' && state.password.length > 3) {
        //     const uniqueId = signUp(state)
        //     alert('Użytkownik został zarejestrowany i zalogowany.')
        //     props.onLogin(uniqueId)
        // } else if (!state.email.includes('@') || !state.email.includes('.')) {
        //     alert('Proszę podaj poprawny email.')
        // } else if (state.name === '') {
        //     alert('Proszę podaj nazwę użytkownika.')
        // } else if (state.password.length <= 3) {
        //     alert('Hasło musi mieć co najmniej 4 znaki.')
        // }

    }



    const classes = useStyles();

    return (<>


        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Adres Email"
                                name="email"
                                autoComplete="email"
                                value={state.email}
                                onChange={event => setState({ ...state, email: event.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Hasło"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={state.password}
                                onChange={event => setState({ ...state, password: event.target.value })}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSignUp}
                    >
                        Zarejestruj się
                        </Button>
                </form>
            </div>
            <Box mt={5}>
            </Box>
        </Container>
    </>);
}