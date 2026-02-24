let interviewList = [];
let rejectedList = [];
let currentTab = "all";

const allCardsSection = document.getElementById("all-cards");
const interviewSection = document.getElementById("interview-section");
const rejectedSection = document.getElementById("rejected-section");

const total = document.getElementById("total");
const interview = document.getElementById("interview");
const rejected = document.getElementById("rejected");

const allCount = document.getElementById("all-count");
const interviewTabCount = document.getElementById("interview-tab-count");
const rejectedTabCount = document.getElementById("rejected-tab-count");
const tabCount = document.getElementById("tab-count");

const mainSection = document.querySelector("main");

// toggl btn 
function switchTab(id) {
  currentTab = id;

  document.getElementById("all-btn").classList.remove("bg-[#3B82F6]", "text-white");
  document.getElementById("interview-btn").classList.remove("bg-[#3B82F6]", "text-white");
  document.getElementById("rejected-btn").classList.remove("bg-[#3B82F6]", "text-white");

  document.getElementById(id + "-btn").classList.add("bg-[#3B82F6]", "text-white");

  allCardsSection.classList.add("hidden");
  interviewSection.classList.add("hidden");
  rejectedSection.classList.add("hidden");

  if (id === "all") {
    allCardsSection.classList.remove("hidden");
  } 
  else if (id === "interview") {
    interviewSection.classList.remove("hidden");
    renderInterview();
  } 
  else {
    rejectedSection.classList.remove("hidden");
    renderRejected();
  }

  countAvailableJobs();
}

// count dashboard
function countDashboard() {
  total.innerText = allCardsSection.children.length;
  interview.innerText = interviewList.length;
  rejected.innerText = rejectedList.length;

  countAvailableJobs();
}
 
// count available jobs 
function countAvailableJobs() {
  if (currentTab === "all") {
    tabCount.innerText = `${allCardsSection.children.length} Jobs`;
  } else if (currentTab === "interview") {
    tabCount.innerText = `${interviewList.length} Jobs`;
  } else {
    tabCount.innerText = `${rejectedList.length} Jobs`;
  }
}
 
// main section 
mainSection.addEventListener("click", function (e) {

  const card = e.target.closest(".bg-base-100");
  if (!card) {
    return;
  };

  const name = card.querySelector(".name").innerText;
  const skill = card.querySelector(".skill")?.innerText;
  const salary = card.querySelector(".salary")?.innerText;
  const summary = card.querySelector(".summary")?.innerText;
  const status = card.querySelector(".status-fo-ap");

  // interview 
  if (e.target.classList.contains("interview-btn")) {

    rejectedList = rejectedList.filter(job => job.name !== name);

    if (!interviewList.find(job => job.name === name)) {
      interviewList.push({ name, skill, salary, summary, status: "Interview" });
    }

    status.innerText = "Interview";
    status.className = "status-fo-ap bg-green-100 text-green-600 py-2 px-3 w-32 text-center rounded-sm mb-2";

    renderInterview();
    renderRejected();
    countDashboard();
  }

  // rejected 
  if (e.target.classList.contains("rejected-btn")) {

    interviewList = interviewList.filter(job => job.name !== name);

    if (!rejectedList.find(job => job.name === name)) {
      rejectedList.push({ name, skill, salary, summary, status: "Rejected" });
    }

    status.innerText = "Rejected";
    status.className = "status-fo-ap bg-red-100 text-red-600 py-2 px-3 w-32 text-center rounded-sm mb-2";

    renderInterview();
    renderRejected();
    countDashboard();
  }

  // delete 
  if (e.target.closest(".delete-btn")) {

    interviewList = interviewList.filter(job => job.name !== name);
    rejectedList = rejectedList.filter(job => job.name !== name);

    card.remove();

    renderInterview();
    renderRejected();
    countDashboard();
  }
});


// render interview
function renderInterview() {

  interviewSection.innerHTML = "";

  if (interviewList.length === 0) {
    interviewSection.innerHTML = noJobCard();
    return;
  }

  interviewList.forEach(job => {
    interviewSection.appendChild(createCard(job));
  });
}

// render rejected
function renderRejected() {

  rejectedSection.innerHTML = "";

  if (rejectedList.length === 0) {
    rejectedSection.innerHTML = noJobCard();
    return;
  }

  rejectedList.forEach(job => {
    rejectedSection.appendChild(createCard(job));
  });
}

// create card
function createCard(job) {

  const div = document.createElement("div");
  div.className = "bg-base-100 border border-gray-200 rounded-lg p-6 flex justify-between mb-4";

  div.innerHTML = `
    <div>
      <h4 class="name font-bold text-xl text-[#002C5C] mb-1">${job.name}</h4>
      <p class="skill text-[#64748B] font-light mb-5">${job.skill}</p>
      <p class="salary text-[#64748B] font-light">${job.salary}</p>

      <div class="my-5">
        <p class="status-fo-ap ${job.status === "Interview" ? 
          "bg-green-100 text-green-600" : 
          "bg-red-100 text-red-600"} 
          py-2 px-3 w-32 text-center rounded-sm mb-2">
          ${job.status}
        </p>
        <p class="summary">${job.summary}</p>
      </div>

      <div class="flex gap-2">
        <button class="interview-btn btn text-green-400 border border-green-400">
          Interview
        </button>
        <button class="rejected-btn btn text-red-500 border border-red-500">
          Rejected
        </button>
      </div>
    </div>

    <div>
      <button class="delete-btn btn rounded-full">
        <i class="fa-regular fa-trash-can"></i>
      </button>
    </div>
  `;

  return div;
}

// no job available card
function noJobCard() {
  return `
    <div class="bg-base-100 border border-gray-200 rounded-lg flex flex-col items-center justify-center py-20 text-center">
      <img class="mb-5 w-16 opacity-50" src="jobs.png" alt="">
      <p class="mb-1 font-semibold">No jobs available</p>
      <p class="text-[#64748B] font-light">
        Check back soon for new job opportunities
      </p>
    </div>
  `;
}


countDashboard();