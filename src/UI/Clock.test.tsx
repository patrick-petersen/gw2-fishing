import React from 'react';
import Clock from "./Clock";


test('time sum 0 test', () => {
    const clock = new Clock({id: 1});

    expect(clock.getTimeSum(0,0,0)).toBe(0);
});
test('time sum seconds test', () => {
    const clock = new Clock({id: 1});

    expect(clock.getTimeSum(0,0,5)).toBe(5);
    expect(clock.getTimeSum(0,0,15)).toBe(15);
});
test('time sum minutes test', () => {
    const clock = new Clock({id: 1});

    expect(clock.getTimeSum(0,5,0)).toBe(5*60);
    expect(clock.getTimeSum(0,15,0)).toBe(15*60);
});
test('time sum hours test', () => {
    const clock = new Clock({id: 1});

    expect(clock.getTimeSum(5,0,0)).toBe(5*60*60);
    expect(clock.getTimeSum(15,0,0)).toBe(15*60*60);
});
test('time sum all test', () => {
    const clock = new Clock({id: 1});

    expect(clock.getTimeSum(0,5,5)).toBe(5*60 + 5);
    expect(clock.getTimeSum(5,5,5)).toBe(5*60*60 + 5*60 + 5);
    expect(clock.getTimeSum(0,5,5)).toBe(5*60 + 5);
    expect(clock.getTimeSum(5,15,5)).toBe(5*60*60 + 15*60 + 5);
    expect(clock.getTimeSum(5,5,15)).toBe(5*60*60 + 5*60 + 15);
});


test('time 0 to string test', () => {
    const clock = new Clock({id: 1});

    expect(clock.timeToString(0)).toBe("00:00:00");
});
test('time 10 to string test', () => {
    const clock = new Clock({id: 1});

    expect(clock.timeToString(10)).toBe("00:00:10");
});
test('time 60 to string test', () => {
    const clock = new Clock({id: 1});

    expect(clock.timeToString(60)).toBe("00:01:00");
});
test('time 600 to string test', () => {
    const clock = new Clock({id: 1});

    expect(clock.timeToString(600)).toBe("00:10:00");
});
test('time 3600 to string test', () => {
    const clock = new Clock({id: 1});

    expect(clock.timeToString(3600)).toBe("01:00:00");
});
test('time 7201 to string test', () => {
    const clock = new Clock({id: 1});

    expect(clock.timeToString(7201)).toBe("02:00:01");
});