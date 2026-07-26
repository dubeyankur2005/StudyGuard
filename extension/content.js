console.log("StudyGuard Content Script Started - Version 2");

// =====================================
// API
// =====================================

const API_BASE_URL = "http://localhost:3000/api";

// =====================================
// Global Variables
// =====================================

let studyMode = false;

let blockOverlay = null;

let currentVideo = {
  videoId: "",
  title: "",
  channel: "",
  thumbnail: "",
  duration: 0,

  category: "",

  totalWatchTime: 0,
  sessionStartTime: null,

  url: "",
  saved: false,
};

let currentVideoElement = null;

let currentUrl = window.location.href;

// =====================================
// Load Study Mode
// =====================================

// =====================================
// Load Study Mode
// =====================================

// =====================================
// Load Study Mode
// =====================================

async function loadStudyMode() {

    return new Promise((resolve) => {

        chrome.runtime.sendMessage(
            {
                type: "GET_STUDY_MODE"
            },
            (response) => {

                if (chrome.runtime.lastError) {

                    console.error(chrome.runtime.lastError);

                    resolve();

                    return;

                }

                if (!response.success) {

                    console.log("Unable to get Study Mode");

                    resolve();

                    return;

                }

                studyMode = response.studyMode;

                console.log("Study Mode:", studyMode);

                resolve();

            }
        );

    });

}
// =====================================
// Study Keywords
// =====================================

const STUDY_KEYWORDS = [
  "java",
  "javascript",
  "react",
  "node",
  "express",
  "mongodb",
  "sql",
  "python",
  "html",
  "css",
  "dsa",
  "leetcode",
  "coding",
  "programming",
  "course",
  "tutorial",
  "lecture",
  "web development",
];

// =====================================
// Initialize Extension
// =====================================

// =====================================
// Initialize Extension
// =====================================

async function initialize() {

    console.log("Initializing StudyGuard...");

    await loadStudyMode();

    // Run every second
    setInterval(() => {

        hideShorts();

        blurEntertainmentThumbnails();

        //  hideEntertainmentRecommendations();

    }, 1000);

    waitForVideo();

    detectVideoChange();

    detectPageUnload();

}

initialize();

// =====================================
// Wait For Video
// =====================================

function waitForVideo() {

    const interval = setInterval(() => {

        const video = document.querySelector("video");

        if (!video) {
            return;
        }

        // Wait until metadata is available
        if (video.readyState < 1) {
            return;
        }

        clearInterval(interval);

        // If metadata already loaded
        if (video.duration && !isNaN(video.duration)) {

            loadCurrentVideo();

        } else {

            // Wait for metadata
            video.addEventListener(
                "loadedmetadata",
                loadCurrentVideo,
                { once: true }
            );

        }

    }, 300);

}

// =====================================
// Load Current Video
// =====================================

function loadCurrentVideo() {

    const video = document.querySelector("video");

    if (!video) {
        return;
    }

    let currentVideoId;

const url = new URL(window.location.href);

if (url.pathname.startsWith("/shorts/")) {

    currentVideoId = url.pathname.split("/")[2];

} else {

    currentVideoId = url.searchParams.get("v");

}

    const metadataInterval = setInterval(() => {

        const titleElement = document.querySelector(
            "h1.ytd-watch-metadata yt-formatted-string"
        );

        const channelElement = document.querySelector(
            "#owner #channel-name a"
        );

        if (!titleElement || !channelElement) {
            return;
        }

        const title = titleElement.textContent.trim();

        // Wait until YouTube updates the page
        if (
            title.length === 0 ||
            currentVideo.videoId === currentVideoId
        ) {
            return;
        }

        clearInterval(metadataInterval);

        currentVideo = {
            videoId: currentVideoId,
            title: title,
            channel: channelElement.textContent.trim(),
            thumbnail: `https://i.ytimg.com/vi/${currentVideoId}/hqdefault.jpg`,
            duration: Math.floor(video.duration),
            category: getCategory(title),
            totalWatchTime: 0,
            sessionStartTime: null,
            url: window.location.href,
            saved: false,
        };

        console.clear();

        console.log("StudyGuard Loaded");

        console.table(currentVideo);

        attachVideoListeners(video);

        checkStudyMode();

    }, 300);

}

// =====================================
// Detect Category
// =====================================

