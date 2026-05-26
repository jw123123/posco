$(document).ready(function () {
  AOS.init();

  // 변수 선언
  const body = "body";
  const hd = "#pos-header";
  const ft = "#pos-footer";
  let bodyHeight = $(body).height();
  let viewportW = window.innerwidth;
  let viewportH = window.innerHeight;
  let scTop = $(window).scrollTop();
  let hdHeight = $(hd).height();
  let ftHeight = $(ft).height();
  let ftTop = $(ft).offset().top;
  const mainMenu = ".depth1";
  const subMenu = ".depth2";
  let speed = 300; 
  const smBtn = ".sitemap-btn";
  const sitemap = ".sitemap";
  const familySite = ".family-site";
  const fmBtn = ".family-btn";
  const closedBtn = ".close-btn";
  const smMainMenu = ".sm-depth1 > a";
  const smSubMenu = ".sm-depth2";

  //반응형 구현
  rwd();

  $(window).resize(function () {
    rwd();
    smReset();
    bodyHeight = $(body).height();
    hdHeight = $(hd).height();
    ftHeight = $(ft).height();
  });

  $(window).scroll(function () {
    scTop = $(window).scrollTop(); 
    if (scTop > hdHeight) {
      $(hd).addClass("fixed");
      $(hd).addClass("fixed");
    } else {
      $(hd).removeClass("fixed");
    }
  });

  // GNB 슬라이드다운
  $(mainMenu).mouseenter(function () {
    $(this).children(subMenu).stop().slideDown(speed);
  });
  $(mainMenu).mouseleave(function () {
    $(this).children(subMenu).stop().slideUp(speed);
  });

  // 사이트맵, 모바일 GNB구현

  $(smMainMenu).click(function () {
    if (!$(body).hasClass("pc")) {
      // ! = not의 의미로 반대 속성 조건문 쓸 때 필요
      $(this).parent().siblings().find(smSubMenu).slideUp(300);
      $(this).next().slideToggle(300);
      // slideToggle - 너비는 건들지 않고 높이만 조절
      // show - 너비, 높이 다 같이 조절해서 초 넣으면 이상하게 보임
    }
  });

  $(smBtn).click(function () {
    $(body).addClass("fixed");
    $(sitemap).addClass("active");
  });

  $(fmBtn).click(function () {
    $(body).addClass("fixed");
    $(familySite).addClass("active");
  });

  $(closedBtn).click(function () {
    $(body).removeClass("fixed");
    $(this).parent().removeClass("active");
  });


  function rwd() {
    viewportW = window.innerWidth;  //순수한 자바스크립트 문법
    viewportH = window.innerHeight;
    // console.log(viewportW, viewportH)
    // if(조건을 충족하면){실행}
    if (viewportW < 768) { //단위 안 쓰고 절대값 px로 읽음
      $(body).removeClass("tb pc").addClass("mo");
    } else if (viewportW >= 768 && viewportW < 1280) {
      $(body).removeClass("mo pc").addClass("tb");
    } else {
      $(body).removeClass("mo tb").addClass("pc");
    }
  }

  function smReset() {
    $(smSubMenu).attr("style", "");
    // "style 속성을 찾아서 없애버리는 문법"
    //attribute - 속성으로 a href=""의 a 속성이 href=""인 것
  }

  // 부드러운 스크롤
  const lenis = new Lenis();
  // const lenis = new Lenis( 혹시 스크롤 속도가 느리면 lerp:0.2수치를 높여서 사용
  //   lerp: 0.2, (속도 조절)
  //   smoothwheel:true,
  //   smoothTouch: false
  // );
  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);




});