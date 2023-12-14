import { Card, CardActions, CardContent, CardHeader, CardProps, Chip, Divider, IconButton, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { System } from '../react-app-env';

interface ISystemCardProps extends CardProps {
  system: System;
  onFilterByPD: (pd: string) => void;
}

export const SystemCard = ({ system, onFilterByPD, ...props }: ISystemCardProps): JSX.Element => {
  return (
    <Card {...props} elevation={3} sx={{ height: "100%" }}>
      <CardHeader title={system.name} subheader={system.system_type} sx={{ '& .MuiCardHeader-title': { fontSize: 20 } }} />
      <CardContent>
        <Typography variant='body1'>{system.description}</Typography>
        {!!system.privacy_declarations?.length && <Divider sx={{ my: 2 }} />}
        {system.privacy_declarations?.filter((pd) => !!pd?.name).map((pd) => pd && <Chip key={pd.name} label={pd.name} sx={{ mb: 0.5, mr: 0.5 }} onClick={() => onFilterByPD(pd.name)} />)}
        {!!system.privacy_declarations?.length && <Divider sx={{ my: 2 }} />}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton sx={{ ml: 'auto' }}>
          <ExpandMore />
          {/* TODO: expose more data in the card when expanded */}
        </IconButton>
      </CardActions>
    </Card>
  );
};