function getCategory(title) {
  const lowerTitle = title.toLowerCase();

  for (const keyword of STUDY_KEYWORDS) {
    if (lowerTitle.includes(keyword)) {
      return "Study";
    }
  }

  return "Entertainment";
}

// =====================================
// Study Mode Block
// =====================================

function checkStudyMode() {

    if (!studyMode) {

        removeBlockOverlay();

        return;

    }

    if (currentVideo.category === "Study") {

        removeBlockOverlay();

        return;

    }

    blockEntertainmentVideo();

}

// =====================================
// Block Entertainment Video
// =====================================

function blockEntertainmentVideo() {

    const video = document.querySelector("video");

    if (!video) return;

    video.pause();

    video.currentTime = 0;

    video.controls = false;

    const player = document.querySelector("#movie_player");

    if (player) {

        player.style.pointerEvents = "none";

    }

    if (blockOverlay) return;

    blockOverlay = document.createElement("div");

    blockOverlay.id = "studyguard-overlay";

    blockOverlay.innerHTML = `

        <div id="studyguard-card">

            <h1>📚 Study Mode Enabled</h1>

            <p>
                This entertainment video has been blocked.
            </p>

            <button id="studyguard-back">
                Go Back
            </button>

        </div>

    `;

    document.body.appendChild(blockOverlay);

    document.getElementById("studyguard-back").onclick = () => {

        history.back();

    };

}

// =====================================
// Remove Overlay
// =====================================

function removeBlockOverlay() {

    const player = document.querySelector("#movie_player");

    if (player) {

        player.style.pointerEvents = "auto";

    }

    const video = document.querySelector("video");

    if (video) {

        video.controls = true;

    }

    if (!blockOverlay) return;

    blockOverlay.remove();

    blockOverlay = null;

}

function preventPlayback() {

    const video = document.querySelector("video");

    if (!video) return;

    video.onplay = () => {

        if (
            studyMode &&
            currentVideo.category === "Entertainment"
        ) {

            video.pause();
            video.currentTime = 0;

            blockEntertainmentVideo();

        }

    };

}

// =====================================
// Hide YouTube Shorts
// =====================================

function hideShorts() {

    if (!studyMode) {
        return;
    }

    // Shorts shelf on Home
    document.querySelectorAll("ytd-rich-shelf-renderer")
        .forEach((section) => {

            const title = section.innerText.toLowerCase();

            if (title.includes("shorts")) {

                section.style.display = "none";

            }

        });

    // Shorts button in left sidebar
    document.querySelectorAll("ytd-guide-entry-renderer")
        .forEach((item) => {

            const text = item.innerText.toLowerCase();

            if (text.includes("shorts")) {

                item.style.display = "none";

            }

        });

    // Shorts videos in subscriptions/search
    document.querySelectorAll("ytd-reel-shelf-renderer")
        .forEach((item) => {

            item.style.display = "none";

        });

}


// =====================================
// Blur Entertainment Thumbnails
// =====================================

function blurEntertainmentThumbnails() {

    const videos = document.querySelectorAll(`
        ytd-rich-item-renderer,
        ytd-rich-grid-media,
        ytd-video-renderer,
        ytd-compact-video-renderer,
        ytd-grid-video-renderer,
        ytd-reel-item-renderer
    `);

    videos.forEach((video) => {

        const titleElement =
            video.querySelector("#video-title") ||
            video.querySelector("#video-title-link") ||
            video.querySelector("a#video-title");

        const thumbnail =
            video.querySelector("ytd-thumbnail img") ||
            video.querySelector("img");

        if (!titleElement || !thumbnail) return;

        const category = getCategory(titleElement.innerText);

        if (!studyMode) {

            thumbnail.style.filter = "";

            thumbnail.classList.remove("studyguard-blur");

            thumbnail.style.pointerEvents = "auto";

            video.style.pointerEvents = "auto";
            video.style.opacity = "1";
            video.style.cursor = "pointer";

            return;

        }

        if (category === "Entertainment") {

            thumbnail.style.filter = "blur(14px)";
            thumbnail.style.transition = "0.3s";

            thumbnail.classList.add("studyguard-blur");

            thumbnail.style.pointerEvents = "none";

            video.style.pointerEvents = "none";
            video.style.opacity = "0.65";
            video.style.cursor = "not-allowed";

        } else {

            thumbnail.style.filter = "";

            thumbnail.classList.remove("studyguard-blur");

            thumbnail.style.pointerEvents = "auto";

            video.style.pointerEvents = "auto";
            video.style.opacity = "1";
            video.style.cursor = "pointer";

        }

    });

}

