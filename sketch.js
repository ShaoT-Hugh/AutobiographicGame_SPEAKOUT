var _assets; // dictionary
var _timerManager; // dictionary
var _stageManager;
var _spriteManager;
var _sceneSpace; // canvas
var _playSpace; // canvas
var _scoreBoardSpace; // canvas
var _dynamicObjManager;
var _protagonist;
var _beatManager;

// representative colors of the topics
// 0-4: magenta(#ff00aa), blue(#00aaf0), purple(#aa00ff), orange(#ffaa00), green(#c9e3ac)
var topic_colors = ['255,0,170', '0,170,240', '170,0,255', '255,170,0', '201,227,172'];

// in-game parameters
var _isMousePressed = false; // if the mouse if pressed
var _Width = 600; // width of the canvas
var _Height = 400; // height of the canvas
var _sceneheight = 130; // height of the top scene graphic
var round_time = 120; // total time per round(sec)

var _fragScore = 10; // score of each single fragment
var _probOfTorpedo = 10; // generative probability of torpedo
var _nonTopicFrag = 60; // generative probability of non-topic fragment

var turorial_text = [
  "Hi! Today I'm going to teach you how to speak in a discussion.",
  "Here shows the topic people are talking."
]

var pixel_font; // font used in the interface
var text_font; // font used in texts
var fram_rate = 60;
var global_timer = 0;

function preload(){
  
  // soundFormats('mp3', 'ogg');
  // initialize assets manager
  _assets = new Map();

  // load assets (only the assets used in menu stage are preloaded)
  // stage images
  _assets.set('stage1_back', new asset('static_image', 'assets/graphics/Stage1_back.png'));
  _assets.set('stage1_front', new asset('static_image', 'assets/graphics/Stage1_front.png'));
  _assets.set('stage2_back', new asset('static_image', 'assets/graphics/Stage2_back.png'));
  _assets.set('stage2_front', new asset('static_image', 'assets/graphics/Stage2_front.png'));
  _assets.set('stage3_back', new asset('static_image', 'assets/graphics/Stage3_back.png'));
  _assets.set('stage3_front', new asset('static_image', 'assets/graphics/Stage3_front.png'));

  // load characters
  _assets.set('p1a', new asset('dynamic_image', 'assets/graphics/p1a', 4, '.png'));
  _assets.set('p1b', new asset('dynamic_image', 'assets/graphics/p1b', 4, '.png'));
  _assets.set('p1c', new asset('dynamic_image', 'assets/graphics/p1c', 4, '.png'));
  _assets.set('p1d', new asset('dynamic_image', 'assets/graphics/p1d', 4, '.png'));
  _assets.set('p1e', new asset('dynamic_image', 'assets/graphics/p1e', 4, '.png'));
  _assets.set('p1f', new asset('dynamic_image', 'assets/graphics/p1f', 4, '.png'));
  _assets.set('p2a', new asset('dynamic_image', 'assets/graphics/p2a', 4, '.png'));
  _assets.set('p2b', new asset('dynamic_image', 'assets/graphics/p2b', 4, '.png'));
  _assets.set('p2c', new asset('dynamic_image', 'assets/graphics/p2c', 4, '.png'));
  _assets.set('p2d', new asset('dynamic_image', 'assets/graphics/p2d', 4, '.png'));
  _assets.set('p2e', new asset('dynamic_image', 'assets/graphics/p2e', 4, '.png'));
  _assets.set('p3a', new asset('dynamic_image', 'assets/graphics/p3a', 4, '.png'));
  _assets.set('p3b', new asset('dynamic_image', 'assets/graphics/p3b', 4, '.png'));
  _assets.set('p3c', new asset('dynamic_image', 'assets/graphics/p3c', 4, '.png'));
  _assets.set('p3d', new asset('dynamic_image', 'assets/graphics/p3d', 4, '.png'));
  
  // load menu UIs
  _assets.set('button_big', new asset('dynamic_image', 'assets/graphics/button_big_', 2, '.png'));

  // load stage data
  _assets.set('data_1', loadJSON('assets/stage_parameter_1.json'));
  _assets.set('data_2', loadJSON('assets/stage_parameter_2.json'));
  _assets.set('data_3', loadJSON('assets/stage_parameter_3.json'));

}
function setup(){
  createCanvas(_Width, _Height);
  angleMode(DEGREES);
  noStroke();

  // load all the remaining assets

  // load graphic files
  // load UI elements
  _assets.set('board_A', new asset('static_image', 'assets/graphics/board_A.png'));
  _assets.set('board_B', new asset('static_image', 'assets/graphics/board_B.png'));
  _assets.set('board_X', new asset('static_image', 'assets/graphics/board_X.png'));
  _assets.set('board_Y', new asset('static_image', 'assets/graphics/board_Y.png'));
  _assets.set('board_O', new asset('static_image', 'assets/graphics/board_O.png'));
  _assets.set('topic_A', new asset('static_image', 'assets/graphics/topic_A.png'));
  _assets.set('topic_B', new asset('static_image', 'assets/graphics/topic_B.png'));
  _assets.set('topic_X', new asset('static_image', 'assets/graphics/topic_X.png'));
  _assets.set('topic_Y', new asset('static_image', 'assets/graphics/topic_Y.png'));
  _assets.set('topic_O', new asset('static_image', 'assets/graphics/topic_O.png'));

  _assets.set('courage_gauge', new asset('static_image', 'assets/graphics/courage_gauge.png'));
  _assets.set('courage_gauge_full', new asset('static_image', 'assets/graphics/courage_gauge_full.png'));
  _assets.set('courage', new asset('static_image', 'assets/graphics/courage.png'));
  _assets.set('courage_full', new asset('static_image', 'assets/graphics/courage_full.png'));

  _assets.set('score_board', new asset('static_image', 'assets/graphics/score_board.png'));
  _assets.set('button_small', new asset('dynamic_image', 'assets/graphics/button_small_', 2, '.png'));

  // load dialogue bubbles
  _assets.set('d_01', new asset('static_image', 'assets/graphics/Dialogue_A1.png'));
  _assets.set('d_02', new asset('static_image', 'assets/graphics/Dialogue_A2.png'));
  _assets.set('d_11', new asset('static_image', 'assets/graphics/Dialogue_B1.png'));
  _assets.set('d_12', new asset('static_image', 'assets/graphics/Dialogue_B2.png'));
  _assets.set('d_21', new asset('static_image', 'assets/graphics/Dialogue_X1.png'));
  _assets.set('d_22', new asset('static_image', 'assets/graphics/Dialogue_X2.png'));
  _assets.set('d_31', new asset('static_image', 'assets/graphics/Dialogue_Y1.png'));
  _assets.set('d_32', new asset('static_image', 'assets/graphics/Dialogue_Y2.png'));
  _assets.set('d_41', new asset('static_image', 'assets/graphics/Dialogue_O1.png'));
  _assets.set('d_42', new asset('static_image', 'assets/graphics/Dialogue_O2.png'));
  // bubbles array
  _assets.set('bubbles_right', [_assets.get('d_01').content, _assets.get('d_11').content,
  _assets.get('d_21').content, _assets.get('d_31').content, _assets.get('d_41').content,]);
  _assets.set('bubbles_left', [_assets.get('d_02').content, _assets.get('d_12').content,
  _assets.get('d_22').content, _assets.get('d_32').content, _assets.get('d_42').content,]);

  // load dynamic objects
  _assets.set('protagonist', new asset('static_image', 'assets/graphics/protagonist.png'));
  _assets.set('torpedo', new asset('static_image', 'assets/graphics/torpedo.png'));
  _assets.set('frag_A', new asset('static_image', 'assets/graphics/fragA.png'));
  _assets.set('frag_B', new asset('static_image', 'assets/graphics/fragB.png'));
  _assets.set('frag_X', new asset('static_image', 'assets/graphics/fragX.png'));
  _assets.set('frag_Y', new asset('static_image', 'assets/graphics/fragY.png'));
  _assets.set('frag_O', new asset('static_image', 'assets/graphics/fragO.png'));
  // fragments array
  _assets.set('frags', [_assets.get('frag_A'), _assets.get('frag_B'), _assets.get('frag_X'), _assets.get('frag_Y'), _assets.get('frag_O'), ]);

  // load sound files
  _assets.set('clickbutton', new asset('sound', 'assets/soundeffects/sfx_sounds_button6.wav'));

  _assets.set('collide', new asset('sound', 'assets/soundeffects/sfx_exp_shortest_hard7.wav'));
  _assets.set('absorbed', new asset('sound', 'assets/soundeffects/sfx_lowhealth_alarmloop6.wav'));
  _assets.set('explode', new asset('sound', 'assets/soundeffects/sfx_exp_short_hard2.wav'));
  _assets.set('success', new asset('sound', 'assets/soundeffects/sfx_exp_odd5.wav'));
  _assets.set('checkout', new asset('sound', 'assets/soundeffects/bell_03.ogg'));

  // load background music
  _assets.set('music_0', new asset('sound', 'assets/soundeffects/Cluster Block v0_8.mp3'));
  _assets.set('music_1', new asset('sound', 'assets/soundeffects/The Adventure Begins 8-bit remix.ogg'));
  _assets.set('music_2', new asset('sound', 'assets/soundeffects/Shake and Bake.mp3'));
  _assets.set('music_3', new asset('sound', 'assets/soundeffects/S31-Through the Portal.ogg'));
  
  // load the font
  pixel_font = loadFont('assets/Minecraft.ttf');
  text_font = pixel_font;
  textFont(pixel_font);

  // Initialize the stage_manager
  _stageManager = stageManager.get();
  _stageManager.stages.push(new menu('menu', 0, _assets.get('button_big').content));
  // Intialize all the stages(stage name, stage number, back image, front image, stage data)
  _stageManager.stages.push(new stage('school', 1, _assets.get('stage1_back').content, _assets.get('stage1_front').content, _assets.get('data_1')));
  _stageManager.stages.push(new stage('party', 2, _assets.get('stage2_back').content, _assets.get('stage2_front').content, _assets.get('data_2')));
  _stageManager.stages.push(new stage('meeting', 3, _assets.get('stage3_back').content, _assets.get('stage3_front').content, _assets.get('data_3')));

  // initialize characters(x position, images, bubble position(true-left, false-right), isSlient(default: false), y position(default))
  _stageManager.stages[1].characters.push(new character(138, _assets.get('p1a').content, true));
  _stageManager.stages[1].characters.push(new character(363, _assets.get('p1b').content, false));
  _stageManager.stages[1].characters.push(new character(192, _assets.get('p1c').content, false));
  _stageManager.stages[1].characters.push(new character(273, _assets.get('p1d').content, true));
  _stageManager.stages[1].characters.push(new character(456, _assets.get('p1e').content, false, false, _sceneheight - 92));
  _stageManager.stages[1].characters.push(new character(75, _assets.get('p1f').content, false, true, _sceneheight - 96));
  _stageManager.stages[2].characters.push(new character(273, _assets.get('p2a').content, false));
  _stageManager.stages[2].characters.push(new character(156, _assets.get('p2b').content, true));
  _stageManager.stages[2].characters.push(new character(393, _assets.get('p2c').content, true));
  _stageManager.stages[2].characters.push(new character(462, _assets.get('p2d').content, false));
  _stageManager.stages[2].characters.push(new character(24, _assets.get('p2e').content, false, true));
  _stageManager.stages[3].characters.push(new character(225, _assets.get('p3a').content, false));
  _stageManager.stages[3].characters.push(new character(150, _assets.get('p3b').content, true));
  _stageManager.stages[3].characters.push(new character(315, _assets.get('p3c').content, false));
  _stageManager.stages[3].characters.push(new character(435, _assets.get('p3d').content, false));

  // Initialize the scene space area
  _sceneSpace = createGraphics(width, _sceneheight);

  // Initialize the play space area
  _playSpace = createGraphics(width, height - _sceneheight);
  _playSpace.background(0);
  _playSpace.noStroke();
  _playSpace.angleMode(DEGREES);
  _playSpace.imageMode(CENTER);

  // Initialize the sprite manager
  _spriteManager = spriteManager.get();

  // Initialize the score board area
  _scoreBoardSpace = createGraphics(_spriteManager.score_board.width, _spriteManager.score_board.height);
  _scoreBoardSpace.noStroke();

  // Initialize the dynamic_obj_manager
  _dynamicObjManager = dynamicObjManager.get();
  // Initialize the protagonist(postion X, position Y, moving speed, size)
  _protagonist = protagonist.get(width/2, _playSpace.height/2, 4, 20);
  // Initialize the beat_manager(diameter of beats, duration of the beat)
  _beatManager = beatManager.get(50, 30);

  // Initialize the timer_manager
  _timerManager = new Map();

  // global timer will always record the run time of the whole program
  _timerManager.set('global_timer', setInterval(function(){global_timer++;}), 1000);
  // count down timer records records when a countdown timer is created
  _timerManager.set('count_down', 0);
  _timerManager.set('loading_interval', 0);
  _timerManager.set('loading_timeout', 0);
  _timerManager.set('talking', 0);

  // load the menu
  _stageManager.switchStage(0);
}

