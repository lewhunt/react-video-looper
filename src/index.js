import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default class VideoLooper extends React.Component {

    static propTypes = {
        source: PropTypes.string.isRequired,
        start: PropTypes.number.isRequired,
        end: PropTypes.number.isRequired,
        speed: PropTypes.number,
        loopCount: PropTypes.number,
        autoPlay: PropTypes.bool,
        muted: PropTypes.bool,
        isDebugMode: PropTypes.bool,
        isSplitView: PropTypes.bool
    };

    static defaultProps = {
        speed: 1,
        loopCount: null,
        autoPlay: true,
        muted: true,
        isDebugMode: false,
        isSplitView: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            isVideoCloneActive: false,
            currentLoop: 0,
            isPlaying: false,
            currentTime: 0
        };
    }

    componentDidMount() {
        this.video.addEventListener('loadeddata', this.onLoadedVideo.bind(this));
        this.videoClone.addEventListener('loadeddata', this.onLoadedVideoClone.bind(this));
        this.video.addEventListener('ended', this.onEndedVideo.bind(this));
        this.videoClone.addEventListener('ended', this.onEndedVideo.bind(this));
    }

    componentDidUpdate(prevProps) {
        const nextVideo = this.state.isVideoCloneActive ? 'video' : 'videoClone';
        if (this.props.start !== prevProps.start) {
            this[nextVideo].currentTime = this.props.start;
        } 
        if (this.props.speed !== prevProps.speed) {
            this.video.playbackRate = this.props.speed;
            this.videoClone.playbackRate = this.props.speed;
        }
    }

    componentWillUnmount() {
        cancelAnimationFrame(this._frameId);
    }

    onLoadedVideo() {
        this.video.pause();
        this.props.autoPlay && this.togglePlayback();
        this.video.playbackRate = this.props.speed || 1;
    } 

    onLoadedVideoClone() {
        this.videoClone.pause();
        this.videoClone.currentTime = this.props.start;
        this.videoClone.playbackRate = this.props.speed || 1;
    }

    togglePlayback = (e) => {
        e && e.preventDefault();
        const currentVideo = this.state.isVideoCloneActive ? 'videoClone' : 'video';
        if (this[currentVideo].paused) {
            this[currentVideo].play();
            this._frameId = requestAnimationFrame(this.tick);
            this.setState({ 
                isPlaying: true
            });
        } else {
            this[currentVideo].pause();
            cancelAnimationFrame(this._frameId);
            this.setState({ 
                isPlaying: false
            });
        }
    }

    tick = () => {
        this._frameId = requestAnimationFrame(this.tick);

        this.state.isVideoCloneActive 
            ? this.checkLoopEnd(this.videoClone, this.video)
            : this.checkLoopEnd(this.video, this.videoClone);

        if (this.props.isDebugMode) {
            this.setState({ 
                currentTime: this.state.isVideoCloneActive 
                ? (Math.round(this.videoClone.currentTime  * 100) / 100).toFixed(2)
                : (Math.round(this.video.currentTime  * 100) / 100).toFixed(2)
            })
        }
    }      
      
    checkLoopEnd(currentVideo, nextVideo) {
        if (currentVideo.currentTime >= this.props.end && (!this.props.loopCount || this.state.currentLoop < this.props.loopCount) ) {    

            nextVideo.play();
    
            this.setState({ 
                isVideoCloneActive: !this.state.isVideoCloneActive,
                currentLoop: this.state.currentLoop + 1
            }, () => {
                currentVideo.pause();
                setTimeout(() => {
                    currentVideo.currentTime = this.props.start;
                 }, 1000);
            });
        }  
    }

    onEndedVideo() {
        cancelAnimationFrame(this._frameId);
        this.setState({ 
            currentLoop: 0,
            isPlaying: false
        });
    } 

    render() {
        return (
            <VideoContainer onClick={this.togglePlayback}>
                <PlayButton {...this.state} {...this.props}/>
                <Video ref={(video) => { this.video = video; }} isVisible={!this.state.isVideoCloneActive} {...this.props}>
                    <source src={this.props.source} type='video/mp4' />
                </Video>
                <Video ref={(videoClone) => { this.videoClone = videoClone; }} className='videoClone' isVisible={this.state.isVideoCloneActive} {...this.props}>
                    <source src={this.props.source} type='video/mp4' />
                </Video>  
                {this.props.isDebugMode && 
                    <Debug isSplitView={this.props.isSplitView} isVideoCloneActive={this.state.isVideoCloneActive} currentTime={this.state.currentTime}/>
                }
            </VideoContainer>
        )
    }
}

const Debug = (props) => {
    return (
        <DebugContainer isSplitView={props.isSplitView}>
            <DebugHeader isVisible={!props.isSplitView}>
                <header>{props.isVideoCloneActive ? 'cloned video' : 'main video'}</header>
            </DebugHeader>
            <DebugHeader isVisible={props.isSplitView} isSplitView={props.isSplitView}>
                <header>main video</header>
                <header>cloned video</header>
            </DebugHeader>  
            <DebugData>
                <div>{props.currentTime}</div>
            </DebugData>
        </DebugContainer>
    )
}

const VideoContainer = styled.div`
  position: relative;
  top:0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: black;
  cursor: pointer;
`;

const Video = styled.video`
    position:  ${props => ((props.isDebugMode && props.isSplitView) ? 'relative' : 'absolute')};
    object-fit:cover;
    object-position: 40%;
    width: ${props => ((props.isDebugMode && props.isSplitView) ? '50%' : '100%')};
    height: 100%;
    left:0;
    opacity: ${props => (props.isVisible ? 1 : ((props.isDebugMode && props.isSplitView) ? 0.5 : 0) )};
    &.videoClone {
        filter: ${props => (props.isDebugMode ? 'grayscale(100%)' : 'none' )};
    }
`;

const PlayButton = styled.div`
    z-index:1;
    position: absolute;
    top: 50%;
    left: ${props => ((props.isDebugMode && props.isSplitView) ? (props.isVideoCloneActive ? '75%' : '25%') : '50%' )};;
    transform: translate(-50%, -50%);
    border: 0;
    background: transparent;
    box-sizing: border-box;
    width: 0;
    height: 100px;
    border-color: transparent transparent transparent #d6d6d644;
    border-style: solid;
    border-width: 50px 0 50px 75px;
    opacity: ${props => (props.isPlaying ? 0 : 1)};
    transition: opacity 0.3s;
`;

const DebugContainer = styled.div`
    position: absolute;
    bottom: 2em;
    right: ${props => (props.isSplitView ? '0' : '2em')};
    width: ${props => (props.isSplitView ? '100%' : 'auto')};
    font-family: "Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", Arial, sans-serif;
    line-height:1;
    user-select: none;
`;

const DebugHeader = styled.div`
    color: grey;
    font-size:1.4em;
    font-weight: 200;
    display: ${props => (props.isVisible ? 'block' : 'none')};
    text-align: center;
    header {
        display: ${props => (props.isSplitView ? 'inline-block' : 'block')};
        width: ${props => (props.isSplitView ? '50%' : '100%')};
    }
`;

const DebugData = styled.div`  
    text-align: center;
    width: 100%;
    z-index:2;
    div {
        color: grey;
        display: inline-block;
        text-align: left;
        font-size:5em;
        font-weight: 100;
    }
`;