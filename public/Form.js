


// --------------------------------- f------------------
// $(document).ready(function() {
//   // 상품명 selectmenu 초기화
//   $("#product").selectmenu();
  
//   $("#sdCard").selectmenu();

//   // 총 대여일 spinner 초기화
//   $("#totalRentalDay").spinner({
//     min: 3,
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
//     // 선택된 상품의 이름을 가져옴
//     var selectedProductName = $("#product").val();
//     var rentalDays = parseInt($("#totalRentalDay").val());

//     // 가격과 대여일 수를 곱하여 총 대여금액 계산 (가격은 JavaScript 코드에서 가져옴)
//     var productPrices = {
//       "고프로 히어로 11": 13000,
//       "DJI 오즈모 포켓 2": 12000,
//       "아이폰 11 PRO": 10000
//     };
//     var selectedProductPrice = productPrices[selectedProductName];

//     var totalPrice = selectedProductPrice * rentalDays;

//     if (isNaN(totalPrice)) {
//       totalPrice = 0;
//     }
//     var formattedTotalPrice = totalPrice.toLocaleString();

//     // 계산된 총 대여금액을 인터페이스에 업데이트
//     $("#total-price").text(formattedTotalPrice + "원");

//      // 수정된 부분: 계산된 총 대여금액을 hidden input 필드에 설정하여 서버로 전송
//      $("#total-price-input").val(totalPrice);
//   }
// });
  
     


//   $( "#rental-place" ).selectmenu();

//   $( "#return-place" ).selectmenu();
 
  
//   $(function() {
//     // 현재 날짜를 가져옵니다.
//     var currentDate = new Date();
  
//     // 3일을 더합니다.
//     currentDate.setDate(currentDate.getDate() + 3);
  
//     // rental-day의 날짜 선택기 초기화
//     $("#rental-day").datepicker({
//       minDate: currentDate, // 현재 날짜에서 3일 후부터 선택 가능하도록 설정
//       dateFormat: "yy-mm-dd",
//       dayNames: ['일', '월', '화', '수', '목', '금', '토'],
//       dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
//       monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
//       monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
//     });
  
//     // return-day의 날짜 선택기 초기화
//     $("#return-day").datepicker({
//       minDate: currentDate, // 현재 날짜에서 3일 후부터 선택 가능하도록 설정
//       dateFormat: "yy-mm-dd",
//       dayNames: ['일', '월', '화', '수', '목', '금', '토'],
//       dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
//       monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
//       monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
//     });
//   });
  

//   $(function() {
    
//     $("#rental-time").timepicker({
//       timeFormat: "p hh:mm ",
//       interval: 20, 
//       minTime : 'AM 08:00',
//       maxTime : 'PM 08:00',
//       scrollbar: true
//     });

//     $("#return-time").timepicker({
//       timeFormat: "p hh:mm ",
//       interval: 20, 
//       minTime : 'AM 08:00',
//       maxTime : 'PM 08:00',
//       scrollbar: true
//     });

   

//   });
  
 
  
  //  ----------------------------------------------------------------------------------------

  $(document).ready(function() {
    // 상품명 selectmenu 초기화
    $("#product").selectmenu();
    $("#additional").selectmenu();
  
    // 총 대여일 spinner 초기화
    $("#totalRentalDay").spinner({
        min: 3,
        max: 100,
        step: 1
    });
  
    // 이벤트 리스너를 통해 대여일 수가 변경될 때마다 총 대여금액 계산 및 업데이트
    $("#totalRentalDay").on("spinchange", function() {
        calculateTotalPrice();
    });
  
    // 이벤트 리스너를 통해 상품 선택이 변경될 때마다 총 대여금액 계산 및 업데이트
    $("#product, #additional").on("selectmenuchange", function() {
        calculateTotalPrice();
    });

    function calculateTotalPrice() {
        // 선택된 상품의 이름을 가져옴
        var selectedProductName = $("#product").val();
        var rentalDays = parseInt($("#totalRentalDay").val());
  
        // 가격과 대여일 수를 곱하여 총 대여금액 계산 (가격은 JavaScript 코드에서 가져옴)
        var productPrices = {
            "고프로 히어로 11": 13000,
            "DJI 오즈모 포켓 2": 12000,
            "아이폰 11 PRO": 10000
        };
        var selectedProductPrice = productPrices[selectedProductName] || 0;
  
        // SD카드 구매인 경우 선택된 상품의 가격 * 대여일 수 + 100000
        if ($("#additional").val() === "SD카드 구매") {
            selectedProductPrice = selectedProductPrice * rentalDays + 15500;
        } else {
            // SD카드 구매가 아닌 경우 선택된 상품의 가격 * 대여일 수
            selectedProductPrice = selectedProductPrice * rentalDays;
        }
  
        var formattedTotalPrice = selectedProductPrice.toLocaleString();
  
        // 계산된 총 대여금액을 인터페이스에 업데이트
        $("#total-price").text(formattedTotalPrice + "원");
  
        // 수정된 부분: 계산된 총 대여금액을 hidden input 필드에 설정하여 서버로 전송
        $("#total-price-input").val(selectedProductPrice);
    }
});


  $( "#rental-place" ).selectmenu();

  $( "#return-place" ).selectmenu();
 
  
  $(function() {
    // 현재 날짜를 가져옵니다.
    var currentDate = new Date();
  
    // 3일을 더합니다.
    currentDate.setDate(currentDate.getDate() + 7);
  
    // rental-day의 날짜 선택기 초기화
    $("#rental-day").datepicker({
      minDate: currentDate, // 현재 날짜에서 3일 후부터 선택 가능하도록 설정
      dateFormat: "yy-mm-dd",
      dayNames: ['일', '월', '화', '수', '목', '금', '토'],
      dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
      monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
    });

  });


  $(function() {
    // 현재 날짜를 가져옵니다.
    var currentDate = new Date();
  
    // 3일을 더합니다.
    currentDate.setDate(currentDate.getDate() + 10);
  
    // return-day의 날짜 선택기 초기화
    $("#return-day").datepicker({
      minDate: currentDate, // 현재 날짜에서 3일 후부터 선택 가능하도록 설정
      dateFormat: "yy-mm-dd",
      dayNames: ['일', '월', '화', '수', '목', '금', '토'],
      dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
      monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
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
  
    
       
  