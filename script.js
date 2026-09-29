// 랜덤 명언 목록
const quotes = [
    { text: '천 리 길도 한 걸음부터.', author: '속담' },
    { text: '아는 것이 힘이다.', author: '프랜시스 베이컨' },
    { text: '나는 생각한다, 고로 존재한다.', author: '르네 데카르트' },
    { text: '배우고 때로 익히면 또한 기쁘지 아니한가.', author: '논어' },
    { text: '시작이 반이다.', author: '속담' },
    { text: '너 자신을 알라.', author: '소크라테스' },
    { text: '행동은 모든 성공의 기본 열쇠이다.', author: '파블로 피카소' },
    { text: '낙숫물이 댓돌을 뚫는다.', author: '속담' }
];

function displayRandomQuote() {
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('quote').innerHTML = `“${q.text}”<span>— ${q.author}</span>`;
}

// 날씨 코드 → 설명
function weatherText(code) {
    if (code === 0) return '☀️ 맑음';
    if (code <= 3) return '⛅ 구름';
    if (code <= 48) return '🌫️ 안개';
    if (code <= 67) return '🌧️ 비';
    if (code <= 77) return '❄️ 눈';
    if (code <= 82) return '🌦️ 소나기';
    if (code <= 86) return '🌨️ 눈';
    return '⛈️ 뇌우';
}

// Open-Meteo OpenAPI로 현재 날씨 가져오기
async function fetchWeather(lat, lon, elementId, cityName) {
    const el = document.getElementById(elementId);
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`);
        if (!response.ok) throw new Error('날씨 정보를 가져오는데 실패했습니다.');
        const data = await response.json();
        const w = data.current_weather;
        el.textContent = `${cityName} ${weatherText(w.weathercode)} ${Math.round(w.temperature)}°C`;
    } catch (error) {
        el.textContent = `${cityName} 날씨 정보 없음`;
    }
}

// 현재 시각 표시
function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent = now.toLocaleString('ko-KR', {
        year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
        hour: '2-digit', minute: '2-digit'
    });
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    displayRandomQuote();
    updateClock();
    setInterval(updateClock, 1000);

    fetchWeather(37.5665, 126.9780, 'weather-seoul', '서울');
    fetchWeather(33.4996, 126.5312, 'weather-jeju', '제주');

    // I'm Feeling Lucky 버튼 이벤트
    document.getElementById('lucky-btn').addEventListener('click', () => {
        window.location.href = 'https://www.google.com/doodles';
    });

    document.getElementById('quote-btn').addEventListener('click', displayRandomQuote);
});
