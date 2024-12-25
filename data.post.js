export default defineEventHandler(async (event) => {
    //const body = await readBody(event);
  
    return [
      { date: '20241130', tmrNm: '상담사1', custNm: '고객명1', value: '홈페이지 예약' },
      { date: '20241216', tmrNm: '상담사2', custNm: '고객명2', value: 'IVR 인입' },
      { date: '20241224', tmrNm: '상담사3', custNm: '고객명3', value: '유형3' },
    ];
  });
  