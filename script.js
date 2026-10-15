
const API_URL = "https://api.adviceslip.com/advice";

const adviceId = document.getElementById("advice-id");
const adviceText = document.getElementById("advice-text");
const adviceButton = document.getElementById("advice-button");

function renderAdvice(slip) {
  adviceId.textContent = `ADVICE #${slip.id}`;
  adviceText.textContent = `"${slip.advice}"`;
}

async function getAdvice() {
  adviceButton.disabled = true;
  adviceText.textContent = "Getting some advice...";

  try {
    const response = await fetch(API_URL, {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const data = await response.json();

    if (!data.slip || !data.slip.advice) {
      throw new Error("Invalid advice response");
    }

    renderAdvice(data.slip);
  } catch (error) {
    console.error("Unable to fetch advice:", error);
    adviceId.textContent = "ADVICE";
    adviceText.textContent =
      "Something went wrong. Please check your connection and try again.";
  } finally {
    adviceButton.disabled = false;
  }
}

adviceButton.addEventListener("click", getAdvice);

getAdvice();
