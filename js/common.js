$(document).ready(function () {
  // 변수 선언
  // var = 광역변수(잘 안씀)
  const body = "body";
  let viewportH, viewportW;
  // 선언만 할 것
  // viewport - 문서가 열리는 창의 크기
  const mainMenu = ".depth1";
  const subMenu = ".depth2";
  let speed = 300; //고칠 수 없는 상수
  const smBtn = ".sitemap-btn";
  const sitemap = ".sitemap";
  const familySite = ".family-site";
  const fmBtn = ".family-btn";
  const closedBtn = ".close-btn";
  const smMainMenu = ".sm-depth1 > a";
  const smSubMenu = ".sm-depth2";
  
  //반응형 구현
  rwd();
  // 창의 크기가 조절되면
  $(window).resize(function () {
    rwd();
    smReset();
  });


  // 언어선택 : 언어선택 버튼을 클릭하면 언어리스트가 슬라이드(토글)
  $(".lang-btn").click(function () {
    $(this).next().slideToggle(speed);
  });
  // PC GNB구현 : depth1에 마우스가 진입하면 depth2가 슬라이드다운
  $(mainMenu).mouseenter(function () {
    $(this).children(subMenu).stop().slideDown(speed);
  });
  $(mainMenu).mouseleave(function () {
    $(this).children(subMenu).stop().slideUp(speed);
    // 애니메이션 메소드들(slideDown 등)은 앞에 stop()을 꼭 써야함(아니면 애니메이션들이 쌓임)
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
    viewportW = window.innerWidth;
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
});