function draw() {
  background(0);

  _stageManager.render(); // render the current stage
  _stageManager.checkStatus(); // check if the stage status needs updated

}

function mousePressed(){
  // let x = mouseX;
  // let y = mouseY - _sceneheight;
  _isMousePressed = true;
}
function mouseReleased(){
  _isMousePressed = false;
}

// check if any key is down, return all the pressed keys as an array
function keyEvents(){
  let pressedKeys = [];
  // ASCII keycode: left/a, right/d, up/w, down/s, enter-13, esc-27
  if(keyIsDown(65) || keyIsDown(37)) pressedKeys.push(true);
  else pressedKeys.push(false);
  if(keyIsDown(68) || keyIsDown(39)) pressedKeys.push(true);
  else pressedKeys.push(false);
  if(keyIsDown(87) || keyIsDown(38)) pressedKeys.push(true);
  else pressedKeys.push(false);
  if(keyIsDown(83) || keyIsDown(40)) pressedKeys.push(true);
  else pressedKeys.push(false);

  return pressedKeys; // key order: [LEFT, RIGHT, UP, DOWN]
}

// <---------- Assets ---------->
class asset{
  constructor(type, path, num = 1, suffix = ''){
    switch(type){
      case 'dynamic_image':
        this.content = [];
        for(let i = 1; i <= num; i++) this.content.push(loadImage(path + i + suffix));
        break;
      case 'static_image':
        this.content = loadImage(path);
        break;
      case 'sound':
        this.content = loadSound(path);
        break;
      default:
        console.log('Warning: File type is invalid:', path);
    }
  }
}

