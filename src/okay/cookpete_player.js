import React, { Component } from 'react'

import styled from 'styled-components';

import { array } from "./coucou";

import ReactPlayer from './cookpete_player/index';

import background from "./assets/coupeìdeìcaleì2.jpg";

import st1 from "./assets/area/Sanstitre-1.jpg";
import st2 from "./assets/area/Sanstitre-2.jpg";
import st3 from "./assets/area/Sanstitre-3.jpg";
import st4 from "./assets/area/Sanstitre-4.jpg";
import st5 from "./assets/area/Sanstitre-5.jpg";
import st6 from "./assets/area/Sanstitre-6.jpg";
import st7 from "./assets/area/Sanstitre-7.jpg";
import st8 from "./assets/area/Sanstitre-8.jpg";
import st9 from "./assets/area/Sanstitre-9.jpg";
import st10 from "./assets/area/Sanstitre-10.jpg";

import icon1 from "./assets/areaIcon/icon_1.png";
import icon2 from "./assets/areaIcon/icon_2.png";
import icon3 from "./assets/areaIcon/icon_3.png";
import icon4 from "./assets/areaIcon/icon_4.png";
import icon5 from "./assets/areaIcon/icon_5.png";
import icon6 from "./assets/areaIcon/icon_6.png";
import icon7 from "./assets/areaIcon/icon_7.png";
import icon8 from "./assets/areaIcon/icon_8.png";
import icon9 from "./assets/areaIcon/icon_9.png";
import icon10 from "./assets/areaIcon/icon_10.png";

import playI from "./assets/icons/play.png";
import pauseI from "./assets/icons/pause.png";
import volumeI from "./assets/icons/true-volume.png";

import creditI from "./assets/credit.png";

import { parserContent } from '../utils';

class CookPetePlayer extends Component {
  state = {
    url: null,
    pip: false,
    playing: true,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
    artistPlayed: "",
    currentOpen: -1,
    lastBackgroundImage: background,
    lastVolumeEntry: 0
  }

