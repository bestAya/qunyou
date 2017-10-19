/*
* @Author: Administrator
* @Date:   2017-09-19 13:06:02
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-25 16:43:26
*/
function getClass(classname,ranger){
     ranger=ranger? ranger : document;
     if(document.getElementsByClassName){
        return ranger.getElementsByClassName(classname);
     }else{
     	var newarr=[];
     	var all = ranger.getElementsByTagName('*');
     	for(var i=0;i<all.length;i++){
            if(cheeekclass(all[i].className,classname)){
                 newarr.push(all[i]);
            }
     	}
     	return newarr;
     }
}
function cheeekclass(className,classname){
       var arr=className.split(' ');
       for(var i=0;i<arr.length;i++){
           if(arr[i]==classname){
             return true;
           }
       }
       return false;
}
function $(select,ranger){
	if(typeof select==='string'){
    ranger=ranger|| document;
    var frist=select.charAt(0);
    if(frist == '.'){
      return getClass(select.substring(1),ranger);
        
    }else if(frist =='#'){
        return document.getElementById(select.substring(1));
    }else if(/^[a-z][a-z1-6]{0,7}$/.test(select)){
        return ranger.getElementsByTagName(select);
    }
  }else if(typeof select==='function'){
      window.addEventListener('load',select);
  }
}
//  找他后面最近的元素
 function next(element,tagname){
    let parent=element.parentNode;
    let child=parent.children;
    let index=0;
    let i=0;
    for(let i=0;i<child.length;i++){
         if(child[i]==element){
              index=i;
              break;
         }      
    }
    let newnext=Array.from(child).slice(index+1);
    for(let i=0;i<newnext.length;i++){
      if(newnext[i].nodeName==tagname.toUpperCase()){
        // console.log(newnext[i])
        return newnext[i];
      }
    }
    return null;
   }
//方法二
   function nexts(element,tagname){
    let netc=element.nextElementSibling;
    if(netc==null){
      return null;
    }
    while(netc.nodeName!==tagname.toUpperCase()){
      netc=netc.nextElementSibling;
      if(netc==null){
        return null;
      }
      if(netc.nodeName==tagname.toUpperCase()){
        return netc;
      }
    }
    
   }
//当前元素后面的所有兄弟元素节点（方法一）
function nextAll(element){
   let parent=element.nextElementSibling;
   if(parent==null){
    return null;
   }
   let arr=[];
   while(parent!=null){
    arr.push(parent);
    parent=parent.nextElementSibling;
   }
   return arr;
}
//当前元素的所有父元素
function nextparent(element){
   let parent=element.parentNode;
   if(parent.nodeName=='BODY'||parent.nodeName=='HTML'){
    return null;
   }
   let arr=[];
   while(parent!=null){
    arr.push(parent);
    parent=parent.parentNode;
   }
   return arr;
}


//插入随机div元素
  function random(num){
    
   for(let i=0;i<num;i++){
    let box=document.createElement('div');
    box.className='box';
   
    let tops=Math.floor((innerHeight-100)*Math.random());
    let lefts=Math.floor((innerWidth-100)*Math.random());
    let widths=Math.floor(Math.random()*70+30);
    
    box.style.width=widths+'px';
    box.style.height=widths+'px';
    box.style.background=randomcolor();
     document.body.appendChild(box);
    setTimeout(function(){
    box.style.transition=i*100+'ms';
    box.style.top=tops+'px';
    box.style.left=lefts+'px';
    },5)

   }
}
//随机颜色
function randomcolor(){
    let str='rgb(';
    for(let i=0;i<3;i++){
      let num=Math.round(Math.random()*255);
      str+=num+',';
    }
    str=str.slice(0,-1);//去掉后面的点
    str+=')';
    return str;
  } 
//insertAfter插入到父元素下的某个子元素的后面
function insertAfter(elements,position){
     let next=position.nextElementSibling;
     let parent =next.parentNode;
     if(next){
       parent.insertBefore(elements,next);
     }else{
      parent.appendChild(elements);
     }
}
//封装在HHTMLElement里面使所有的html元素都能使用
//谁调用往谁后面插入
HTMLElement.prototype.insertAfter=function(elements){
    let next=this.nextElementSibling;
    let parent=this.parentNode;
    if(next){
      parent.insertBefore(elements,next);
    }else{
      parent.appendChild(elements);
    }
}
//prependchild往元素最前面插入
HTMLElement.prototype.prependchild=function(elements){
  let frist=this.firstElementChild;
  if(frist){
    this.insertBefore(elements,frist);
  }
}
//appendTo 要添加的元素放在前面放在位置放在后面 在后面插入
HTMLElement.prototype.appendTo=function(elements){
      elements.appendChild(this);
}
//prependTo要添加的元素放在前面放在位置放在后面 在前面插入
HTMLElement.prototype.prependTo=function(elements){
      elements.prependchild(this);
}
//empty清空
// HTMLElement.prototype.empty=function(){
//      this.innerHTML='';
// }
HTMLElement.prototype.empty=function(){
      let child=this.childNodes;
      for(let i=child.length-1;i>=0;i--){
        this.removeChild(child[i]);
        child[i]=null;
      }
}
//鼠标按下拖动效果
//如何使用
//let box=document.querySelector('div.box');
// let st=new Drag(box);
 // st.move();
class Drag{
  constructor(obj){
       this.obj=obj;
  }
    move(){
      let that=this;
      this.obj.addEventListener('mousedown',function(e){
        let ox=e.offsetX,oy=e.offsetY;
        document.addEventListener('mousemove',fn);
        that.obj.addEventListener('mouseup',function(){
          document.removeEventListener('mousemove',fn);
        })
        function fn(e){
          let lefts=e.clientX-ox, tops=e.clientY-oy;
          that.obj.style.left=`${lefts}px`;
          that.obj.style.top=`${tops}px`;
        }
      })
    }
}
//漂浮小广告
//用法
//获取到元素
//let boxs=new Float(box);
//boxs.move();
function Float(obj){
        this.obj=obj;
        this.maxW=window.innerWidth-this.obj.offsetWidth;
        this.maxH=window.innerHeight-this.obj.offsetHeight;
        this.speedw=10;
        this.speedt=10;
     }
     Float.prototype={
      move:function(){
      let that=this;
      this.t=setInterval(function(){
        let lefts=that.obj.offsetLeft;
        let tops=that.obj.offsetTop;
        if(lefts>that.maxW){
               lefts=that.maxW;
               that.speedw*=-1;
            }
            if(lefts<0){
               lefts=0;
               that.speedw*=-1;
            }
            if(tops>that.maxH){
               tops=that.maxH;
               that.speedt*=-1;
            }
            if(tops<0){
               topts=0;
               that.speedt*=-1;
            }
        that.obj.style.left=lefts+that.speedw+'px';
        that.obj.style.top=tops+that.speedt+'px';
      },60)
                 },
        stop:function(){
             clearInterval(this.t);
        },
        resize:function(){
        this.maxW=window.innerWidth-this.obj.offsetWidth;
        this.maxH=window.innerHeight-this.obj.offsetHeight;
        }
     }