// <---------- Stage ---------->
class stageManager{
  static get(){
    if(!this.instance) this.instance = new stageManager();
    return this.instance;
  }
  constructor(){
    this.curStage = 0; // current stage number
    this.nextStage = 0; // next stage number
    this.statusNum = 0;
    this.stages = []; // all the stages
    this.gameData = {}; // current stage data
    this.playTime = round_time; // total play time in this round
    this.topicTimer = -1; // current topic timer
    this.barrageTimers = []; // barrage timers in current stage

    this.talkingTimer = -1;
    this.isTalking = false; // if someone is talking
    this.whoIsTalking = -1; // who is talking
    this.protagonistStartTalking = false; // the protagonist starts talking
    this.protagonistTalking = false; // if the protagonist is talking

    // transition mask
    this.fadeAlp = 1;
    this.fadeSpd = 0.5 / fram_rate; // stage fade speed (alp difference per sec)
    this.appearSpd = 0.6 / fram_rate; // protagonist appearing speed (alp difference per sec)
  }

  // switch to and load a new stage
  switchStage(num){
    this.curStage = num;

    // load game data
    this.gameData = this.stages[num].data;

    // reset the stage
    this.resetStage(num);

    textAlign(CENTER); // centralize texts
    this.fadeAlp = 1; // reset the fade alpha
    _protagonist.alp = 0; // reset the fade alpha of the protagonist
  }

  // reset current stage
  resetStage(num){
    if(num !== 0){
      this.statusNum = 0; // reset status number
      this.playTime = round_time; // reset play time
      clearTimeout(this.topicTimer); // clear topic timer
      this.topicTimer = -1; // reset topic timer
      this.barrageTimers = []; // reset barrage timers
      this.talkingTimer = -1; // reset talking timers
      this.whoIsTalking = -1; // reset who is talking
      this.isTalking = false;
      this.protagonistStartTalking = false;
      this.protagonistTalking = false;
      _playSpace.textFont(pixel_font);
      _spriteManager.reset(); // reset all the sprites
      _dynamicObjManager.clearFragment(); // clear all the dynamic objects in the canvas
      _spriteManager.courage_gauge.clear(); // clear the courage gauge
    }else{
      this.statusNum = 0; // reset status number
      this.stages[0].reset();
    }
  }

  // update the talking state
  updateTalk(){
    if(!this.protagonistStartTalking && !this.protagonistTalking){
      if(!this.isTalking){ // if no one is talking, try to talk
        let ifTalk = random(0, 100) > 80 ? true : false;
        if(ifTalk){
          let who = floor(random(1, this.stages[this.curStage].characters.length)); // randomly select one character(except for the protagonist)
          this.whoIsTalking = who; // who is talking
          this.startTalk(who); // someone random starts talking
        }
      }
    }else if(this.protagonistStartTalking){
      if(this.isTalking = true && this.whoIsTalking !== -1){ // if the protagonist is going to talk, stop others talking
        this.stopTalk();
      }
      this.whoIsTalking = 0;
      this.startTalk(0);
    }
  }

  // someone starts talking
  startTalk(who){
    this.stages[this.curStage].characters[who].isTalking = true;
    if(this.protagonistStartTalking){
      this.protagonistStartTalking = false;
      this.protagonistTalking = true;
      this.talkingTimer = setTimeout(function(){
        _stageManager.stages[_stageManager.curStage].characters[0].isTalking = false;
        _stageManager.protagonistTalking = false;
        _stageManager.isTalking = false;
        _stageManager.whoIsTalking = -1;
        clearTimeout(_stageManager.talkingTimer);
      }, 2000);
    }else{
      this.isTalking = true;
      this.talkingTimer = setTimeout(function(){
        _stageManager.stages[_stageManager.curStage].characters[who].isTalking = false;
        _stageManager.isTalking = false;
        _stageManager.whoIsTalking = -1;
        clearTimeout(_stageManager.talkingTimer);
      }, random(1500, 3000));
    }
  }
  // make evertone shut up
  stopTalk(){
    clearTimeout(this.talkingTimer);
    this.stages[this.curStage].characters[this.whoIsTalking].isTalking = false;
    this.isTalking = false;
  }

  // update barrage
  updateBarrage(mode, dir, max_spd, min_spd, tensity){
    let ifShoot = random(0, 100) < tensity ? true : false;
    if(ifShoot){
      let direct = 0;
      let x = 0, y = 0; // start position of the fragment

      // decide the type of the fragment to be created
      let whatType = random(0, 100);
      let type = -2; // type of the fragment to be created

      switch(mode){
        case "random": // "random" mode means type of the fragment is random
          if(whatType < _probOfTorpedo) type = -1; // shoot a terpedo
          else if(whatType > _nonTopicFrag) type = _spriteManager.topic_board.curTopic; // shoot a fragment matching the current topic
          else type = floor(random(0, 5)); // shoot a random fragment
          break;
        case "torpedo": // "specific" mode means type of the fragment will only be terpedo
          type = -1;
          break;
        case "noTorpedo": // "noTorpedo" mode means type of the fragment will not be terpedo
          if(whatType > _nonTopicFrag) type = _spriteManager.topic_board.curTopic; // shoot a fragment matching the current topic
          else type = floor(random(0, 5)); // shoot a random fragment
          break;
        default:
          console.log('The barrage mode cannot be read.');
      }

      // decide the moving direction of the fragment to be created
      switch(dir[0]){
        case "disc": // the data is discrete
          direct = dir[floor(random(1, dir.length))];
          break;
        case "cont":
          let n = floor(random(0, floor(dir.length / 2)));
          direct = random(dir[n * 2 + 1], dir[n * 2 + 2]);
          break;
        default:
          console.log('The direction type cannot be read');
      }

      // where to create the fragment
      if((direct >= -45 && direct <= 45) || (direct >= 315 && direct <= 405)){ // from left edge
        x = -20;
        y = random(20, _playSpace.height - 20);
      }else if(direct >= 45 && direct <= 135){ // from top edge
        x = random(20, _playSpace.width - 20);
        y = -20;
      }else if(direct >= 135 && direct <= 225){ // from right edge
        x = _playSpace.width + 20;
        y = random(20, _playSpace.height - 20);
      }else if(direct >= 225 && direct <= 315){ // from bottom edge
        x = random(20, _playSpace.width - 20);
        y = _playSpace.height + 20;
      }


      // create the fragment
      _dynamicObjManager.createFragment(x, y, type, direct, random(min_spd, max_spd));
    }
  }

  // update current stage
  updateStage(){
    let game_data = this.gameData;
    let t = round_time - this.playTime;

    // check if the topic needs to change
    for(let i in game_data.topic_timing){
      if(t === game_data.topic_timing[i] && _spriteManager.topic_board.curTopic !== game_data.topic_order[i]){
        // change to a new topic
        _spriteManager.topic_board.change(game_data.topic_order[i], game_data.topic_duration[i]);
        // reset talking status, anyone talking currently is to be shut up
        if(this.isTalking) this.stopTalk();
        
        // restart characters talking status
        if(this.topicTimer !== -1){
          clearInterval(this.topicTimer);
          this.topicTimer = setInterval(function(){_stageManager.updateTalk();}, 100);
        }
        break;
      }
    }

    // check the barrage status
    for(let i in game_data.barrage){
      let bar = game_data.barrage[i]; // barrage object
      if(t === bar.start && !this.barrageTimers[i]){ // start a new round of barrages
        this.barrageTimers.push(setInterval(function(){_stageManager.updateBarrage(
          bar.mode, bar.dir, bar.max_spd, bar.min_spd, bar.tensity
        );}, 100));
      }
      if(t === bar.end){ // end a previous round of barrages
        clearInterval(this.barrageTimers[i]);
      }
    }
  }