  componentDidMount() {
    //   this.load(this.props.source);
  }

  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      pip: false
    })
  }

  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing })
  }

  handleStop = () => {
    this.setState({ url: null, playing: false })
  }

  handleToggleControls = () => {
    const url = this.state.url
    this.setState({
      controls: !this.state.controls,
      url: null
    }, () => this.load(url))
  }

  handleToggleLight = () => {
    this.setState({ light: !this.state.light })
  }

  handleToggleLoop = () => {
    this.setState({ loop: !this.state.loop })
  }

  bsuarezClickVolumeButton = () => {
    if (this.state.muted === false) {
      this.setState({ lastVolumeEntry: this.state.volume })
      this.setState({ volume: 0 })
    } else {
      this.setState({ volume: this.state.lastVolumeEntry })
      this.setState({ lastVolumeEntry: 0 })
    }
    this.handleToggleMuted();

  }

  handleVolumeChange = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }

  handleToggleMuted = () => {
    this.setState({ muted: !this.state.muted })
  }

  handleSetPlaybackRate = e => {
    this.setState({ playbackRate: parseFloat(e.target.value) })
  }

  handleTogglePIP = () => {
    this.setState({ pip: !this.state.pip })
  }

  handlePlay = () => {
    // console.log('onPlay')
    this.setState({ playing: true })
  }

  handleEnablePIP = () => {
    // console.log('onEnablePIP')
    this.setState({ pip: true })
  }

  handleDisablePIP = () => {
    // console.log('onDisablePIP')
    this.setState({ pip: false })
  }

  handlePause = () => {
    // console.log('onPause')
    this.setState({ playing: false })
  }

  handleSeekMouseDown = e => {
    this.setState({ seeking: true })
  }

  handleSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }

  handleSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }

  handleProgress = state => {
    // console.log('onProgress', state)
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }

  handleEnded = () => {
    // console.log('onEnded')
    this.setState({ playing: this.state.loop })
  }

  handleDuration = (duration) => {
    // console.log('onDuration', duration)
    this.setState({ duration })
  }

  handleClickFullscreen = () => {
    // this line is console.log, I don't want fullscreen
    // console.log("screenfull.request(findDOMNode(this.player))");
  }

  handleActivePlay = (number) => {
    this.setState({ activePlay: number })
  }

  renderLoadButton = (url, label) => {
    // console.log(this.props.source);
    return (
      <button onClick={() => this.load(url)}>
        {label}
      </button>
    )
  }

  ref = player => {
    this.player = player
  }


  render() {
    const { url, playing, controls, light, volume, muted, loop, played, playbackRate, pip, activePlay, currentOpen, lastBackgroundImage } = this.state
    const podcastPost = [];
    const postLink = [];
    const credit = [];

    const choosePodcast = (index, url, fullName) => {
      const controls = document.querySelector("#my-controls");
      const openElement = document.querySelector(`#open-${index}`);
      const closeImg = document.querySelector(`#close-img-${index}`);

      const imgBackground = document.querySelector("#img-background");
      this.setState({ lastBackgroundImage: imageArray[index], artistPlayed: fullName })
      this.load(url);
      controls.style.display = "block";
      imgBackground.setAttribute("src", imageArray[index]);
      if (currentOpen !== -1 && currentOpen !== index) {
        const currentOpenElement = document.querySelector(`#open-${currentOpen}`);
        const currentCloseImg = document.querySelector(`#close-img-${currentOpen}`);
        currentOpenElement.style.display = "none";
        currentCloseImg.style.filter = "grayscale(1)";
      }
      if (openElement.style.display === "block") {
        openElement.style.display = "none";
      } else {
        this.setState({ currentOpen: index })
        openElement.style.display = "block";
        closeImg.style.filter = "grayscale(0)";
      }
    }

    const findArtistIndex = (string) => {
      for (let index = 0; index < artistIndex.length; index++) {
        if (artistIndex[index].name === string) {
          return artistIndex[index].index;
        }
      }
    }

    const artistIndex = [
      { name: "Philippe", index: 0 },
      { name: "Arnaud", index: 4 },
      { name: "Nicolas", index: 5 },
      { name: "Elle", index: 1 },
      { name: "Pêdra", index: 6 },
      { name: "Chloé", index: 7 },
      { name: "Fatou", index: 2 },
      { name: "Catherine", index: 8 },
      { name: "Robert", index: 3 },
      { name: "Audrey", index: 9 }
    ];

    const artistImage = [
      icon10,
      icon1,
      icon2,
      icon4,
      icon3,
      icon9,
      icon6,
      icon8,
      icon7,
      icon5,
    ]

    const aray = array;

    // if (this.props.data.items) {
    // this.props.data.items.map((item, i) => {
    aray.map((item, i) => {
      // const post = this.props.frontState.source[item.type][item.id];
      const post = item;
      // console.log(`{artist_name:"${post.artist_name}",
      //   podcast_link:"${post.podcast_link}",
      //   content_fr:"${post.content_fr}",
      //   content_en:"${post.content_en}"
      // },`);
      if (post.artist_name !== "credits") {
        const selectedName = post.artist_name.split(" ")[0];
        const element =
          (
            <Artist key={post.podcast_link}>
              <Close key={`close_${post.podcast_link}`} id={`close-${findArtistIndex(selectedName)}`} onClick={() => choosePodcast(findArtistIndex(selectedName), post.podcast_link, post.artist_name)}>
                <img alt='anti-warning' id={`close-img-${findArtistIndex(selectedName)}`} src={artistImage[findArtistIndex(selectedName)]} />
                <p>{post.artist_name}</p>
              </Close>
              <Open key={`open_${post.podcast_link}`} id={`open-${findArtistIndex(selectedName)}`} className="open-content" >
                <p>{post.content_fr}</p>
              </Open>
            </Artist>
          )
        postLink.push({ name: selectedName, link: post.podcast_link });
        podcastPost.push(element);
      } else {
        const credit_content_fr = <div key={`credit-${post.podcast_link}`}>
          {parserContent(post.content_fr, false)}
        </div>;
        const credit_content_en = <div key={`credit-${post.podcast_link}`}>
          {parserContent(post.content_en, false)}
        </div>;
        credit.push(credit_content_fr);
        credit.push(credit_content_en);
      }
      return null
    })
    // }

    const imageArray = [
      st10,
      st1,
      st2,
      st4,
      st3,
      st9,
      st6,
      st8,
      st7,
      st5,
    ]

    const mouseHover = (number) => {
      const imgBackground = document.querySelector("#img-background");
      if (number >= 0) {
        imgBackground.setAttribute("src", imageArray[number])
      }
    }

    const mouseOut = (number) => {
      const imgBackground = document.querySelector("#img-background");
      if (activePlay !== number) {
        imgBackground.setAttribute("src", lastBackgroundImage);
      }
    }

    const mouseLoad = (string) => {
      for (let index = 0; index < postLink.length; index++) {
        const element = postLink[index];
        if (element.name === string) {
          return element.link;
        }
      }
    }

    return (
      <Cook>
        <section className='section'>
          <Section>
            <ReactPlayer
              ref={this.ref}
              className='react-player'
              width='100%'
              height='100%'
              url={url}
              pip={pip}
              playing={playing}
              controls={controls}
              light={light}
              loop={loop}
              playbackRate={playbackRate}
              volume={volume}
              muted={muted}
              // onReady={() => console.log('onReady')}
              // onStart={() => console.log('onStart')}
              onPlay={this.handlePlay}
              onEnablePIP={this.handleEnablePIP}
              onDisablePIP={this.handleDisablePIP}
              onPause={this.handlePause}
              // onBuffer={() => console.log('onBuffer')}
              // onSeek={e => console.log('onSeek', e)}
              onEnded={this.handleEnded}
              // onError={e => console.log('onError', e)}
              onProgress={this.handleProgress}
              onDuration={this.handleDuration}
            />
          </Section>
          <Grid>
            <Img alt="anti-warning" id="img-background" src={background} />
            <GridContent>
              <D1>
                <InnerD1></InnerD1>
                <InnerD2 onMouseOver={() => mouseHover(4)} onMouseOut={() => mouseOut(4)} onClick={() => choosePodcast(4, mouseLoad("Arnaud"))}></InnerD2>
                <InnerD3 onMouseOver={() => mouseHover(4)} onMouseOut={() => mouseOut(4)} onClick={() => choosePodcast(4, mouseLoad("Arnaud"))}></InnerD3>
                <InnerD4></InnerD4>
              </D1>
              <D2>
                <InnerD1 onMouseOver={() => mouseHover(0)} onMouseOut={() => mouseOut(0)} onClick={() => choosePodcast(0, mouseLoad("Philippe"))}></InnerD1>
                <InnerD2 onMouseOver={() => mouseHover(0)} onMouseOut={() => mouseOut(0)} onClick={() => choosePodcast(0, mouseLoad("Philippe"))}></InnerD2>
                <InnerD3 onMouseOver={() => mouseHover(5)} onMouseOut={() => mouseOut(5)} onClick={() => choosePodcast(5, mouseLoad("Nicolas"))}></InnerD3>
                <InnerD4></InnerD4>
              </D2>
              <D3>
                <InnerD1></InnerD1>
                <InnerD2 onMouseOver={() => mouseHover(1)} onMouseOut={() => mouseOut(1)} onClick={() => choosePodcast(1, mouseLoad("Elle"))}></InnerD2>
                <InnerD3 onMouseOver={() => mouseHover(6)} onMouseOut={() => mouseOut(6)} onClick={() => choosePodcast(6, mouseLoad("Pêdra"))}></InnerD3>
                <InnerD4></InnerD4>
              </D3>
              <D4>
                <InnerD1></InnerD1>
                <InnerD2 onMouseOver={() => mouseHover(1)} onMouseOut={() => mouseOut(1)} onClick={() => choosePodcast(1, mouseLoad("Elle"))}></InnerD2>
                <InnerD3 onMouseOver={() => mouseHover(7)} onMouseOut={() => mouseOut(7)} onClick={() => choosePodcast(7, mouseLoad("Chloé"))}></InnerD3>
                <InnerD4></InnerD4>
              </D4>
              <D5>
                <InnerD1></InnerD1>
                <InnerD2 onMouseOver={() => mouseHover(2)} onMouseOut={() => mouseOut(2)} onClick={() => choosePodcast(2, mouseLoad("Fatou"))}></InnerD2>
                <InnerD3 onMouseOver={() => mouseHover(8)} onMouseOut={() => mouseOut(8)} onClick={() => choosePodcast(8, mouseLoad("Catherine"))}></InnerD3>
                <InnerD4></InnerD4>
              </D5>
              <D6>
                <InnerD1 onMouseOver={() => mouseHover(3)} onMouseOut={() => mouseOut(3)} onClick={() => choosePodcast(3, mouseLoad("Robert"))}></InnerD1>
                <InnerD2 onMouseOver={() => mouseHover(3)} onMouseOut={() => mouseOut(3)} onClick={() => choosePodcast(3, mouseLoad("Robert"))}></InnerD2>
                <InnerD3 onMouseOver={() => mouseHover(9)} onMouseOut={() => mouseOut(9)} onClick={() => choosePodcast(9, mouseLoad("Audrey"))}></InnerD3>
                <InnerD4></InnerD4>
              </D6>
              <Img alt="anti-warning" src="http://localhost:8888/wp-content/uploads/2021/08/coupeìdeìcaleì2-scaled.jpg" />
            </GridContent>
          </Grid>


          <List>
            <Podcast>
              {podcastPost}
            </Podcast>
            <Credit>
              <hr className="my-line"></hr>
              <img alt="anti-warning" className="big-image" src={creditI} />
              {credit[0]}
            </Credit>
          </List>


        </section>
        <HideControl id="my-controls">
          <Controls>
            <div id="name-artist">
              <p>{this.state.artistPlayed}</p>
            </div>
            <button id="button-play" onClick={this.handlePlayPause}>{playing ? <img alt="anti-warning" src={pauseI} /> : <img alt="anti-warning" src={playI} />}</button>
            <input
              id="my-lecture"
              className="custom-slider"
              type='range' min={0} max={0.999999} step='any'
              value={played}
              onMouseDown={this.handleSeekMouseDown}
              onChange={this.handleSeekChange}
              onMouseUp={this.handleSeekMouseUp}
            />
            <button id="button-volume" onClick={this.bsuarezClickVolumeButton}><img alt="anti-warning" src={volumeI} /></button>
            <input id="my-volume" className="custom-slider" type='range' min={0} max={1} step='any' value={volume} onChange={this.handleVolumeChange} />
          </Controls>
        </HideControl>
        <Footer>
          <hr></hr>
          <pre>© 2021 Copyright COUPÉDÉCALÉ.</pre>
        </Footer>
      </Cook>
    )
  }
}

