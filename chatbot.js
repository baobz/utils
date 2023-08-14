var Chatbot = function () { }
var ChatbotFull = function () { }

ChatbotFull.prototype = {
  options: {
    elem: 'chatBotFull',
    width: '100%',
    height: 'auto',
  },

  init: function(opts) {
    var _this = this;
    var option = config(opts, this.options)
    var _elem = document.getElementById(option.elem);

    initIframeFullArea(_elem, option)

  }
}

// 有必要调用到插件本身this的， 就放在prototype上边， 功能函数尽量放在下方工具中
Chatbot.prototype = {

  options: {
    elem: 'chatBot',
    width: '480px',
    height: '570px',
    btnText: '点我体验',
  },
  /**
   * @method 初始化
   * @param { object } 由@method config() 提供的配置参数
   */
  init: function (opts) {
    var _this = this;
    var option = config(opts, this.options); //用户配置
    var _elem = document.getElementById(option.elem);

    initChatButton(_elem, option)
    initIframeArea(_elem, option)
    styleClass()

    _elem.style.position = 'absolute';
    _elem.style.right = '20px';
    _elem.style.bottom = '20px';

  }
}

function hide(elem) {
  elem.style.display = 'none';
}
function show(elem) {
  elem.style.display = 'block'; 
}

function setStyle(elem, styles) {
  for (var key in styles) {
    elem.style[key] = styles[key]
  }
}

function initChatButton(elem, option) {
  var btn = document.createElement('div');
  btn.setAttribute('id', 'chatBotBtn');
  btn.innerText = option.btnText;
  var btnStyle = {
    cursor: 'pointer',
    boxShadow: '3px 3px 15px rgba(0,0,0,0.3)',
    padding: '5px 10px',
    borderRadius: '5px',
  }
  setStyle(btn, btnStyle);
  btn.addEventListener('click', function() {
    var chatWrapper = document.getElementById('chat_wrapper')
    show(chatWrapper)
    hide(btn)
  })
  elem.appendChild(btn);

}

function initIframeFullArea(elem, option) {
  var div = document.createElement('div');
  div.setAttribute('id', 'chat_wrapper_full');
  var divStyle = {
    width: option.width,
    height: option.height,
  }
  setStyle(div, divStyle);

  var iframeEl = document.createElement('iframe')
  iframeEl.setAttribute('src', option.chatUrl)
  var iframeStyle = {
    width: '100%',
    height: '100%',
    border: 'none',
  }
  setStyle(iframeEl, iframeStyle)
  div.appendChild(iframeEl)

  elem.appendChild(div)
}

function initIframeArea(elem, option) {
  
  var div = document.createElement('div');
  div.setAttribute('id', 'chat_wrapper');
  var divStyle = {
    width: option.width,
    height: option.height,
    position: 'absolute',
    right: 0,
    bottom: 0,
    display: 'none',
  }
  setStyle(div, divStyle);

  var close = document.createElement('a');
  close.innerText = '×';
  var closeStyle = {
    position: 'absolute',
    top: '3px',
    right: '12px',
    display: 'block',
    fontSize: '30px',
    color: 'rgba(0,0,0,0.9)',
    cursor: 'pointer',
    zIndex: 99
  }
  close.addEventListener('click', function () {
    hide(div);
    show(document.getElementById('chatBotBtn'))
  })
  setStyle(close, closeStyle);
  div.appendChild(close);

  var iframeEl = document.createElement('iframe')
  iframeEl.setAttribute('src', option.chatUrl)
  var iframeStyle = {
    width: '100%',
    height: '100%',
    border: 'none',
  }
  setStyle(iframeEl, iframeStyle)
  div.appendChild(iframeEl)

  elem.appendChild(div)
}

// 工具函数
// 检查非空
function isEmpty(val) {
  return val != '' && val != null && val != undefined ? false : true;
}

/**
 * @method 配置
 * @param opts { object } 用户提供的参数，在没有提供参数的情况下使用默认参数 
 * @param options { object } 默认参数
 * @return options { object } 返回一个配置对象
 */
function config(opts, options) {
  //默认参数
  if (!opts) return options;
  for (var key in opts) {
    if (!!opts[key]) {
      options[key] = opts[key];
    }
  }
  return options;
}

function styleClass() {
  var style = document.createElement('style')
  style.setAttribute('type', 'text/css')
  style.innerHTML = `
    #chat_wrapper {
      box-shadow: 3px 3px 15px rgba(0,0,0,0.3)
    }
    #chatBotBtn:hover {
      opacity: 0.7
    }
  `
  document.getElementsByTagName('head')[0].appendChild(style)
}

export { Chatbot, ChatbotFull };//注册到全局中， 届时可以直接new Chatbot() 实例化对象
