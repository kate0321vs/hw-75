import {useState} from 'react';
import { CircularProgress, Container, Grid, IconButton, TextField} from "@mui/material";
import {FormMessage} from "./types";
import {useAppDispatch, useAppSelector} from "./app/hooks.ts";
import {createDecode, createEncode} from "./store/messageThunk.tsx";
import {
    selectDecodedLoading,
    selectDecodedMessage,
    selectEncodedLoading,
    selectEncodedMessage
} from "./store/messageState.tsx";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const App = () => {
    const dispatch = useAppDispatch();
    const encodedMessage = useAppSelector(selectEncodedMessage);
    const decodedMessage = useAppSelector(selectDecodedMessage);
    const encodeLoading = useAppSelector(selectEncodedLoading);
    const decodeLoading = useAppSelector(selectDecodedLoading);

    const [state, setState] = useState<FormMessage>(
        {
            encodedMessage: '',
            password: '',
            decodedMessage: ''
        }
    );

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setState({
            ...state,
            [name]: value,
        });
    };

    const handleEncode = async () => {
        if (!state.encodedMessage || !state.password) {
            return alert('Заполните поля "Message" и "Password" для зашифроки сообщения')
        }
        await dispatch(createEncode({
            message: state.encodedMessage,
            password: state.password
        })
        );
    };

    const handleDecode = async () => {
        if (!state.decodedMessage || !state.password) {
            return alert('Заполните поля "Decoded Massage" и "Password" для зашифроки сообщения')
        }
        await dispatch(createDecode({
                message: state.decodedMessage,
                password: state.password
            })
        );
    };

    return (
        <>
            <Container
                maxWidth="sm"
            >
                <form>
                    <Grid container spacing={3} sx={{mx: 'auto', width: '100%', mt: 4}}>
                        <Grid item lg={12} xs={12} sm={12}>
                            <TextField
                                multiline
                                label="Message"
                                value={decodedMessage?.decoded ?? state.encodedMessage}
                                onChange={inputChangeHandler}
                                name="encodedMessage"
                                fullWidth
                            />
                        </Grid>
                        <Grid container item lg={12} xs={12} sm={12} alignItems="center" justifyContent="space-between">
                           <Grid item xs={8} sm={10}>
                               <TextField
                                   label="Password"
                                   value={state.password}
                                   onChange={inputChangeHandler}
                                   name="password"
                                   fullWidth
                               />
                           </Grid>
                            <Grid item sx={{mx: 'auto'}}>
                                <IconButton
                                    size="small"
                                    disabled={encodeLoading}
                                    onClick={handleEncode}
                                >
                                    {encodeLoading ? <CircularProgress size={24} /> : <ArrowDownwardIcon />}
                                </IconButton>
                                <IconButton
                                    size="small"
                                    disabled={decodeLoading}
                                    onClick={handleDecode}
                                >
                                    {decodeLoading ? <CircularProgress size={24} /> : <ArrowUpwardIcon />}
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid item lg={12} xs={12} sm={12}>
                            <TextField
                                multiline
                                label="Decoded Message"
                                value={encodedMessage?.encoded ?? state.decodedMessage}
                                onChange={inputChangeHandler}
                                name="decodedMessage"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </>
    );
};

export default App;