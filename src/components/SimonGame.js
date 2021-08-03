import { useState, useEffect } from "react";
import Card from "./Card";
import { timeout, shuffleArray } from "../utils/util";
import "../style/simonGame.scss";

function SimonGame() {
  const TIMEOUT_MS = 1000;
  const colorList = ["green", "red", "blue", "yellow"];
  const initialState = {
    isDisplay: false,
    colors: [],
    score: 0,
    userPlay: false,
    userColors: [],
  };
  const [isOn, setIsOn] = useState(false);
  const [play, setPlay] = useState(initialState);
  const [flashColor, setFlashColor] = useState("");

  useEffect(() => {
    if (isOn) {
      setPlay({ ...initialState, isDisplay: true });
    } else {
      setPlay(initialState);
    }
  }, [isOn]);

  useEffect(() => {
    if (isOn && play.isDisplay) {
      let newColor = colorList[Math.floor(Math.random() * 4)];

      const copyColors = [...play.colors];
      copyColors.push(newColor);
      shuffleArray(copyColors);
      setPlay({ ...play, colors: copyColors });
    }
  }, [isOn, play.isDisplay]);

  useEffect(() => {
    if (isOn && play.isDisplay && play.colors.length) {
      displayColors();
    }
  }, [isOn, play.isDisplay, play.colors.length]);

  const displayColors = async () => {
    await timeout(TIMEOUT_MS);
    for (let i = 0; i < play.colors.length; i++) {
      setFlashColor(play.colors[i]);
      await timeout(TIMEOUT_MS);
      setFlashColor("");
      await timeout(TIMEOUT_MS);

      if (i === play.colors.length - 1) {
        const copyColors = [...play.colors];
        setPlay({
          ...play,
          isDisplay: false,
          userPlay: true,
          userColors: copyColors.reverse(),
        });
      }
    }
  };

  const onCardClick = async (color) => {
    if (!play.isDisplay && play.userPlay) {
      const copyUserColors = [...play.userColors];
      const lastColor = copyUserColors.pop();
      setFlashColor(color);

      if (lastColor === color) {
        if (copyUserColors.length) {
          setPlay({
            ...play,
            userColors: copyUserColors,
          });
        } else {
          await timeout(TIMEOUT_MS);
          setPlay({
            ...play,
            isDisplay: true,
            userPlay: false,
            score: play.colors.length,
            userColors: [],
          });
        }
      } else {
        await timeout(TIMEOUT_MS);
        setPlay({ ...initialState, score: play.colors.length });
      }
      await timeout(500);
      setFlashColor("");
    }
  };

  return (
    <div className="container">
      <div className="card-wrapper">
        {colorList &&
          colorList.map((color, index) => {
            return (
              <Card
                flash={flashColor === color}
                key={index}
                customClass={color}
                onClick={() => onCardClick(color)}
              ></Card>
            );
          })}
      </div>
      {!isOn && !play.score && (
        <button onClick={() => setIsOn(true)} className="stage start">
          Play
        </button>
      )}
      {isOn && (play.isDisplay || play.userPlay) && (
        <div className="stage score">{play.score}</div>
      )}
      {isOn && !play.isDisplay && !play.userPlay && play.score && (
        <div className="stage lost">
          <div>Final Score: {play.score}</div>
          <button onClick={() => setIsOn(false)}>Restart</button>
        </div>
      )}
    </div>
  );
}

export default SimonGame;
