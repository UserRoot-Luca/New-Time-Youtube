"use strict";
// ==UserScript==
// @name         New Time Youtube
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  ###
// @author       UserRoot-Luca
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @grant        none
// @run-at       document-end
// ==/UserScript==
(function () {
    const TimeMultiplier = (seconds, speed) => {
        if (speed >= 1) {
            return seconds / speed;
        }
        return seconds;
    };
    const TimeFormats = (seconds, speed) => {
        let s = TimeMultiplier(seconds, speed);
        let m = Math.floor((s % 3600) / 60);
        let h = Math.floor(s / 3600);
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
    };
    window.onload = () => {
        document.querySelector(".ytp-time-current").addEventListener("DOMSubtreeModified", () => {
            let video = document.querySelector("video");
            if (video != null) {
                let mainDuration = document.querySelector('.ytp-time-duration').innerText.split(" ")[0];
                let playbackSpeed = video.playbackRate;
                let duration = video.duration;
                let currentSeconds = video.currentTime;
                let remainingTime = duration - currentSeconds;
                let endOra = new Date(new Date().getTime() + (TimeMultiplier(remainingTime, playbackSpeed) * 1000));
                document.querySelector('.ytp-time-duration').innerText = `${mainDuration} ( -${TimeFormats(remainingTime, playbackSpeed)} / ${endOra.getHours().toString().padStart(2, '0')}:${endOra.getMinutes().toString().padStart(2, '0')} )`;
            }
        });
    };
})();
