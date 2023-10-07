
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const twilio = require('twilio');
const cron = require('node-cron');

const app = express();

// Twilio 계정 SID 및 인증 토큰
const accountSid = 'AC31bf6f5888200b497682d5de6beaa424';
const authToken = '52e18fcc7cb735b64ebf48434bcf3f6e';

// Twilio 클라이언트 초기화
const client = twilio(accountSid, authToken);

// MongoDB Atlas 연결 설정
mongoose.connect('mongodb+srv://shineunseok:%40qwe1901215@cluster0.70qy8ip.mongodb.net/tripcam-reservation', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB 연결 성공');
  })
  .catch((err) => {
    console.error('MongoDB 연결 오류:', err);
  });
   
  const Reservation = mongoose.model('Reservation', {
    name: String,
    tel: String,
    product: String,
    totalRentalDay: Number,
    rentalPlace: String,
    returnPlace: String,
    rentalDay: String,
    rentalTime: String,
    returnDay: String,
    returnTime: String,
    totalPrice: Number,
    paymentStatus: String,
  });

  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/submit', async (req, res) => {
  try {
    const userPhoneNumber = '+82' + req.body.tel;
    const totalRentalPrice = parseInt(req.body['total-price-input']);

    const reservation = new Reservation({
      name: req.body.name,
      tel: req.body.tel,
      product: req.body.product,
      totalRentalDay: parseInt(req.body.totalRentalDay),
      rentalPlace: req.body['rental-place'],
      returnPlace: req.body['return-place'],
      rentalDay: req.body['rental-day'],
      rentalTime: req.body['rental-time'],
      returnDay: req.body['return-day'],
      returnTime: req.body['return-time'],
      totalPrice: totalRentalPrice,
      paymentStatus: '대기 중',
    });

    // 예약 정보를 MongoDB에 저장
    await reservation.save();

    // Twilio를 사용하여 SMS 보내기
    const message = `[Tripcam 예약 안내] 
  ▷예약자 명 : ${req.body.name}
  ▷대여 상품 : ${req.body.product}
  ▷총 대여일 : ${req.body.totalRentalDay}
  ▷대여 장소 : ${req.body['rental-place']}
  ▷반납 장소 : ${req.body['return-place']}
  ▷대여 날짜/시간 : ${req.body['rental-day']}, ${req.body['rental-time']}
  ▷반납 날짜/시간 : ${req.body['return-day']}, ${req.body['return-time']}
  ▷총 대여금액 : ${totalRentalPrice}

 예약하신 정보 확인해주시고 농협 신은석 3120182618441 으로 입금하시면 최종예약이 완료됩니다.`;

    await client.messages.create({
      body: message,
      from: '+12568503614',
      to: userPhoneNumber,
    });

    res.sendFile(__dirname + '/public/index.html');
  } catch (error) {
    console.error('오류 발생:', error);
    res.status(500).send('예약 저장 및 SMS 발송 중 오류가 발생했습니다.');
  }
});

// 주기적으로 예약 확인 작업 실행 (매 1분마다)
cron.schedule('*/1 * * * *', async () => {
  try {
    // "paymentStatus"가 "확인"인 예약을 찾습니다.
    const reservationsToNotify = await Reservation.find({ paymentStatus: '확인' });

    // 각 예약에 대해 SMS 메시지를 보냅니다.
    for (const reservation of reservationsToNotify) {
      const userPhoneNumber = '+82' + reservation.tel;
      const message = `[Tripcam 예약 안내] 
  안녕하세요, ${reservation.name} 고객님. Tripcam 최종 예약이 완료되었습니다.

  ▷대여 상품 : ${reservation.product}
  ▷총 대여일 : ${reservation.totalRentalDay}
  ▷대여 장소 : ${reservation.rentalPlace}
  ▷반납 장소 : ${reservation.returnPlace}
  ▷대여 날짜/시간 :${reservation.rentalDay}, ${reservation.rentalTime}
  ▷반납 날짜/시간 :${reservation.rentalDay}, ${reservation.rentalTime}
  

  예약 관련 변경 및 취소 01030966033으로 연락 부탁드립니다.

  트립캠을 통해 즐거운 여행하시길 바라며, 
  더 나은 서비스로 보답하는 트립캠이 되도록 노력하겠습니다.

  카카오톡 채널 후기 작성해주시면 최대 "10,000원" 페이백 이벤트 진행중이니 많은 관심 부탁드립니다.

  감사합니다. 트립캠 드림  `;

      // Twilio를 사용하여 SMS 메시지를 전송합니다.
      await client.messages.create({
        body: message,
        from: '+12568503614',
        to: userPhoneNumber,
      });

      // 문자 메시지 전송이 성공한 경우, 해당 예약의 "paymentStatus"를 업데이트합니다.
      reservation.paymentStatus = '최종예약완료';
      await reservation.save();

      console.log(`예약 완료 문자 메시지를 ${userPhoneNumber}에게 보냈습니다.`);
    }
  } catch (error) {
    console.error(`SMS 발송 및 업데이트 중 오류 발생: ${error}`);
  }
});

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});

