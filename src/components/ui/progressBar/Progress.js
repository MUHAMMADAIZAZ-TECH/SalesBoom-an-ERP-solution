import React, {useContext, useEffect} from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import UserContext from '../../../context/user/UserContext'

function Progress() {

  const userContext = useContext(UserContext)
  const {
    calculatePercentage,
    projectPercentage,
    project
  } = userContext;

  useEffect(() => {
    calculatePercentage()
  }, [project])
  return (
    <div>
      <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        < LinearProgress variant = "determinate" value = {projectPercentage}
        />
      </Box>
      <Box minWidth={35}>
          {/* selectedTask */}
        <Typography variant="subtitle2" color={
            projectPercentage < 25 ?
              'secondary' :
              'primary'
          }
        >{ `${projectPercentage}%` }</Typography>
      </Box>
    </Box>
    </div>
  );
}

export default Progress;