  // *check the current status
  checkStatus(){
    // check if render the menu
    if(this.curStage !== 0){
      switch(this.statusNum){
        case 0: // status 0 -> 1: scene fade in
          if(this.fadeAlp <= 0){
            this.statusNum++;
            imageMode(CENTER);
            rectMode(CENTER);
            // initialize the topic board
            _spriteManager.topic_board.change(this.gameData.topic_order[0], this.gameData.topic_duration[0]);
          }
          break;
        case 1: // status 1 -> 2: interface loaded
          if(_spriteManager.topic_board.isReady && _spriteManager.courage_gauge.isReady) this.statusNum++;
          break;
        case 2: // status 2 -> 3: protagonist appear
          if(_protagonist.alp >= 1){
            _timerManager.set('count_down', setInterval(function(){_spriteManager.count_down--;}, 800)); // start countdown
            this.statusNum++;
          }else _protagonist.alp += this.appearSpd;
          break;
        case 3: // status 3 -> 4: game start count down
          if(_spriteManager.count_down < 0){
            clearInterval(_timerManager.get('count_down'));
            // start play countdown
            _timerManager.set('count_down', setInterval(function(){
              _stageManager.playTime --;
              _spriteManager.topic_board.topicRemainTime --; // always substract remaining time of the topic
            }, 1000));
            this.topicTimer = setInterval(function(){_stageManager.updateTalk();}, 100);
  
            _protagonist.control = true; // realse the protagonist

            this.stages[this.curStage].music.loop(); // start to play the background music
            this.statusNum++;
          }
          break;
        case 4: // status 4 -> 5: game play  
          if(this.playTime === 0){ // when the play time equals 0, the game is over
            clearInterval(_timerManager.get('count_down')); // stop play countdown
            _protagonist.control = false; // halt the protagonist
            // stop talking
            clearInterval(this.topicTimer); // stop attempting to talk
            if(this.isTalking) this.stopTalk(); // everyone stop talking
            // clear the courage gauge
            _spriteManager.courage_gauge.clear();
            // set up the score board
            _scoreBoardSpace.textLeading(22);
            _spriteManager.score_board.enableButton(true); // enable the buttons on score board
            this.stages[this.curStage].music.stop(); // stop playing the background music
            _assets.get('checkout').content.play(); // play the checkout sound
            this.statusNum++;
          }
          break;
        case 5: // status 5 -> 6: score board appear
          if(this.curStage !== this.nextStage){
            this.statusNum++;
            _spriteManager.score_board.enableButton(false); // disable the buttons on score board
            rectMode(CORNER);
          }
          break;
        case 6: // status 6 -> : scene fade out
          this.fadeOut();
          if(this.fadeAlp >= 1) this.switchStage(this.nextStage);
          break;
      }
    }else{
      switch(this.statusNum){
        case 0: // status 0 -> 1: menu fade in
          this.fadeIn();
          if(this.fadeAlp <= 0){
            this.statusNum++;
            _stageManager.stages[0].enableButton(true); // enable the buttons on menu
            this.stages[0].music.loop(); // start to play the background music
          }
          break;
        case 1: // status 1 -> 2: waiting to change stage
          if(this.curStage !== this.nextStage){
            this.statusNum++;
            _stageManager.stages[0].enableButton(false); // disable the buttons on menu
            this.stages[0].music.stop(); // stop playing the background music
            rectMode(CORNER);
          }
          break;
        case 2: // status 2 -> : menu fade out
          this.fadeOut();
          if(this.fadeAlp >= 1) this.switchStage(this.nextStage);
          break;
      }
    }
  }
  // *render the current stage
  render(){
    // check if render the menu
    if(this.curStage !== 0){
    /* stage render order:
      scene & dynamic objects
      sprites
      beats
      mask
      score board
      mask
    */
      imageMode(CORNER);
      // render the stage
      image(_sceneSpace, 0, 0);
      this.stages[this.curStage].render();
  
      image(_playSpace, 0, _sceneheight); // render the play space
      _playSpace.background(0); // refresh the play space background
  
      // check which elements need to render
      let status = this.statusNum;
      // status 2 -> 3: protagonist appear
      if(status >= 2){
        _protagonist.render();
      }
      // status 3 -> 4: game start count down
      let count_down = _spriteManager.count_down;
      if(status >= 3 && count_down >= 0){ // render the start countdown texts
        fill(255);
        textSize(24);
        text(_spriteManager.count_down_texts[count_down], width/2, height/2);
      }
      // status 4 -> 5: game play
      if(status >= 4){
        this.updateStage(); // update stage data
        _dynamicObjManager.render();
      }
      // status 1 -> 2: interface loaded
      if(status >= 1){
        _spriteManager.render();
        _beatManager.render();
      }
      // status 5 -> 6: score board appear
      if(status >= 5){
        push(); // display the black mask
        rectMode(CORNER);
        fill(0, 140);
        rect(0, 0, width, height);
        pop();
        _spriteManager.score_board.render();
      }
      // status 0 -> 1: black mask fade in
      if(status < 1){
        this.fadeIn();
      }
    }else{
      this.stages[this.curStage].render();
    }
  }

  // stage fade in
  fadeIn(){
    this.fadeAlp -= this.fadeSpd;
    push();
    fill(0, max(255 * this.fadeAlp, 0));
    rect(0, 0, width, height);
    pop();
  }
  // stage fade out
  fadeOut(){
    this.fadeAlp += this.fadeSpd;
    push();
    fill(0, max(255 * this.fadeAlp, 0));
    rect(0, 0, width, height);
    pop();
  }
}

class stage{
  constructor(name, num, backimg, frontimg, data = {}){
    this.name = name;
    this.num = num;
    // initialize the scene picture area at the top
    this.img_back = backimg;
    this.img_front = frontimg;

    // characters in the scene
    this.characters = [];

    // the topic & barrage data of the stage
    this.data = data;

    // back ground music
    this.music = _assets.get('music_' + this.num).content;
    this.music.setVolume(0.7);

    // max courage required to speak out
    this.max_courage = this.data.max_courage || 100;
  }

  // render the stage
  render(canvas = _sceneSpace){
    canvas.image(this.img_back, 0, -20);
    // render characters
    for(let i in this.characters){
      this.characters[i].render(canvas);
    }
    canvas.image(this.img_front, 0, -20);
  }
}

class menu{
  constructor(name, num, buttonImg, title = 0){
    this.name = name;
    this.num = num;
    this.title = title;
    this.scroll = []; // scroll showing all the stages
    this.scrollNum = [3, 1, 2, 3]; // order of the scene to be rendered on the scroll
    for(let i = 0; i < 4; i++){ // adding canvas to the scroll
      this.scroll.push(createGraphics(_Width, _sceneheight));
    }
    this.pos_y = 0 - _sceneheight; // initial scroll y origin

    this.buttons = [];
    for(let i = 0; i < 3; i++){
      this.buttons.push(new cusButton(_Width/2 - 121, 150 + i * 60, 242, 48,
        function(){_stageManager.nextStage = i + 1;},
        buttonImg, "STAGE_" + (i + 1), 0));
    }

    this.music = _assets.get('music_0').content; // background music of menu stage
    this.music.setVolume(0.6);
  }

  // reset the menu stage
  reset(){
    this.pos_y = 0 - _sceneheight
  }
  // enable/disable the buttons
  enableButton(ifEnable){
    for(let i in this.buttons){
      this.buttons[i].enable(ifEnable);
    }
  }
  // render the menu
  render(canvas = window){
    // roll down the scroll
    this.pos_y += 0.5;

    // reset the position of the scroll
    if(this.pos_y >= 0){
      this.pos_y = 0 - _sceneheight;
      this.scrollNum = shiftArr(this.scrollNum, 1, 3);
    }

    // render stage scenes to the scroll
    canvas.imageMode(CORNER);
    for(let i = 0; i < this.scroll.length; i++){
      _stageManager.stages[this.scrollNum[i]].render(this.scroll[i]);
      canvas.image(this.scroll[i], 0, this.pos_y + i * _sceneheight);
    }

    // render the buttons
    for(let i in this.buttons){
      this.buttons[i].render();
    }
  }
}

