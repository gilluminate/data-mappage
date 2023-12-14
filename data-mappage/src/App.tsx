import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Container from '@mui/material/Container';
import { Box, Chip, Collapse, Grid, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';
import { System } from './react-app-env';
import { useSystems } from './providers/SystemsProvider';
import { SystemCard } from './components/SystemCard';

export const App = (): JSX.Element => {
  const { systems } = useSystems();
  const [data, setData] = useState<System[]>([]);
  const [filteredPd, setFilteredPd] = useState<string[]>([]);
  const displayTypes: string[] = data.reduce((types: string[], system) => {
    if (types.includes(system.system_type)) return types;
    return [...types, system.system_type];
  }, [])


  useEffect(() => {
    if (systems) {
      setData(systems);
    }
  }, [systems]);

  const updateData = (newFilteredPd: string[]) => {
    if (!systems) return;
    if (newFilteredPd.length === 0) {
      setData(systems);
      return;
    }
    setData(systems.filter((system) => {
      const systemMatch = system.privacy_declarations?.filter((pd) => {
        if (!pd?.name) return false;
        return newFilteredPd.includes(pd.name);
      })
      return systemMatch && systemMatch.length > 0;
    }))
  }


  const handleRemoveFilter = (filter: string) => {
    const newFilteredPd = filteredPd.filter((pd) => {
      return pd !== filter
    });
    setFilteredPd(newFilteredPd);
    updateData(newFilteredPd);
  }

  const handlePDFilter = (filter: string) => {
    if (!filter || filteredPd.includes(filter) || !systems) return;
    const newFilteredPd = [...filteredPd, filter];
    setFilteredPd(newFilteredPd);
    updateData(newFilteredPd);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Data Mappage
        </Typography>
        <Paper sx={{ p: 2, mb: 3, }}>
          <Typography>Filtered by: {
            filteredPd.map((filter) => <Chip label={filter} key={filter} onDelete={() => handleRemoveFilter(filter)} />)
          }
            {!filteredPd.length && <span>(none)</span>}</Typography>
        </Paper>
        {data.length ? (
          <>
            {displayTypes.map((type) => (
              <Paper variant="outlined" sx={{ p: 2, mb: 2 }} key={type}>
                <Typography variant="h5" component="h2" gutterBottom>{type}s</Typography>
                <Grid container spacing={2}>
                  <TransitionGroup component={null}>
                    {data.filter((system) => system.system_type === type).map((system) => (
                      <Grid item xs={12} sm={6} md={4} key={system.name} component={Collapse} >
                        <SystemCard system={system} onFilterByPD={handlePDFilter} />
                      </Grid>
                    ))}
                  </TransitionGroup>
                </Grid>
              </Paper>
            ))}
          </>
        ) : (
          <Paper sx={{ p: 2 }}>
            <Typography>Nothing to show. Remove filters.</Typography>
          </Paper>
        )}
      </Box>
    </Container>
  );
}