export default CookPetePlayer;

const Cook = styled.div`
  section {
    padding-top: 0.5em;
    padding-left: 5em;
    padding-right: 5em;
  }
`

const Section = styled.div`
  display: none;
`

const List = styled.div`
@media (min-width: 44em) {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  align-items: end;
}
  max-height: 20%;
`

const Podcast = styled.div`

`

const Credit = styled.div`
  position: -webkit-sticky;
  position: sticky;
  grid-column: 2 / 3;
  img {
    max-width: 100%;
  }

  h5 {
    padding: 1em 1em 1em 2em;
  }

  .my-line {
    margin-top: 2em;
    margin-bottom: 2em;
    @media (min-width: 44em) {
      display: none;
    }
  }

`

const HideControl = styled.div`
  display: none;
`

const Controls = styled.div`

  position: fixed;
  bottom: 0px;

  display: grid;
  grid-template-columns: repeat(14, 1fr);

  width: 100%;
  height: 4em;
  padding: 0.5em;

  background-color: WhiteSmoke;

  button {
    padding: 0;
    border: none;
  }

  img {
    max-width: 2em;
  }

  #name-artist {
    padding: 0 0 0 20px;
    grid-column: 1 / 3;
    positon: absolute;
    align-self: center;
    justify-self: center;
    font-family: Avenir Light;
    color: teal;
    text-transform: uppercase;
  }

  #button-play {

    margin-left: 10px;
    max-width: 100%;

    margin-right: 10px;
    grid-column: 3 / 4;
  }

  #button-volume {

    margin-left: 10px;

    margin-right: 10px;
    grid-column: 12 / 13;
  }

  #my-lecture {
    grid-column: 4 / 12;
  }

  #my-volume {
    grid-column: 13 / 15;
  }


  input[type=range].custom-slider {

    -webkit-appearance: none;     /*nécessaire pour Chrome */
    padding: 0;                   /* nécessaire pour IE */
    font: inherit;                /* même rendu suivant font document */
    outline: none;
    color: teal;                  /* sert pour couleur de référence, via currentColor, pour le curseur */
    opacity: .8;
    background: #CCC;             /* sert pour couleur de fond de la zone de déplacement */
    box-sizing: border-box;       /* même modèle de boîte pour tous */
    transition: opacity .2s;
    cursor: pointer;
  }

  input[type=range].custom-slider::-webkit-slider-runnable-track {
    height: 90%;
    border: none;
    border-radius: 0;
    background-color: transparent;  /* supprimé définie sur l'input */
  }

  input[type=range].custom-slider::-webkit-slider-thumb {
    -webkit-appearance: none;       /* également nécessaire sur le curseur */
    width: 1em;
    height: inherit;                /* s'adapte à la hauteur de l'input */
    border: none;
    border-radius: 0;               /* pris en compte sur Webkit et Edge */
    background: currentColor;       /* pris en compte sur Webkit only */
  }

  input[type=range].custom-slider::-moz-range-track {
    height: 90%;
    border: none;
    border-radius: 0;
    background-color: transparent;  /* supprimé définie sur l'input */
  }

  input[type=range].custom-slider::-moz-range-thumb {
    width: 1em;
    height: inherit;                /* s'adapte à la hauteur de l'input */
    border: none;                   /* supprimer la bordure */
    border-radius: 0;               /* supprimer le rayon */
    background: currentColor;
  }

  input[type=range].custom-slider::-moz-range-progress {
    height: 0;
    background: transparent;        /* supprime barre progression avant */
  }

`

