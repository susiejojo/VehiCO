import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { HorizontalBar } from 'react-chartjs-2';
import CircularProgress from '@material-ui/core/CircularProgress';
import OffsetModal from './OffsetModal';

import 'chartjs-plugin-datalabels';

const useStyles = makeStyles({
    root: {
        width: "30vw",
        background: "white",
        borderRadius: "20px"
    },
    title: {
        paddingTop: "5px",
        fontSize: "2vw",
        fontWeight: "normal"
    },
    line: {
        width: "90%"
    },
    statsContainer: {
        textAlign: "left",
        marginLeft: "5%"
    },
    stats: {
        fontSize: "1.2vw"
    },
    directionBtn: {
        padding: "0.8vw",
        fontSize: "1.1vw",
        borderRadius: "0.8vw",
        border: "none",
        outline: "none",
        color: "white",
        background: "#04034E",
        '&:hover': {
            cursor: "pointer",
            transition: "transform 0.3s ease-out",
            transform: "scale(0.97)"
        },
    },
    offsetBtn: {
        padding: "0.8vw 1.5vw 0.8vw 1.5vw",
        marginBottom: "1vw",
        fontSize: "1.5vw",
        borderRadius: "1vw",
        border: "none",
        outline: "none",
        color: "white",
        background: "#84C58B",
        '&:hover': {
            cursor: "pointer",
            transition: "transform 0.3s ease-out",
            transform: "scale(0.97)"
        },
    },
    callToAction: {
        fontSize: "1vw",
        fontWeight: "normal",
        marginTop: "0",
        paddingLeft: "5%",
        paddingRight: "5%",
    },
    chart: {
        marginBottom: 0,
        marginTop: "10px",
    }
});

const options = {
    responsive: true,
    maintainAspectRatio: true,
    layout: {
        padding: {
            top: 10,
            left: 20,
            right: 40,
            bottom: 10
        }
    },
    legend: {
        display: false
    },
    scales: {
        xAxes: [{
            gridLines: {
                display:false
            },
            ticks: {
                display: false
            }
        }],
        yAxes: [{
            gridLines: {
                display:false
            },
            ticks: {
                mirror: true,
                labelOffset: -15,
            }
        }]
    },
    plugins: {
        datalabels: {
           display: true,
           align: 'right',
           anchor: 'end'
        }
    }
}

const TripReport = (props) => {
    const classes = useStyles();
    const { tripData, isLoading, redirectToMap } = props;

    const data = {
        labels: ['Your Trip', 'Max annual CO2 per person (to stop climate change)', 'Average monthly CO2 generated by an individual'],
        datasets: [
            {
                label: 'CO2 emission (ton)',
                backgroundColor: ["#84C58B", "#04034E", "#04034E"],
                borderWidth: 1,
                barPercentage: 0.3,
                data: [tripData ? tripData.cf.toFixed(4) : 0, 0.6, 1.375]
            }
        ]
    };
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div className={classes.root}>
            <h1 className={classes.title}>Your Trip Report</h1>
            <hr className={classes.line} />
            { !isLoading && tripData ? 
                <div>
                <div>
                    <div className={classes.statsContainer}>
                        <h3 className={classes.stats}>Distance: <span style={{color:"#04034E"}}> { tripData.distance.toFixed(2) } </span> miles </h3>
                        <h3 className={classes.stats}>Time: <span style={{color:"#04034E"}}> { tripData.time.toFixed(0) } </span> min </h3>
                        <h3 className={classes.stats}>CO2 Emission: <span style={{color:"#84C58B"}}> { tripData.cf.toFixed(4) } </span> ton </h3>
                    </div>
                    <button className={classes.directionBtn} onClick={redirectToMap}> Get Directions </button>
                    <HorizontalBar data={data} options={options} height={90} />
                    <p className={classes.callToAction}>Help save the planet by choosing eco-friendly transport modes or offsetting your carbon footprint</p>
                    <button className={classes.offsetBtn} onClick={handleClickOpen}> Offset </button>
                </div>
                <OffsetModal open={open} cf={tripData.cf} handleClose={handleClose} />
              </div>
                : <CircularProgress color="secondary"/>
            }
            
        </div>
        
    )
}

export default TripReport;