// <---------- Sprite ---------->
class spriteManager{
  static get(){
    if(!this.instance) this.instance = new spriteManager();
    return this.instance;
  }
  constructor(){
    // Initialize all the sprites
    this.topic_board = new topicBoard( // the topic board
      width/2, -20, width/2, 17,
      [_assets.get('board_A').content, _assets.get('board_B').content, _assets.get('board_X').content, _assets.get('board_Y').content,
      _assets.get('board_O').content, _assets.get('topic_A').content, _assets.get('topic_B').content, _assets.get('topic_X').content,
      _assets.get('topic_Y').content, _assets.get('topic_O').content
    ]);
    this.courage_gauge = new courageGauge( // the courage gauge
      width/2, _playSpace.height + 50, width/2, _playSpace.height - 20,
      [_assets.get('courage_gauge').content, _assets.get('courage_gauge_full').content,
      _assets.get('courage').content, _assets.get('courage_full').content
    ]);
    
    this.count_down = 3; // game start countdown
    this.count_down_texts = ['GO', '1', '2', '3']; // game start countdown texts
    this.play_countdown = new timer(width/2, -20, width/2, 21); // the play time countdown

    this.score_board = new scoreboard( // the score board turns up when the game ends
      width/2, -100, width/2, height/2, _assets.get('score_board').content, _assets.get('button_small').content);

    this.floating_texts = []; // floating texts
  }
  // reset all the sprites
  reset(){
    this.topic_board.reset();
    this.topic_board.clear();
    this.courage_gauge.reset();
    this.count_down = 3;
    this.play_countdown.reset();
    this.score_board.reset();
    this.score_board.clear();
  }
  // render the sprite to the canvas
  render(){
    this.topic_board.render();
    this.play_countdown.render();
    this.courage_gauge.render();
    // render all the floating texts
    if(this.floating_texts.length > 0){
      for(let i in this.floating_texts){
        if(this.floating_texts[i].render(_playSpace)) this.floating_texts.splice(i, 1);
      }
    }
  }

  // create a new floating text
  createFloatingText(x, y, txt){
    this.floating_texts.push(new floatingText(x, y, txt));
  }
}
// sprites refer to all the individual changable elements on the screen
class sprite{
  constructor(x, y, tx, ty, imgs = [], rate = 40){
    this.opos_x = x; // initial x position
    this.opos_y = y; // initial y position
    this.pos_x = x; // current x position
    this.pos_y = y; // current x position
    this.targt_x = tx; // target x position
    this.targt_y = ty; // target y position
    this.imgs = imgs; // image sequence
    this.rate = rate; // bigger to slower the moving spd
    this.isReady = false; // inform if the sprite has reach the right position
  }
  // reset the position of the sprite
  reset(){
    this.pos_x = this.opos_x;
    this.pos_y = this.opos_y;
  }

  move(){
    let x = this.pos_x, y = this.pos_y, v = this.rate;
    let tx = this.targt_x, ty = this.targt_y;
    // if the current postion does not match the target position, move the sprite
    if(x !== tx || y !== ty){
      this.pos_x += (tx - x) / v;
      this.pos_y += (ty - y) / v;
      // if the current position get close enough to the target, stop moving
      if(abs(this.pos_x - tx) < 1) this.pos_x = tx;
      if(abs(this.pos_y - ty) < 1) this.pos_y = ty;
    }
  }
  // change the target position of the sprite
  changeTarget(x, y){
    this.targt_x = x;
    this.targt_y = y;
  }
}
// a countdown timer
class timer extends sprite{
  constructor(x, y, tx, ty){
    super(x, y, tx, ty);
    this.frameCount = 0;
  }
  render(canvas = window){
    if(this.isReady) this.frameCount ++; // when the play time countdown start, start to count passing frames

    this.move();

    let curTime = _stageManager.playTime;
    let time = double(floor(curTime / 60)) + ' : ' + double(curTime % 60);
    canvas.fill(255);
    canvas.textSize(19);
    canvas.text(time, this.pos_x, this.pos_y);
  }
}
// the topic board sprite at the middle top
class topicBoard extends sprite{
  constructor(x, y, tx, ty, imgs){
    super(x, y, tx, ty, imgs);
    this.curTopic = -1; // number of the current topic
    this.topicTotalTime = 0; // total time of the current topic
    this.topicRemainTime = 0; // remaining time of the current topic
  }
  // clear the topic board
  clear(){
    this.curTopic = -1;
    this.topicTotalTime = 0;
    this.topicRemainTime = 0;
  }
  // change to a new topic
  change(newTopic, duration){
    this.curTopic = newTopic;
    // reset time
    this.topicTotalTime = duration;
    this.topicRemainTime = duration;
  }
  render(canvas = window){
    this.move();

    let x = this.pos_x, y = this.pos_y, remainTime = this.topicRemainTime;
    if(x === this.targt_x && y === this.targt_y) this.isReady = true;
    else this.isReady = false;

    canvas.push();
    canvas.imageMode(CENTER);
    canvas.fill('rgb(' + topic_colors[this.curTopic] + ')');
    canvas.image(this.imgs[this.curTopic], x, y);
    canvas.rect(width/2, _sceneheight, 1 + remainTime / this.topicTotalTime * (width - 1), 6); // progress bar
    canvas.image(this.imgs[this.curTopic + 5], width/2, _sceneheight + 3); // topic icon
    // print remaining time
    canvas.fill(0);
    canvas.textFont(pixel_font);
    canvas.textSize(16);
    canvas.textAlign(CENTER);
    canvas.text(double(remainTime), width/2, _sceneheight + 7);
    // canvas.text(); // remaining time of the current topic
    canvas.pop();
  }
}
// the courage gauge sprite at the middle bottom
class courageGauge extends sprite{
  constructor(x, y, tx, ty, imgs){
    super(x, y, tx, ty, imgs);
    this.curTopic = 0;
    this.value = [0, 0, 0, 0, 0]; // courage power value
    this.target_value = [0, 0, 0, 0, 0];
    this.v_change_spd = 20; // bigger to slow down the changing spd
    this.size = 100; // size is used to calculate collision; do not remove it
  }

  // clear all the courage power values
  clear(){
    this.target_value = [0, 0, 0, 0, 0];
  }

  update(){
    let value = this.value, t_value = this.target_value, v = this.v_change_spd;
    let topic_num = _spriteManager.topic_board.curTopic;
    let max_courage = _stageManager.stages[_stageManager.curStage].max_courage;

    // check if the courage gauge is full
    if(value[topic_num] >= max_courage){
      this.target_value[topic_num] = 0; // clear the courage gauge
      _assets.get('success').content.play(); // play the sound
      _beatManager.createBeat(this.pos_x, this.pos_y, topic_colors[topic_num], 80, 200);
      _stageManager.protagonistStartTalking = true; // protagonist start talking
      _spriteManager.score_board.success_speak ++; // success speak +1
    }
    
    for(let i = 0; i < value.length; i++){
      // if the fragment color does not match the current topic, decrease the courage value gradually
      if(i !== topic_num && this.value[i] > 0 && frameCount % 36 === 0) this.target_value[i] -= 0.5;
      // if the current value does not match the target value, change the value
      if(value[i] !== t_value[i]){
        this.value[i] += (t_value[i] - value[i]) / v;
        if(abs(this.value[i] - t_value[i]) < 0.5) this.value[i] = t_value[i];
      }
    }
  }
  
