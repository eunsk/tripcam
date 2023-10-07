// $(document).ready(function() {
//   // 상품명 selectmenu 초기화
//   $("#product").selectmenu();

//   // 총 대여일 spinner 초기화
//   $("#totalRentalDay").spinner({
//     min: 1,
//     max: 100,
//     step: 1
//   });

//   // 이벤트 리스너를 통해 대여일 수가 변경될 때마다 총 대여금액 계산 및 업데이트
//   $("#totalRentalDay").on("spinchange", function() {
//     calculateTotalPrice();
//   });

//   // 이벤트 리스너를 통해 상품 선택이 변경될 때마다 총 대여금액 계산 및 업데이트
//   $("#product").on("selectmenuchange", function() {
//     calculateTotalPrice();
//   });

//   function calculateTotalPrice() {
//     // 선택된 상품의 가격과 대여일 수를 가져옴
//     var selectedProductPrice = parseInt($("#product").val());
//     var rentalDays = parseInt($("#totalRentalDay").val());

//     // 총 대여금액 계산
//     var totalPrice = selectedProductPrice * rentalDays;

//     if (isNaN(totalPrice)) {
//       totalPrice = 0;
//     }


//     // 계산된 총 대여금액을 인터페이스에 업데이트
//     $("#total-price").text(totalPrice + "원");
//   }
// });

// $(document).ready(function() {
//   // 가격과 이름을 매핑하는 객체 생성
//   var productMap = {
//     "고프로 10": "9000",
//     "DJI 포켓 2": "12000",
//     "아이폰 XS": "8000"
//   };

//   // 상품명 selectmenu 초기화
//   $("#product").selectmenu();

//   // 총 대여일 spinner 초기화
//   $("#totalRentalDay").spinner({
//     min: 1,
//     max: 100,
//     step: 1
//   });

//   // 이벤트 리스너를 통해 대여일 수가 변경될 때마다 총 대여금액 계산 및 업데이트
//   $("#totalRentalDay").on("spinchange", function() {
//     calculateTotalPrice();
//   });

//   // 이벤트 리스너를 통해 상품 선택이 변경될 때마다 총 대여금액 계산 및 업데이트
//   $("#product").on("selectmenuchange", function() {
//     calculateTotalPrice();
//     updateProductName(); // 선택한 상품 이름 업데이트
//   });

//   function calculateTotalPrice() {
//     // 선택된 상품의 가격을 가져옴
//     var selectedProductPrice = parseInt($("#product").val());
//     var rentalDays = parseInt($("#totalRentalDay").val());

//     // 총 대여금액 계산
//     var totalPrice = selectedProductPrice * rentalDays;

//     if (isNaN(totalPrice)) {
//       totalPrice = 0;
//     }

//     // 계산된 총 대여금액을 인터페이스에 업데이트
//     $("#total-price").text(totalPrice + "원");
//   }

//   function updateProductName() {
//     // 선택된 상품의 가격을 가져옴
//     var selectedProductPrice = $("#product").val();

//     // 가격에 대응하는 상품 이름을 가져와서 화면에 표시
//     var productName = productMap[selectedProductPrice];

//     if (productName) {
//       $("#product-name").text(productName);
//     } else {
//       $("#product-name").text("");
//     }
//   }
// });




$(document).ready(function() {
  // 상품명 selectmenu 초기화
  $("#product").selectmenu();

  // 총 대여일 spinner 초기화
  $("#totalRentalDay").spinner({
    min: 1,
    max: 100,
    step: 1
  });

  // 이벤트 리스너를 통해 대여일 수가 변경될 때마다 총 대여금액 계산 및 업데이트
  $("#totalRentalDay").on("spinchange", function() {
    calculateTotalPrice();
  });

  // 이벤트 리스너를 통해 상품 선택이 변경될 때마다 총 대여금액 계산 및 업데이트
  $("#product").on("selectmenuchange", function() {
    calculateTotalPrice();
  });

  function calculateTotalPrice() {
    // 선택된 상품의 이름을 가져옴
    var selectedProductName = $("#product").val();
    var rentalDays = parseInt($("#totalRentalDay").val());

    // 가격과 대여일 수를 곱하여 총 대여금액 계산 (가격은 JavaScript 코드에서 가져옴)
    var productPrices = {
      "고프로 10": 9000,
      "DJI 포켓 2": 12000,
      "아이폰 XS": 8000
    };
    var selectedProductPrice = productPrices[selectedProductName];

    var totalPrice = selectedProductPrice * rentalDays;

    if (isNaN(totalPrice)) {
      totalPrice = 0;
    }

    // 계산된 총 대여금액을 인터페이스에 업데이트
    $("#total-price").text(totalPrice + "원");

     // 수정된 부분: 계산된 총 대여금액을 hidden input 필드에 설정하여 서버로 전송
     $("#total-price-input").val(totalPrice);
  }
});



  
  $( "#rental-place" ).selectmenu();

  $( "#return-place" ).selectmenu();
 
  // $( "#totalRentalDay" ).spinner();

  $(function() {
    $("#rental-day").datepicker({
      minDate: new Date() ,
      dateFormat: "yy-mm-dd", // 년-월-일 형식
      dayNames: ['일', '월', '화', '수', '목', '금', '토'], // 요일 이름 설정
      dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'], // 요일 이름 축약 설정
      monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], // 월 이름 설정
      monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'] // 월 이름 축약 설정
    });

    $("#return-day").datepicker({
      minDate: new Date() ,
      dateFormat: "yy-mm-dd", // 년-월-일 형식
      dayNames: ['일', '월', '화', '수', '목', '금', '토'], // 요일 이름 설정
      dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'], // 요일 이름 축약 설정
      monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], // 월 이름 설정
      monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'] // 월 이름 축약 설정
    });

  });

  

  $(function() {
    
    $("#rental-time").timepicker({
      timeFormat: "p hh:mm ",
      interval: 20, 
      minTime : 'AM 08:00',
      maxTime : 'PM 08:00',
      scrollbar: true
    });

    $("#return-time").timepicker({
      timeFormat: "p hh:mm ",
      interval: 20, 
      minTime : 'AM 08:00',
      maxTime : 'PM 08:00',
      scrollbar: true
    });

  });
  
 
  
   