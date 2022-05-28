import React from 'react';

type ClockProps = {
    id: number
}

type ClockState = {
    time: Date,
}
class Clock extends React.Component<ClockProps, ClockState> {
    private intervalID: NodeJS.Timer | undefined;

    constructor(props : ClockProps) {
        super(props);
        this.state = {
            time: new Date()
        };

        this.getCurrentTyriaTime = this.getCurrentTyriaTime.bind(this);
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

    render() {
        return (
            <p className="App-clock">
                Date: {this.state.time.toDateString()}; Tyria Seconds: {this.getCurrentTyriaTime(this.state.time)}; Tyria Time: {this.timeToString(this.getCurrentTyriaTime(this.state.time))}
            </p>
        );
    }
}
export default Clock;
