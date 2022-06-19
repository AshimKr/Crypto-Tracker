import styled from '@emotion/styled';
import { createTheme, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@mui/material'
import { Container } from '@mui/system'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CoinList } from '../Config/api';
import { CryptoState } from '../CryptoContext';
// import { useNavigate } from 'react-router-dom';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'gold',
    color: theme.palette.common.black,
    fontSize: '18px',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,

  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


function CoinTable() {
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { currency, symbol } = CryptoState();

  // const pageNavigate = useNavigate();


  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoin(data);
    setLoading(false);
  };

  // console.log(coin);


  const filteredCoins = () => {
    return coin?.filter((data) => {
      if (search) {
        return data.id === search || data.symbol === search;
      } else {
        return coin;
      }
    })
  };


  useEffect(() => {
    fetchCoins()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);




  return (
    <ThemeProvider theme={darkTheme}>
      <Container maxWidth='lg' sx={{ textAlign: 'center' }}>
        <Typography variant='h4'
          fontFamily={'Montserrat'}
          sx={{ paddingBottom: '14px' }}
        >Cryptocurrency Prices by Market Cap</Typography>

        <TextField onChange={(e) => { setSearch(e.target.value) }} label="Search Crypto" variant='outlined' fullWidth sx={{ paddingBottom: '10px' }} />

        {/* Coin Table */}
        {loading ? <><LinearProgress /></> :
          <TableContainer component={Paper}>
            <Table sx={{ miWidth: 700 }} aria-label="customized table">
              <TableHead >
                <TableRow>
                  <StyledTableCell>Coin</StyledTableCell>
                  <StyledTableCell align="right">Price</StyledTableCell>
                  <StyledTableCell align="right">24h Change</StyledTableCell>
                  <StyledTableCell align="right">Market Cap</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  filteredCoins().slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map(data => {
                      const color = data.price_change_percentage_24h < 0 ? 'red' : 'rgb(14, 203, 129)';
                      return (
                        <StyledTableRow
                          // onClick={() => { pageNavigate(`coin/${data.id}`) }}
                          key={data.id}
                          style={{
                            fontFamily: 'Montserrat', cursor: 'pointer',
                          }}
                        >
                          <StyledTableCell
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                            }}
                            component="th" scope="row">
                            <img src={data.image} alt={data.id} width='40px' style={{ marginRight: '10px' }} />
                            <span>
                              <h2 >{data.symbol.toUpperCase()}</h2>
                              <span>{data.id}</span>
                            </span>
                          </StyledTableCell>
                          <StyledTableCell align="right">{data.current_price}</StyledTableCell>
                          <StyledTableCell align="right" sx={{ color: { color } }}>{data.price_change_percentage_24h.toFixed(2)}%</StyledTableCell>
                          <StyledTableCell align="right">{symbol} {Math.abs((Number(data.market_cap)) / 1.0e+6).toFixed(0)} M</StyledTableCell>
                        </StyledTableRow>)
                    })
                }
              </TableBody>
            </Table>
          </TableContainer>}

        <Pagination 
        count={(filteredCoins()?.length / 10)}
        onChange={(_,value)=>{
          setPage(value)
          window.scroll(0,350)
        }}
        style={{
          padding:20,
          width:'100%',
          display:'flex',
          justifyContent:'center',
        }}
        />
      </Container>
    </ThemeProvider>
  )
}

export default CoinTable