// ==UserScript==
// @name         New Time Youtube
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  ###
// @author       UserRoot-Luca
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @grant        none
// @run-at       document-end
// ==/UserScript==
(function() {
    const TimeMultiplier = (seconds:number, speed:number):number => {
        if(speed >= 1) {
            return seconds / speed;
        }
        return seconds
    }
    const TimeFormats = (seconds:number, speed:number):string => {
        let s:number = TimeMultiplier(seconds, speed);
        let m:number = Math.floor((s % 3600) / 60);
        let h:number = Math.floor(s / 3600);

        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
    };
    window.onload = () => {
        let mainDuration = document.querySelector<HTMLSpanElement>('.ytp-time-duration')!.innerText
        document.querySelector<HTMLSpanElement>(".ytp-time-current")!.addEventListener("DOMSubtreeModified", () => {
            let video = document.querySelector<HTMLVideoElement>("video");
            if (video != null) {
                let playbackSpeed = video.playbackRate;
                let duration = video.duration;
                let currentSeconds = video.currentTime;
                let remainingTime = duration - currentSeconds;
                let endOra = new Date(new Date().getTime() + (TimeMultiplier(remainingTime, playbackSpeed) * 1000));

                document.querySelector<HTMLSpanElement>('.ytp-time-duration')!.innerText = `${mainDuration} ( -${TimeFormats(remainingTime, playbackSpeed)} / ${endOra.getHours().toString().padStart(2, '0')}:${endOra.getMinutes().toString().padStart(2, '0')} )`
            }
        });
    }
})()