  render(canvas = _playSpace){
    this.move();
    this.update(); // update courage values
    let topic_num = _spriteManager.topic_board.curTopic;
    let max_courage = _stageManager.stages[_stageManager.curStage].max_courage;

    // movement check
    let x = this.pos_x, y = this.pos_y;
    if(x === this.targt_x || y === this.targt_y) this.isReady = true;
    else this.isReady = false;

    let main_value = this.value[topic_num];
    let section = 500 / max_courage;
    canvas.push();
    canvas.rectMode(CENTER);
    // current topic color will appear in the gauge
    canvas.fill('rgb(' + topic_colors[topic_num] + ')');
    canvas.rect(x, y, 72 + main_value * section, 30);

    // render courage gauge
    canvas.image(this.imgs[0], x, y);
    canvas.tint(255, 255 * main_value / max_courage);
    canvas.image(this.imgs[1], x, y);

    // other topic color will appear above the gauge
    canvas.tint(255, 255);
    for(let i = 0; i < this.value.length; i++){
      if(i !== topic_num){
        canvas.fill('rgb(' + topic_colors[i] + ')');
        canvas.rect(x, y - 12 + i * 6, 72 + this.value[i] * section, 4);
      }
    }

    // render courage
    canvas.image(this.imgs[2], x, y - 11);
    canvas.tint(255, 255 * main_value / max_courage);
    canvas.image(this.imgs[3], x, y - 12);

    // numbers showing the current courage value
    canvas.textFont(pixel_font);
    canvas.textSize(18);
    canvas.textAlign(RIGHT);
    canvas.fill(255);
    canvas.text(round(main_value) + "/" + max_courage, x - 220, y - 24);
    canvas.pop();
  }
}
// scoreboard appears when the game is over
class scoreboard extends sprite{
  constructor(x, y, tx, ty, img, buttonImg){
    super(x, y, tx, ty, img);
    this.width = 242;
    this.height = 182;

    // score data
    this.frag_collected = 0;
    this.torpedo_bumped = 0;
    this.success_speak = 0;

    // create buttons
    this.buttons = [
      new cusButton(16, 128, 102, 40, function(){_stageManager.nextStage = shiftNum(_stageManager.curStage, 1, 3);}, buttonImg, 
        "NEXT", 0, 18, tx - this.width/2, ty - this.height/2),
      new cusButton(126, 128, 102, 40, function(){_stageManager.nextStage = 0;}, buttonImg, 
        "MENU", 255, 18, tx - this.width/2, ty - this.height/2)
    ];
  }
  // enable/disable the buttons
  enableButton(isEnabled){
    this.buttons[0].enabled = isEnabled;
    this.buttons[1].enabled = isEnabled;
  }
  // reset the score data
  clear(){
    this.frag_collected = 0;
    this.torpedo_bumped = 0;
    this.success_speak = 0;
  }
  // result grade
  comment(score){
    if(score <= 6) return 1;
    else if(score >= 12) return 3;
    else return 2;
  }
  // render the score board
  render(canvas = _scoreBoardSpace){
    let x = this.pos_x, y = this.pos_y;
    if(x !== this.targt_x || y !== this.targt_y) this.move();
    else this.isReady = true;

    // render the image of the score board (position mode: CORNER)
    canvas.imageMode(CORNER);
    canvas.image(this.imgs, 0, 0);

    // score board texts
    canvas.push();
    canvas.textFont(text_font);
    // render rate comment
    canvas.textAlign(CENTER);
    canvas.textSize(19);
    switch(this.comment(this.success_speak)){
      case 1:
        canvas.fill(102, 255, 255);
        canvas.text("STILL NEED IMPROVE", canvas.width/2, 42);
        break;
      case 2:
        canvas.fill(0, 204, 0);
        canvas.text("GENERALLY GOOD!", canvas.width/2, 42);
        break;
      case 3:
        canvas.fill(255, 51, 0);
        canvas.text("YOU'RE SO AMAZING!", canvas.width/2, 42);
        break;
    }

    canvas.textSize(16);
    // render scoring item (position mode: LEFT)
    canvas.fill(0);
    canvas.textAlign(LEFT);
    canvas.text(
      "Thoughts Collected :\nTorpedo Bumped :\nSpeak Out Time:",
    canvas.width/2 - (this.width/2 - 18), canvas.height/2 - 20);
    // render grades  (position mode: RIGHT)
    canvas.fill(255);
    canvas.textAlign(RIGHT);
    canvas.text(
      this.frag_collected + "\n" + this.torpedo_bumped + "\n" + this.success_speak,
    canvas.width/2 + (this.width/2 - 18), canvas.height/2 - 20);
    canvas.pop();

    // render buttons
    this.buttons[0].render(canvas);
    this.buttons[1].render(canvas);
      
    imageMode(CENTER);
    image(_scoreBoardSpace, x, y);
  }
}

// tutorial appears before the first attempt
class tutorial extends sprite{
  constructor(x, y, tx, ty, imgs, buttonImg){
    super(x, y, tx, ty, imgs);

    // tutorial images(imgs[0]: the board)
    // tutorial texts
    this.texts = turorial_text;
    // create the continue button
  }

  render(canvas){
    canvas.posh();
    canvas.pop();
  }
}

// characters
class character extends sprite{
  constructor(x, imgs, bubble_pos, isSlient = false, y = _sceneheight - 84){
    super(x, y, x, y, imgs);
    this.isSlient = isSlient; // if the character never speaks
    this.bubble_pos = bubble_pos; // relative position of dialogue bubble: true-left, false-right
    this.isTalking = false; // if the character is talking
  }

  startTalking(){
    this.isTalking = true;
  }
  // render the character
  render(canvas = _sceneSpace){
    let x = this.pos_x, y = this.pos_y;
    let s = floor(frameCount % 60 / 30);
    if(this.isSlient){ // silent individual never changes frame as well as shows the talking bubble
      s = floor(frameCount % 120 / 30);
      canvas.image(this.imgs[s], x, y);
    }else{
      if(this.isTalking){
        canvas.image(this.imgs[s + 2], x, y);
        // render the bubble
        if(this.bubble_pos) canvas.image(_assets.get('d_' + _spriteManager.topic_board.curTopic + 2).content, x - 68, _sceneheight - 120); // left
        else canvas.image(_assets.get('d_' + _spriteManager.topic_board.curTopic + 1).content, x + 26, _sceneheight - 120); // right
      }else{
        canvas.image(this.imgs[s], x, y);
      }
    } 
  }
}

// floating text
class floatingText extends sprite{
  constructor(x, y, txt, size = 16, color = 255){
    super(x, y, x, y - 20);
    this.txt = txt;
    this.size = 24; // size of the text
    this.color = color; // color of the text
  }

  render(canvas = window){
    let x = this.pos_x, y = this.pos_y, tx = this.targt_x, ty = this.targt_y;
    this.move();
    let apl = map(abs(ty - y), 0, 20, 0, 255);

    canvas.push();
    canvas.fill(this.color, apl);
    canvas.textSize(this.size);
    canvas.textAlign(CENTER);
    canvas.text(this.txt, x, y);
    canvas.pop();
    return x === tx && y === ty;
  }
}

