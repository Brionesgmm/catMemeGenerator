import React from "react";

export default function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "",
  });

  async function getMemes() {
    const res = await fetch(
      "https://api.thecatapi.com/v1/images/search?api_key=live_MJXtdqGdq93NN6Cj5zh38MQ3spXQN63CanUD5iAQ7i2PpKKB2CAAZGRfuboF7tI2"
    );
    const data = await res.json();
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: data[0].url,
    }));
  }

  React.useEffect(() => {
    getMemes();
  }, []);

  function getCatImage() {
    getMemes();
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          className="form--input"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="form--input"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button className="form--button" onClick={getCatImage}>
          Get a new cat image 🐈
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="meme--image" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
