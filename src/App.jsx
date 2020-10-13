import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";

const App = () => {

    var canvasWidth = window.innerWidth * 0.6;
    var canvasHeight = window.innerHeight * 0.6;

    const canvasRef = useRef();

    const [source, setSource] = useState({});



    const clickHandler = event => {
        const photo = new Image();
        photo.src = source.source;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        photo.onload = () => {
            ctx.drawImage(photo, 0, 0, canvasWidth, canvasHeight);

            ctx.fillStyle = 'white';
            ctx.fillRect(canvasWidth * 0.22, canvasHeight * 0.95, canvasWidth * 0.28, canvasHeight * 0.005);
            ctx.font = 'bolder 24px Courier New'
            //to jest 0.043 wysokości canvas - trzeba zmienić
            ctx.fillText("Fotorapid CM nr 369       02", 5, 22);
            ctx.fillText(document.getElementById("time").value.toString() + " " + document.getElementById("date").value.toString(), canvasWidth * 0.80, 22);
            ctx.fillText(document.getElementById("location").value.toString() + "/5.112 /" + document.getElementById("road").value.toString() + " PLD.02.097", 5, 47);
            ctx.fillText("24339    " + document.getElementById("speed").value.toString() + "km/h  Max:0 - " + document.getElementById("limit").value.toString() + "km/h  C - " + document.getElementById("limit").value.toString() + "km/h  K:Z    F:50", 5, canvasHeight * 0.99);

            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
            ctx.strokeRect(canvasWidth * 0.22, canvasHeight * 0.95, canvasWidth * 0.28, canvasHeight * 0.005);
            ctx.strokeText("Fotorapid CM nr 369       02", 5, 22);
            ctx.strokeText(document.getElementById("time").value.toString() + " " + document.getElementById("date").value.toString(), canvasWidth * 0.80, 22);
            ctx.strokeText(document.getElementById("location").value.toString() + "/5.112 /" + document.getElementById("road").value.toString() + " PLD.02.097", 5, 47);
            ctx.strokeText("24339    " + document.getElementById("speed").value.toString() + "km/h  Max:0 - " + document.getElementById("limit").value.toString() + "km/h  C - " + document.getElementById("limit").value.toString() + "km/h  K:Z    F:50", 5, canvasHeight * 0.99);

        };
    };

    const changeHandler = event => {
        var file = document.getElementById("upl");
        var reader = new FileReader();
        reader.onload = () => {
            var dataURL = reader.result;
            setSource({ source: dataURL });
        };
        reader.readAsDataURL(event.target.files[0]);
    };

    const numberFilter = event => {
        event.target.value = event.target.value.replace(/[^\d]/, '');
    };

    const dateFilter = event => {
        if (event.keyCode >= "48" && event.keyCode <= "57") {
            if (event.target.value.length == 2 || event.target.value.length == 5) {
                event.target.value = event.target.value + "-";
            }
        } else if (event.keyCode == "8" || event.keyCode == "9") {
            // Magia, nie ruszać (bez tej ifki backspace przesuwa myślniki w inpucie)
        } else {
            event.preventDefault()
        };
    };

    const hourFilter = event => {
        if (event.keyCode >= "48" && event.keyCode <= "57") {
            if (event.target.value.length == 2) {
                event.target.value = event.target.value + ":";
            }
        } else if (event.keyCode == "8" || event.keyCode == "9") {
            // Magia, nie ruszać (bez tej ifki backspace przesuwa dwukropek w inpucie)
        } else {
            event.preventDefault()
        };
    };

    const upperCaseFilter = event => {
        event.target.value = event.target.value.toUpperCase();
    };

    return (
        <>
            <div id="frm">
                <label className="typeIn" htmlFor="location">Lokalizacja</label>
                <input className="typeIn" type="text" id="location" placeholder="Nazwa miejscowości" />
                <label className="typeIn" htmlFor="road">Numer drogi</label>
                <input className="typeIn" type="text" maxLength="5" id="road" onChange={upperCaseFilter} placeholder="np. DW901, DK8" />
                <label className="typeIn" htmlFor="speed" >Prędkość pojazdu</label>
                <input className="typeIn" type="text" maxLength="3" id="speed" placeholder="0-999" onChange={numberFilter} />
                <label className="typeIn" htmlFor="limit">Dozwolona prędkość</label>
                <input className="typeIn" type="text" maxLength="3" id="limit" placeholder="0-140" onChange={numberFilter} />
                <label className="typeIn" htmlFor="time">Godzina</label>
                <input className="typeIn" type="text" maxLength="5" accept="" id="time" placeholder="GG:MM" onKeyDown={hourFilter} />
                <label className="typeIn" htmlFor="date">Data</label>
                <input className="typeIn" type="text" maxLength="10" accept="" id="date" placeholder="DD-MM-RRRR" onKeyDown={dateFilter} />
                <label className="typeIn" htmlFor="photo">Zdjęcie</label>
                <input className="typeIn" id="photo" type="file" id="upl" accept="image/*" onChange={changeHandler} />
                <button className="gen" onClick={clickHandler} source={source}>Generate</button>
            </div>
            <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
        </>
    )
};

ReactDOM.render(<App />, document.getElementById("root"));