// customized button
class cusButton{ // (x position, y position, width, height, event listener, button image, text, text color, text size)
  constructor(x, y, width, height, func, imgs = [], text = '', text_col = 255, text_size = 20, offsetX = 0, offsetY = 0){
    this.pos_x = x;
    this.pos_y = y;
    this.offset_x = offsetX; // offset used to output the absolute coordination of the button
    this.offset_y = offsetY;
    this.width = width;
    this.height = height;
    
    this.func = func; // event listener on the button
    this.imgs = imgs; // [0]: normal; [1]: clicked
    this.text = text;
    this.text_color = text_col;
    this.text_size = text_size;
    this.enabled = false; // if the button is enabled
    this.Clicked = false;

    // actual DOM button
    // this.btn = createGraphics(width, height);
    // this.btn.mouseClicked(func);
    // this.btn.mouseOver(function(){console.log('kkk');});
    
    // this.btn = createButton(text);
    // this.btn.position(x, y);
    // this.btn.mouseClicked(func);
    // this.btn.disabled = true;
    // this.btn.size(width, height);
    // // this.btn.style('visibility', 'hidden');
    // this.btn.mouseOver(function(){this.mouseon = true;}.bind(this));
    // this.btn.mouseOut(function(){this.mouseon = false;}.bind(this));
  }

  // enable
  enable(isEnabled){
    this.enabled = isEnabled;
  }

  // check if the button is clicked
  ifClicked(){
    let x = this.pos_x + this.offset_x, y = this.pos_y + this.offset_y, w = this.width, h = this.height;
    let mx = mouseX, my = mouseY;
    // check if the mouse is on the button
    if(mx > x + w || mx < x || my > y + h || my < y) this.Clicked = false;
    else{
      this.Clicked = true;
      _assets.get('clickbutton').content.play(); // play the button clicked sound
      this.func(); // trigger the button
    }
  }

  render(canvas = window){
    let x = this.pos_x, y = this.pos_y, w = this.width, h = this.height;
    // check if the button is clicked
    if(this.enabled && _isMousePressed && !this.Clicked) this.ifClicked();
    if(!_isMousePressed && this.Clicked) this.Clicked = false;

    canvas.push();
    canvas.imageMode(CORNER);
    canvas.textFont(text_font);
    canvas.textAlign(CENTER);
    canvas.textSize(this.text_size);
    canvas.fill(this.text_color);
    if(!this.Clicked){
      canvas.image(this.imgs[0], x, y);
      canvas.text(this.text, x + w/2, y + h/2 + 8);
    }else{
      canvas.image(this.imgs[1], x, y + 2);
      canvas.text(this.text, x + w/2, y + h/2 + 10);
    }
    canvas.pop();
  }
}

// <---------- Animated Objects ---------->
// <---------- Dynamic Objects ---------->
class dynamicObjManager{
  static get(){
    if(!this.instance) this.instance = new dynamicObjManager();
    return this.instance;
  }
  constructor(){
    this.dynamicObjs = []; // all the dynamic objects to be rendered on the canvas(EXCEPT for the protagonist)
    this.fragments = []; // all the fragments to be rendered on the canvas
    this.scoreBalls = []; // all the score balls to be rendered on the canvas
  }
  // create a new dynamic obj
  createDynamicObj(x, y, spd, size){
    this.dynamicObjs.push(new dynamicObj(x, y, spd, size));
  }
  // create a new fragment
  createFragment(x, y, type, dir, spd, size){
    if(type !== -1) this.fragments.push(new fragment(x, y, type, dir, spd, size));
    else this.fragments.push(new torpedo(x, y, type, dir, spd, size));
  }
  // remove all the fragments from the canvas and reset the protagonist
  clearFragment(){
    this.dynamicObjs = [];
    if(this.fragments.length > 0) this.fragments = [];
    if(this.scoreBalls.length > 0) this.scoreBalls = [];
    _protagonist.reset();
  }
  // create a new score ball
  createScoreBall(x, y, type, spd = 1.5, size = 10){
    this.scoreBalls.push(new scoreBall(x, y, type, spd, size));
  }
 
  // render all the dynamic objs(except for the protagonist)
  render(canvas = _playSpace){ // dynamic objs are all rendered in the play space
    let objs = this.dynamicObjs;
    let frags = this.fragments;
    let scores = this.scoreBalls;
    // render primary dynamic objs
    if(objs.length > 0){
      for(let i in objs){
        objs[i].render(canvas);
        if(objs[i].ifCollideBorder(canvas)) objs.splice(i, 1); // if the obj collide with the border, remove it from dynamicObjs
      }
    }
    // render floating fragments
    if(frags.length > 0){
      for(let i in frags){
        frags[i].render(canvas);
        // if the fragment leave the play space, remove it
        if(frags[i].ifLeave(canvas)){
          frags.splice(i, 1);
          continue;
        }
        // if the game is running, check collision between fragments and protagonist
        // if the fragment collide with the protagonist, remove it and create a score ball
        if(frags[i].ifCollideObj(_protagonist)){
          if(frags[i].type !== -1){
            _assets.get('collide').content.play(); // play the sound
            _beatManager.createBeat(frags[i].pos_x, frags[i].pos_y);
            this.createScoreBall(frags[i].pos_x, frags[i].pos_y, frags[i].type);
            _spriteManager.score_board.frag_collected ++; // add thoughts collected to the score board
          }else{ // if collide with a torpedo, decrease the courage value
            let targetValue = _spriteManager.courage_gauge.target_value[_spriteManager.topic_board.curTopic];
            _assets.get('explode').content.play(); // play the sound
            _beatManager.createBeat(frags[i].pos_x, frags[i].pos_y, '255,100,100', 40, 80);
            _spriteManager.courage_gauge.target_value[_spriteManager.topic_board.curTopic] = max(targetValue - 20, 0);
            _spriteManager.score_board.torpedo_bumped ++; // add torpedo bumped to the score board
          }
          frags.splice(i, 1);
          continue;
        }
      }
    }
    // render score balls
    if(scores.length > 0){
      for(let i in scores){
        scores[i].render(canvas);
        // if the score ball collide with the courage gauge, remove it and add courage power to the gauge
        if(scores[i].ifCollideObj(_spriteManager.courage_gauge)){
          let curTopic = _spriteManager.topic_board.curTopic;
          if(scores[i].type !== curTopic){ // if collide with a fragment of non-current topic, decrease the courage a little
            _spriteManager.courage_gauge.target_value[curTopic] =
            max(_spriteManager.courage_gauge.target_value[curTopic] - 2, 0); // decrease courage value a little
            _spriteManager.createFloatingText(scores[i].pos_x, scores[i].pos_y, "-" + 2); // create a drop floating text
          }else _spriteManager.createFloatingText(scores[i].pos_x, scores[i].pos_y, "+" + _fragScore); // create a score floating text
          _assets.get('absorbed').content.play(); // play the sound
          _beatManager.createBeat(scores[i].pos_x, scores[i].pos_y, topic_colors[scores[i].type]);
          // add value to corresponding color
          _spriteManager.courage_gauge.target_value[scores[i].type] =
          min(_spriteManager.courage_gauge.target_value[scores[i].type] + _fragScore, _stageManager.stages[_stageManager.curStage].max_courage);
          scores.splice(i, 1);
        }
      }
    }
  }
}

// primary dynamic object
class dynamicObj{
  constructor(x, y, spd, size){
    this.pos_x = x;
    this.pos_y = y;
    this.spd = spd;
    this.size = size; // size of the collision box(diameter of the circle)
  }

  // render the dynamic obj
  render(canvas = _playSpace){
    this.move(); // before rendered, check the moving status
    canvas.fill(255);
    canvas.circle(this.pos_x, this.pos_y, this.size);
  }
  // check if the obj collide with the canvas border
  ifCollideBorder(canvas = window){
    let x = this.pos_x;
    let y = this.pos_y;
    let halfsize = this.size / 2;
    let ifX = false, ifY = false;
    if(x - halfsize <= 0 || x + halfsize >= canvas.width) ifX = true;
    if(y - halfsize <= 0 || y + halfsize >= canvas.height) ifY = true;
    return {ifX: ifX, ifY: ifY};
  }
  // check if the obj leave the canvas
  ifLeave(canvas = window){
    let x = this.pos_x;
    let y = this.pos_y;
    let size = this.size;
    if(x + size <= -50 || x - size >= canvas.width + 50 || y + size <= -50 || y - size >= canvas.height + 50)
      return true;
    else return false;
  }
  // check if the obj collide with another dynamic obj
  ifCollideObj(obj){
    let x1 = this.pos_x;
    let y1 = this.pos_y;
    let x2 = obj.pos_x;
    let y2 = obj.pos_y;
    let s1 = this.size / 2;
    let s2 = obj.size / 2;
    if(s1 + s2 >= dist(x1, y1, x2, y2)) return true;
    else return false;
  }
}

