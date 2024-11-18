import React from 'react';
import {createStyles, Box} from '@mantine/core'
import './App.css'
import Menu from './menu';

const useStyles = createStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}))

const App: React.FC = () => {
  const {classes } = useStyles()

  return (
    <Box className={classes.container}>
      <Menu />
    </Box>
  );
}

export default App;
