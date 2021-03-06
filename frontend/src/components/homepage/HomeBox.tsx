import {
  Box,
  Container,
  makeStyles,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core';
import React, { ChangeEvent, useState } from 'react';
import IngredientsList from './IngredientsList';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const useStyles = makeStyles({
  container: {
    width: '90vw',
    marginLeft: 20,
    height: '75vh',
    alignContent: 'center',
    overflowY: 'scroll',
    maxHeight: '100vh'
  },
  tabMenu: {
    fontWeight: 600,
  },
  tab: {
    fontWeight: 700,
  },
});

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography component={'span'} >{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function HomeBox() {
  const [menuIndex, setMenuIndex] = useState(0);
  const [scrollParentRef, setScrollParentRef] = useState<HTMLDivElement | null>();
  const classes = useStyles();

  const handleChange = (e: ChangeEvent<{}>, indexSelected: number) => {
    setMenuIndex(indexSelected);
  };

  return (
    <Container className={classes.container} ref={(ref) => setScrollParentRef(ref)} maxWidth='xl'>
      <Tabs
        aria-label='tabs-menu'
        textColor='primary'
        indicatorColor='primary'
        value={menuIndex}
        onChange={handleChange}
        variant='fullWidth'
        className={classes.tabMenu}>
        <Tab label='Ingredients' className={classes.tab} />
        <Tab label='Cocktails' className={classes.tab} />
      </Tabs>
      <TabPanel value={menuIndex} index={0}>
        <IngredientsList scrollParentRef={scrollParentRef}/>
      </TabPanel>
      <TabPanel value={menuIndex} index={1}>
        SOON - The marvelous Val's Cocktails
      </TabPanel>
      <TabPanel value={menuIndex} index={2}>
        Add items to your bar
      </TabPanel>
    </Container>
  );
}
