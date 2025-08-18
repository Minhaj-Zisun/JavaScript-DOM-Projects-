// 1️⃣ DOM elements ধরছি
const timesContainer = document.getElementById('times'); // নামাজের সময় দেখানোর div
const dateInput = document.getElementById('date');       // date picker input
const currentTimeContainer = document.getElementById('current-time'); // বর্তমান সময় div

// 2️⃣ আজকের date picker এ default today set
const today = new Date().toISOString().slice(0,10); // "YYYY-MM-DD"
dateInput.value = today;

// 3️⃣ date format function
// API expects "DD-MM-YYYY"
function formatDateForAPI(dateStr){
  const [year, month, day] = dateStr.split('-'); // split YYYY-MM-DD
  return `${day}-${month}-${year}`; // DD-MM-YYYY
}

// 4️⃣ fetch function: নামাজের সময় আনবে
function fetchPrayerTimes(dateStr){
  const formattedDate = formatDateForAPI(dateStr); // format date

  // API URL
  const url = `https://api.aladhan.com/v1/timingsByCity?city=Dhaka&country=Bangladesh&method=1&school=1&date=${formattedDate}`;

  // fetch API call
  fetch(url)
    .then(res => res.json()) // JSON object বানানো
    .then(data => {
      if(!data || !data.data || !data.data.timings){
        timesContainer.innerHTML = "<p>❌ ডেটা পাওয়া যায়নি।</p>";
        return;
      }

      // ৫ ওয়াক্তের নামাজের সময় বের করা
      const {Fajr, Dhuhr, Asr, Maghrib, Isha} = data.data.timings;

      // DOM এ দেখানো
      timesContainer.innerHTML = `
        <div class="time-row"><span>ফজর</span><span>${Fajr}</span></div>
        <div class="time-row"><span>যোহর</span><span>${Dhuhr}</span></div>
        <div class="time-row"><span>আসর</span><span>${Asr}</span></div>
        <div class="time-row"><span>মাগরিব</span><span>${Maghrib}</span></div>
        <div class="time-row"><span>এশা</span><span>${Isha}</span></div>
      `;
    })
    .catch(err => {
      timesContainer.innerHTML = "<p>❌ ডেটা আনতে সমস্যা হয়েছে।</p>";
      console.error(err);
    });
}

// 5️⃣ প্রথমে আজকের date fetch
fetchPrayerTimes(today);

// 6️⃣ Date change listener
dateInput.addEventListener('input', (e) => {
  fetchPrayerTimes(e.target.value);
});

// 7️⃣ Current Bangladesh time দেখানো
function updateCurrentTime(){
  const now = new Date();

  // UTC থেকে +6 ঘন্টা
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const bdTime = new Date(utc + 3600000*6);

  const h = String(bdTime.getHours()).padStart(2,'0');
  const m = String(bdTime.getMinutes()).padStart(2,'0');
  const s = String(bdTime.getSeconds()).padStart(2,'0');

  currentTimeContainer.textContent = `${h}:${m}:${s}`;
}

// প্রতি সেকেন্ডে update
setInterval(updateCurrentTime, 1000);
updateCurrentTime(); // page load এও দেখাবে
