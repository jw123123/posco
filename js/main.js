$(function () {
  const body = $("body");
  const hd = "#hd-header";
  let viewportH = window.innerHeight;
  let scTop = $(window).scrollTop();
  // 각 섹션별 헤더디자인 구현(다크모드)
  let sections = []; // 각 섹션별(.wh) 위치를 담을 배열
  const updateSectionPos = () => { // 화살표 함수의 this는 부모를 의미(this를 선언해야하면 원래의 function 쓸 것)
    //  function updateSectionPos() {}
    sections = [];
    $(".main-section.wh").each(function () {
      sections.push({ //push - 배열에 쓸 수 있는 매서드(값을 집어넣는 문법)
        top: $(this).offset().top,
        bottom: $(this).offset().top + $(this).height()
      });
    });
    // console.log(sections);
  }
  updateSectionPos();
  $(window).on("resize", updateSectionPos) // $(window) = 내장객체
  // resize할때마다 update가 다시 실행되게 하는 문법
  $(window).on("scroll", () => {
    scTop = $(window).scrollTop();
    let isDark = false; // 배경이 어두운 영역이 맞는지 확인
    for (const section of sections) { // sections에 있는 것들 중 값을 section에 넣어서 꺼냄
      if (scTop >= section.top && scTop < section.bottom) {
        isDark = true;
        break; // 이 구간에 들어와 있는 동안에는 실행하지 말라는 문법
      }
    }
    if (isDark == true) { // if(isDark == true) = if(isDark)
      $(hd).addClass("dark-mode");
    } else {
      $(hd).removeClass("dark-mode");
    }
  });



  // 히어로 구현
  const visualBtn = ".visual-pagination button";
  const vSlide = ".v-slide";
  const vTxt = ".v-txt";
  let activeNum = 0;

  // 2번 버튼을 클릭하면 visualWrap의 left좌표가 -100%
  $(visualBtn).click(function () {
    // 비주얼 페이지 버튼 초기화
    $(visualBtn).removeClass("active");
    $(this).addClass("active");
    $(vTxt).removeClass("animate");

    activeNum = $(this).data("index");
    // "" 안에 들어가면 무조건 문자로 인식 없으면 상수로 인식 / () 안에 "" 안에 들어가는 값은 상수로 들어감.
    // 모든 슬라이드 초기화
    $(vSlide).removeClass("active prev");
    $(vSlide).each(function () {
      const video = $(this).find("video").get(0);
      video.pause();
      video.currentTime = 0;
      // currentTime = video에 할당된 속성으로 값을 대입할 것
      const slideIndex = $(this).data("index");
      // const는 한 번 지정 후 다시 변수 지정하면 에러남
      if (slideIndex < activeNum) {
        $(this).addClass("prev");
      }
    });

    // 선택한 번호의 슬라이드 활성화
    let currentSlide = $(vSlide).eq(activeNum);
    currentSlide.addClass("active");
    let txt = $(vSlide).eq(activeNum).find(vTxt);
    setTimeout(() => {
      // () => 하면 function 쓰지 않아도 됨
      txt.addClass("animate");
    }, 500);

    let video = currentSlide.find("video").get(0);
    video.play();

    // startTextAnimation(currentSlide);

    // 텍스트 애니메이션
    function startTextAnimation(vSlide) {
      // 사용자 정의 함수로 function으로 함수 지정
      const text = $(".v-txt");
      text.removeClass("animate");
      setTimeout(() => {
        // () => 하면 function 쓰지 않아도 됨
        text.addClass("animate");
      }, 500);
      // 0.5초 이후에 실행하라는 의미
    }
  }); // 버튼 클릭했을 때

  // 대표실적
  const swiper1 = new Swiper(".result-container", {
    effect: "cards",
    grabCursor: true,
  });

  // 뉴스
  let resizeTimer;
  const swiper2 = new Swiper(".news-slider-wrap", {
    slidesPerView: 1,
    spaceBetween: 10,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,

    },
    breakpoints: {
      768: {
        slidesPerView: 1,
        spaceBetween: 40,
      },
      1280: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
      
    },
      on: { // 리사이즈 시 pc에서는 autoplay를 끄고 다른 해상도에서는 자동으로 swiper 되게
    resize: function () {
      setTimeout(() => {
        if (body.hasClass("pc")) {
          this.autoplay.stop();  
        } else {
          this.autoplay.stop();
          this.autoplay.start(); 
        }
      }, 300);
    }
  }
  });

}); 
