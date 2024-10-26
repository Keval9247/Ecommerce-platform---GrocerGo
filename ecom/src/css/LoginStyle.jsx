import { createTheme } from '@mui/material/styles';

const theme = createTheme();

export const gridStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  justifyContent:"center",
  alignItems: 'center',
  gap: '1rem',
  backgroundColor: 'rgba(250, 250, 250, 0.5)',
  padding: '40px',
  width: '25rem',
  boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.8)',
  borderRadius: '10px',

};

export const buttonStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  backgroundColor: 'rgba(235, 64, 52)',
  color: 'whitesmoke',
  '&:hover': {
    backgroundColor: 'rgba(235, 64, 52,0.8)',
    color: 'white',
  },
};

export const typographyLinkStyle = {
  cursor: 'pointer',
  color: 'rgba(11, 36, 51,1)',
  textDecoration: 'underline',
  alignSelf: 'flex-end',
  '&:hover': {
    color: 'rgba(22, 70, 99,0.8)',
  },
};

export const textFieldStyle = {
  width: '250px',
  height: '100%',
  display: 'flex',
  flexWrap: 'wrap',
};

export const formContainerStyle = {
  marginBottom: '1rem',
  fontWeight: 'bold',
  textAlign: 'center',
  padding: '1rem',
};

export const flexRowStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '1rem',
};
