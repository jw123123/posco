$(function () {
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
}); // 전체 제이쿼리
