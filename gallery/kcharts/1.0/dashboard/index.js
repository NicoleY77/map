// -*- coding: utf-8; -*-
/**
 * 仪表盘
 * @author cookieu@gmail.com
 */
KISSY.add('gallery/kcharts/1.0/dashboard/index',function(S,Raphael,Pointer,PicturePointer){
  var D = S.DOM
    , E = S.Event
    , R = Raphael

  function DashBoard(){
    DashBoard.superclass.constructor.apply(this,arguments)
    var con = this.get('renderTo')
    if(S.isString(con)){
      con = S.get(con)
    }
    var w = this.get('width')
      , h = this.get('height')
    this.paper = R(con,w,h)
    this.init()
  }

  DashBoard.ATTRS = {
    width:{
      value:400
    },
    height:{
      value:400
    },
    cx:{
      value:0
    },
    cy:{
      value:0
    }
  }

  S.extend(DashBoard,S.Base,{
    init:function(){
      var cx = this.get('cx') || this.get('width')/2
        , cy = this.get('cy') || this.get('width')/2
        , that = this
      this.set('cx',cx)
      this.set('cy',cy)

      this.bindEvent()
      this.drawBg()
      this.drawPointer()
    },
    bindEvent:function(){
      var that = this
    },
    drawBg:function(){
      this.drawPictureBg()
    },
    drawPointer:function(){
      var that = this
      that.drawPicturePointer()
    },
    drawPictureBg:function(){
      var cfg = this.get('pictureBackground')
        , src = cfg.src
        , paper = this.paper
        , that = this
        , cx = this.get('cx')
        , cy = this.get('cy')
        , cx0 = cfg.cx
        , cy0 = cfg.cy
        , x = cx-cx0
        , y = cy-cy0
        , background
      background = paper.image(src,x,y,cfg.width,cfg.height)
      this.set('background',background)
      this.background = background
    },
    drawPicturePointer:function(position){
      var cx // 表盘中心x
        , cy // 表盘中心y
        , x0 // 指针的中心点x
        , y0 // 指针的中心点y
        , cfg = this.get('picturePointer')

      cx = this.get('cx')
      cy = this.get('cy')
      x0 = cfg.cx
      y0 = cfg.cy

      var src = cfg.src
        , paper = this.paper
        , x = cx - x0
        , y = cy - y0
        , RImage
        , that = this
      RImage = paper.image(src,x,y,cfg.width,cfg.height)
      var picpointer = new PicturePointer({pointer:RImage,dashboard:that,paper:paper,cx:x0,cy:y0})
      that.set('pointer',picpointer)
      this.pointer = picpointer
    },
    pointTo:function(angle,effect){
      this.pointer && this.pointer.pointTo(angle,effect)
    }
  })
  return DashBoard
},{
  requires:['../raphael/index','./pointer','./pointer-pic']
})
