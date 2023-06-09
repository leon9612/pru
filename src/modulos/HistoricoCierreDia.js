import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { url } from "../layout/url";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});


export default function HistoricoCierreDia() {
    const MySwal = withReactContent(Swal)
    let histori = useHistory();
    var nombre = localStorage.getItem("usuario")

    /* useEffect(() => {
        getCierre();
        getFacturas();
    }, []) */

    const [data, setData] = useState({
        fecha: "",
    });

    const getData = (ev) => {
        setData({
            ...data,
            [ev.target.name]: ev.target.value
        })
        //console.log(ev.target.value)
    }
    var consultar = function () {
        getCierre();
        getFacturas();
    }


    const [cierre, setCierre] = useState([]);
    function getCierre() {
        fetch(url + "Ccontabilidad",
            {
                method: "POST",
                body: JSON.stringify({ function: "getCierreDia", fecha: data.fecha }),
                headers: {
                    'Autorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Ijg5NnNkYndmZTg3dmNzZGFmOTg0bmc4ZmdoMjRvMTI5MHIi.HraZ7y3eG3dGhKngzOWge-je8Y3lxZgldXjbRbcA7cA',
                    'Content-Type': 'application/json'
                },
            }).then((response) => {

                var res = response.status;
                if (res == 500) {
                    MySwal.fire({
                        position: 'center',
                        icon: 'error',
                        text: 'Error: la factura ya esta registrada.',
                        showConfirmButton: true,
                        confirmButtonColor: '#3085d6',
                        // timer: 1500
                    })
                } else {
                    response.json().then((rta) => {
                        console.log(rta)
                        setCierre(rta)
                    });
                }

            });
        /* const res = fetch(url + "Ccontabilidad", {
            method: "POST",
            body: JSON.stringify({ function: "getCierreDia", fecha: data.fecha }),
            headers: {
                'Autorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Ijg5NnNkYndmZTg3dmNzZGFmOTg0bmc4ZmdoMjRvMTI5MHIi.HraZ7y3eG3dGhKngzOWge-je8Y3lxZgldXjbRbcA7cA',
                'Content-Type': 'application/json',
            },
        })
        //const getcierre = await res.json();
        console.log(res)
        setCierre(res.json()); */
    }


    const [facturas, setFacturas] = useState([]);
    const [abonos, setAbonos] = useState([]);
    const [facturasentrantes, setFacturasentrantes] = useState([]);
    const [gastos, setGastos] = useState([]);
    const [canceladas, setCanceladas] = useState([]);

    function getFacturas() {
        fetch(url + "Ccontabilidad",
            {
                method: "POST",
                body: JSON.stringify({ function: "getFacturas", fecha: data.fecha }),
                headers: {
                    'Autorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Ijg5NnNkYndmZTg3dmNzZGFmOTg0bmc4ZmdoMjRvMTI5MHIi.HraZ7y3eG3dGhKngzOWge-je8Y3lxZgldXjbRbcA7cA',
                    'Content-Type': 'application/json'
                },
            }).then((response) => {

                var res = response.status;
                if (res == 500) {
                    MySwal.fire({
                        position: 'center',
                        icon: 'error',
                        text: 'Error: la factura ya esta registrada.',
                        showConfirmButton: true,
                        confirmButtonColor: '#3085d6',
                        // timer: 1500
                    })
                } else {
                    response.json().then((rta) => {
                        console.log(rta)
                        setFacturas(rta.salientes);
                        setAbonos(rta.abonos);
                        setFacturasentrantes(rta.entradas);
                        setGastos(rta.gastos);
                        setCanceladas(rta.canceladas);
                    });
                }

            });

    }
    /* const getFacturas = async () => {
        const res = await fetch(url + "Ccontabilidad", {
            method: "POST",
            body: JSON.stringify({ function: "getFacturas", fecha: data.fecha }),
            headers: {
                'Autorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Ijg5NnNkYndmZTg3dmNzZGFmOTg0bmc4ZmdoMjRvMTI5MHIi.HraZ7y3eG3dGhKngzOWge-je8Y3lxZgldXjbRbcA7cA',
                'Content-Type': 'application/json',
            },
        })
        //const getcierre = await res.json();
        var data = await res.json()
        setFacturas(data.salientes);
        setAbonos(data.abonos);
        setFacturasentrantes(data.entradas);
        setGastos(data.gastos);
        setCanceladas(data.canceladas);


    } */



    return (
        <ThemeProvider theme={darkTheme}>

            <CssBaseline />
            <Container maxWidth="sm">
                <Box component="form" noValidate sx={{ mt: 1 }}>

                    <Typography style={{ textAlign: "left", Color: "whitesmoke" }}>
                        {nombre}
                    </Typography>
                    <br></br>
                    <Button
                        onClick={() => { histori.push("/Pr"); }}
                        variant="contained"
                        color="primary"
                    ><ArrowBackIcon style={{ marginRight: "8px" }} />
                    </Button>
                    <br></br>
                    <Typography component="h1" variant="h5" style={{ textAlign: "center", textShadow: "7px 1px 5px blue" }}>
                        INFORME POR FECHA
                    </Typography>
                    <br></br>
                    <Grid container spacing={1} >
                        <Grid item xs={6} sm={6} md={6} lg={6} >
                            <TextField
                                fullWidth
                                id="date"
                                variant="outlined"
                                label="Fecha a consultar"
                                type="Date"
                                name="fecha"
                                format="yyyy-MM-dd"
                                onChange={getData}
                                value={data.fecha}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                style={{ marginTop: "16px" }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6} >
                            <Button onClick={consultar} id="btn-camera" style={{ color: "white", backgroundColor: "green", marginTop: "16px", width: "100%", height: "55px" }}><SearchIcon style={{ marginRight: "8px" }} />BUSCAR</Button>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                            < Card sx={{ minWidth: 275 }}>

                                <CardContent>
                                    <Typography sx={{ fontSize: 20, color: "whitesmoke" }} color="text.secondary" gutterBottom>
                                        CIERRE CAJA
                                    </Typography>
                                    {
                                        cierre.length > 0 ?
                                            <>
                                                <b>Entradas: $</b> {cierre[0].total == null ? <label style={{ color: "red" }}>0</label> : <label style={{ color: "red" }}>{Number(cierre[0].total).toLocaleString("en-CO")}</label>}<br></br>
                                                <b>Gastos: $</b> {cierre[1].totalGastos == null ? <label style={{ color: "red" }}>0</label> : <label style={{ color: "red" }}>{Number(cierre[1].totalGastos).toLocaleString("en-CO")}</label>}<br></br>
                                                <b>Abonos: $</b> {cierre[2].abono == null ? <label style={{ color: "red" }}>0</label> : <label style={{ color: "red" }}>{Number(cierre[2].abono).toLocaleString("en-CO")}</label>}<br></br>
                                                <b>Facturas Canceladas: $</b> {cierre[3].val == null ? <label style={{ color: "red" }}>0</label> : <label style={{ color: "red" }}>{Number(cierre[3].val).toLocaleString("en-CO")}</label>}<br></br>
                                                <b>Total: $</b> {cierre[0].valorReal == null ? <label style={{ color: "red" }}>0</label> : <label style={{ color: "red" }}>{Number(cierre[0].valorReal).toLocaleString("en-CO")}</label>}<br></br>
                                            </>
                                            : ""
                                    }
                                </CardContent>


                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Facturas salientes</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TableContainer component={Paper}>
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center">Numero factura</TableCell>
                                                    <TableCell align="center">Valor</TableCell>
                                                    <TableCell align="center">Cliente</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {facturas !== null ?
                                                    <>
                                                        {facturas.map((row) => (
                                                            <TableRow
                                                                key={row.numero_factura}
                                                            >
                                                                <TableCell align="center">{row.numero_factura}</TableCell>
                                                                <TableCell align="center">$ {Number(row.valor).toLocaleString("en-CO")}</TableCell>
                                                                <TableCell align="center">{row.cliente}</TableCell>
                                                            </TableRow>
                                                        ))
                                                        }
                                                    </>
                                                    : ""

                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </AccordionDetails>
                            </Accordion>

                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Abonos</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TableContainer component={Paper}>
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center">Numero factura</TableCell>
                                                    <TableCell align="center">Valor</TableCell>
                                                    <TableCell align="center">Cliente</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {abonos !== null ?
                                                    <>
                                                        {abonos.map((row) => (
                                                            <TableRow
                                                                key={row.numero_factura}

                                                            >
                                                                <TableCell align="center">{row.numero_factura}</TableCell>
                                                                <TableCell align="center"> $ {Number(row.abono).toLocaleString("en-CO")}</TableCell>
                                                                <TableCell align="center">{row.cliente}</TableCell>
                                                            </TableRow>
                                                        ))
                                                        }
                                                    </>
                                                    : ""

                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </AccordionDetails>
                            </Accordion>

                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Facturas entrantes</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TableContainer component={Paper}>
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center">Numero factura</TableCell>
                                                    <TableCell align="center">Valor</TableCell>
                                                    <TableCell align="center">Cliente</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {facturasentrantes !== null ?
                                                    <>
                                                        {facturasentrantes.map((row) => (
                                                            <TableRow
                                                                key={row.numero_factura}

                                                            >
                                                                <TableCell align="center">{row.numero_factura}</TableCell>
                                                                <TableCell align="center"> $ {Number(row.valor).toLocaleString("en-CO")}</TableCell>
                                                                <TableCell align="center">{row.cliente}</TableCell>
                                                            </TableRow>
                                                        ))
                                                        }
                                                    </>
                                                    : ""

                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </AccordionDetails>
                            </Accordion>

                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Gastos</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TableContainer component={Paper}>
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center">Tipo</TableCell>
                                                    <TableCell align="center">Valor</TableCell>
                                                    <TableCell align="center">Empresa</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {gastos !== null ?
                                                    <>
                                                        {gastos.map((row) => (
                                                            <TableRow
                                                                key={row.numero_factura}

                                                            >
                                                                <TableCell align="center">{row.nombre}</TableCell>
                                                                <TableCell align="center"> $ {Number(row.valor).toLocaleString("en-CO")}</TableCell>
                                                                <TableCell align="center">{row.empresa}</TableCell>
                                                            </TableRow>
                                                        ))
                                                        }
                                                    </>
                                                    : ""

                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </AccordionDetails>
                            </Accordion>

                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Facturas canceladas</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TableContainer component={Paper}>
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center">Numero</TableCell>
                                                    <TableCell align="center">Valor</TableCell>
                                                    <TableCell align="center">Cliente</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {canceladas !== null ?
                                                    <>
                                                        {canceladas.map((row) => (
                                                            <TableRow
                                                                key={row.numero_factura}

                                                            >
                                                                <TableCell align="center">{row.numero_factura}</TableCell>
                                                                <TableCell align="center"> $ {Number(row.valor).toLocaleString("en-CO")}</TableCell>
                                                                <TableCell align="center">{row.cliente}</TableCell>
                                                            </TableRow>
                                                        ))
                                                        }
                                                    </>
                                                    : ""

                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </AccordionDetails>
                            </Accordion>

                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider >
    );
}
