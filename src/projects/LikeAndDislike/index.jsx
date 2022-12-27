import cx from "classnames";
import React, { useState } from "react";

export default function LikeAndDislike() {
  const [likeButton, setLikeButton] = useState({
    selected: false,
    value: 100,
  });

  const [dislikeButton, setDislikeButton] = useState({
    selected: false,
    value: 25,
  });

  const setClickedButton = (buttonFunction) => {
    buttonFunction((prevState) => ({
      selected: true,
      value: prevState.value + 1,
    }));
  };

  const resetClickedButton = (buttonFunction) => {
    buttonFunction((prevState) => ({
      selected: false,
      value: prevState.value - 1,
    }));
  };

  const handleLikeButton = () => {
    if (likeButton.selected) {
      resetClickedButton(setLikeButton);
      return;
    }

    setClickedButton(setLikeButton);
    if (dislikeButton.selected) {
      resetClickedButton(setDislikeButton);
    }
  };

  const handleDislikeButton = () => {
    if (dislikeButton.selected) {
      resetClickedButton(setDislikeButton);
      return;
    }

    setClickedButton(setDislikeButton);
    if (likeButton.selected) {
      resetClickedButton(setLikeButton);
    }
  };

  const handleButtonClick = (button) => {
    if (button === "likeButton") {
      handleLikeButton();
      return;
    }
    handleDislikeButton();
  };

  return (
    <>
      <div>
        <button
          className={cx({
            "like-button": true,
            liked: likeButton.selected,
          })}
          onClick={() => handleButtonClick("likeButton")}
        >
          Like | <span className="likes-counter">{likeButton.value}</span>
        </button>
        <button
          className={cx({
            "dislike-button": true,
            disliked: dislikeButton.selected,
          })}
          onClick={() => handleButtonClick("dislikeButton")}
        >
          Dislike |{" "}
          <span className="dislikes-counter">{dislikeButton.value}</span>
        </button>
      </div>
      <style>
        {`         
                    .like-button, .dislike-button {
                        font-size: 1rem;
                        padding: 5px 10px;
                        background-color: #8e8e8e;
                        border: none;
                        border-radius: 4px;
                        color: #4a4a4a;
                        margin: 0 4px;
                        opacity: 0.6;
                    }
                    .liked, .disliked {
                        font-weight: bold;
                        color: #1565c0;
                        opacity: 1;
                    }
                `}
      </style>
    </>
  );
}