// the protagonist obj(singleton)
class protagonist extends dynamicObj{
  static get(x, y, spd, size){
    if(!this.instance) this.instance = new protagonist(x, y, spd, size);
    return this.instance;
  }
  constructor(x, y, spd, size = 50){
    super(x, y, spd, size);
    this.opos_x = x;
    this.opos_y = y;

    this.pic = _assets.get('protagonist').content; // get the protagonist image
    this.alp = 0;
    this.control = false; // if false, the protagonist cannot be controlled
  }
  // reset the position of the protagonist
  reset(){
    this.pos_x = this.opos_x;
    this.pos_y = this.opos_y;
  }

  move(){ // movements of the protagonist are controlled by keyEvents
    let x = this.pos_x, y = this.pos_y;
    let spd = this.spd;
    let keyPressed = keyEvents();

    if(this.control && keyPressed.length > 0){
      if(keyPressed[0] === true) this.pos_x -= spd;
      if(keyPressed[1] === true) this.pos_x += spd;
      if(keyPressed[2] === true) this.pos_y -= spd;
      if(keyPressed[3] === true) this.pos_y += spd;
    } // key order: [LEFT, RIGHT, UP, DOWN, ENTER, ESC]

    // check if collide with the border
    let if_collide_border = this.ifCollideBorder(_playSpace);
    if(if_collide_border.ifX) this.pos_x = x;
    if(if_collide_border.ifY) this.pos_y = y;
  }
  // render the protagonist
  render(canvas = _playSpace){
    this.move(); // before rendered, check the moving status
    canvas.push();
    canvas.tint(255, this.alp * 255);
    canvas.image(this.pic, this.pos_x, this.pos_y);
    canvas.pop();
  }
}
// the floating fragment
class fragment extends dynamicObj{
  constructor(x, y, type, dir, spd, size = 15){
    super(x, y, spd, size);
    this.dir = dir; // moving direction of the fragment(angle(DEGREE): 0-360)
    this.type = type; // type of the fragment 0-4: magenta(#ff00aa), blue(#00aaf0), purple(#aa00ff), orange(#ffaa00), green(#c9e3ac)
  }
  move(){ // movement mode: normal, spiral
    let spd = this.spd;
    let dir = this.dir;
    this.pos_x += spd * cos(dir);
    this.pos_y += spd * sin(dir);
  }
  // render the fragment
  render(canvas = _playSpace){
    this.move(); // before rendered, check the moving status
    canvas.image(_assets.get('frags')[this.type].content, this.pos_x, this.pos_y);
  }
}
// the torpedo
class torpedo extends fragment{
  constructor(x, y, type, dir, spd, size = 18){
    super(x, y, type, dir, spd, size);
    this.rotate = 0;
  }
  // render the torpedo
  render(canvas = _playSpace){
    this.move(); // before rendered, check the moving status
    this.rotate += 0.5;

    canvas.push();
    canvas.translate(this.pos_x, this.pos_y);
    canvas.rotate(this.rotate);
    canvas.image(_assets.get('torpedo').content, 0, 0);
    canvas.pop();
  }
}

// the flying score ball(with comet effect)
class scoreBall extends dynamicObj{
  constructor(x, y, type, spd, size = 8){
    super(x, y, spd, size);
    let tx = _spriteManager.courage_gauge.pos_x, ty = _spriteManager.courage_gauge.pos_y;
    this.dir = direct(tx, ty, this.pos_x, this.pos_y); // score ball always moves towards the courage gauge
    this.spd *= 1 + dist(tx, ty, this.pos_x, this.pos_y) / 100; // score ball moves faster when it is further from the courage gauge
    this.type = type; // type of the scoreball 0-4: magenta(#ff00aa), blue(#00aaf0), purple(#aa00ff), orange(#ffaa00), green(#c9e3ac)
    this.trace = []; // postion history of the score ball
  }
  move(){
    let spd = this.spd;
    let dir = this.dir;
    // record the trace
    if(frameCount % 3 == 0){ // interval of the trace
      let trace = this.trace;
      trace.push([this.pos_x, this.pos_y]);
      if(trace.length > 10) trace.splice(0, 1);
    }
    
    this.pos_x += spd * cos(dir);
    this.pos_y += spd * sin(dir);
  }
  render(canvas = _playSpace){
    this.move(); // before rendered, check the moving status
    // render the trace
    let trace = this.trace;
    for(let i in trace){
      canvas.fill('rgba(' + topic_colors[this.type] + ',' + map(i, 0, this.trace.length, 0, 1) * 200 + ')');
      canvas.ellipse(trace[i][0], trace[i][1], map(i, 0, 10, 0, this.size));
    }
    canvas.fill('rgb(' + topic_colors[this.type] + ')');
    canvas.circle(this.pos_x, this.pos_y, this.size);
  }
}

// <---------- Beat ---------->
class beatManager{
  static get(count, size){
    if(!this.instance) this.instance = new beatManager(count, size);
    return this.instance;
  }
  constructor(count, size){
    this.beats = []; // all the beats to be rendered on the canvas
    this.beat_count = count; // duration of the beat(frames)
    this.basic_beat_size = size; // basic size of the beat(diameter of circle)
  }
  // create a new beat
  createBeat(x, y, col = '255, 255, 255', beat_count = this.beat_count, beat_size = this.basic_beat_size){
    this.beats.push(new beat(x, y, beat_count, beat_size, col));
  }
  // render all the beats
  render(){
    let beats = this.beats;
    if(beats.length > 0){
      for(let i = 0; i < beats.length; i++){
        beats[i].render();
        if(beats[i].count <= 0) beats.splice(i, 1);
      } 
    }
  }
}
class beat{
  constructor(x, y, countNum, size, col){
    this.x = x;
    this.y = y;
    this.col = col;
    this.maxCount = countNum; // duration of the beat(frames)
    this.count = this.maxCount;
    this.beat_size = size; // size of the beat(diameter of circle)
  }
  // render the beat
  render(canvas = _playSpace){
    let p = this.count / this.maxCount;
    canvas.fill('rgba(' + this.col + ',' + max(0, p * 0.5) + ')');
    canvas.circle(this.x, this.y, map(p, 0, 1, 3, 1) * this.beat_size);
    this.count--;
  }
}

// ---------- Auxiliary Functions ----------
// Here are all the auxiliary functions used in above

// convert a single-digit number to double-digit
function double(num){
  return num < 10 ? '0' + num : num;
}

// calculate the angle between two pts
function direct(x1, y1, x2, y2){
  let vec0 = createVector(1, 0);
  let vec = createVector(x1 - x2, y1 - y2);
  return vec0.angleBetween(vec);
}

// shift a number
function shiftNum(num, minNum, maxNum){
  return num + 1 > maxNum ? minNum : num + 1;
}

// shift numbers in an array, return the shifted array
function shiftArr(arr, minNum, maxNum){
  let newArr = [];
  for(let i = 0; i < arr.length; i++){
    newArr.push(arr[i] - 1 < minNum ? maxNum : arr[i] - 1);
  }
  return newArr;
}