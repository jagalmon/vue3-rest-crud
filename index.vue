<template>
    <div>
      <!-- Input Form -->
      <form @submit.prevent="fetchData" class="form-table">
        <table>
          <tbody>
            <!-- Input Form 첫 번째 행 -->
            <tr>
              <td><label>일자</label></td>
              <td>
                <input
                  type="date"
                  v-model="formData.startDate"
                  class="date-input"
                />
                ~
                <input
                  type="date"
                  v-model="formData.endDate"
                  class="date-input"
                />
                <div class="date-buttons">
                  <button type="button" @click="setStartDate('month')">한달전</button>
                  <button type="button" @click="setStartDate('week')">일주일전</button>
                  <button type="button" @click="setStartDate('today')">당일</button>
                </div>
              </td>
              <td><label>유형</label></td>
              <td>
                <select v-model="formData.option">
                  <option value="option1">홈페이지 예약</option>
                  <option value="option2">IVR 인입</option>
                  <option value="option3">유형3</option>
                </select>
              </td>
              <td style="text-align: left;">
                <button type="submit">조회</button>
              </td>
            </tr>
            <!-- Input Form 두 번째 행 -->
            <tr>
              <td><label>상담사명</label></td>
              <td>
                <input
                  id="txtTmr"
                  v-model="formData.text"
                  type="text"
                  class="full-width-input"
                  style="width: 200px;"
                />
              </td>
              <td><label>고객명</label></td>
              <td>
                <input
                  id="txtCust"
                  v-model="formData.text"
                  type="text"
                  class="full-width-input"
                  style="width: 200px;"
                />
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </form>
  
      <!-- Grid Table -->
      <div class="grid-table">
        <table border="1">
          <thead>
            <tr>
              <th>일자</th>
              <th>상담사</th>
              <th>고객</th>
              <th>유형</th>
            </tr>
          </thead>
          <tbody v-if="gridData.length > 0">
            <tr v-for="row in gridData" :key="row.date">
              <td>{{ row.date }}</td>
              <td>{{ row.tmrNm }}</td>
              <td>{{ row.custNm }}</td>
              <td>{{ row.value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  // 오늘 날짜와 한 달 전, 일주일 전 날짜를 계산
  const today = new Date();
  const formatDate = (date) => date.toISOString().split('T')[0];
  
  const formData = ref({
    text: '',
    option: 'option1',
    startDate: formatDate(new Date(today.setMonth(today.getMonth() - 1))), // 기본값: 한 달 전
    endDate: formatDate(new Date()), // 기본값: 오늘
  });
  
  const gridData = ref([]);
  
  const fetchData = async () => {
    try {
      const response = await axios.post('/api/data', formData.value);
  
      gridData.value = response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  // 시작일자를 변경하는 함수
  const setStartDate = (period) => {
    const newDate = new Date();
    if (period === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (period === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else if (period === 'today') {
    }
    formData.value.startDate = formatDate(newDate);
  };
  </script>
  
  <style scoped>
  /* 전체 레이아웃 */
  body {
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
    margin: 0;
    padding: 0;
  }
  
  div {
    margin: 20px auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 900px;
  }
  
  /* Input Form Styling */
  .form-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .form-table td {
    padding: 10px;
    vertical-align: middle;
    font-size: 14px;
    color: #333;
  }
  
  label {
    font-weight: bold;
    margin-right: 10px;
  }
  
  /* Date Inputs */
  .date-input {
    width: 140px; /* 8자리 YYYY-MM-DD 형식에 맞춘 너비 */
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fefefe;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    font-size: 14px;
    transition: border-color 0.3s ease;
  }
  
  .date-input:focus {
    border-color: #ff6f61; /* 포커스 시 밝은 코랄 색상 */
    outline: none;
  }
  
  /* Select Input */
  select {
    width: 150px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fefefe;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    font-size: 14px;
    transition: border-color 0.3s ease;
  }
  
  select:focus {
    border-color: #ff6f61;
    outline: none;
  }
  
  /* Buttons */
  button {
    padding: 8px 15px;
    margin: 2px;
    border: none;
    border-radius: 4px;
    background-color: #ff6f61; /* 밝은 코랄 색상 */
    color: white;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }
  
  button:hover {
    background-color: #d95448; /* 더 어두운 코랄 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .date-buttons button {
    margin-right: 5px;
  }
  
  /* Full Width Input */
  .full-width-input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }
  
  /* Grid Table Styling */
  .grid-table {
    margin-top: 20px;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .grid-table table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th,
  td {
    padding: 12px 15px;
    text-align: left;
    font-size: 14px;
    color: #333;
  }
  
  /* 변경된 thead 색상 */
  th {
    background-color: #ffdac1; /* 밝은 피치색 */
    color: #4a4a4a; /* 진한 회색 */
    font-weight: bold;
  }
  
  td {
    border-bottom: 1px solid #e0e0e0;
  }
  
  tr:hover td {
    background-color: #f4f8ff;
  }
  
  tr:last-child td {
    border-bottom: none;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    div {
      padding: 10px;
      margin: 10px;
    }
  
    .form-table td {
      display: block;
      margin-bottom: 10px;
    }
  
    .date-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
    }
  
    button {
      width: 100%;
    }
  }
  </style>
  