$(function () {
    let t=setInterval(move,4000);
    let num=0;
    let li=$('.banner-list>li');
    let btnli=$('.btn>li');
    let sbt=$('button');
    let head=$('header');
    function move() {
        num++;
        if(num>li.length-1) {
            num=0;
        }
        li.each(function (index) {
            li.eq(index).hide();
            btnli.eq(index).css({background:'#2c3e50'})
        })
            li.eq(num).show();
            btnli.eq(num).css({background:'#ccc'})
    }
    function movel() {
        num--;
        if(num<0) {
            num=5;
        }
        li.each(function (index) {
            li.eq(index).hide();
            btnli.eq(index).css({background:'#2c3e50'})
        })
        li.eq(num).show();
        btnli.eq(num).css({background:'#ccc'})

    }
    for(let i=0;i<btnli.length;i++){
        btnli.eq(i).click(function () {
            for(let j=0;j<li.length;j++){
                li.eq(j).hide();
                btnli.eq(j).css({background:'#2c3e50'})
            }
            li.eq(i).show();
            btnli.eq(i).css({background:'#ccc'})
            num=i;
        })
    }
    sbt.eq(0).on('click',function () {
        movel()
    })
    sbt.eq(1).on('click',function () {
        move()
    });
    $('.banner').mouseover(function () {
        clearInterval(t);
    })
    $('.banner').mouseout(function () {
        t=setInterval(move,4000);
    })
//导航
   let H=head.height();
    $(window).on('scroll',function () {
        let h=document.body.scrollTop;
            console.log(head)
            if(h>=H){$('header').css({background:'#2c3e50',position:'fixed'})};
            if(h<=H){$('header').css({background:'rgba(93, 110, 128,0.6)',position:'absolute'})};
    })


})