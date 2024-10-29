import { backend } from "declarations/backend";

const checkStatusBtn = document.getElementById("checkStatus");
const recordPrincipalBtn = document.getElementById("recordPrincipal");
const statusElement = document.getElementById("status");
const spinner = document.getElementById("spinner");

async function checkStatus() {
    try {
        showSpinner();
        const isRecorded = await backend.isRecorded();
        updateStatus(isRecorded);
    } catch (error) {
        statusElement.textContent = `Error: ${error.message}`;
        statusElement.classList.add("text-danger");
    } finally {
        hideSpinner();
    }
}

async function recordPrincipal() {
    try {
        showSpinner();
        await backend.recordPrincipal();
        await checkStatus();
    } catch (error) {
        statusElement.textContent = `Error: ${error.message}`;
        statusElement.classList.add("text-danger");
    } finally {
        hideSpinner();
    }
}

function updateStatus(isRecorded) {
    if (isRecorded) {
        statusElement.textContent = "Your principal is recorded!";
        statusElement.classList.remove("text-danger");
        statusElement.classList.add("text-success");
        recordPrincipalBtn.style.display = "none";
    } else {
        statusElement.textContent = "Your principal is not recorded yet.";
        statusElement.classList.remove("text-success");
        statusElement.classList.add("text-warning");
        recordPrincipalBtn.style.display = "block";
    }
}

function showSpinner() {
    spinner.style.display = "block";
    checkStatusBtn.disabled = true;
    recordPrincipalBtn.disabled = true;
}

function hideSpinner() {
    spinner.style.display = "none";
    checkStatusBtn.disabled = false;
    recordPrincipalBtn.disabled = false;
}

checkStatusBtn.addEventListener("click", checkStatus);
recordPrincipalBtn.addEventListener("click", recordPrincipal);

// Initial check
checkStatus();