const Grid = styled.div`
  @media (max-width: 44em) {
    display: none;
  }

  display: grid;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;

  margin: 0 auto;

`

const GridContent = styled.div`

  grid-column: 1 / 7;
  grid-row: 1 / 2;
  max-width: 100%;

  color: Teal;


  img {
    opacity: 0;
  }

  display: grid;
  grid-template-columns: repeat(6, 1fr);

  div {
    width: 1fr;
    height: 1fr;
  }
`

const D1 = styled.div`
display: grid;
grid-template-rows: 1fr 1fr 1fr 1fr;
grid-column: 1 / 2;
grid-row: 1 / 2;
`
const D2 = styled.div`
display: grid;
grid-template-rows: 1fr 1fr 1fr 1fr;
grid-column: 2 / 3;
grid-row: 1 / 2;
`
const D3 = styled.div`
display: grid;
grid-template-rows: 1fr 1fr 1fr 1fr;
grid-column: 3 / 4;
grid-row: 1 / 2;
`
const D4 = styled.div`
display: grid;
grid-template-rows: 1fr 1fr 1fr 1fr;
grid-column: 4 / 5;
grid-row: 1 / 2;
`
const D5 = styled.div`
display: grid;
grid-template-rows: 1fr 1fr 1fr 1fr;
grid-column: 5 / 6;
grid-row: 1 / 2;
`
const D6 = styled.div`
display: grid;
grid-template-rows: 1fr 1fr 1fr 1fr;
grid-column: 6 / 7;
grid-row: 1 / 2;
`

