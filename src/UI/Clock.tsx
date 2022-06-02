import React from 'react';
import './Clock.scss';

type ClockProps = {
    id: number
}

type ClockState = {
    time: Date,
    showDetails: Boolean
}

type TimeBlock = {
    startTime: number,
    endTime: number,
    name: string
}

const coreTyria : TimeBlock[] = [
    {
        startTime: 0,
        endTime: 5*60*60,
        name: "Night"
    },
    {
        startTime: 5*60*60,
        endTime: 6*60*60,
        name: "Dawn"
    },
    {
        startTime: 6*60*60,
        endTime: 20*60*60,
        name: "Day"
    },
    {
        startTime: 20*60*60,
        endTime: 21*60*60,
        name: "Dusk"
    },
    {
        startTime: 21*60*60,
        endTime: 24*60*60,
        name: "Night"
    },
];

const cantha : TimeBlock[] = [
    {
        startTime: 0,
        endTime: 7*60*60,
        name: "Night"
    },
    {
        startTime: 7*60*60,
        endTime: 8*60*60,
        name: "Dawn"
    },
    {
        startTime: 8*60*60,
        endTime: 19*60*60,
        name: "Day"
    },
    {
        startTime: 19*60*60,
        endTime: 20*60*60,
        name: "Dusk"
    },
    {
        startTime: 20*60*60,
        endTime: 24*60*60,
        name: "Night"
    },
]


class Clock extends React.Component<ClockProps, ClockState> {
    private intervalID: NodeJS.Timer | undefined;

    constructor(props : ClockProps) {
        super(props);
        this.state = {
            time: new Date(),
            showDetails: false
        };

        this.getCurrentTyriaTime = this.getCurrentTyriaTime.bind(this);
        this.toggleDetails = this.toggleDetails.bind(this);
    }
    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
    }
    componentWillUnmount() {
        if(this.intervalID) {
            clearInterval(this.intervalID);
        }
    }
    tick() {
        this.setState({
            time: new Date()
        });
    }

    getCurrentTyriaTime(date: Date) : number {
        const hours = date.getUTCHours()
        const minutes = date.getUTCMinutes()
        const seconds = date.getUTCSeconds();

        const helpHours = hours % 2; //0 == 0:00 Tyria time
        return this.getTimeSum(helpHours, minutes, seconds) * 12;
    }

    getTimeSum(hours: number, minutes: number, seconds: number) : number {
        return  ((hours * 60) + minutes) * 60 + seconds;
    }

    timeToString(tyriaTime: number) : String {
        const seconds = tyriaTime % 60;
        const minutes = ((tyriaTime - seconds) / 60) % 60;
        const hours = ((((tyriaTime - seconds) / 60) - minutes) / 60) % 24;


        return this.zeroFill(hours, 2) + ":" + this.zeroFill(minutes, 2) + ":" + this.zeroFill(seconds, 2);
    }

    zeroFill(number: number, zeros: number) {
        return ('0'.repeat(zeros) + number).slice(zeros * -1)
    }

    renderTimeBlock(timeBlocks: TimeBlock[]) {
        return timeBlocks.map((value, index) => {
            const startPercent = value.startTime / (60*60*24) * 100;
            const width = (value.endTime - value.startTime) / (60*60*24) * 100;
            return <div className={"block"} style={{left: startPercent + "%", width: width + "%"}} key={index}>{value.name}</div>
        })
    }

    toggleDetails() {
        this.setState({
            showDetails: !this.state.showDetails
        })
    }

    render() {
        return (
            <div className={"clock"}>
                {this.state.showDetails && <div className={"time"} key={"time details"}>
                    Date: {this.state.time.toDateString()}; Tyria Seconds: {this.getCurrentTyriaTime(this.state.time)}; Tyria Time: {this.timeToString(this.getCurrentTyriaTime(this.state.time))}
                </div>}
                <div key={"core tyria time"}>
                    {this.state.showDetails && <span>Core Tyria</span>}
                    <div className={"inner"}>
                        {this.renderTimeBlock(coreTyria)}
                        <div className={"current"} style={{left: (this.getCurrentTyriaTime(this.state.time) / 24 / 60 / 60 * 100) + "%"}}></div>
                    </div>
                </div>
                <div key={"cantha time"}>
                    {this.state.showDetails && <span>Cantha</span>}
                    <div className={"inner"}>
                        {this.renderTimeBlock(cantha)}
                        <div className={"current"} style={{left: (this.getCurrentTyriaTime(this.state.time) / 24 / 60 / 60 * 100) + "%"}}></div>
                    </div>
                </div>
                <div className={"toggle-details"} onClick={this.toggleDetails}>toggle details</div>
            </div>
        );
    }
}
export default Clock;
