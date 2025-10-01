// Store moods in localStorage
let moodData = JSON.parse(localStorage.getItem("moodData")) || [];

// Wellness tips for each mood
const tips = {
  "Happy": [
    "Write down 3 things you’re grateful for.",
    "Share your happiness with a friend 💌",
    "Capture this moment in a photo 📸"
  ],
  "Sad": [
    "Take a short walk outside 🚶‍♀️",
    "Call a loved one 📞",
    "Write your feelings in a journal 📔"
  ],
  "Stressed": [
    "Try 5 minutes of deep breathing 🌬️",
    "Drink water and stretch 🧘‍♂️",
    "Break your work into smaller steps ✅"
  ],
  "Excited": [
    "Channel your energy into something creative 🎨",
    "Plan something fun 🎉",
    "Share your excitement with friends 😃"
  ],
  "Calm": [
    "Enjoy a quiet moment ☕",
    "Do a 10-minute meditation 🧘‍♀️",
    "Read a book or listen to music 🎶"
  ]
};

// Function to log mood
function logMood() {
  let mood = document.getElementById("mood").value;
  if (!mood) {
    alert("Please select a mood!");
    return;
  }

  let today = new Date().toLocaleDateString();
  moodData.push({ date: today, mood: mood });

  // Keep only last 7 days
  if (moodData.length > 7) moodData.shift();

  localStorage.setItem("moodData", JSON.stringify(moodData));

  showTip(mood);
  renderChart();
}

// Show random tip
function showTip(mood) {
  let moodTips = tips[mood];
  let randomTip = moodTips[Math.floor(Math.random() * moodTips.length)];
  document.getElementById("tipBox").innerText = randomTip;
}

// Render chart
function renderChart() {
  let ctx = document.getElementById("moodChart").getContext("2d");
  let labels = moodData.map(entry => entry.date);
  let values = moodData.map(entry => entry.mood);

  let chartData = {
    labels: labels,
    datasets: [{
      label: "Mood Tracker",
      data: values.map(m => moodToNumber(m)),
      backgroundColor: "rgba(44, 82, 130, 0.6)"
    }]
  };

  if (window.moodChart) window.moodChart.destroy(); // Reset chart
  window.moodChart = new Chart(ctx, {
    type: "bar",
    data: chartData,
    options: {
      scales: {
        y: {
          ticks: {
            callback: function(value) {
              return numberToMood(value);
            }
          },
          stepSize: 1,
          min: 0,
          max: 5
        }
      }
    }
  });
}

// Convert mood to number for chart
function moodToNumber(mood) {
  const moods = ["Happy", "Sad", "Stressed", "Excited", "Calm"];
  return moods.indexOf(mood);
}

// Convert number back to mood
function numberToMood(num) {
  const moods = ["Happy", "Sad", "Stressed", "Excited", "Calm"];
  return moods[num] || "";
}

// Initialize chart
renderChart();
