/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};



var sixtyMinutes = 3600;
var twentyFiveMinutes = 1500;
var fiveMinutes = 300;
var time = twentyFiveMinutes;
var mode = "work";
var mins;
var secs;
var countdownID;
var circleStart;
var circleEnd;
var timeDivider;
var round = 1;
var total = 0;

// get the html elements
var minutesHTML = document.getElementById("minutes");
var secondsHTML = document.getElementById("seconds");
var roundHTML = document.getElementById("round");
var totalHTML = document.getElementById("total");

// register the buttons
var start = document.getElementById("start");
start.addEventListener("click", startTimer, false);  
var stop = document.getElementById("stop");
stop.addEventListener("click", stopTimer, false);
var reset = document.getElementById("reset");  
reset.addEventListener("click", resetTimer, false);


function counter() {
  
    // calculate the minutes and seconds
    mins = Math.floor(time / 60);
    secs = time - mins * 60;

    // update html
    minutesHTML.innerHTML = (mins < 10 ? '0' : '') + mins;
    secondsHTML.innerHTML = (secs < 10 ? '0' : '') + secs;
  
    if (time == 0) {
    
        if (mode == "work") {
            // time for a break!
            mode = "break"; 

            if(round < 4) {
                time = fiveMinutes;
            }
            else { 
                time = sixtyMinutes;
            }
            round++;
            total++;
            totalHTML.innerHTML = total;
      
        } else if (mode == "break") {
            // time for work!
            mode = "work";    
            time = twentyFiveMinutes;  

            if(round > 4) {
                round = 1;
            }
          
            start.style.display = ""; 
            stop.style.display = "none"; 
            reset.style.display = "none"; 
          
            // stop timer
            clearInterval(countdownID);
        }    
    } else {
        if(mode == "work") {
            timeDivider = twentyFiveMinutes;
        }
        else {
            if(round <= 4) { // <= 4 as round is updated before this check
                timeDivider = fiveMinutes;
            }
            else {
                timeDivider = sixtyMinutes;
            }
        }

        // update circle and time (1 second has passed)
        // need to divide current time left by the counter
        // being displayed to the user so that the circle
        // finishes flushly with the counter running out
        circleStart = 1 - (time / timeDivider);
        time = time - 1; 
        circleEnd = 1 - (time / timeDivider);
        $('#circle').circleProgress({ animationStartValue: circleStart, value: circleEnd });
    }     
}

function startTimer() {
    countdownID = setInterval("counter()", 1000);
    roundHTML.innerHTML = round + "/4";
  
    start.style.display = "none"; 
    stop.style.display = ""; 
    reset.style.display = "none"; 

    // change background color
    var colors = Array("#27ae60","#2980b9","#8e44ad","#c0392b");
    var color = colors[Math.floor(Math.random()*colors.length)];
    document.body.style.background = color;
} 

function stopTimer() {  
    clearInterval(countdownID);
  
    start.style.display = "none"; 
    stop.style.display = "none"; 
    reset.style.display = ""; 
}

function resetTimer() {
    time = twentyFiveMinutes;
  
    minutesHTML.innerHTML = "25";
    secondsHTML.innerHTML = "00";
    $('#circle').circleProgress({ value: 0 });

    // change background color
    var colors = Array("#27ae60","#2980b9","#8e44ad","#c0392b");
    var color = colors[Math.floor(Math.random()*colors.length)];
    document.body.style.background = color;

    start.style.display = ""; 
    stop.style.display = "none"; 
    reset.style.display = "none"; 
}