// =====================================
// Hide Entertainment Recommendations
// =====================================

function hideEntertainmentRecommendations() {

    if (!studyMode) {

        document.querySelectorAll(".studyguard-hidden")
            .forEach((item) => {

                item.style.display = "";

                item.classList.remove("studyguard-hidden");

            });

        return;

    }

    const videos = document.querySelectorAll(`
        ytd-video-renderer,
        ytd-compact-video-renderer,
        ytd-rich-item-renderer,
        ytd-rich-grid-media,
        ytd-grid-video-renderer
    `);

    videos.forEach((video) => {

        const titleElement =
            video.querySelector("#video-title") ||
            video.querySelector("#video-title-link") ||
            video.querySelector("a#video-title");

        if (!titleElement) return;

        const category = getCategory(titleElement.innerText);

        if (category === "Entertainment") {

            video.style.display = "none";

            video.classList.add("studyguard-hidden");

        } else {

            video.style.display = "";

            video.classList.remove("studyguard-hidden");

        }

    });

}


// =====================================
// Attach Video Listeners
// =====================================

function attachVideoListeners(video) {

    // Remove listeners from previous video
    if (currentVideoElement) {

        currentVideoElement.removeEventListener(
            "play",
            startTracking
        );

        currentVideoElement.removeEventListener(
            "pause",
            pauseTracking
        );

    }

    currentVideoElement = video;

    video.addEventListener(
        "play",
        startTracking
    );

      preventPlayback();
    video.addEventListener(
        "pause",
        pauseTracking
    );

    console.log("Video Listeners Attached");

    // ===============================
    // IMPORTANT
    // ===============================
    // If YouTube autoplay already started
    // before we attached listeners,
    // manually start tracking.
    // ===============================

    if (!video.paused && !video.ended) {

        console.log("Video already playing");

        startTracking();

    }

}

// =====================================
// Start Tracking
// =====================================

function startTracking() {

    console.log("Play Event Fired");

    // Block every play attempt
    if (studyMode && currentVideo.category === "Entertainment") {

        console.log("Entertainment Video Blocked");

        const video = document.querySelector("video");

        if (video) {

            video.pause();

        }

        blockEntertainmentVideo();

        return;

    }

    if (currentVideo.sessionStartTime !== null) {
        return;
    }

    currentVideo.sessionStartTime = Date.now();

    console.log("Tracking Started");

}

// =====================================
// Pause Tracking
// =====================================

function pauseTracking() {

    console.log("Pause Event Fired");

    if (currentVideo.sessionStartTime === null) {
        return;
    }

    const sessionTime = Math.floor(
        (Date.now() - currentVideo.sessionStartTime) / 1000
    );

    currentVideo.totalWatchTime += sessionTime;

    currentVideo.sessionStartTime = null;

    console.log(
        "Current Watch Time:",
        currentVideo.totalWatchTime,
        "seconds"
    );

}

// =====================================
// Save Current Video
// =====================================

function saveCurrentVideo() {
    console.log("saveCurrentVideo() Called");

    if (currentVideo.saved) {
        return;
    }

    if (currentVideo.totalWatchTime < 5) {

        console.log("Watch time less than 5 seconds. Skipping save.");

        return;
    }

    currentVideo.saved = true;

    chrome.runtime.sendMessage(
        {
            type: "VIDEO_TRACKED",
            payload: currentVideo
        },
        (response) => {

            if (chrome.runtime.lastError) {

                console.error(chrome.runtime.lastError);

                return;

            }

            console.log("Video Saved");

            console.log(response);

        }
    );

}

// =====================================
// Detect Video Change
// =====================================

function detectVideoChange() {

    setInterval(() => {

        if (window.location.href === currentUrl) {
            return;
        }

        console.log("Video Changed");

        pauseTracking();

        saveCurrentVideo();

        currentUrl = window.location.href;

currentVideoElement = null;

waitForVideo();

    }, 1000);

}

// =====================================
// Detect Page Unload
// =====================================

function detectPageUnload() {

    window.addEventListener("beforeunload", () => {

        pauseTracking();

        saveCurrentVideo();

    });

}