import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import UpdateButton from '../../../../ui/button/updateButton/UpdateButton';
import AdminContext from '../../../../../context/admin/AdminContext'
import './member.css';

function Member({data}) {

    const adminContext = useContext(AdminContext);
    const {
        openEditMemberModalHandler,
        setCurrentMember
    } = adminContext;

    const useStyles = makeStyles({
        root: {
            Width: 275,
            height: 150
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
            marginTop: 12,
        },
    });

    const classes = useStyles();

    const editMember = () => {
        openEditMemberModalHandler();
        setCurrentMember(data);
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h6" component="h2">
                    { `${data.firstName} ${data.lastName}`}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    <Typography variant='subtitle2' component='p'>
                        Organization: {data.organization}
                    </Typography>
                    <Typography variant='subtitle2' component='p'>
                        Designation: {data.designation}
                    </Typography>
                </Typography>
                <Typography variant="subtitle2" component="p">
                    Register Date: {data.regDate}
                </Typography>
            </CardContent>
            <div className='icon-button'>
                <UpdateButton clicked={editMember} />
            </div>
        </Card>
    );
}

export default Member;