const InnerD1 = styled.div`
grid-rows: 1 / 2;
z-index: 50;
color: white;

`
const InnerD2 = styled.div`
grid-rows: 2 / 3;
z-index: 50;
color: white;

`
const InnerD3 = styled.div`
grid-rows: 3 / 4;
z-index: 50;
color: white;

`
const InnerD4 = styled.div`
grid-rows: 4 / 5;
z-index: 50;
color: white;

`

const Img = styled.img`
    grid-column: 1 / 7;
    grid-row: 1 / 2;
    max-width: 100%;
`

const Artist = styled.div`
    grid-column: 1 / 2;
    padding: 3px;
    h3 {
        color: Teal;
        font-family: Avenir Light;
        @media (max-width: 60em) {
        }
    }
    div:hover {
      background-color: Snow;
    }
`

const Close = styled.div`
    border: 0.5px solid DarkGray;

    cursor: pointer;

    display: grid;
    grid-template-columns: repeat(8, 1fr);
    justify-content: center;
    align-items: center;
    
    transition: all 1s ease-out;

    img {
        grid-column: 1;
        filter: grayscale(1);
        padding: 1em;
        max-width: 5vW;
        @media (max-width: 60em) {
          min-width: 15Vw;
        }
        border-radius: 50%;
    }

    p {
      grid-column: 3 / 8;
    }
`

const Open = styled.div`
  display: none;
  overflow: hidden;
  
  padding: 2em 2em 2em 6em;

  transition: all 1s ease-out;
`

const Footer = styled.div`
 padding: 2em;
 hr {
   margin-bottom: 1em;
 }
`
